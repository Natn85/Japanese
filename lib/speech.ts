"use client";

import { useCallback, useEffect, useState } from "react";

/*
  Text-to-speech via the browser's built-in Web Speech API (SpeechSynthesis).
  No backend, no API keys — it uses whatever Japanese voices are installed on
  the device. Quality varies (Windows ships Haruka/Nanami, macOS ships
  Kyoko/Otoya, Chrome adds Google voices online); we pick the best available
  ja-JP voice and fall back to the browser default if none is found.

  If we ever want studio-quality audio, swap speakText for a call to a cloud
  TTS endpoint (Azure / Google / ElevenLabs). That needs a server + keys, so
  it stays out of scope for the free, no-account build.
*/

let cachedVoices: SpeechSynthesisVoice[] = [];

function loadVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !window.speechSynthesis) return [];
  const v = window.speechSynthesis.getVoices();
  if (v.length) cachedVoices = v;
  return cachedVoices;
}

export function pickJapaneseVoice(
  voices: SpeechSynthesisVoice[],
): SpeechSynthesisVoice | null {
  const ja = voices.filter((v) => v.lang?.toLowerCase().startsWith("ja"));
  if (!ja.length) return null;
  // Prefer voices that tend to sound the most natural where available.
  const preferred = ["Google", "Kyoko", "Otoya", "Nanami", "Haruka", "Ayumi", "O-ren"];
  for (const name of preferred) {
    const match = ja.find((v) => v.name.includes(name));
    if (match) return match;
  }
  return ja[0];
}

/**
 * Fire-and-forget speak, for places that don't need React state
 * (e.g. tapping a kana card). Cancels anything already playing.
 */
export function speakText(text: string, rate = 1) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const trimmed = text.trim();
  if (!trimmed) return;
  const voice = pickJapaneseVoice(loadVoices());
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(trimmed);
  u.lang = "ja-JP";
  if (voice) u.voice = voice;
  u.rate = rate;
  window.speechSynthesis.speak(u);
}

/**
 * Hook for UI that needs to reflect speech state (the Pronounce page):
 * support detection, whether a Japanese voice exists, and a speaking flag.
 */
export function useSpeech() {
  const [supported, setSupported] = useState(false);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [hasJaVoice, setHasJaVoice] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setSupported(false);
      return;
    }
    setSupported(true);

    const refresh = () => {
      const ja = pickJapaneseVoice(loadVoices());
      setVoice(ja);
      setHasJaVoice(!!ja);
    };
    refresh();
    // Voices load asynchronously in most browsers.
    window.speechSynthesis.addEventListener("voiceschanged", refresh);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", refresh);
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = useCallback(
    (text: string, rate = 1) => {
      if (typeof window === "undefined" || !window.speechSynthesis) return;
      const trimmed = text.trim();
      if (!trimmed) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(trimmed);
      u.lang = "ja-JP";
      if (voice) u.voice = voice;
      u.rate = rate;
      u.onend = () => setSpeaking(false);
      u.onerror = () => setSpeaking(false);
      setSpeaking(true);
      window.speechSynthesis.speak(u);
    },
    [voice],
  );

  const cancel = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  return { supported, hasJaVoice, voice, speaking, speak, cancel };
}

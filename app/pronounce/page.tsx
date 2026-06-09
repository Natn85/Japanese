"use client";

import { useState } from "react";
import { useSpeech } from "@/lib/speech";
import SpeakerIcon from "@/components/SpeakerIcon";

// Quick-start phrases so the page is useful the instant it loads.
const examples = [
  { jp: "こんにちは", en: "hello" },
  { jp: "ありがとう", en: "thank you" },
  { jp: "はじめまして", en: "nice to meet you" },
  { jp: "おはようございます", en: "good morning" },
  { jp: "わたしは　がくせいです。", en: "I'm a student." },
  { jp: "コーヒーをください。", en: "Coffee, please." },
];

export default function PronouncePage() {
  const { supported, hasJaVoice, speaking, speak, cancel } = useSpeech();
  const [text, setText] = useState("");
  const [slow, setSlow] = useState(false);

  const rate = slow ? 0.5 : 1;
  const handleSpeak = () => speak(text, rate);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl/Cmd + Enter speaks without leaving the keyboard.
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleSpeak();
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      {/* Header */}
      <section className="mb-8">
        <p className="font-jp mb-2 text-sm font-medium text-accent" lang="ja">発音</p>
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Pronounce
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-muted">
          Type any Japanese, or a single character, and hear it read aloud. Use
          the slow setting when you&apos;re still finding the rhythm of a word.
        </p>
      </section>

      {!supported ? (
        <div className="rounded-2xl border border-border bg-surface p-6 text-ink-muted">
          Your browser doesn&apos;t support speech synthesis. Try the latest
          Chrome, Edge, or Safari to use this page.
        </div>
      ) : (
        <>
          {/* Input card */}
          <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
            <label htmlFor="tts-input" className="sr-only">
              Text to read aloud
            </label>
            <textarea
              id="tts-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={onKeyDown}
              rows={4}
              lang="ja"
              placeholder="ここに　にほんごを　かいてください…"
              className="font-jp w-full resize-y rounded-xl border border-border bg-bg p-4 text-xl leading-relaxed text-ink placeholder:text-ink-muted/60 focus:border-accent focus:outline-none"
            />

            {/* Controls */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex-1" />

              {/* Speed toggle */}
              <div
                role="group"
                aria-label="Speech speed"
                className="inline-flex rounded-xl border border-border p-0.5"
              >
                <button
                  onClick={() => setSlow(false)}
                  aria-pressed={!slow}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    !slow ? "bg-accent-soft text-accent" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  Normal
                </button>
                <button
                  onClick={() => setSlow(true)}
                  aria-pressed={slow}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    slow ? "bg-accent-soft text-accent" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  Slow
                </button>
              </div>

              {/* Speak / Stop */}
              {speaking ? (
                <button
                  onClick={cancel}
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  Stop
                </button>
              ) : (
                <button
                  onClick={handleSpeak}
                  disabled={!text.trim()}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-2.5 text-sm font-semibold text-accent-on transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <SpeakerIcon className="h-4 w-4" />
                  Speak
                </button>
              )}
            </div>
          </div>

          {/* No Japanese voice notice (still works via a fallback voice) */}
          {!hasJaVoice && (
            <p className="mt-3 text-sm text-ink-muted">
              No Japanese voice was found on this device, so the reading may
              sound off. On Windows you can add one under{" "}
              <span className="text-ink">Settings → Time &amp; language → Speech</span>
              ; on iOS/macOS, install a Japanese voice under Accessibility →
              Spoken Content.
            </p>
          )}

          {/* Examples */}
          <section className="mt-10">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink-muted">
              Try one
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {examples.map((ex) => (
                <button
                  key={ex.jp}
                  onClick={() => {
                    setText(ex.jp);
                    speak(ex.jp, rate);
                  }}
                  className="group flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 transition-colors hover:border-accent hover:bg-surface-2"
                >
                  <span className="font-jp text-base text-ink group-hover:text-accent" lang="ja">
                    {ex.jp}
                  </span>
                  <span className="text-xs text-ink-muted">{ex.en}</span>
                </button>
              ))}
            </div>
          </section>

          <p className="mt-10 text-sm leading-relaxed text-ink-muted">
            Pronunciation comes from your device&apos;s built-in voices, so the
            exact sound depends on what&apos;s installed. It&apos;s a great way
            to check a reading, but treat native recordings as the final word.
          </p>
        </>
      )}
    </div>
  );
}

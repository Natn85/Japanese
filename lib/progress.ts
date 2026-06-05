"use client";

import { useCallback, useEffect, useState } from "react";

/*
  Lightweight client-side progress store, persisted to localStorage.
  This is what makes "progress is the product" real instead of decorative:
  marking a lesson complete on any learn page shows up on the dashboard.
  No backend, no accounts — just the learner's own device.
*/

export type LessonId = "hiragana" | "katakana" | "kanji" | "grammar";

export interface Lesson {
  id: LessonId;
  label: string;
  jp: string;
  glyph: string;
  href: string;
  blurb: string;
  /** Roughly how long a focused first pass takes. */
  estimate: string;
}

export const LESSONS: Lesson[] = [
  {
    id: "hiragana",
    label: "Hiragana",
    jp: "ひらがな",
    glyph: "あ",
    href: "/learn/hiragana",
    blurb: "The 46 phonetic characters every learner starts with.",
    estimate: "1–2 weeks",
  },
  {
    id: "katakana",
    label: "Katakana",
    jp: "カタカナ",
    glyph: "ア",
    href: "/learn/katakana",
    blurb: "The same 46 sounds, used for loanwords and names.",
    estimate: "~1 week",
  },
  {
    id: "kanji",
    label: "Kanji",
    jp: "漢字",
    glyph: "字",
    href: "/learn/kanji",
    blurb: "Meaning-rich characters, learned a handful at a time.",
    estimate: "ongoing",
  },
  {
    id: "grammar",
    label: "Grammar",
    jp: "文法",
    glyph: "を",
    href: "/learn/grammar",
    blurb: "Particles, word order, and the shape of a sentence.",
    estimate: "a few days",
  },
];

const STORAGE_KEY = "japanara:progress:v1";

function read(): LessonId[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is LessonId =>
      LESSONS.some((l) => l.id === id),
    );
  } catch {
    return [];
  }
}

function write(ids: LessonId[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    // Let other open tabs / components on the same page react.
    window.dispatchEvent(new Event("japanara:progress"));
  } catch {
    /* storage unavailable (private mode, quota) — fail quietly */
  }
}

export function useProgress() {
  // `hydrated` guards against SSR/client mismatch: render the empty state on
  // the server, then fill in once localStorage is readable.
  const [completed, setCompleted] = useState<LessonId[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCompleted(read());
    setHydrated(true);

    const sync = () => setCompleted(read());
    window.addEventListener("japanara:progress", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("japanara:progress", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const isComplete = useCallback(
    (id: LessonId) => completed.includes(id),
    [completed],
  );

  const setComplete = useCallback((id: LessonId, value: boolean) => {
    const next = value
      ? Array.from(new Set([...read(), id]))
      : read().filter((x) => x !== id);
    write(next);
    setCompleted(next);
  }, []);

  const reset = useCallback(() => {
    write([]);
    setCompleted([]);
  }, []);

  return {
    completed,
    count: completed.length,
    total: LESSONS.length,
    hydrated,
    isComplete,
    setComplete,
    reset,
  };
}

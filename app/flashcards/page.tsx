"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { hiragana } from "@/data/hiragana";
import { katakana } from "@/data/katakana";

type DeckId = "hiragana" | "katakana" | "mixed";

const decks: { id: DeckId; label: string; jp: string }[] = [
  { id: "hiragana", label: "Hiragana", jp: "ひらがな" },
  { id: "katakana", label: "Katakana", jp: "カタカナ" },
  { id: "mixed", label: "Mixed", jp: "ミックス" },
];

interface Card {
  kana: string;
  romaji: string;
}

function buildDeck(id: DeckId): Card[] {
  if (id === "hiragana") return hiragana.map((e) => ({ kana: e.kana, romaji: e.romaji }));
  if (id === "katakana") return katakana.map((e) => ({ kana: e.kana, romaji: e.romaji }));
  return [...hiragana, ...katakana].map((e) => ({ kana: e.kana, romaji: e.romaji }));
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FlashcardsPage() {
  const [deckId, setDeckId] = useState<DeckId>("hiragana");
  const [order, setOrder] = useState<number[]>([]);
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [seen, setSeen] = useState(0);

  const base = useMemo(() => buildDeck(deckId), [deckId]);

  const startDeck = useCallback(
    (id: DeckId) => {
      const deck = buildDeck(id);
      setDeckId(id);
      setOrder(shuffle(deck.map((_, i) => i)));
      setPos(0);
      setFlipped(false);
      setSeen(0);
    },
    [],
  );

  // Initialise the first deck on mount.
  useEffect(() => {
    setOrder(shuffle(base.map((_, i) => i)));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const card = order.length ? base[order[pos]] : null;

  const next = useCallback(() => {
    setFlipped(false);
    setPos((p) => {
      const np = (p + 1) % order.length;
      setSeen((s) => Math.min(s + 1, order.length));
      return np;
    });
  }, [order.length]);

  const prev = useCallback(() => {
    setFlipped(false);
    setPos((p) => (p - 1 + order.length) % order.length);
  }, [order.length]);

  const reshuffle = useCallback(() => {
    setOrder(shuffle(base.map((_, i) => i)));
    setPos(0);
    setFlipped(false);
    setSeen(0);
  }, [base]);

  // Keyboard: space/enter flips, arrows navigate.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (e.key === "ArrowRight") {
        next();
      } else if (e.key === "ArrowLeft") {
        prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      {/* Header */}
      <section className="mb-8 text-center">
        <p className="font-jp mb-2 text-sm font-medium text-accent">練習</p>
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Flashcards
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-ink-muted">
          See the character, recall the sound, then flip to check. Shuffled every
          round so you learn the shapes, not the order.
        </p>
      </section>

      {/* Deck selector */}
      <div className="mb-8 flex justify-center gap-2">
        {decks.map((d) => (
          <button
            key={d.id}
            onClick={() => startDeck(d.id)}
            aria-pressed={deckId === d.id}
            className={`rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
              deckId === d.id
                ? "border-accent bg-accent-soft text-accent"
                : "border-border text-ink-muted hover:border-accent hover:text-ink"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Card */}
      <div className="[perspective:1200px]">
        <button
          onClick={() => setFlipped((f) => !f)}
          aria-label={
            flipped
              ? `Romaji: ${card?.romaji}. Tap to see the character.`
              : "Tap to reveal the reading."
          }
          className="group relative block h-72 w-full cursor-pointer rounded-3xl text-center [transform-style:preserve-3d] transition-transform duration-500"
          style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {/* Front — the character */}
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl border border-border bg-surface [backface-visibility:hidden]">
            <span className="font-jp text-8xl font-bold leading-none text-ink">
              {card?.kana ?? "··"}
            </span>
            <span className="text-sm text-ink-muted">Tap or press Space to flip</span>
          </span>
          {/* Back — the reading */}
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-3xl border border-accent/40 bg-accent-soft [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <span className="font-jp text-5xl font-bold leading-none text-accent">
              {card?.kana}
            </span>
            <span className="text-4xl font-bold tracking-wide text-ink">
              {card?.romaji}
            </span>
          </span>
        </button>
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          onClick={prev}
          className="rounded-xl border border-border px-5 py-3 text-sm font-medium text-ink-muted transition-colors hover:border-accent hover:text-ink"
          aria-label="Previous card"
        >
          ← Prev
        </button>
        <button
          onClick={next}
          className="rounded-xl bg-accent px-7 py-3 text-sm font-semibold text-accent-on transition-colors hover:bg-accent-hover"
          aria-label="Next card"
        >
          Next →
        </button>
        <button
          onClick={reshuffle}
          className="rounded-xl border border-border px-5 py-3 text-sm font-medium text-ink-muted transition-colors hover:border-accent hover:text-ink"
          aria-label="Shuffle the deck"
        >
          Shuffle
        </button>
      </div>

      {/* Progress */}
      <p className="mt-6 text-center text-sm text-ink-muted">
        <span className="font-jp tabular-nums font-semibold text-ink">
          {order.length ? pos + 1 : 0}
        </span>{" "}
        / {order.length} · {seen} reviewed this round
      </p>
    </div>
  );
}

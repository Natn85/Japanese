import React from "react";
import type { Metadata } from "next";
import KanaCard from "@/components/KanaCard";
import LiteYouTube from "@/components/LiteYouTube";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import { katakana, rowOrder, groupByRow } from "@/data/katakana";

export const metadata: Metadata = {
  title: "Katakana",
  description:
    "Learn all 46 katakana characters with audio, a video introduction, and the best free practice resources.",
};

const resources = [
  {
    label: "Tofugu Katakana Guide",
    href: "https://www.tofugu.com/japanese/learn-katakana/",
    desc: "A thorough free guide with a mnemonic for every character, built to make the angular shapes stick.",
  },
  {
    label: "Real Kana",
    href: "https://realkana.com/katakana/",
    desc: "A clean, distraction-free drill tool for reading katakana until it's automatic.",
  },
  {
    label: "Dr. Moku App",
    href: "https://www.drmoku.com/",
    desc: "A mnemonic-based app that turns the trickier look-alikes into memorable pictures.",
  },
];

const grouped = groupByRow(katakana);

export default function KatakanaPage() {
  let cardCount = 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">

      {/* Header */}
      <section>
        <p className="text-accent text-sm font-medium mb-3">
          Writing System
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-ink mb-4">
          Katakana{" "}
          <span className="font-jp text-ink-muted font-normal" lang="ja">カタカナ</span>
        </h1>
        <p className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-2xl">
          Katakana is the second phonetic alphabet of Japanese: the same 46
          sounds as hiragana, written in sharp, angular strokes. You&apos;ll see
          it everywhere foreign words appear, from loanwords like{" "}
          <span className="font-jp" lang="ja">コーヒー</span> (coffee)
          to names, brands, scientific terms, and sound effects in manga. Because
          you already know the sounds from hiragana, this script is mostly about
          training your eye on a new set of shapes, so most learners get
          comfortable reading it within a week.
        </p>
      </section>

      {/* Character Grid */}
      <section>
        <h2 className="text-xl font-semibold text-ink mb-6">
          All 46 Characters
        </h2>
        <div className="space-y-8">
          {rowOrder.map((row) => {
            const entries = grouped[row];
            if (!entries) return null;
            return (
              <div key={row}>
                <h3 className="text-xs font-medium text-ink-muted mb-3">
                  {row}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {entries.map((entry) => {
                    const i = cardCount++;
                    return (
                      <div
                        key={entry.kana}
                        className="animate-card-in"
                        style={{ "--card-i": Math.min(i, 12) } as React.CSSProperties}
                      >
                        <KanaCard entry={entry} />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Video */}
      <section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          Video Introduction
        </h2>
        <LiteYouTube id="s6DKRgtVLGA" title="Katakana introduction video" />
      </section>

      {/* Resources */}
      <section>
        <h2 className="text-xl font-semibold text-ink mb-4">Resources</h2>
        <ul className="space-y-3">
          {resources.map((r) => (
            <li key={r.href}>
              <a
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 bg-surface hover:bg-surface-2 border border-border hover:border-accent rounded-xl px-5 py-4 transition-[color,background-color,border-color,transform] duration-150 hover:-translate-y-px group"
              >
                <span className="text-accent group-hover:text-accent-hover font-semibold text-sm whitespace-nowrap">
                  {r.label}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  > ↗</span>
                  <span className="sr-only"> (opens in new tab)</span>
                </span>
                <span className="text-ink-muted text-sm">{r.desc}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Mark complete */}
      <section className="flex flex-col items-center gap-3 pb-4">
        <p className="text-ink-muted text-sm">
          Finished studying? Mark this lesson as complete.
        </p>
        <MarkCompleteButton lessonId="katakana" />
      </section>

    </div>
  );
}

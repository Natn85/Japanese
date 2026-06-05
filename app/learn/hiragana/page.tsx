import React from "react";
import KanaCard from "@/components/KanaCard";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import { hiragana, rowOrder, groupByRow } from "@/data/hiragana";

const resources = [
  {
    label: "Tofugu Hiragana Guide",
    href: "https://www.tofugu.com/japanese/learn-hiragana/",
    desc: "The most thorough free guide to learning hiragana, with mnemonics for every character.",
  },
  {
    label: "Real Kana",
    href: "https://realkana.com/hiragana/",
    desc: "A clean, distraction-free drill tool to practice reading hiragana until it's automatic.",
  },
  {
    label: "Dr. Moku App",
    href: "https://www.drmoku.com/",
    desc: "A mnemonic-based app that makes memorizing hiragana fast and fun.",
  },
];

const grouped = groupByRow(hiragana);

export default function HiraganaPage() {
  let cardCount = 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">

      {/* Header */}
      <section>
        <p className="text-accent text-sm font-medium mb-3">
          Writing System
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-ink mb-4">
          Hiragana{" "}
          <span className="font-jp text-ink-muted font-normal">ひらがな</span>
        </h1>
        <p className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-2xl">
          Hiragana is the foundational phonetic alphabet of the Japanese writing
          system, consisting of 46 basic characters that each represent a
          distinct syllable sound. It is the first script every Japanese learner
          should master, since it appears in grammar particles, verb endings, and
          children&apos;s books, building the reading intuition you need for
          everything that follows. With focused practice, most learners can read
          all 46 characters fluently within one to two weeks.
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
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border">
          <iframe
            src="https://www.youtube.com/embed/6p9Il_j0zjc"
            title="Hiragana introduction video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
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
        <MarkCompleteButton lessonId="hiragana" />
      </section>

    </div>
  );
}

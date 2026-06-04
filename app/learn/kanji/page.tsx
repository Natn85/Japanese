import React from "react";
import KanjiCard from "@/components/KanjiCard";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import { kanji, groupOrder, groupByGroup } from "@/data/kanji";

const resources = [
  {
    label: "WaniKani",
    href: "https://www.wanikani.com/",
    desc: "An SRS-based app that teaches 2,000+ kanji and 6,000+ words through radicals and mnemonics, in the right order.",
  },
  {
    label: "Jisho Dictionary",
    href: "https://jisho.org/",
    desc: "The go-to online Japanese dictionary—look up any kanji to see its readings, meanings, stroke order, and example words.",
  },
  {
    label: "Tofugu: Learn Kanji",
    href: "https://www.tofugu.com/japanese/how-to-learn-kanji/",
    desc: "A clear, free guide to a strategy that actually sticks, with radicals, mnemonics, and spaced repetition.",
  },
];

const grouped = groupByGroup(kanji);

export default function KanjiPage() {
  let cardCount = 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">

      {/* Header */}
      <section>
        <p className="text-accent text-sm font-medium mb-3">
          Writing System
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-ink mb-4">
          Kanji{" "}
          <span className="font-jp text-ink-muted font-normal">漢字</span>
        </h1>
        <p className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-2xl">
          Kanji are the logographic characters borrowed from Chinese, where each
          symbol carries a meaning rather than a single sound. There are
          thousands in total, but everyday literacy rests on the 2,136 jōyō
          (&ldquo;common use&rdquo;) kanji—and you don&apos;t learn them all at
          once. Start with the most fundamental characters below, learn them in
          small sets, and lean on spaced repetition. Unlike the kana, kanji is a
          long game measured in months and years, so the goal here is simply to
          build your first foothold.
        </p>
      </section>

      {/* On vs Kun explainer */}
      <section>
        <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
          <h2 className="text-base font-semibold text-ink mb-2">
            On&apos;yomi vs. Kun&apos;yomi
          </h2>
          <p className="text-ink-muted text-sm leading-relaxed">
            Most kanji have two kinds of reading. The{" "}
            <span className="text-accent font-medium">on&apos;yomi</span> (音読み)
            is the reading adapted from Chinese, usually shown in{" "}
            <span className="font-jp text-ink">カタカナ</span> and used in
            compound words. The{" "}
            <span className="text-accent font-medium">kun&apos;yomi</span> (訓読み)
            is the native Japanese reading, shown in{" "}
            <span className="font-jp text-ink">ひらがな</span> and used when the
            kanji stands on its own. A trailing part in parentheses, like{" "}
            <span className="font-jp text-ink">おお(きい)</span>, is okurigana—the
            hiragana written after the kanji. Don&apos;t memorize every reading
            up front; they&apos;ll stick naturally as you meet real words.
          </p>
        </div>
      </section>

      {/* Character Grid */}
      <section>
        <h2 className="text-xl font-semibold text-ink mb-6">
          Your First {kanji.length} Kanji
        </h2>
        <div className="space-y-8">
          {groupOrder.map((group) => {
            const entries = grouped[group];
            if (!entries) return null;
            return (
              <div key={group}>
                <h3 className="text-xs font-medium text-ink-muted mb-3">
                  {group}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {entries.map((entry) => {
                    const i = cardCount++;
                    return (
                      <div
                        key={entry.kanji}
                        className="animate-card-in"
                        style={{ "--card-i": Math.min(i, 12) } as React.CSSProperties}
                      >
                        <KanjiCard entry={entry} />
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
            src="https://www.youtube.com/embed/9F5lLgUMfFc"
            title="Kanji introduction video"
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
        <MarkCompleteButton />
      </section>

    </div>
  );
}

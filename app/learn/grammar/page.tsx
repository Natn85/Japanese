import React from "react";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import { particles } from "@/data/grammar";

const resources = [
  {
    label: "Tae Kim's Guide to Japanese Grammar",
    href: "https://guidetojapanese.org/learn/grammar",
    desc: "The classic free grammar guide that builds Japanese from the ground up, the way the language actually works.",
  },
  {
    label: "Tofugu: Japanese Particles",
    href: "https://www.tofugu.com/japanese/japanese-particles/",
    desc: "A friendly, thorough breakdown of every particle with plenty of real example sentences.",
  },
  {
    label: "ToKini Andy (Genki playthrough)",
    href: "https://www.youtube.com/@ToKiniAndy",
    desc: "Free video lessons that walk through the Genki textbook chapter by chapter, great alongside any course.",
  },
];

// The colour-coded sentence shows how each chunk maps to a particle's job.
const sentenceParts = [
  { jp: "わたし", color: "text-ink", label: "topic" },
  { jp: "は", color: "text-accent", label: "は" },
  { jp: "すし", color: "text-ink", label: "object" },
  { jp: "を", color: "text-accent", label: "を" },
  { jp: "たべます", color: "text-ink", label: "verb" },
];

export default function GrammarPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-16 px-4 py-12">
      {/* Header */}
      <section>
        <p className="mb-3 text-sm font-medium text-accent">Writing System</p>
        <h1 className="mb-4 text-4xl font-bold text-ink sm:text-5xl">
          Grammar <span className="font-jp font-normal text-ink-muted">文法</span>
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
          Japanese grammar feels alien at first and then suddenly clicks. Two
          ideas do most of the work: sentences end with the verb, and small
          words called particles tag each piece of the sentence with its job.
          Once those two clicks happen, you can read the shape of almost any
          sentence, even when you don&apos;t know every word yet. This page is
          your first map.
        </p>
      </section>

      {/* Word order */}
      <section>
        <h2 className="mb-6 text-xl font-semibold text-ink">
          The shape of a sentence
        </h2>
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <p className="mb-6 text-sm leading-relaxed text-ink-muted">
            English runs Subject → Verb → Object (&ldquo;I eat sushi&rdquo;).
            Japanese runs Subject → Object → Verb, and the verb always comes
            last. Notice how each chunk below carries a particle that labels its
            role.
          </p>
          <div className="flex flex-wrap items-end gap-x-1 gap-y-4">
            {sentenceParts.map((p, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <span className={`font-jp text-2xl font-bold sm:text-3xl ${p.color}`}>
                  {p.jp}
                </span>
                <span className="text-[11px] uppercase tracking-wide text-ink-muted">
                  {p.label}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-6 border-t border-border pt-4 text-sm text-ink-muted">
            <span className="font-medium text-ink">Watashi wa sushi o tabemasu.</span>{" "}
            Literally: &ldquo;As-for-me, sushi, eat.&rdquo;
          </p>
        </div>
      </section>

      {/* Particles */}
      <section>
        <h2 className="mb-2 text-xl font-semibold text-ink">
          The core particles
        </h2>
        <p className="mb-6 max-w-2xl text-sm leading-relaxed text-ink-muted">
          Particles come right after the word they mark. You don&apos;t need to
          memorise these in one sitting; meet them here, then recognise them in
          the wild.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {particles.map((p) => (
            <div
              key={p.particle}
              className="flex gap-4 rounded-xl border border-border bg-surface p-5"
            >
              <div className="flex shrink-0 flex-col items-center">
                <span className="font-jp text-3xl font-bold leading-none text-accent">
                  {p.particle}
                </span>
                <span className="mt-1 text-xs text-ink-muted">{p.romaji}</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm leading-relaxed text-ink">{p.role}</p>
                <p className="font-jp mt-2 text-sm text-ink">{p.example}</p>
                <p className="text-xs text-ink-muted">
                  {p.exampleRomaji} · {p.exampleEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Politeness note */}
      <section>
        <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
          <h2 className="mb-2 text-base font-semibold text-ink">
            です and ます: your polite default
          </h2>
          <p className="text-sm leading-relaxed text-ink-muted">
            Japanese has casual and polite registers. As a beginner, stick with
            the polite forms:{" "}
            <span className="font-jp text-ink">です</span> (desu) after nouns and
            adjectives, and{" "}
            <span className="font-jp text-ink">ます</span> (masu) endings on
            verbs. They&apos;re always safe with strangers, teachers, and
            shopkeepers, and they give your sentences a clean, predictable
            ending while everything else still feels new.
          </p>
        </div>
      </section>

      {/* Video */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-ink">Video Introduction</h2>
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border">
          <iframe
            src="https://www.youtube.com/embed/o_EuKawOZAw"
            title="Japanese grammar introduction video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </section>

      {/* Resources */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-ink">Resources</h2>
        <ul className="space-y-3">
          {resources.map((r) => (
            <li key={r.href}>
              <a
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1 rounded-xl border border-border bg-surface px-5 py-4 transition-[color,background-color,border-color,transform] duration-150 hover:-translate-y-px hover:border-accent hover:bg-surface-2 sm:flex-row sm:items-center sm:gap-4"
              >
                <span className="whitespace-nowrap text-sm font-semibold text-accent group-hover:text-accent-hover">
                  {r.label}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    {" "}
                    ↗
                  </span>
                  <span className="sr-only"> (opens in new tab)</span>
                </span>
                <span className="text-sm text-ink-muted">{r.desc}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Mark complete */}
      <section className="flex flex-col items-center gap-3 pb-4">
        <p className="text-sm text-ink-muted">
          Got the shape of it? Mark this lesson as complete.
        </p>
        <MarkCompleteButton lessonId="grammar" />
      </section>
    </div>
  );
}

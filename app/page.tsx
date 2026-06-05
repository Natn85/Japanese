"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { LESSONS, useProgress } from "@/lib/progress";

// Featured tracks get the wider bento cell. Order matches the learning path.
const featured: Record<string, boolean> = { hiragana: true, grammar: true };
const glyphStrip: Record<string, string> = {
  hiragana: "あ い う え お",
  katakana: "ア イ ウ",
  kanji: "日 本 語",
  grammar: "は を に",
};

// Decorative kana that drift slowly behind the hero. Purely atmospheric.
const floaters = [
  { ch: "あ", top: "12%", left: "8%", size: "clamp(3rem,9vw,7rem)", dur: "9s", rot: "-8deg" },
  { ch: "ね", top: "22%", right: "10%", size: "clamp(3.5rem,10vw,8rem)", dur: "11s", rot: "6deg" },
  { ch: "こ", top: "62%", left: "14%", size: "clamp(2.5rem,7vw,5rem)", dur: "8s", rot: "10deg" },
  { ch: "を", top: "70%", right: "16%", size: "clamp(3rem,8vw,6rem)", dur: "12s", rot: "-5deg" },
];

const steps = [
  {
    n: "01",
    jp: "選ぶ",
    title: "Pick a script",
    body: "Start with hiragana, then katakana, kanji, and grammar. Each one is a self-contained module.",
  },
  {
    n: "02",
    jp: "学ぶ",
    title: "Study the set",
    body: "Read the guide, drill the characters, and watch a short intro video, all on one focused page.",
  },
  {
    n: "03",
    jp: "進む",
    title: "Mark it, move on",
    body: "Mark a lesson complete and it lands on your dashboard. Your progress stays on your device.",
  },
];

export default function Home() {
  const reduce = useReducedMotion();
  const { isComplete, hydrated, count, total } = useProgress();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.05 },
    },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(120% 70% at 50% -10%, var(--accent-soft), transparent 60%)",
          }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
          {floaters.map((f, i) => (
            <span
              key={i}
              className="font-jp absolute select-none text-accent/20 animate-kana-drift"
              style={{
                top: f.top,
                left: f.left,
                right: f.right,
                fontSize: f.size,
                ["--k-dur" as string]: f.dur,
                ["--k-rot" as string]: f.rot,
                animationDelay: `${i * 0.7}s`,
              }}
            >
              {f.ch}
            </span>
          ))}
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto flex min-h-[84dvh] max-w-3xl flex-col items-center justify-center px-4 text-center"
        >
          <motion.p
            variants={item}
            className="font-jp mb-5 text-sm font-medium tracking-wide text-accent"
          >
            日本語を学ぼう
          </motion.p>
          <motion.h1
            variants={item}
            className="mb-5 text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-6xl"
          >
            Read Japanese, one
            <br className="hidden sm:block" /> character at a time.
          </motion.h1>
          <motion.p
            variants={item}
            className="mb-9 max-w-xl text-lg leading-relaxed text-ink-muted sm:text-xl"
          >
            Guided lessons in hiragana, katakana, kanji, and grammar that make
            every step feel doable.
          </motion.p>
          <motion.div
            variants={item}
            className="flex flex-col items-center gap-3 sm:flex-row"
          >
            <motion.div whileHover={reduce ? undefined : { y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/learn/hiragana"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-base font-semibold text-accent-on shadow-sm transition-colors duration-150 hover:bg-accent-hover"
              >
                {hydrated && count > 0 ? "Keep going" : "Start with Hiragana"}
                <span aria-hidden>→</span>
              </Link>
            </motion.div>
            <Link
              href="#paths"
              className="rounded-xl px-6 py-3.5 text-base font-medium text-ink-muted transition-colors duration-150 hover:text-ink"
            >
              Explore the paths
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Learning paths (asymmetric bento, live progress) ── */}
      <section id="paths" className="mx-auto max-w-5xl scroll-mt-20 px-4 pb-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Four paths, one foundation.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">
              Work through them in order or jump to what you need. Each path is a
              module you can finish and feel.
            </p>
          </div>
          {hydrated && (
            <p className="text-sm text-ink-muted">
              <span className="font-jp tabular-nums text-2xl font-bold text-ink">
                {count}
              </span>
              <span className="text-ink-muted"> / {total} complete</span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
          {LESSONS.map((t, i) => {
            const done = hydrated && isComplete(t.id);
            return (
              <motion.div
                key={t.id}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className={featured[t.id] ? "md:col-span-4" : "md:col-span-2"}
              >
                <Link
                  href={t.href}
                  className={`group relative flex h-full min-h-[180px] flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent ${
                    featured[t.id] ? "bg-accent-soft" : "bg-surface"
                  } ${done ? "border-accent/50" : "border-border"}`}
                >
                  {done && (
                    <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-on">
                      ✓ Done
                    </span>
                  )}
                  <div className="font-jp text-4xl font-medium tracking-wide text-ink transition-colors duration-200 group-hover:text-accent sm:text-5xl">
                    {glyphStrip[t.id]}
                  </div>
                  <div className="relative mt-6">
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-lg font-semibold text-ink">{t.label}</h3>
                      <span className="font-jp text-sm text-ink-muted">{t.jp}</span>
                    </div>
                    <p className="mt-1 max-w-sm text-sm leading-relaxed text-ink-muted">
                      {t.blurb}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent">
                      {done ? "Review" : "Begin"}
                      <span
                        aria-hidden
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── How it works (numbered steps, distinct layout family) ── */}
      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto max-w-5xl px-4 py-20">
          <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            A loop that keeps you moving.
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="bg-bg p-7">
                <div className="flex items-baseline justify-between">
                  <span className="font-jp tabular-nums text-3xl font-bold text-accent/30">
                    {s.n}
                  </span>
                  <span className="font-jp text-lg text-ink-muted">{s.jp}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="mx-auto max-w-3xl px-4 py-24 text-center">
        <p className="font-jp text-5xl text-accent/80 sm:text-6xl">はじめよう</p>
        <h2 className="mt-6 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          The first character is the hardest. Let&apos;s get past it together.
        </h2>
        <div className="mt-8 flex justify-center">
          <Link
            href="/learn/hiragana"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-base font-semibold text-accent-on shadow-sm transition-colors duration-150 hover:bg-accent-hover"
          >
            Start with Hiragana
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}

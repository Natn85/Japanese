"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";

const tracks = [
  {
    href: "/learn/hiragana",
    en: "Hiragana",
    jp: "ひらがな",
    glyphs: "あ い う え お",
    desc: "The foundational phonetic alphabet. Every learner starts here.",
    featured: true,
  },
  {
    href: "/learn/katakana",
    en: "Katakana",
    jp: "カタカナ",
    glyphs: "ア イ ウ",
    desc: "For loanwords, names, and emphasis.",
    featured: false,
  },
  {
    href: "/learn/kanji",
    en: "Kanji",
    jp: "漢字",
    glyphs: "日 本 語",
    desc: "Meaning-rich characters, learned a handful at a time.",
    featured: false,
  },
  {
    href: "/learn/grammar",
    en: "Grammar",
    jp: "文法",
    glyphs: "は を に",
    desc: "Particles, verbs, and the flow of a sentence.",
    featured: true,
  },
];

// Decorative kana that drift slowly behind the hero. Purely atmospheric.
const floaters = [
  { ch: "あ", top: "12%", left: "8%", size: "clamp(3rem,9vw,7rem)", dur: "9s", rot: "-8deg" },
  { ch: "ね", top: "22%", right: "10%", size: "clamp(3.5rem,10vw,8rem)", dur: "11s", rot: "6deg" },
  { ch: "こ", top: "62%", left: "14%", size: "clamp(2.5rem,7vw,5rem)", dur: "8s", rot: "10deg" },
  { ch: "を", top: "70%", right: "16%", size: "clamp(3rem,8vw,6rem)", dur: "12s", rot: "-5deg" },
];

export default function Home() {
  const reduce = useReducedMotion();

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
        {/* warm vermilion wash, top-anchored */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(120% 70% at 50% -10%, var(--accent-soft), transparent 60%)",
          }}
        />
        {/* drifting kana — desktop only, kept out of the central text column */}
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
          className="mx-auto flex min-h-[88dvh] max-w-3xl flex-col items-center justify-center px-4 text-center"
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
                Start with Hiragana
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

      {/* ── Learning paths (asymmetric bento) ── */}
      <section id="paths" className="mx-auto max-w-5xl scroll-mt-20 px-4 pb-28">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Four paths, one foundation.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-muted">
            Work through them in order or jump to what you need. Each path is a
            self-contained module you can finish and feel.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
          {tracks.map((t, i) => (
            <motion.div
              key={t.href}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className={t.featured ? "md:col-span-4" : "md:col-span-2"}
            >
              <Link
                href={t.href}
                className={`group relative flex h-full min-h-[180px] flex-col justify-between overflow-hidden rounded-2xl border border-border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent ${
                  t.featured ? "bg-accent-soft" : "bg-surface"
                }`}
              >
                <div className="font-jp text-4xl font-medium tracking-wide text-ink transition-colors duration-200 group-hover:text-accent sm:text-5xl">
                  {t.glyphs}
                </div>
                <div className="relative mt-6">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-lg font-semibold text-ink">{t.en}</h3>
                    <span className="font-jp text-sm text-ink-muted">{t.jp}</span>
                  </div>
                  <p className="mt-1 max-w-sm text-sm leading-relaxed text-ink-muted">
                    {t.desc}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent">
                    Begin
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
          ))}
        </div>
      </section>
    </>
  );
}

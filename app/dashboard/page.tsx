"use client";

import Link from "next/link";
import { LESSONS, useProgress } from "@/lib/progress";

function ProgressRing({ pct }: { pct: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90" aria-hidden>
      <circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        strokeWidth="10"
        className="stroke-border"
      />
      <circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        className="stroke-accent transition-[stroke-dashoffset] duration-700 ease-out"
      />
    </svg>
  );
}

export default function DashboardPage() {
  const { count, total, isComplete, hydrated, reset } = useProgress();
  const pct = Math.round((count / total) * 100);
  const nextUp = LESSONS.find((l) => !isComplete(l.id));

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-4 py-12">
      {/* Header */}
      <section>
        <p className="font-jp mb-2 text-sm font-medium text-accent" lang="ja">進み具合</p>
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Your progress
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">
          Everything you mark complete lives here. It&apos;s stored on this
          device only, so there&apos;s no account and nothing to sign in to.
        </p>
      </section>

      {/* Overview card */}
      <section className="flex flex-col items-center gap-8 rounded-2xl border border-border bg-surface p-8 sm:flex-row sm:gap-10">
        <div className="relative grid place-items-center">
          <ProgressRing pct={hydrated ? pct : 0} />
          <div className="absolute text-center">
            <div className="font-jp tabular-nums text-3xl font-bold text-ink">
              {hydrated ? `${pct}%` : "··"}
            </div>
            <div className="text-xs text-ink-muted">
              {hydrated ? `${count} of ${total}` : "loading"}
            </div>
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left">
          {!hydrated ? (
            <p className="text-ink-muted">Loading your progress…</p>
          ) : nextUp ? (
            <>
              <h2 className="text-xl font-semibold text-ink">
                {count === 0 ? "Ready when you are." : "Nice momentum."}
              </h2>
              <p className="mt-2 text-ink-muted">
                {count === 0
                  ? "Your next step is the foundation everything else builds on."
                  : `You've finished ${count} module${count > 1 ? "s" : ""}. Keep the streak going.`}
              </p>
              <Link
                href={nextUp.href}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-base font-semibold text-accent-on transition-colors hover:bg-accent-hover"
              >
                <span className="font-jp" lang="ja">{nextUp.glyph}</span>
                Continue with {nextUp.label}
                <span aria-hidden>→</span>
              </Link>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-ink">
                You&apos;ve cleared every module. 🎌
              </h2>
              <p className="mt-2 text-ink-muted">
                That&apos;s the whole foundation. Drill it in the flashcards, or
                revisit anything that still feels shaky.
              </p>
              <Link
                href="/flashcards"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-base font-semibold text-accent-on transition-colors hover:bg-accent-hover"
              >
                Practice with flashcards
                <span aria-hidden>→</span>
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Module list */}
      <section>
        <h2 className="mb-5 text-lg font-semibold text-ink">Modules</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {LESSONS.map((l) => {
            const done = hydrated && isComplete(l.id);
            return (
              <li key={l.id}>
                <Link
                  href={l.href}
                  className={`group flex items-center gap-4 rounded-xl border bg-surface p-4 transition-all duration-150 hover:-translate-y-px hover:border-accent ${
                    done ? "border-accent/50" : "border-border"
                  }`}
                >
                  <span
                    className={`font-jp grid h-14 w-14 shrink-0 place-items-center rounded-xl text-2xl font-bold ${
                      done
                        ? "bg-accent text-accent-on"
                        : "bg-surface-2 text-ink-muted group-hover:text-accent"
                    }`}
                    lang="ja"
                  >
                    {l.glyph}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-ink">{l.label}</h3>
                      <span className="font-jp text-sm text-ink-muted" lang="ja">{l.jp}</span>
                    </div>
                    <p className="mt-0.5 truncate text-sm text-ink-muted">
                      {done ? "Completed · tap to review" : l.blurb}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 text-sm font-medium ${
                      done ? "text-accent" : "text-ink-muted"
                    }`}
                  >
                    {done ? "✓" : l.estimate}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Reset */}
      {hydrated && count > 0 && (
        <section className="border-t border-border pt-6">
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Reset all progress on this device? This can't be undone.",
                )
              ) {
                reset();
              }
            }}
            className="text-sm text-ink-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            Reset progress
          </button>
        </section>
      )}
    </div>
  );
}

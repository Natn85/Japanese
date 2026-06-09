import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

// 迷子 (maigo) = "lost child" — the friendly Japanese word for being lost.
export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70dvh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      <p aria-hidden className="font-jp select-none text-7xl text-accent/25 sm:text-8xl" lang="ja">
        迷子
      </p>
      <p className="mt-4 text-sm font-medium uppercase tracking-wider text-ink-muted">
        404 · Page not found
      </p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        Looks like we&apos;ve wandered off the path.
      </h1>
      <p className="mt-3 max-w-md text-base leading-relaxed text-ink-muted">
        <span className="font-jp text-ink" lang="ja">迷子</span> (maigo) means
        &ldquo;lost child&rdquo;. It happens to every learner. The way back is
        easy:
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-base font-semibold text-accent-on shadow-sm transition-colors duration-150 hover:bg-accent-hover"
        >
          Back to home
          <span aria-hidden>→</span>
        </Link>
        <Link
          href="/dashboard"
          className="rounded-xl px-5 py-3 text-base font-medium text-ink-muted transition-colors duration-150 hover:text-ink"
        >
          See your progress
        </Link>
      </div>
    </div>
  );
}

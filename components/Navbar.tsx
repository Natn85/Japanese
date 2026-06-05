"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useProgress } from "@/lib/progress";

const learnLinks = [
  { label: "Hiragana", href: "/learn/hiragana" },
  { label: "Katakana", href: "/learn/katakana" },
  { label: "Kanji", href: "/learn/kanji" },
  { label: "Grammar", href: "/learn/grammar" },
  { label: "Flashcards", href: "/flashcards" },
  { label: "Pronounce", href: "/pronounce" },
  { label: "Community", href: "/community" },
];

function Wordmark() {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="Japanara home">
      <span className="font-jp grid h-8 w-8 place-items-center rounded-lg bg-accent text-lg font-bold leading-none text-accent-on transition-transform duration-200 group-hover:-rotate-6">
        な
      </span>
      <span className="text-lg font-bold tracking-tight text-ink">
        Japan<span className="text-accent">ara</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { count, total, hydrated } = useProgress();

  const linkClass = (href: string) =>
    `rounded-lg px-3 py-1.5 text-sm transition-colors ${
      pathname === href
        ? "bg-surface-2 font-medium text-ink"
        : "text-ink-muted hover:bg-surface hover:text-ink"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Wordmark />

        {/* Desktop links */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {learnLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className={linkClass(l.href)}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Dashboard pill (desktop) — the personal progress hub, set apart */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/dashboard"
            aria-current={pathname === "/dashboard" ? "page" : undefined}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
              pathname === "/dashboard"
                ? "border-accent bg-accent-soft text-accent"
                : "border-border text-ink hover:border-accent hover:text-accent"
            }`}
          >
            Dashboard
            {hydrated && (
              <span className="font-jp tabular-nums rounded-md bg-accent/15 px-1.5 py-0.5 text-xs text-accent">
                {count}/{total}
              </span>
            )}
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1 rounded-lg p-3 text-ink-muted transition-colors hover:text-ink lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span className="block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="animate-menu-in border-t border-border bg-bg px-4 pb-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1 pt-2">
            {[...learnLinks, { label: "Dashboard", href: "/dashboard" }].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === l.href ? "page" : undefined}
                  className={`block rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    pathname === l.href
                      ? "bg-surface-2 font-medium text-ink"
                      : "text-ink-muted hover:bg-surface hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

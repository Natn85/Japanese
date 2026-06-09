"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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

function CustomizeButton({ active }: { active: boolean }) {
  return (
    <Link
      href="/customize"
      aria-current={active ? "page" : undefined}
      aria-label="Customize theme"
      title="Customize theme"
      className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border transition-colors ${
        active
          ? "border-nav-accent bg-nav-accent-soft text-nav-accent"
          : "border-nav-border text-nav-ink-muted hover:border-nav-accent hover:text-nav-accent"
      }`}
    >
      {/* Pencil — edit/customize */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
      </svg>
    </Link>
  );
}

function Wordmark() {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="Japanara home">
      {/* White tile, red Japanese sign — the white + vermilion brand lockup. */}
      <span
        className="font-jp grid h-8 w-8 place-items-center rounded-lg bg-white text-lg font-bold leading-none text-nav-accent ring-1 ring-nav-accent/25 transition-transform duration-200 group-hover:-rotate-6"
        lang="ja"
        aria-hidden
      >
        な
      </span>
      <span className="text-lg font-bold tracking-tight text-nav-ink">
        Japan<span className="text-nav-accent">ara</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { count, total, hydrated } = useProgress();

  // Escape dismisses the mobile menu, matching every other disclosure.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = (href: string) =>
    `rounded-lg px-3 py-1.5 text-sm transition-colors ${
      pathname === href
        ? "bg-nav-surface-2 font-medium text-nav-ink"
        : "text-nav-ink-muted hover:bg-nav-surface hover:text-nav-ink"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-nav-border bg-nav-bg/80 backdrop-blur-md">
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

        {/* Right cluster: customize (always), dashboard (desktop), hamburger (mobile) */}
        <div className="flex items-center gap-3">
          <CustomizeButton active={pathname === "/customize"} />

          {/* Dashboard pill (desktop) — the personal progress hub, set apart */}
          <Link
            href="/dashboard"
            aria-current={pathname === "/dashboard" ? "page" : undefined}
            className={`hidden items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors lg:inline-flex ${
              pathname === "/dashboard"
                ? "border-nav-accent bg-nav-accent-soft text-nav-accent"
                : "border-nav-border text-nav-ink hover:border-nav-accent hover:text-nav-accent"
            }`}
          >
            Dashboard
            {hydrated && (
              <span className="font-jp tabular-nums rounded-md bg-nav-accent/15 px-1.5 py-0.5 text-xs text-nav-accent">
                {count}/{total}
              </span>
            )}
          </Link>

          {/* Hamburger */}
          <button
            className="flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1 rounded-lg p-3 text-nav-ink-muted transition-colors hover:text-nav-ink lg:hidden"
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
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="animate-menu-in border-t border-nav-border bg-nav-bg px-4 pb-4 lg:hidden"
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
                      ? "bg-nav-surface-2 font-medium text-nav-ink"
                      : "text-nav-ink-muted hover:bg-nav-surface hover:text-nav-ink"
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

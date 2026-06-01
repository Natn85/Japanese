"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "Hiragana", href: "/learn/hiragana" },
  { label: "Katakana", href: "/learn/katakana" },
  { label: "Kanji", href: "/learn/kanji" },
  { label: "Grammar", href: "/learn/grammar" },
  { label: "Flashcards", href: "/flashcards" },
  { label: "Community", href: "/community" },
  { label: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-ink"
        >
          <span className="font-jp">日本語</span>
          <span className="text-accent">Hub</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const isActive = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "bg-surface-2 font-medium text-ink"
                      : "text-ink-muted hover:bg-surface hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Hamburger */}
        <button
          className="flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1 rounded-lg p-3 text-ink-muted transition-colors hover:text-ink md:hidden"
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
          className="animate-menu-in border-t border-border bg-bg px-4 pb-4 md:hidden"
        >
          <ul className="flex flex-col gap-1 pt-2">
            {links.map((l) => {
              const isActive = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-surface-2 font-medium text-ink"
                        : "text-ink-muted hover:bg-surface hover:text-ink"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}

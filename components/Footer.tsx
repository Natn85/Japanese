import Link from "next/link";

const columns = [
  {
    title: "Learn",
    links: [
      { label: "Hiragana", href: "/learn/hiragana" },
      { label: "Katakana", href: "/learn/katakana" },
      { label: "Kanji", href: "/learn/kanji" },
      { label: "Grammar", href: "/learn/grammar" },
    ],
  },
  {
    title: "Practice",
    links: [
      { label: "Flashcards", href: "/flashcards" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Community", href: "/community" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 md:grid-cols-4">
        {/* Brand */}
        <div className="sm:col-span-2 md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="font-jp grid h-8 w-8 place-items-center rounded-lg bg-accent text-lg font-bold leading-none text-accent-on">
              な
            </span>
            <span className="text-lg font-bold tracking-tight text-ink">
              Japan<span className="text-accent">ara</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
            A calm, structured way to learn Japanese, one character at a time.
            Free to use, no account required.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink-muted transition-colors hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-ink-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Japanara</p>
          <p className="font-jp">日本語を、一文字ずつ。</p>
        </div>
      </div>
    </footer>
  );
}

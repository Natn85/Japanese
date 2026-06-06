"use client";

/*
  Live previews for the /customize page. Each one mirrors a real Japanara
  surface and is wired entirely to the theme CSS variables, so it recolors
  the instant a learner picks a new value. No props drive the color: the
  variables on <html> do the work. `pulseKey` only changes its identity when
  a color in that group changes, which replays the small pop on the hero
  glyph so the change is felt, not just seen.
*/

/* ── Navigation bar ── */
export function NavPreview({ pulseKey }: { pulseKey: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-nav-border bg-nav-bg px-3 py-2.5">
      <div className="flex items-center gap-2">
        <span
          key={pulseKey}
          className="font-jp animate-swatch-pop grid h-7 w-7 place-items-center rounded-lg bg-white text-base font-bold leading-none text-nav-accent ring-1 ring-nav-accent/25"
        >
          な
        </span>
        <span className="text-sm font-bold tracking-tight text-nav-ink">
          Japan<span className="text-nav-accent">ara</span>
        </span>
      </div>
      <div className="hidden items-center gap-1 text-[11px] sm:flex">
        <span className="rounded-md px-2 py-1 text-nav-ink-muted">Learn</span>
        <span className="rounded-md bg-nav-surface-2 px-2 py-1 font-medium text-nav-ink">Kana</span>
        <span className="rounded-md border border-nav-accent bg-nav-accent-soft px-2 py-1 font-medium text-nav-accent">
          Dashboard
        </span>
      </div>
    </div>
  );
}

/* ── Whole site (base palette) ── */
export function SitePreview({ pulseKey }: { pulseKey: string }) {
  return (
    <div className="rounded-xl border border-border bg-bg p-3">
      <div className="rounded-lg border border-border bg-surface p-3">
        <div className="flex items-center justify-between gap-2">
          <p className="font-jp text-sm font-semibold text-ink">
            <span className="text-ink-muted">あ</span> Hiragana
          </p>
          <span
            key={pulseKey}
            className="animate-swatch-pop inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-on"
          >
            Done
          </span>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-ink-muted">
          The 46 phonetic characters every learner starts with.
        </p>
        <div className="mt-2.5 flex items-center gap-2">
          <span className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-on">
            Begin
          </span>
          <span className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-ink">
            Review
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Main page (hero) ── */
export function PagePreview({ pulseKey }: { pulseKey: string }) {
  return (
    <div className="relative isolate overflow-hidden rounded-xl border border-border bg-page-bg px-4 py-5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(110% 70% at 50% -20%, var(--page-accent-soft), transparent 60%)",
        }}
      />
      <span
        aria-hidden
        className="font-jp animate-kana-drift pointer-events-none absolute -right-1 top-1 -z-10 select-none text-5xl text-page-accent/20"
        style={{ ["--k-dur" as string]: "10s" }}
      >
        ね
      </span>
      <p
        key={pulseKey}
        className="font-jp animate-swatch-pop inline-block origin-left text-xs font-medium text-page-accent"
      >
        日本語を学ぼう
      </p>
      <p className="mt-1 text-sm font-bold leading-snug text-ink">
        Read Japanese, one character at a time.
      </p>
      <span className="mt-2.5 inline-flex items-center gap-1 rounded-lg bg-page-accent px-3 py-1.5 text-xs font-semibold text-page-accent-on">
        Start
        <span aria-hidden>{"→"}</span>
      </span>
    </div>
  );
}

"use client";

import { useState } from "react";
import ColorField from "@/components/ColorField";
import { NavPreview, PagePreview, SitePreview } from "@/components/ThemePreview";
import { normalizeHex, useTheme, type ThemeValues } from "@/lib/theme";

/*
  Theme customizer. Every control writes to the shared theme store
  (lib/theme.ts), which applies the change to <html> live and saves it to
  the learner's device. Three surfaces can be themed independently, and each
  one carries a live preview that mirrors the real thing, so a learner sees
  exactly what a color does the moment they pick it.
*/

type PreviewKind = "site" | "nav" | "page";

interface TokenSpec {
  key: string;
  label: string;
  description?: string;
  /** Default color shown when the token has not been customized (dark theme). */
  default: string;
}

interface Section {
  title: string;
  jp: string;
  blurb: string;
  preview: PreviewKind;
  tokens: TokenSpec[];
}

const SECTIONS: Section[] = [
  {
    title: "Whole site",
    jp: "全体",
    blurb: "The base palette every page inherits.",
    preview: "site",
    tokens: [
      { key: "bg", label: "Background", description: "The page backdrop.", default: "#181410" },
      { key: "surface", label: "Cards & panels", default: "#221d17" },
      { key: "surface-2", label: "Raised surfaces", default: "#2c2620" },
      { key: "border", label: "Borders & dividers", default: "#3a322a" },
      { key: "ink", label: "Text", default: "#f4ece0" },
      { key: "muted", label: "Muted text", default: "#b3a695" },
      {
        key: "accent",
        label: "Accent",
        description: "Buttons, links, highlights. Text on it adapts automatically.",
        default: "#e2533d",
      },
    ],
  },
  {
    title: "Navigation bar",
    jp: "ナビ",
    blurb: "The top bar and logo, styled on their own.",
    preview: "nav",
    tokens: [
      { key: "nav-bg", label: "Nav background", default: "#181410" },
      { key: "nav-ink", label: "Nav text", default: "#f4ece0" },
      {
        key: "nav-accent",
        label: "Logo & accent",
        description: "Colors the な sign, the wordmark, and active links.",
        default: "#e2533d",
      },
    ],
  },
  {
    title: "Main page",
    jp: "ホーム",
    blurb: "The home hero and cards, independent of the rest.",
    preview: "page",
    tokens: [
      { key: "page-bg", label: "Page background", default: "#181410" },
      {
        key: "page-accent",
        label: "Page accent",
        description: "Hero text, floating kana, card highlights, and CTAs.",
        default: "#e2533d",
      },
    ],
  },
];

interface Preset {
  name: string;
  swatch: string;
  /** null means "reset to the built-in defaults". */
  values: ThemeValues | null;
}

const PRESETS: Preset[] = [
  { name: "Vermilion", swatch: "#e2533d", values: null },
  {
    name: "Sakura",
    swatch: "#ec4899",
    values: {
      bg: "#1b1418", surface: "#241a20", "surface-2": "#2e2129", border: "#41303a",
      accent: "#ec4899", "nav-bg": "#1b1418", "nav-accent": "#ec4899",
      "page-bg": "#1b1418", "page-accent": "#ec4899",
    },
  },
  {
    name: "Matcha",
    swatch: "#3fae6a",
    values: {
      bg: "#13160f", surface: "#1b2016", "surface-2": "#252b1e", border: "#36402c",
      accent: "#3fae6a", "nav-bg": "#13160f", "nav-accent": "#3fae6a",
      "page-bg": "#13160f", "page-accent": "#3fae6a",
    },
  },
  {
    name: "Ocean",
    swatch: "#3b82f6",
    values: {
      bg: "#0f141c", surface: "#161d28", "surface-2": "#1f2835", border: "#2c3a4d",
      accent: "#3b82f6", "nav-bg": "#0f141c", "nav-accent": "#3b82f6",
      "page-bg": "#0f141c", "page-accent": "#3b82f6",
    },
  },
  {
    name: "Mono",
    swatch: "#e8e8e8",
    values: {
      bg: "#141414", surface: "#1d1d1d", "surface-2": "#272727", border: "#383838",
      ink: "#ededed", muted: "#a0a0a0", accent: "#e8e8e8",
      "nav-bg": "#141414", "nav-accent": "#e8e8e8",
      "page-bg": "#141414", "page-accent": "#e8e8e8",
    },
  },
];

function Preview({ kind, pulseKey }: { kind: PreviewKind; pulseKey: string }) {
  if (kind === "nav") return <NavPreview pulseKey={pulseKey} />;
  if (kind === "page") return <PagePreview pulseKey={pulseKey} />;
  return <SitePreview pulseKey={pulseKey} />;
}

export default function CustomizePage() {
  const { values, hydrated, setColor, resetColor, applyPreset, resetAll } = useTheme();
  const [confirmReset, setConfirmReset] = useState(false);

  const customCount = Object.keys(values).length;

  // Which preset (if any) the current state matches, so we can highlight it.
  const activePreset = PRESETS.find((p) => {
    if (p.values === null) return customCount === 0;
    const keys = Object.keys(p.values);
    if (keys.length !== customCount) return false;
    return keys.every(
      (k) => normalizeHex(p.values![k]) === normalizeHex(values[k] ?? ""),
    );
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      {/* Header */}
      <div className="mb-10">
        <p className="font-jp mb-3 text-sm font-medium tracking-wide text-accent">
          カスタマイズ
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Make it yours.
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-muted">
          Tap a swatch, drag the color wheel, lift a color off your screen, or
          paste a hex code. The previews update as you go, and your theme saves
          to this device. No account needed.
        </p>
      </div>

      {/* Presets */}
      <section className="mb-10 rounded-2xl border border-border bg-surface p-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-ink">Quick themes</h2>
            <p className="mt-0.5 text-xs text-ink-muted">
              A starting point you can then fine-tune below.
            </p>
          </div>
          {hydrated && customCount > 0 && (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="shrink-0 text-xs font-medium text-ink-muted transition-colors hover:text-accent"
            >
              Reset everything
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => {
            const active = hydrated && activePreset?.name === p.name;
            return (
              <button
                key={p.name}
                type="button"
                onClick={() => (p.values === null ? resetAll() : applyPreset(p.values))}
                aria-pressed={active}
                className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-all duration-150 hover:-translate-y-px active:translate-y-0 active:scale-[0.97] ${
                  active
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-border text-ink hover:border-accent"
                }`}
              >
                <span
                  className="h-4 w-4 rounded-full ring-1 ring-inset ring-black/20"
                  style={{ backgroundColor: p.swatch }}
                />
                {p.name}
              </button>
            );
          })}
        </div>

        {confirmReset && (
          <div className="animate-menu-in mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-accent/40 bg-accent-soft px-4 py-3">
            <p className="text-sm text-ink">
              Reset all {customCount} customized color{customCount === 1 ? "" : "s"} to
              the Japanara defaults?
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-ink-muted hover:text-ink"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  resetAll();
                  setConfirmReset(false);
                }}
                className="rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-on hover:bg-accent-hover active:scale-95"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Sections — each pairs a live preview with its controls */}
      <div className="space-y-6">
        {SECTIONS.map((section) => {
          // Identity changes only when a color in THIS group changes, which
          // replays the pop on the preview's hero glyph.
          const pulseKey = section.tokens.map((t) => values[t.key] ?? "_").join("|");
          return (
            <section
              key={section.title}
              className="rounded-2xl border border-border bg-surface"
            >
              <div className="border-b border-border p-5">
                <div className="mb-4 flex items-baseline gap-3">
                  <span className="font-jp text-xl text-accent">{section.jp}</span>
                  <div>
                    <h2 className="text-base font-semibold text-ink">{section.title}</h2>
                    <p className="mt-0.5 text-xs text-ink-muted">{section.blurb}</p>
                  </div>
                </div>
                <Preview kind={section.preview} pulseKey={hydrated ? pulseKey : "_"} />
              </div>

              <div className="divide-y divide-border px-5 py-1">
                {section.tokens.map((t) => {
                  const isCustom = hydrated && t.key in values;
                  const value = (isCustom ? values[t.key] : t.default).toLowerCase();
                  return (
                    <ColorField
                      key={t.key}
                      label={t.label}
                      description={t.description}
                      value={value}
                      isCustom={!!isCustom}
                      onChange={(hex) => setColor(t.key, hex)}
                      onReset={() => resetColor(t.key)}
                    />
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <p className="mt-8 text-center text-xs text-ink-muted">
        Your theme lives in this browser only. Clearing site data resets it.
      </p>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { isValidHex, normalizeHex } from "@/lib/theme";

/* A tasteful spread of swatches offered as quick-pick boxes. */
export const PRESET_SWATCHES = [
  "#e2533d", // vermilion (brand)
  "#c9442f", // deep vermilion
  "#ef6a55", // light vermilion
  "#e9b84a", // gold
  "#3fae6a", // matcha
  "#2f9e8f", // teal
  "#3b82f6", // blue
  "#6366f1", // indigo
  "#a855f7", // violet
  "#ec4899", // sakura pink
  "#f4ece0", // washi white
  "#b3a695", // warm grey
  "#221d17", // sumi surface
  "#181410", // sumi ink
];

interface ColorFieldProps {
  label: string;
  description?: string;
  /** Effective current color (override if set, otherwise the default). */
  value: string;
  /** Whether this color is currently customized (vs. using the default). */
  isCustom: boolean;
  onChange: (hex: string) => void;
  onReset: () => void;
}

export default function ColorField({
  label,
  description,
  value,
  isCustom,
  onChange,
  onReset,
}: ColorFieldProps) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(value);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Keep the hex text box in sync when the value changes from outside.
  useEffect(() => setText(value), [value]);

  // Close the popover on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const commitText = (raw: string) => {
    const norm = normalizeHex(raw);
    if (norm) onChange(norm);
    else setText(value); // revert invalid input
  };

  return (
    <div ref={wrapRef} className="relative flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-ink">{label}</span>
          {isCustom && (
            <span className="rounded-full bg-accent-soft px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
              Custom
            </span>
          )}
        </div>
        {description && (
          <p className="mt-0.5 text-xs leading-relaxed text-ink-muted">{description}</p>
        )}
      </div>

      {/* Trigger: swatch + hex */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={`Edit ${label} color`}
        className="flex shrink-0 items-center gap-2 rounded-lg border border-border bg-surface px-2 py-1.5 transition-colors hover:border-accent"
      >
        <span
          className="h-6 w-6 rounded-md ring-1 ring-inset ring-black/10"
          style={{ backgroundColor: value }}
        />
        <span className="font-jp text-xs uppercase tabular-nums text-ink-muted">
          {value}
        </span>
      </button>

      {/* Popover */}
      {open && (
        <div className="absolute right-0 top-full z-20 mt-2 w-72 rounded-xl border border-border bg-surface p-3 shadow-xl shadow-black/30">
          {/* Preset boxes */}
          <p className="mb-2 text-xs font-medium text-ink-muted">Presets</p>
          <div className="grid grid-cols-7 gap-1.5">
            {PRESET_SWATCHES.map((c) => {
              const active = normalizeHex(c) === normalizeHex(value);
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => onChange(c)}
                  aria-label={c}
                  title={c}
                  className={`h-7 w-7 rounded-md ring-1 ring-inset ring-black/15 transition-transform hover:scale-110 ${
                    active ? "outline outline-2 outline-offset-2 outline-accent" : ""
                  }`}
                  style={{ backgroundColor: c }}
                />
              );
            })}
          </div>

          {/* Exact color: native picker + hex input */}
          <p className="mb-2 mt-4 text-xs font-medium text-ink-muted">Exact color</p>
          <div className="flex items-center gap-2">
            <label className="relative h-9 w-9 shrink-0 cursor-pointer overflow-hidden rounded-lg ring-1 ring-inset ring-border">
              <span
                className="absolute inset-0"
                style={{ backgroundColor: value }}
                aria-hidden
              />
              <input
                type="color"
                value={normalizeHex(value) ?? "#000000"}
                onChange={(e) => onChange(e.target.value)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                aria-label="Color picker"
              />
            </label>
            <div className="flex flex-1 items-center rounded-lg border border-border bg-bg px-2">
              <span className="text-sm text-ink-muted">#</span>
              <input
                type="text"
                value={text.replace(/^#/, "")}
                spellCheck={false}
                maxLength={6}
                onChange={(e) => setText(e.target.value)}
                onBlur={() => commitText(text)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    commitText(text);
                    (e.target as HTMLInputElement).blur();
                  }
                }}
                placeholder="e2533d"
                className={`font-jp w-full bg-transparent py-1.5 text-sm uppercase tabular-nums text-ink outline-none placeholder:text-ink-muted/50 ${
                  isValidHex(text) ? "" : "text-accent"
                }`}
                aria-label="Hex color code"
              />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <button
              type="button"
              onClick={onReset}
              disabled={!isCustom}
              className="text-xs font-medium text-ink-muted transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
            >
              Reset to default
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md bg-accent px-3 py-1 text-xs font-semibold text-accent-on transition-colors hover:bg-accent-hover"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

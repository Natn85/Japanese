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

function CheckIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden>
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

function DropperIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="m2 22 1-1h3l9-9" />
      <path d="M3 21v-3l9-9" />
      <path d="m15 6 3.5-3.5a2.12 2.12 0 0 1 3 3L18 9l.5.5a2.12 2.12 0 0 1 0 3 2.12 2.12 0 0 1-3 0l-6-6a2.12 2.12 0 0 1 0-3 2.12 2.12 0 0 1 3 0Z" />
    </svg>
  );
}

function AlertIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4.5M12 16h.01" />
    </svg>
  );
}

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
  const [hasDropper, setHasDropper] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Keep the hex text box in sync when the value changes from outside.
  useEffect(() => setText(value), [value]);

  useEffect(() => {
    setHasDropper(typeof window !== "undefined" && "EyeDropper" in window);
  }, []);

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

  const pickFromScreen = async () => {
    try {
      // EyeDropper is feature-detected above; the cast keeps TS happy.
      const ed = new (window as unknown as { EyeDropper: new () => { open: () => Promise<{ sRGBHex: string }> } }).EyeDropper();
      const res = await ed.open();
      onChange(res.sRGBHex);
    } catch {
      /* user dismissed the picker — nothing to do */
    }
  };

  const textValid = text.trim() === "" || isValidHex(text);

  return (
    <div ref={wrapRef} className="relative flex items-center justify-between gap-4 py-2.5">
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

      {/* Trigger: the color itself is the affordance. */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={`Edit ${label} color, currently ${value}`}
        className="group/sw flex shrink-0 items-center gap-2.5 rounded-xl border border-border bg-surface-2 py-1.5 pl-1.5 pr-3 transition-all duration-150 hover:-translate-y-px hover:border-accent active:translate-y-0 active:scale-[0.98]"
      >
        <span
          key={value}
          className="animate-swatch-pop h-8 w-8 rounded-lg ring-1 ring-inset ring-black/15 transition-transform duration-150 group-hover/sw:scale-105"
          style={{ backgroundColor: value }}
        />
        <span className="font-jp text-xs uppercase tabular-nums text-ink-muted">
          {value}
        </span>
      </button>

      {/* Popover */}
      {open && (
        <div className="animate-menu-in absolute right-0 top-full z-30 mt-2 w-72 rounded-2xl border border-border bg-surface p-3 shadow-2xl shadow-black/40">
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
                  aria-pressed={active}
                  title={c}
                  className={`relative grid h-8 w-8 place-items-center rounded-lg ring-1 ring-inset ring-black/15 transition-transform duration-100 hover:scale-110 active:scale-90 ${
                    active ? "outline outline-2 outline-offset-2 outline-accent" : ""
                  }`}
                  style={{ backgroundColor: c }}
                >
                  {active && (
                    <CheckIcon
                      className="h-4 w-4 drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]"
                      style={{
                        // contrast the check against light swatches
                        color: ["#f4ece0", "#e9b84a", "#b3a695"].includes(c) ? "#181410" : "#fff",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <p className="mb-2 mt-4 text-xs font-medium text-ink-muted">Exact color</p>
          <div className="flex items-center gap-2">
            <label className="relative h-9 w-9 shrink-0 cursor-pointer overflow-hidden rounded-lg ring-1 ring-inset ring-border">
              <span className="absolute inset-0" style={{ backgroundColor: value }} aria-hidden />
              <input
                type="color"
                value={normalizeHex(value) ?? "#000000"}
                onChange={(e) => onChange(e.target.value)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                aria-label="Color wheel"
              />
            </label>
            <div
              className={`flex flex-1 items-center rounded-lg border bg-bg px-2 transition-colors ${
                textValid ? "border-border focus-within:border-accent" : "border-accent"
              }`}
            >
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
                className="font-jp w-full bg-transparent py-1.5 text-sm uppercase tabular-nums text-ink outline-none placeholder:text-ink-muted/50"
                aria-label="Hex color code"
                aria-invalid={!textValid}
              />
              {hasDropper && (
                <button
                  type="button"
                  onClick={pickFromScreen}
                  aria-label="Pick a color from the screen"
                  title="Pick from screen"
                  className="-mr-1 grid h-7 w-7 shrink-0 place-items-center rounded-md text-ink-muted transition-colors hover:bg-surface-2 hover:text-accent"
                >
                  <DropperIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          {!textValid && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-accent">
              <AlertIcon className="h-3.5 w-3.5 shrink-0" />
              Use 3 or 6 hex digits, like e2533d.
            </p>
          )}

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
              className="rounded-md bg-accent px-3 py-1 text-xs font-semibold text-accent-on transition-colors hover:bg-accent-hover active:scale-95"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

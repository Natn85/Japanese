"use client";

import { useCallback, useEffect, useState } from "react";

/*
  Client-side theme store, persisted to localStorage. This powers the
  /customize page: every color the learner picks is written here as a hex
  string keyed by its CSS variable name (without the leading "--"), then
  applied to <html> as a space-separated RGB channel string so Tailwind's
  alpha modifiers keep working (bg-accent/80, text-nav-ink, ...).

  No backend, no accounts — the look of the site lives on the learner's
  own device, just like their lesson progress (see lib/progress.ts).
*/

export const THEME_STORAGE_KEY = "japanara:theme:v1";
export const THEME_EVENT = "japanara:theme";

/** CSS vars that get readable companion tokens (-hover, -on, -soft) derived. */
const ACCENT_VARS = new Set(["accent", "nav-accent", "page-accent"]);

export type ThemeValues = Record<string, string>;

/* ── color math ─────────────────────────────────────────────── */

export function isValidHex(hex: string): boolean {
  return /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex.trim());
}

export function normalizeHex(hex: string): string | null {
  let h = hex.trim().replace(/^#/, "");
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return "#" + h.toLowerCase();
}

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.trim().replace(/^#/, "");
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function rgbToHex([r, g, b]: [number, number, number]): string {
  const to = (c: number) => c.toString(16).padStart(2, "0");
  return "#" + to(r) + to(g) + to(b);
}

/** Relative luminance, roughly. Used to pick black/white text on a fill. */
function luminance([r, g, b]: [number, number, number]): number {
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

/** Lighten toward white — matches the brighter hover used on the dark theme. */
function hover(rgb: [number, number, number]): string {
  return rgb.map((c) => Math.round(c + (255 - c) * 0.14)).join(" ");
}

/* ── apply / clear on the document ──────────────────────────── */

/** Write one customized variable (and any derived companions) to <html>. */
function applyVar(root: HTMLElement, key: string, hex: string) {
  const rgb = hexToRgb(hex);
  const channels = rgb.join(" ");
  root.style.setProperty(`--${key}`, channels);
  if (ACCENT_VARS.has(key)) {
    root.style.setProperty(`--${key}-soft`, `rgb(${channels} / 0.14)`);
    root.style.setProperty(`--${key}-hover`, hover(rgb));
    root.style.setProperty(
      `--${key}-on`,
      luminance(rgb) > 0.6 ? "24 20 16" : "255 255 255",
    );
  }
}

/** Remove a customized variable so the CSS default takes back over. */
function clearVar(root: HTMLElement, key: string) {
  root.style.removeProperty(`--${key}`);
  if (ACCENT_VARS.has(key)) {
    root.style.removeProperty(`--${key}-soft`);
    root.style.removeProperty(`--${key}-hover`);
    root.style.removeProperty(`--${key}-on`);
  }
}

function applyAll(values: ThemeValues) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  for (const [key, hex] of Object.entries(values)) applyVar(root, key, hex);
}

/* ── storage ────────────────────────────────────────────────── */

function read(): ThemeValues {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    const out: ThemeValues = {};
    for (const [k, v] of Object.entries(parsed)) {
      if (typeof v === "string" && isValidHex(v)) {
        out[k] = normalizeHex(v) as string;
      }
    }
    return out;
  } catch {
    return {};
  }
}

function write(values: ThemeValues) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(values));
    window.dispatchEvent(new Event(THEME_EVENT));
  } catch {
    /* storage unavailable (private mode, quota) — fail quietly */
  }
}

/* ── hook ───────────────────────────────────────────────────── */

export function useTheme() {
  const [values, setValues] = useState<ThemeValues>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setValues(read());
    setHydrated(true);

    const sync = () => setValues(read());
    window.addEventListener(THEME_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(THEME_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const setColor = useCallback((key: string, hex: string) => {
    const norm = normalizeHex(hex);
    if (!norm) return;
    const next = { ...read(), [key]: norm };
    write(next);
    setValues(next);
    if (typeof document !== "undefined") applyVar(document.documentElement, key, norm);
  }, []);

  const resetColor = useCallback((key: string) => {
    const next = { ...read() };
    delete next[key];
    write(next);
    setValues(next);
    if (typeof document !== "undefined") clearVar(document.documentElement, key);
  }, []);

  const applyPreset = useCallback((preset: ThemeValues) => {
    // Wipe current customizations, then apply the preset's keys.
    const prev = read();
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      for (const key of Object.keys(prev)) clearVar(root, key);
    }
    const next: ThemeValues = {};
    for (const [k, v] of Object.entries(preset)) {
      const norm = normalizeHex(v);
      if (norm) next[k] = norm;
    }
    write(next);
    setValues(next);
    applyAll(next);
  }, []);

  const resetAll = useCallback(() => {
    const prev = read();
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      for (const key of Object.keys(prev)) clearVar(root, key);
    }
    write({});
    setValues({});
  }, []);

  return { values, hydrated, setColor, resetColor, applyPreset, resetAll };
}

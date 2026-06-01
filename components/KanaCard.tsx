"use client";

import type { HiraganaEntry } from "@/data/hiragana";

export default function KanaCard({ entry, onClick }: { entry: HiraganaEntry; onClick?: (entry: HiraganaEntry) => void }) {
  return (
    <button
      onClick={() => onClick?.(entry)}
      className="group flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-border bg-surface p-4 transition-[color,background-color,border-color,transform] duration-150 hover:-translate-y-px hover:scale-[1.03] hover:border-accent hover:bg-surface-2 active:translate-y-0 active:scale-95"
    >
      <span className="font-jp text-4xl font-bold leading-none text-ink transition-colors group-hover:text-accent">
        {entry.kana}
      </span>
      <span className="text-xs text-ink-muted transition-colors group-hover:text-ink">
        {entry.romaji}
      </span>
    </button>
  );
}

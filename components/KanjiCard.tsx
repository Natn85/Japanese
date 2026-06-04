"use client";

import type { KanjiEntry } from "@/data/kanji";

export default function KanjiCard({ entry, onClick }: { entry: KanjiEntry; onClick?: (entry: KanjiEntry) => void }) {
  return (
    <button
      onClick={() => onClick?.(entry)}
      className="group flex w-full cursor-pointer flex-col items-center gap-2 rounded-xl border border-border bg-surface p-5 text-center transition-[color,background-color,border-color,transform] duration-150 hover:-translate-y-px hover:border-accent hover:bg-surface-2 active:translate-y-0 active:scale-[0.98]"
    >
      <span className="font-jp text-5xl font-bold leading-none text-ink transition-colors group-hover:text-accent">
        {entry.kanji}
      </span>
      <span className="text-sm font-medium text-ink transition-colors">
        {entry.meaning}
      </span>
      <dl className="mt-1 flex flex-col gap-0.5 text-xs text-ink-muted">
        <div className="flex items-baseline justify-center gap-1.5">
          <dt className="text-accent/80 font-medium">On</dt>
          <dd className="font-jp">{entry.onyomi}</dd>
        </div>
        <div className="flex items-baseline justify-center gap-1.5">
          <dt className="text-accent/80 font-medium">Kun</dt>
          <dd className="font-jp">{entry.kunyomi}</dd>
        </div>
      </dl>
    </button>
  );
}

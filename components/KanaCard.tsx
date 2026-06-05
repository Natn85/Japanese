"use client";

import type { HiraganaEntry } from "@/data/hiragana";
import { speakText } from "@/lib/speech";
import SpeakerIcon from "@/components/SpeakerIcon";

export default function KanaCard({
  entry,
  onClick,
}: {
  entry: HiraganaEntry;
  onClick?: (entry: HiraganaEntry) => void;
}) {
  const handleClick = () => {
    speakText(entry.kana);
    onClick?.(entry);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={`Play pronunciation of ${entry.kana} (${entry.romaji})`}
      className="group relative flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-border bg-surface p-4 transition-[color,background-color,border-color,transform] duration-150 hover:-translate-y-px hover:scale-[1.03] hover:border-accent hover:bg-surface-2 active:translate-y-0 active:scale-95"
    >
      <SpeakerIcon className="absolute right-1.5 top-1.5 h-3.5 w-3.5 text-ink-muted opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-hover:text-accent" />
      <span className="font-jp text-4xl font-bold leading-none text-ink transition-colors group-hover:text-accent">
        {entry.kana}
      </span>
      <span className="text-xs text-ink-muted transition-colors group-hover:text-ink">
        {entry.romaji}
      </span>
    </button>
  );
}

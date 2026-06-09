"use client";

import type { KanjiEntry } from "@/data/kanji";
import { speakText } from "@/lib/speech";
import SpeakerIcon from "@/components/SpeakerIcon";

export default function KanjiCard({ entry, onClick }: { entry: KanjiEntry; onClick?: (entry: KanjiEntry) => void }) {
  const handleClick = () => {
    // Speak the kun'yomi when there is one (how the kanji reads on its own);
    // okurigana in parentheses is stripped so 大 says おお, not おおきい.
    const kun = entry.kunyomi.split("、")[0].replace(/[（(].*$/, "").trim();
    speakText(kun && kun !== "—" ? kun : entry.kanji);
    onClick?.(entry);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={`Play pronunciation of ${entry.kanji} (${entry.meaning})`}
      className="group relative flex w-full cursor-pointer flex-col items-center gap-2 rounded-xl border border-border bg-surface p-5 text-center transition-[color,background-color,border-color,transform] duration-150 hover:-translate-y-px hover:border-accent hover:bg-surface-2 active:translate-y-0 active:scale-[0.98]"
    >
      {/* Always faintly visible so touch users discover the cards speak. */}
      <SpeakerIcon className="absolute right-2 top-2 h-3.5 w-3.5 text-ink-muted opacity-40 transition-opacity duration-150 group-hover:opacity-100 group-hover:text-accent" />
      <span className="font-jp text-5xl font-bold leading-none text-ink transition-colors group-hover:text-accent" lang="ja">
        {entry.kanji}
      </span>
      <span className="text-sm font-medium text-ink transition-colors">
        {entry.meaning}
      </span>
      <dl className="mt-1 flex flex-col gap-0.5 text-xs text-ink-muted">
        <div className="flex items-baseline justify-center gap-1.5">
          <dt className="text-accent/80 font-medium">On</dt>
          <dd className="font-jp" lang="ja">{entry.onyomi}</dd>
        </div>
        <div className="flex items-baseline justify-center gap-1.5">
          <dt className="text-accent/80 font-medium">Kun</dt>
          <dd className="font-jp" lang="ja">{entry.kunyomi}</dd>
        </div>
      </dl>
    </button>
  );
}

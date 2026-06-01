"use client";

import { useState } from "react";

export default function MarkCompleteButton({ onComplete }: { onComplete?: () => void }) {
  const [done, setDone] = useState(false);

  const handleClick = () => {
    if (done) return;
    setDone(true);
    onComplete?.();
  };

  return (
    <button
      onClick={handleClick}
      aria-pressed={done}
      aria-label={done ? "Lesson marked complete" : "Mark lesson as complete"}
      className={[
        "min-w-[10rem] text-white font-semibold px-8 py-3 rounded-lg text-base",
        "transition-[background-color,transform] duration-150",
        done
          ? "bg-accent cursor-default animate-success-pulse"
          : "bg-accent hover:bg-accent-hover active:scale-95",
      ].join(" ")}
    >
      {done ? "✓ Marked complete" : "Mark as Complete"}
    </button>
  );
}

"use client";

import Link from "next/link";
import { useProgress, type LessonId } from "@/lib/progress";

/*
  Marks a lesson complete and persists it (see lib/progress).
  Re-mounting the page reflects the saved state, and the dashboard
  picks it up immediately via the shared progress event.
*/
export default function MarkCompleteButton({
  lessonId,
  onComplete,
}: {
  lessonId: LessonId;
  onComplete?: () => void;
}) {
  const { isComplete, setComplete, hydrated } = useProgress();
  const done = hydrated && isComplete(lessonId);

  const toggle = () => {
    setComplete(lessonId, !done);
    if (!done) onComplete?.();
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={toggle}
        aria-pressed={done}
        aria-label={done ? "Lesson marked complete" : "Mark lesson as complete"}
        className={[
          "min-w-[12rem] rounded-xl px-8 py-3 text-base font-semibold",
          "transition-[background-color,transform,color] duration-150 active:scale-95",
          done
            ? "border border-accent/40 bg-accent-soft text-accent animate-success-pulse"
            : "bg-accent text-accent-on hover:bg-accent-hover",
        ].join(" ")}
      >
        {done ? "✓ Completed" : "Mark as complete"}
      </button>

      {done && (
        <Link
          href="/dashboard"
          className="text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          See it on your dashboard →
        </Link>
      )}
    </div>
  );
}

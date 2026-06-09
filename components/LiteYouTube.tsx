"use client";

import { useState } from "react";

/*
  Click-to-load YouTube facade. The real embed pulls ~1MB of third-party JS,
  so until the learner actually wants the video we show only the thumbnail
  (a few KB from i.ytimg.com) with a play affordance. Clicking swaps in the
  iframe with autoplay so it still feels like one tap to watch.
*/
export default function LiteYouTube({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-surface">
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 block h-full w-full cursor-pointer"
        >
          {/* hqdefault exists for every video (maxres doesn't), and at 480px
              it's sharp enough under the dark scrim. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          {/* Scrim keeps the play button readable on bright thumbnails. */}
          <span aria-hidden className="absolute inset-0 bg-black/30 transition-colors duration-200 group-hover:bg-black/20" />
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-accent-on shadow-lg transition-transform duration-200 group-hover:scale-110 group-active:scale-95"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5.14v13.72c0 .8.87 1.3 1.56.88l10.54-6.86a1.04 1.04 0 0 0 0-1.76L9.56 4.26A1.04 1.04 0 0 0 8 5.14z" />
            </svg>
          </span>
          <span className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
            {title}
          </span>
        </button>
      )}
    </div>
  );
}

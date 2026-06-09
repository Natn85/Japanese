import type { Metadata } from "next";

// The page itself is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Flashcards",
  description:
    "Drill hiragana and katakana with shuffled flip cards. See the character, recall the sound, flip to check.",
};

export default function FlashcardsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

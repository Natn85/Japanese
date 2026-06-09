import type { Metadata } from "next";

// The page itself is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Pronounce",
  description:
    "Type any Japanese and hear it read aloud with your device's voices, at normal or slow speed.",
};

export default function PronounceLayout({ children }: { children: React.ReactNode }) {
  return children;
}

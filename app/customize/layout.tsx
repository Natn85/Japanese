import type { Metadata } from "next";

// The page itself is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Customize",
  description:
    "Make Japanara yours: recolor the whole site, the navigation bar, and the main page with live previews.",
};

export default function CustomizeLayout({ children }: { children: React.ReactNode }) {
  return children;
}

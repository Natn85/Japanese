import type { Metadata } from "next";

// The page itself is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Your Japanara progress at a glance: completed modules, what's next, and where to pick back up.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}

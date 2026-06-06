import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          2: "rgb(var(--surface-2) / <alpha-value>)",
        },
        border: "rgb(var(--border) / <alpha-value>)",
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          muted: "rgb(var(--muted) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          hover: "rgb(var(--accent-hover) / <alpha-value>)",
          soft: "var(--accent-soft)",
          on: "rgb(var(--accent-on) / <alpha-value>)",
          // kept for backwards-compat with existing learn-page markup
          light: "rgb(var(--accent-hover) / <alpha-value>)",
        },
        // Navbar-scoped tokens (themed separately on /customize)
        nav: {
          bg: "rgb(var(--nav-bg) / <alpha-value>)",
          surface: {
            DEFAULT: "rgb(var(--nav-surface) / <alpha-value>)",
            2: "rgb(var(--nav-surface-2) / <alpha-value>)",
          },
          border: "rgb(var(--nav-border) / <alpha-value>)",
          ink: {
            DEFAULT: "rgb(var(--nav-ink) / <alpha-value>)",
            muted: "rgb(var(--nav-muted) / <alpha-value>)",
          },
          accent: {
            DEFAULT: "rgb(var(--nav-accent) / <alpha-value>)",
            hover: "rgb(var(--nav-accent-hover) / <alpha-value>)",
            soft: "var(--nav-accent-soft)",
            on: "rgb(var(--nav-accent-on) / <alpha-value>)",
          },
        },
        // Main-page-scoped tokens (themed separately on /customize)
        page: {
          bg: "rgb(var(--page-bg) / <alpha-value>)",
          surface: "rgb(var(--page-surface) / <alpha-value>)",
          accent: {
            DEFAULT: "rgb(var(--page-accent) / <alpha-value>)",
            hover: "rgb(var(--page-accent-hover) / <alpha-value>)",
            soft: "var(--page-accent-soft)",
            on: "rgb(var(--page-accent-on) / <alpha-value>)",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        jp: ["var(--font-jp)"],
      },
      borderColor: {
        DEFAULT: "rgb(var(--border) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};

export default config;

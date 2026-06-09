import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Friendly geometric sans for all Latin UI. Japanese glyphs fall back to the
// high-quality native system stack defined in globals.css (--font-jp).
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Japanara: Learn Japanese, one character at a time",
    template: "%s · Japanara",
  },
  description:
    "Guided lessons in hiragana, katakana, kanji, and grammar that make every step feel doable. Free, no account required.",
};

// Applies the learner's saved color theme (see /customize) before first paint
// so a customized site never flashes the default palette. Mirrors the logic in
// lib/theme.ts; kept inline + dependency-free so it runs ahead of hydration.
const themeInitScript = `
(function(){
  try {
    var raw = localStorage.getItem("japanara:theme:v1");
    if(!raw) return;
    var o = JSON.parse(raw);
    if(!o || typeof o !== "object") return;
    var root = document.documentElement;
    var accent = {"accent":1,"nav-accent":1,"page-accent":1};
    function rgb(hex){
      var h = String(hex).replace(/^#/,"");
      if(h.length===3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
      if(!/^[0-9a-fA-F]{6}$/.test(h)) return null;
      var n = parseInt(h,16);
      return [(n>>16)&255,(n>>8)&255,n&255];
    }
    Object.keys(o).forEach(function(k){
      var c = rgb(o[k]);
      if(!c) return;
      var s = c.join(" ");
      root.style.setProperty("--"+k, s);
      if(accent[k]){
        root.style.setProperty("--"+k+"-soft","rgb("+s+" / 0.14)");
        root.style.setProperty("--"+k+"-hover", c.map(function(x){return Math.round(x+(255-x)*0.14)}).join(" "));
        var L = (0.299*c[0]+0.587*c[1]+0.114*c[2])/255;
        root.style.setProperty("--"+k+"-on", L>0.6?"24 20 16":"255 255 255");
      }
    });
  } catch(e){}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${outfit.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        {/* Keyboard users can jump straight past the nav (WCAG 2.4.1). */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-accent-on"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
import PageLoader from "@/components/PageLoader";
import { profile } from "@/lib/data";

// Note: the AI chat assistant from the brief was intentionally skipped for
// this pass (needs an OpenAI key + Supabase RAG setup) — see README.md
// under "Adding the AI chat assistant later" for how to wire it in.

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anmolanubhav.dev"),
  title: `${profile.name} — ${profile.role}`,
  description:
    "Anmol Anubhav — Full Stack Developer building AI-powered web applications. B.Tech CSE student, freelancer, and hackathon builder.",
  keywords: [
    "Anmol Anubhav",
    "Full Stack Developer",
    "AI Developer",
    "React Developer",
    "Next.js Portfolio",
    "FIEM",
  ],
  authors: [{ name: profile.name, url: profile.github }],
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: "Full Stack Developer building AI-powered web applications.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: "Full Stack Developer building AI-powered web applications.",
  },
};

// Runs before paint to avoid a light/dark flash on load.
const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (systemDark ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-body antialiased selection:bg-blue-glow/30">
        <PageLoader />
        <ScrollProgress />
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}

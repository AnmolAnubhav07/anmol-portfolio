"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/lib/data";

const links = [
  { href: "#about", label: "about" },
  { href: "#skills", label: "skills" },
  { href: "#projects", label: "projects" },
  { href: "#gallery", label: "gallery" },
  { href: "#experience", label: "experience" },
  { href: "#contact", label: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="glass mx-auto mt-3 flex max-w-5xl items-center justify-between rounded-2xl px-5 py-3 md:mt-4">
        <a
          href="#top"
          className="font-display text-base font-semibold tracking-tight text-ink"
        >
          Anmol<span className="text-gradient">.</span>
        </a>

        <ul className="hidden items-center gap-7 font-mono text-[0.78rem] text-muted md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={profile.resumeUrl}
            download
            className="hidden rounded-full bg-ink px-4 py-2 font-mono text-[0.72rem] font-medium text-void transition-opacity hover:opacity-85 md:inline-block"
          >
            resume ↓
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="glass flex h-9 w-9 items-center justify-center rounded-full text-ink md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass mx-3 mt-2 flex flex-col gap-1 rounded-2xl p-3 md:hidden"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 font-mono text-sm text-muted transition-colors hover:bg-ink/5 hover:text-ink"
              >
                {link.label}
              </a>
            ))}
            <a
              href={profile.resumeUrl}
              download
              className="mt-1 rounded-lg bg-ink px-3 py-2 text-center font-mono text-sm font-medium text-void"
            >
              resume ↓
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

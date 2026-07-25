import { Github, Mail } from "lucide-react";
import { profile } from "@/lib/data";
import VisitorCounter from "@/components/VisitorCounter";

export default function Footer() {
  return (
    <footer className="relative border-t border-ink/[0.06] py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-5 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-display text-sm font-semibold text-ink">
            {profile.name}
          </p>
          <p className="mt-0.5 font-mono text-[0.68rem] text-muted">
            Built with Next.js, Tailwind &amp; Supabase — {new Date().getFullYear()}
          </p>
        </div>

        <VisitorCounter />

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="glass flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:text-ink"
          >
            <Mail size={15} />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="glass flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:text-ink"
          >
            <Github size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}

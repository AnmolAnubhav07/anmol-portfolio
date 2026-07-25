"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { profile } from "@/lib/data";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      setStatus("error");
      setErrorMsg("Please fill in every field.");
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      setStatus("error");
      setErrorMsg(
        "Contact form isn't connected yet — add your Supabase URL and anon key to .env.local."
      );
      return;
    }

    setStatus("loading");
    const { error } = await supabase
      .from("contact_messages")
      .insert({ name, email, message });

    if (error) {
      setStatus("error");
      setErrorMsg("Something went wrong sending that — please try again.");
      return;
    }

    setStatus("success");
    form.reset();
  }

  return (
    <section id="contact" className="relative border-t border-ink/[0.06] py-24">
      <div className="mx-auto max-w-5xl px-5">
        <p className="file-tag mb-4">contact</p>
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Let&apos;s build something
        </h2>
        <p className="mt-3 max-w-xl text-muted">
          Open to internships, freelance work, and interesting AI or web
          projects. Drop a message or reach out directly.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="glass glow-edge flex items-center gap-3 rounded-2xl p-5 transition-colors"
            >
              <span className="glass flex h-10 w-10 items-center justify-center rounded-full text-blue-glow">
                <Mail size={16} />
              </span>
              <div>
                <div className="font-mono text-[0.68rem] uppercase text-muted">
                  Email
                </div>
                <div className="font-medium text-ink">{profile.email}</div>
              </div>
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass glow-edge flex items-center gap-3 rounded-2xl p-5 transition-colors"
            >
              <span className="glass flex h-10 w-10 items-center justify-center rounded-full text-violet-glow">
                <Github size={16} />
              </span>
              <div>
                <div className="font-mono text-[0.68rem] uppercase text-muted">
                  GitHub
                </div>
                <div className="font-medium text-ink">{profile.githubHandle}</div>
              </div>
            </a>
          </div>

          <form onSubmit={handleSubmit} className="glass glow-edge space-y-4 rounded-2xl p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="font-mono text-xs text-muted">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="mt-1.5 w-full rounded-lg border border-ink/10 bg-ink/[0.03] px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-blue-glow/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="font-mono text-xs text-muted">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="mt-1.5 w-full rounded-lg border border-ink/10 bg-ink/[0.03] px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-blue-glow/50"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="font-mono text-xs text-muted">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1.5 w-full resize-none rounded-lg border border-ink/10 bg-ink/[0.03] px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-blue-glow/50"
                placeholder="What are you building?"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-glow to-violet-glow px-5 py-2.5 font-mono text-sm font-medium text-white shadow-lg shadow-violet-glow/20 transition-transform hover:scale-[1.03] disabled:opacity-60"
              >
                <Send size={14} />
                {status === "loading" ? "Sending…" : "Send message"}
              </button>

              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.span
                    key="success"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-500"
                  >
                    <CheckCircle2 size={14} /> Sent — thank you!
                  </motion.span>
                )}
                {status === "error" && (
                  <motion.span
                    key="error"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-rose-500"
                  >
                    <AlertCircle size={14} /> {errorMsg}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Eye, X } from "lucide-react";
import { profile } from "@/lib/data";

export default function ResumeSection() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section className="relative border-t border-ink/[0.06] py-24">
      <div className="mx-auto max-w-5xl px-5">
        <div className="glass glow-edge flex flex-col items-center gap-6 rounded-3xl p-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Want the short version?
            </h2>
            <p className="mt-2 max-w-md text-muted">
              One page, everything above, no scrolling required.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="glass glow-edge inline-flex items-center gap-2 rounded-full px-5 py-3 font-mono text-sm text-ink"
            >
              <Eye size={15} /> Preview
            </button>
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-glow to-violet-glow px-5 py-3 font-mono text-sm font-medium text-white shadow-lg shadow-violet-glow/20 transition-transform hover:scale-[1.03]"
            >
              <Download size={15} /> Download
            </a>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-modal-title"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="glass relative flex h-[75vh] w-full max-w-2xl flex-col rounded-2xl p-3 sm:h-[85vh]"
            >
              <div className="flex items-center justify-between gap-3 px-2 pb-2">
                <span id="resume-modal-title" className="font-mono text-xs text-muted">
                  {profile.name} — resume preview
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden font-mono text-[0.68rem] text-muted underline decoration-dotted underline-offset-2 hover:text-ink sm:inline"
                  >
                    open in new tab
                  </a>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close preview"
                    className="glass flex h-8 w-8 items-center justify-center rounded-full text-ink"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
              <iframe
                src={profile.resumeUrl}
                title="Resume preview"
                className="h-full w-full flex-1 rounded-xl bg-white"
              />
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-center font-mono text-xs text-blue-glow underline underline-offset-2 sm:hidden"
              >
                Not loading? Open in a new tab
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

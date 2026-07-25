"use client";

import { motion } from "framer-motion";
import { journey } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Timeline() {
  return (
    <section className="relative border-t border-ink/[0.06] py-24">
      <div className="mx-auto max-w-3xl px-5">
        <p className="file-tag mb-4">journey.tsx</p>
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          The journey so far
        </h2>

        <div className="relative mt-14 ml-3">
          <div className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-blue-glow via-violet-glow to-transparent" />
          <ul className="space-y-9">
            {journey.map((step, i) => (
              <motion.li
                key={step.label}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="relative pl-8"
              >
                <span
                  className={cn(
                    "absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full border-2",
                    step.state === "done" &&
                      "border-blue-glow bg-blue-glow",
                    step.state === "active" &&
                      "border-violet-glow bg-void shadow-[0_0_0_4px_rgba(var(--glow-violet-rgb),0.18)]",
                    step.state === "upcoming" &&
                      "border-ink/20 bg-void"
                  )}
                />
                <div className="flex items-center gap-2.5">
                  <span
                    className={cn(
                      "font-display text-base font-medium",
                      step.state === "upcoming" ? "text-muted" : "text-ink"
                    )}
                  >
                    {step.label}
                  </span>
                  {step.state === "active" && (
                    <span className="glass rounded-full px-2 py-0.5 font-mono text-[0.6rem] text-violet-glow">
                      in progress
                    </span>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

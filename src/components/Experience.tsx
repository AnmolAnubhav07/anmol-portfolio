"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="relative border-t border-ink/[0.06] py-24">
      <div className="mx-auto max-w-5xl px-5">
        <p className="file-tag mb-4">experience.tsx</p>
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Where I&apos;ve been spending time
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {experience.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="glass glow-edge rounded-2xl p-6"
            >
              <span className="glass inline-block rounded-full px-3 py-1 font-mono text-[0.68rem] text-blue-glow">
                {item.meta}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">
                {item.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {item.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-muted">
                    <CheckCircle2
                      size={15}
                      className="mt-0.5 shrink-0 text-violet-glow/80"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

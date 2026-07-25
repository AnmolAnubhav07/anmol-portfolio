"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="relative border-t border-ink/[0.06] py-24">
      <div className="mx-auto max-w-5xl px-5">
        <p className="file-tag mb-4">skills</p>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Toolshelf
          </h2>
          <span className="font-mono text-xs text-muted">
            {skillGroups.reduce((n, g) => n + g.skills.length, 0)} tools &amp; counting
          </span>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="glass glow-edge rounded-2xl p-6"
            >
              <h3 className="font-mono text-xs uppercase tracking-wide text-blue-glow">
                {group.category}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-ink/[0.04] px-3 py-1.5 text-sm text-ink transition-colors hover:bg-ink/[0.08]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

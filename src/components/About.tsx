"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { about, education, profile } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="relative border-t border-ink/[0.06] py-24">
      <div className="mx-auto max-w-5xl px-5">
        <p className="file-tag mb-4">about.tsx</p>
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          A bit about me
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-[1.3fr_1fr]">
          <div className="space-y-5">
            {about.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-[1.05rem] leading-relaxed text-muted"
              >
                {p}
              </motion.p>
            ))}
            <div className="flex flex-wrap gap-2 pt-2">
              {["Artificial Intelligence", "Web Development", "Full Stack Development"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="glass rounded-full px-3 py-1.5 font-mono text-xs text-muted"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="glass glow-edge rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-muted">
              <GraduationCap size={15} className="text-blue-glow" />
              education
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold leading-snug">
              {education.institution}
            </h3>
            <p className="mt-1 text-sm text-muted">{education.degree}</p>

            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-ink/[0.08] pt-5">
              <div>
                <div className="font-mono text-[0.68rem] uppercase text-muted">
                  Duration
                </div>
                <div className="mt-1 font-medium text-ink">{education.years}</div>
              </div>
              <div>
                <div className="font-mono text-[0.68rem] uppercase text-muted">
                  CGPA
                </div>
                <div className="mt-1 font-medium text-ink">{education.cgpa}</div>
              </div>
              <div className="col-span-2">
                <div className="font-mono text-[0.68rem] uppercase text-muted">
                  Based in
                </div>
                <div className="mt-1 font-medium text-ink">{profile.location}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ArrowUpRight, Sparkles } from "lucide-react";
import type { Project } from "@/lib/data";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="glass glow-edge group flex flex-col overflow-hidden rounded-2xl"
    >
      <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-glow/20 via-violet-glow/10 to-transparent">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <Sparkles
            size={28}
            className="text-violet-glow/70 transition-transform duration-500 group-hover:scale-110"
          />
        )}
        {project.status && (
          <span className="glass absolute right-3 top-3 z-10 rounded-full px-2.5 py-1 font-mono text-[0.65rem] text-muted">
            {project.status}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-semibold">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-ink/[0.05] px-2 py-1 font-mono text-[0.68rem] text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        {(project.github || project.demo) && (
          <div className="mt-5 flex items-center gap-4 border-t border-ink/[0.08] pt-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-ink"
              >
                <Github size={13} /> Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-ink"
              >
                Live demo <ArrowUpRight size={13} />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

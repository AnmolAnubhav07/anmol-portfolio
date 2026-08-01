import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="relative border-t border-ink/[0.06] py-24">
      <div className="mx-auto max-w-5xl px-5">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Selected work
        </h2>
        <p className="mt-3 max-w-xl text-muted">
          A few things I&apos;ve been building — from AI-powered tools to
          this site itself.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

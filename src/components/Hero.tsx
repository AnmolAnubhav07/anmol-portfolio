"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import Image from "next/image";
import { profile, stats } from "@/lib/data";

const PARTICLES = [
  { size: 6, top: "12%", left: "8%", delay: 0, cls: "animate-float" },
  { size: 10, top: "70%", left: "5%", delay: 1.2, cls: "animate-float-slow" },
  { size: 4, top: "22%", left: "92%", delay: 0.4, cls: "animate-float-slow" },
  { size: 8, top: "80%", left: "88%", delay: 2, cls: "animate-float" },
  { size: 5, top: "48%", left: "3%", delay: 1.6, cls: "animate-float" },
  { size: 7, top: "38%", left: "95%", delay: 0.8, cls: "animate-float-slow" },
];

function TypingLine() {
  const lines = profile.typingLines;
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">(
    "typing"
  );

  useEffect(() => {
    const current = lines[lineIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 45);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), 1400);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 900);
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(text.slice(0, -1)), 25);
      } else {
        setLineIndex((i) => (i + 1) % lines.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timeout);
  }, [text, phase, lineIndex, lines]);

  return (
    <span className="font-mono text-sm text-muted sm:text-base">
      {text}
      <span className="animate-blink text-blue-glow">|</span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRX = useSpring(rotateX, { stiffness: 120, damping: 14 });
  const springRY = useSpring(rotateY, { stiffness: 120, damping: 14 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    function handleMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY.set(px * 10);
      rotateX.set(py * -10);
    }
    function handleLeave() {
      rotateX.set(0);
      rotateY.set(0);
    }
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [rotateX, rotateY]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28"
    >
      <div className="gradient-mesh" aria-hidden />
      <div className="grid-overlay bg-grid-pattern" aria-hidden />
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className={`particle ${p.cls}`}
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
            animationDelay: `${p.delay}s`,
          }}
          aria-hidden
        />
      ))}

      <div className="relative z-10 mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-14 px-5 pb-20 md:grid-cols-[1.2fr_0.8fr] md:gap-8">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="file-tag mb-6"
          >
            
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-3 font-display text-xl text-muted sm:text-2xl"
          >
            <span className="text-gradient font-medium">{profile.role}</span>
            {" · "}
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="glass mt-7 inline-block rounded-lg px-4 py-3"
          >
            <TypingLine />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="rounded-full bg-gradient-to-r from-blue-glow to-violet-glow px-6 py-3 font-mono text-sm font-medium text-white shadow-lg shadow-violet-glow/20 transition-transform hover:scale-[1.03]"
            >
              Hire Me
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="glass glow-edge inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-sm text-ink"
            >
              <Download size={14} /> Resume
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-1 font-mono text-sm text-muted transition-colors hover:text-ink"
            >
              View Projects <ArrowDown size={14} />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ perspective: 800 }}
          className="mx-auto w-full max-w-[280px] md:mx-0"
        >
          <motion.div
            style={{ rotateX: springRX, rotateY: springRY }}
            className="glass glow-edge relative aspect-square w-full rounded-3xl p-3"
          >
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-glow/15 to-violet-glow/15">
              <Image
                src="/images/anmol.jpg"
                alt={profile.name}
                fill
                sizes="280px"
                priority
                className="object-cover"
              />
              <span className="absolute inset-0 rounded-2xl border border-white/10 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />
            </div>
            <div className="absolute -inset-3 -z-10 animate-spin-slow rounded-[2rem] border border-dashed border-blue-glow/20" />
          </motion.div>
          <p className="mt-4 text-center font-mono text-xs text-muted">
            <span className="text-violet-glow">status:</span> available_for_hire
            <span className="animate-blink text-blue-glow">_</span>
          </p>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto -mt-8 mb-4 grid w-full max-w-5xl grid-cols-2 gap-4 px-5 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="glass rounded-xl px-4 py-4 text-center">
            <div className="font-display text-2xl font-semibold text-ink">
              {s.value}
              {s.suffix}
            </div>
            <div className="mt-1 font-mono text-[0.68rem] uppercase tracking-wide text-muted">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

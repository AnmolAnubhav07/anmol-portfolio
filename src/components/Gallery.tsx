"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImagePlus } from "lucide-react";
import { galleryPlaceholders } from "@/lib/data";

const GRADIENTS = [
  "from-blue-glow/25 via-violet-glow/15 to-transparent",
  "from-violet-glow/25 via-blue-glow/10 to-transparent",
  "from-blue-glow/15 via-transparent to-violet-glow/25",
  "from-violet-glow/20 via-blue-glow/20 to-transparent",
];

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = galleryPlaceholders.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 4200);
    return () => clearInterval(t);
  }, [paused, count]);

  const slide = galleryPlaceholders[index];

  return (
    <section id="gallery" className="relative border-t border-ink/[0.06] py-24">
      <div className="mx-auto max-w-5xl px-5">
        <p className="file-tag mb-4">gallery</p>
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Gallery
        </h2>
        <p className="mt-3 max-w-xl text-muted">
          Placeholder slides — my photos and posts
          into <code className="rounded bg-ink/[0.06] px-1.5 py-0.5 font-mono text-sm">public/gallery</code> and
          swap the array in <code className="rounded bg-ink/[0.06] px-1.5 py-0.5 font-mono text-sm">data.ts</code>.
        </p>

        <div
          className="glass glow-edge relative mt-10 h-[380px] overflow-hidden rounded-3xl sm:h-[440px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <div
                className={`ken-burns-bg absolute inset-0 flex items-center justify-center bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]}`}
              >
                {slide.image ? (
                  <Image
                    src={slide.image}
                    alt={slide.label}
                    fill
                    sizes="(max-width: 640px) 100vw, 900px"
                    className="object-cover"
                    priority={index === 0}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-muted">
                    <ImagePlus size={32} className="text-violet-glow/70" />
                    <span className="font-mono text-sm">{slide.label}</span>
                  </div>
                )}
              </div>
              {slide.image && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-6 py-4">
                  <span className="font-mono text-xs text-white/90">
                    {slide.label}
                  </span>
                </div>
              )}
              {/* ambient floating particles per-slide */}
              <span className="particle animate-float" style={{ width: 6, height: 6, top: "20%", left: "15%" }} />
              <span className="particle animate-float-slow" style={{ width: 8, height: 8, top: "70%", left: "80%" }} />
              <span className="particle animate-float" style={{ width: 5, height: 5, top: "60%", left: "30%" }} />
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + count) % count)}
            aria-label="Previous slide"
            className="glass absolute left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-ink"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % count)}
            aria-label="Next slide"
            className="glass absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-ink"
          >
            <ChevronRight size={16} />
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {galleryPlaceholders.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-ink" : "w-1.5 bg-ink/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

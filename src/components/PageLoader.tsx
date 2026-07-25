"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const delay = prefersReducedMotion ? 0 : 850;
    const t = setTimeout(() => setVisible(false), delay);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          <div className="font-mono text-sm text-muted">
            <span className="text-ink">anmol@portfolio</span>
            <span className="text-blue-glow">:~$</span> starting_up
            <span className="animate-blink text-violet-glow">_</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

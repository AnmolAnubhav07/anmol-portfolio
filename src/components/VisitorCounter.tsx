"use client";

import { useEffect, useRef, useState } from "react";
import { Eye } from "lucide-react";
import { supabase, isSupabaseConfigured, getVisitorId } from "@/lib/supabaseClient";

type Stats = { total: number; today: number; unique_count: number };

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const prev = useRef(0);

  useEffect(() => {
    const from = prev.current;
    const to = value;
    const duration = 700;
    const start = performance.now();

    let raf: number;
    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    prev.current = value;
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return <>{display.toLocaleString()}</>;
}

export default function VisitorCounter() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setFailed(true);
      return;
    }
    supabase
      .rpc("record_visit", { p_visitor_id: getVisitorId() })
      .then(({ data, error }) => {
        if (error || !data || !data[0]) {
          setFailed(true);
          return;
        }
        setStats(data[0] as Stats);
      });
  }, []);

  if (failed) {
    return (
      <span className="font-mono text-[0.68rem] text-muted">
        visitor counter — connect Supabase to enable
      </span>
    );
  }

  if (!stats) {
    return (
      <span className="font-mono text-[0.68rem] text-muted">
        loading visitor stats…
      </span>
    );
  }

  return (
    <div className="glass inline-flex items-center gap-2.5 rounded-full px-3 py-2 font-mono text-[0.65rem] text-muted sm:gap-4 sm:px-4 sm:text-[0.7rem]">
      <span className="flex items-center gap-1.5">
        <Eye size={12} className="text-blue-glow" />
        <AnimatedNumber value={stats.total} /> total
      </span>
      <span className="h-3 w-px bg-ink/10" />
      <span>
        <AnimatedNumber value={stats.today} /> today
      </span>
      <span className="h-3 w-px bg-ink/10" />
      <span>
        <AnimatedNumber value={stats.unique_count} /> unique
      </span>
    </div>
  );
}

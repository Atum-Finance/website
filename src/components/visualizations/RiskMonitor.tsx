"use client";

import { useLayoutEffect, useRef, useState } from "react";

import { content } from "@/data/content";
import { getPrefersReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { registerMotion, ScrollTrigger } from "@/motion/gsap";

interface RiskMonitorProps {
  className?: string;
}

export function RiskMonitor({ className }: RiskMonitorProps) {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useLayoutEffect(() => {
    registerMotion();
    const root = rootRef.current;
    if (!root) return;

    const count = content.risk.systems.length;
    const reduced = getPrefersReducedMotion();

    if (reduced) {
      setActive(count - 1);
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: root,
      start: "top 72%",
      end: "bottom 45%",
      onUpdate: (self) => {
        const next = Math.round(self.progress * (count - 1));
        if (next !== activeRef.current) {
          activeRef.current = next;
          setActive(next);
        }
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <figure
      ref={rootRef}
      className={cn("min-w-0 border border-border bg-panel p-4 md:p-6", className)}
    >
      <figcaption className="sr-only">
        Illustrative risk monitoring surfaces. Structural systems only. Not live
        health metrics.
      </figcaption>
      <p className="text-technical uppercase tracking-technical text-foreground-muted">
        Monitoring
      </p>

      <ul className="mt-6 grid grid-cols-2 gap-px bg-border md:grid-cols-3">
        {content.risk.systems.map((system, index) => {
          const state =
            index === active ? "active" : index < active ? "past" : "future";
          return (
            <li
              key={system}
              className="bg-panel px-4 py-5 md:px-5 md:py-6"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "block size-1.5 rounded-full transition-colors duration-motion ease-atum",
                  state === "active" && "bg-accent",
                  state === "past" && "bg-accent/50",
                  state === "future" && "bg-foreground-muted/40",
                )}
              />
              <p
                className={cn(
                  "mt-4 text-label font-medium uppercase tracking-technical transition-colors duration-motion ease-atum",
                  state === "active" && "text-foreground",
                  state === "past" && "text-foreground-secondary",
                  state === "future" && "text-foreground-muted",
                )}
              >
                {system}
              </p>
            </li>
          );
        })}
      </ul>
    </figure>
  );
}

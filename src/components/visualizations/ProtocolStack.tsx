"use client";

import { useLayoutEffect, useRef } from "react";

import { content } from "@/data/content";
import { getPrefersReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { getAtumEase, gsap, registerMotion, ScrollTrigger } from "@/motion/gsap";

interface ProtocolStackProps {
  className?: string;
}

export function ProtocolStack({ className }: ProtocolStackProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const signalRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  useLayoutEffect(() => {
    registerMotion();
    const root = rootRef.current;
    const signal = signalRef.current;
    if (!root || !signal) return;

    const items = itemRefs.current.filter((node): node is HTMLLIElement =>
      Boolean(node),
    );
    if (items.length === 0) return;

    const reduced = getPrefersReducedMotion();
    const ease = getAtumEase();
    if (reduced) {
      items.forEach((item) => item.setAttribute("data-state", "active"));
      return;
    }

    const positionSignal = (index: number) => {
      const item = items[index];
      if (!item) return;
      const rootBox = root.getBoundingClientRect();
      const itemBox = item.getBoundingClientRect();
      const y = itemBox.top - rootBox.top + itemBox.height / 2 - 3;
      gsap.to(signal, {
        y,
        duration: 0.55,
        ease,
        overwrite: "auto",
      });
    };

    gsap.set(signal, { y: 8 });

    const triggers = items.map((element, index) =>
      ScrollTrigger.create({
        trigger: element,
        start: "top 70%",
        end: "bottom 55%",
        onEnter: () => {
          items.forEach((item, itemIndex) => {
            item.setAttribute(
              "data-state",
              itemIndex < index ? "past" : itemIndex === index ? "active" : "future",
            );
          });
          positionSignal(index);
        },
        onEnterBack: () => {
          items.forEach((item, itemIndex) => {
            item.setAttribute(
              "data-state",
              itemIndex < index ? "past" : itemIndex === index ? "active" : "future",
            );
          });
          positionSignal(index);
        },
      }),
    );

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      gsap.killTweensOf(signal);
    };
  }, []);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <span
        ref={signalRef}
        aria-hidden="true"
        className="absolute left-0 top-0 z-10 size-1.5 -translate-x-1/2 rounded-full bg-accent"
      />
      <ol className="relative border-l border-border pl-8">
        {content.architecture.stack.map((layer, index) => (
          <li
            key={layer}
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            data-state={index === 0 ? "active" : "future"}
            className="group/layer relative py-4 first:pt-0 last:pb-0 data-[state=active]:text-accent data-[state=future]:text-foreground-muted data-[state=past]:text-foreground-secondary"
          >
            <span
              aria-hidden="true"
              className="absolute -left-[36px] top-1/2 size-2 -translate-y-1/2 rounded-full border border-border bg-background group-data-[state=active]/layer:border-accent group-data-[state=active]/layer:bg-accent group-data-[state=past]/layer:border-accent/50 group-data-[state=past]/layer:bg-accent/50"
            />
            <p className="text-technical font-medium uppercase tracking-technical transition-colors duration-motion ease-atum">
              {layer}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

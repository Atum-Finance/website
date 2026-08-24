"use client";

import { useLayoutEffect, useRef, useState } from "react";

import { GridBackground } from "@/components/layout/GridBackground";
import { colors } from "@/design/tokens";
import { content } from "@/data/content";
import { getPrefersReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { getAtumEase, gsap, registerMotion, ScrollTrigger } from "@/motion/gsap";

const NODE_H = 34;
const diagramNodes = content.architecture.diagramNodes;

const NODES = [
  { id: "user", title: diagramNodes[0] ?? "User", x: 500, y: 36, w: 132 },
  { id: "contracts", title: diagramNodes[1] ?? "Smart Contracts", x: 500, y: 130, w: 188 },
  { id: "premium", title: diagramNodes[2] ?? "Premium Engine", x: 168, y: 240, w: 176 },
  { id: "market", title: diagramNodes[3] ?? "Market Data", x: 500, y: 240, w: 152 },
  { id: "hedging", title: diagramNodes[4] ?? "Hedging Engine", x: 832, y: 240, w: 176 },
  { id: "positions", title: diagramNodes[5] ?? "Position Database", x: 500, y: 350, w: 196 },
  { id: "collateral", title: diagramNodes[6] ?? "Collateral Strategies", x: 270, y: 460, w: 232 },
  { id: "reserve", title: diagramNodes[7] ?? "Reserve Fund", x: 720, y: 460, w: 156 },
  { id: "settlement", title: diagramNodes[8] ?? "Settlement", x: 500, y: 570, w: 148 },
] as const;

const EDGES: ReadonlyArray<readonly [number, number]> = [
  [0, 1],
  [1, 2],
  [1, 3],
  [1, 4],
  [2, 5],
  [3, 5],
  [4, 5],
  [5, 6],
  [5, 7],
  [6, 8],
  [7, 8],
];

const SIGNAL_A =
  "M 500 53 V 147 L 168 223 V 257 L 500 333 V 367 L 270 443 V 477 L 500 553";
const SIGNAL_B =
  "M 500 53 V 147 L 832 223 V 257 L 500 333 V 367 L 720 443 V 477 L 500 553";

function edgePath(from: number, to: number) {
  const a = NODES[from];
  const b = NODES[to];
  const sameRow = Math.abs(a.y - b.y) < 8;

  if (sameRow) {
    const left = a.x < b.x ? a : b;
    const right = a.x < b.x ? b : a;
    return `M ${left.x + left.w / 2} ${left.y} H ${right.x - right.w / 2}`;
  }

  const down = b.y > a.y;
  const y1 = a.y + (down ? NODE_H / 2 : -NODE_H / 2);
  const y2 = b.y + (down ? -NODE_H / 2 : NODE_H / 2);

  if (Math.abs(a.x - b.x) < 4) {
    return `M ${a.x} ${y1} V ${y2}`;
  }

  const midY = (y1 + y2) / 2;
  return `M ${a.x} ${y1} V ${midY} H ${b.x} V ${y2}`;
}

function nodeState(index: number, active: number) {
  if (index === active) return "active" as const;
  if (index < active) return "past" as const;
  return "future" as const;
}

interface ArchitectureDiagramProps {
  className?: string;
}

export function ArchitectureDiagram({ className }: ArchitectureDiagramProps) {
  const rootRef = useRef<HTMLElement>(null);
  const pathRefs = useRef<Array<SVGPathElement | null>>([]);
  const signalARef = useRef<SVGCircleElement>(null);
  const signalBRef = useRef<SVGCircleElement>(null);
  const routeARef = useRef<SVGPathElement>(null);
  const routeBRef = useRef<SVGPathElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useLayoutEffect(() => {
    registerMotion();
    const root = rootRef.current;
    const routeA = routeARef.current;
    const routeB = routeBRef.current;
    const signalA = signalARef.current;
    const signalB = signalBRef.current;
    if (!root || !routeA || !routeB || !signalA || !signalB) return;

    const paths = pathRefs.current.filter((node): node is SVGPathElement =>
      Boolean(node),
    );
    const reduced = getPrefersReducedMotion();
    const ease = getAtumEase();

    paths.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: reduced ? 0 : length });
    });

    const place = (target: SVGCircleElement, route: SVGPathElement, t: number) => {
      const length = route.getTotalLength();
      const point = route.getPointAtLength(t * length);
      gsap.set(target, { attr: { cx: point.x, cy: point.y } });
    };

    if (reduced) {
      setActive(NODES.length - 1);
      place(signalA, routeA, 1);
      place(signalB, routeB, 1);
      return;
    }

    place(signalA, routeA, 0);
    place(signalB, routeB, 0);

    const ctx = gsap.context(() => {
      gsap.to(paths, {
        strokeDashoffset: 0,
        duration: 1.15,
        stagger: 0.045,
        ease,
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
        },
      });

      const loop = { t: 0 };
      const loopTween = gsap.to(loop, {
        t: 1,
        duration: 7.5,
        ease: "none",
        repeat: -1,
        paused: true,
        onUpdate: () => {
          place(signalA, routeA, loop.t);
          const offset = (loop.t + 0.42) % 1;
          place(signalB, routeB, offset);
        },
      });

      ScrollTrigger.create({
        trigger: root,
        start: "top 72%",
        end: "bottom 42%",
        onUpdate: (self) => {
          const next = Math.round(self.progress * (NODES.length - 1));
          if (next !== activeRef.current) {
            activeRef.current = next;
            setActive(next);
          }
          if (self.progress < 0.96) {
            loopTween.pause();
            place(signalA, routeA, self.progress);
            place(signalB, routeB, Math.min(1, self.progress * 0.92));
          } else if (!loopTween.isActive()) {
            loop.t = self.progress;
            loopTween.play();
          }
        },
        onLeave: () => loopTween.pause(),
        onLeaveBack: () => loopTween.pause(),
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const font = {
    fontFamily: "var(--font-geist), ui-sans-serif, system-ui, sans-serif",
  };

  return (
    <figure
      ref={rootRef}
      className={cn(
        "relative min-w-0 overflow-hidden border border-border bg-panel",
        className,
      )}
    >
      <GridBackground density="fine" />
      <figcaption className="sr-only">
        Illustrative protocol architecture. Signals move from the user through
        smart contracts, pricing, hedging, position infrastructure, capital
        systems, and settlement. Not live network activity.
      </figcaption>
      <div className="relative z-content p-4 md:p-6">
        <p className="text-technical uppercase tracking-technical text-foreground-muted">
          {content.architecture.diagramLabel}
        </p>

        <ol className="mt-6 space-y-0 lg:hidden">
          {NODES.map((node, index) => {
            const state = nodeState(index, active);
            return (
              <li
                key={node.id}
                className="relative border-l border-border py-3.5 pl-6 first:pt-0 last:pb-0"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -left-[4px] top-1/2 size-2 -translate-y-1/2 rounded-full border bg-background",
                    state === "active" && "border-accent bg-accent",
                    state === "past" && "border-accent/50 bg-accent/50",
                    state === "future" && "border-border",
                  )}
                />
                <p
                  className={cn(
                    "text-technical font-medium uppercase tracking-technical transition-colors duration-motion ease-atum",
                    state === "active" && "text-accent",
                    state === "past" && "text-foreground-secondary",
                    state === "future" && "text-foreground-muted",
                  )}
                >
                  {node.title}
                </p>
              </li>
            );
          })}
        </ol>

        <svg
          viewBox="0 0 1000 610"
          className="mt-6 hidden h-auto w-full lg:block"
          aria-hidden="true"
        >
          {EDGES.map(([from, to], index) => (
            <path
              key={`${from}-${to}`}
              ref={(node) => {
                pathRefs.current[index] = node;
              }}
              d={edgePath(from, to)}
              fill="none"
              stroke={
                Math.max(from, to) <= active ? colors.borderHover : colors.border
              }
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {NODES.map((node, index) => {
            const state = nodeState(index, active);
            const x = node.x - node.w / 2;
            const y = node.y - NODE_H / 2;
            return (
              <g key={node.id}>
                <rect
                  x={x}
                  y={y}
                  width={node.w}
                  height={NODE_H}
                  rx="2"
                  fill={colors.panelElevated}
                  stroke={
                    state === "active"
                      ? colors.borderHover
                      : state === "past"
                        ? colors.borderActive
                        : colors.border
                  }
                  strokeWidth="1"
                />
                <circle
                  cx={x + 14}
                  cy={node.y}
                  r="2.4"
                  fill={
                    state === "future" ? colors.textMuted : colors.accent
                  }
                  opacity={state === "active" ? 1 : state === "past" ? 0.55 : 0.35}
                />
                <text
                  x={x + 24}
                  y={node.y + 4}
                  fill={
                    state === "active"
                      ? colors.accent
                      : state === "past"
                        ? colors.textSecondary
                        : colors.textMuted
                  }
                  fontSize="10"
                  letterSpacing="1.1"
                  style={font}
                >
                  {node.title.toUpperCase()}
                </text>
              </g>
            );
          })}

          <path ref={routeARef} d={SIGNAL_A} fill="none" stroke="none" />
          <path ref={routeBRef} d={SIGNAL_B} fill="none" stroke="none" />
          <circle
            ref={signalARef}
            cx="500"
            cy="53"
            r="3.2"
            fill={colors.accent}
          />
          <circle
            ref={signalBRef}
            cx="500"
            cy="53"
            r="2.4"
            fill={colors.accent}
            opacity="0.55"
          />
        </svg>
      </div>
    </figure>
  );
}

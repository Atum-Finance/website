"use client";

import { useLayoutEffect, useRef } from "react";

import { colors } from "@/design/tokens";
import { getPrefersReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { motion } from "@/motion/config";
import { getAtumEase, gsap, registerMotion } from "@/motion/gsap";

const VIEW_WIDTH = 880;
const VIEW_HEIGHT = 720;
const PROTECTION_Y = 428;

const PRICE_PATH =
  "M32 312 C 110 286, 150 214, 228 198 C 312 180, 352 248, 428 268 C 510 290, 552 372, 638 388 C 708 400, 748 348, 820 262 C 848 226, 864 208, 880 196";

const TRAVELERS = [
  { id: "lead", duration: 16, offset: 0, r: 3.6, glow: true },
  { id: "a", duration: 21, offset: 0.16, r: 2.3, glow: false },
  { id: "b", duration: 13.5, offset: 0.34, r: 2.1, glow: false },
  { id: "c", duration: 19, offset: 0.52, r: 2.6, glow: false },
  { id: "d", duration: 24, offset: 0.71, r: 2.2, glow: false },
  { id: "e", duration: 17.5, offset: 0.88, r: 2.4, glow: false },
] as const;

const DRIFT = [
  { x: 168, y: 498, r: 1.6, dx: 18, dy: 10, duration: 7.2 },
  { x: 312, y: 536, r: 1.3, dx: -14, dy: 12, duration: 9.1 },
  { x: 468, y: 512, r: 1.8, dx: 16, dy: -8, duration: 8.4 },
  { x: 612, y: 548, r: 1.4, dx: -20, dy: 9, duration: 10.2 },
  { x: 742, y: 504, r: 1.5, dx: 12, dy: -11, duration: 6.8 },
] as const;

const FONT = {
  fontFamily: "var(--font-geist), ui-sans-serif, system-ui, sans-serif",
} as const;

interface HeroVisualProps {
  className?: string;
}

export function HeroVisual({ className }: HeroVisualProps) {
  const rootRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<SVGGElement>(null);
  const glowRef = useRef<SVGLineElement>(null);
  const zoneRef = useRef<SVGRectElement>(null);
  const boundaryRef = useRef<SVGLineElement>(null);
  const curveRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const labelsRef = useRef<SVGGElement>(null);
  const travelersRef = useRef<Array<SVGCircleElement | null>>([]);
  const glowsRef = useRef<Array<SVGCircleElement | null>>([]);
  const cursorRef = useRef<SVGCircleElement>(null);
  const cursorRingRef = useRef<SVGCircleElement>(null);
  const driftRef = useRef<Array<SVGCircleElement | null>>([]);

  useLayoutEffect(() => {
    registerMotion();

    const root = rootRef.current;
    const scene = sceneRef.current;
    const glow = glowRef.current;
    const zone = zoneRef.current;
    const boundary = boundaryRef.current;
    const curve = curveRef.current;
    const fill = fillRef.current;
    const labels = labelsRef.current;
    const cursor = cursorRef.current;
    const cursorRing = cursorRingRef.current;
    const travelers = travelersRef.current.filter(
      (node): node is SVGCircleElement => Boolean(node),
    );
    const glows = glowsRef.current.filter(
      (node): node is SVGCircleElement => Boolean(node),
    );
    const drifts = driftRef.current.filter(
      (node): node is SVGCircleElement => Boolean(node),
    );

    if (
      !root ||
      !scene ||
      !glow ||
      !zone ||
      !boundary ||
      !curve ||
      !fill ||
      !labels ||
      !cursor ||
      !cursorRing ||
      travelers.length !== TRAVELERS.length
    ) {
      return;
    }

    const reduced = getPrefersReducedMotion();
    const ease = getAtumEase();
    const length = curve.getTotalLength();
    const cleanups: Array<() => void> = [];

    const place = (node: SVGCircleElement, t: number) => {
      const point = curve.getPointAtLength(((t % 1) + 1) % 1 * length);
      gsap.set(node, { attr: { cx: point.x, cy: point.y } });
      return point;
    };

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([zone, labels, fill, cursor, cursorRing], {
          autoAlpha: 1,
        });
        gsap.set([boundary, glow], { autoAlpha: 1 });
        gsap.set(curve, { strokeDasharray: length, strokeDashoffset: 0 });
        travelers.forEach((node, index) => {
          place(node, TRAVELERS[index].offset);
          gsap.set(node, { autoAlpha: 1 });
        });
        glows.forEach((node, index) => {
          place(node, TRAVELERS[index].offset);
          gsap.set(node, { autoAlpha: 0.18 });
        });
        drifts.forEach((node) => gsap.set(node, { autoAlpha: 0.45 }));
        return;
      }

      gsap.set(zone, { autoAlpha: 0 });
      gsap.set(fill, { autoAlpha: 0 });
      gsap.set(labels, { autoAlpha: 0, y: 10 });
      gsap.set([cursor, cursorRing], { autoAlpha: 0 });
      gsap.set(glow, { autoAlpha: 0 });
      gsap.set(travelers, { autoAlpha: 0 });
      gsap.set(glows, { autoAlpha: 0 });
      gsap.set(drifts, { autoAlpha: 0 });
      gsap.set(boundary, { autoAlpha: 1, attr: { x2: 0 } });
      gsap.set(curve, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      const intro = gsap.timeline({ defaults: { ease }, delay: 0.35 });

      intro
        .to(
          boundary,
          { attr: { x2: VIEW_WIDTH }, duration: motion.duration.slow },
          0,
        )
        .to(zone, { autoAlpha: 1, duration: motion.duration.base }, 0.22)
        .to(fill, { autoAlpha: 1, duration: motion.duration.base }, 0.28)
        .to(curve, { strokeDashoffset: 0, duration: motion.duration.path }, 0.32)
        .to(labels, { autoAlpha: 1, y: 0, duration: motion.duration.base }, 0.68)
        .to(travelers, { autoAlpha: 1, duration: motion.duration.fast, stagger: 0.05 }, 0.78)
        .to(glows, { autoAlpha: 0.22, duration: motion.duration.base }, 0.8)
        .to(drifts, { autoAlpha: 0.55, duration: motion.duration.base, stagger: 0.06 }, 0.86)
        .to(glow, { autoAlpha: 0.2, duration: motion.duration.base }, 0.55);

      const loops: Array<ReturnType<typeof gsap.to>> = [];

      TRAVELERS.forEach((spec, index) => {
        const node = travelers[index];
        const halo = glows[index];
        const travel = { t: spec.offset };

        const tween = gsap.to(travel, {
          t: spec.offset + 1,
          duration: spec.duration,
          ease: "none",
          repeat: -1,
          paused: true,
          onUpdate: () => {
            const point = place(node, travel.t);
            if (halo) {
              gsap.set(halo, { attr: { cx: point.x, cy: point.y } });
            }
            if (spec.glow) {
              const proximity = Math.max(
                0,
                1 - Math.abs(point.y - PROTECTION_Y) / 42,
              );
              gsap.set(glow, {
                autoAlpha: 0.14 + proximity * 0.5,
                attr: {
                  x1: Math.max(0, point.x - 120),
                  x2: Math.min(VIEW_WIDTH, point.x + 120),
                },
              });
            }
          },
        });

        loops.push(tween);
      });

      drifts.forEach((node, index) => {
        const spec = DRIFT[index];
        if (!spec) return;
        loops.push(
          gsap.to(node, {
            x: spec.dx,
            y: spec.dy,
            duration: spec.duration,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            paused: true,
          }),
        );
      });

      intro.eventCallback("onComplete", () => {
        loops.forEach((tween) => tween.play());
      });

      const pointer = { t: 0.62 };

      const syncCursor = () => {
        const point = curve.getPointAtLength(pointer.t * length);
        gsap.set([cursor, cursorRing], { attr: { cx: point.x, cy: point.y } });
      };

      syncCursor();

      const onPointerMove = (event: PointerEvent) => {
        const box = root.getBoundingClientRect();
        if (box.width === 0 || box.height === 0) return;
        const nx = (event.clientX - box.left) / box.width;
        const ny = (event.clientY - box.top) / box.height;
        gsap.to(pointer, {
          t: Math.min(0.97, Math.max(0.03, nx)),
          duration: 0.55,
          ease,
          overwrite: "auto",
          onUpdate: syncCursor,
        });
        gsap.to([cursor, cursorRing], {
          autoAlpha: 1,
          duration: 0.35,
          ease,
          overwrite: "auto",
        });
        gsap.to(scene, {
          x: (nx - 0.5) * 18,
          y: (ny - 0.5) * 12,
          duration: 0.85,
          ease,
          overwrite: "auto",
        });
      };

      const onPointerLeave = () => {
        gsap.to(scene, { x: 0, y: 0, duration: 0.9, ease, overwrite: "auto" });
        gsap.to([cursor, cursorRing], {
          autoAlpha: 0,
          duration: 0.4,
          ease,
          overwrite: "auto",
        });
      };

      root.addEventListener("pointermove", onPointerMove);
      root.addEventListener("pointerleave", onPointerLeave);

      const visibility = () => {
        const running = intro.progress() === 1;
        if (document.hidden) {
          loops.forEach((tween) => tween.pause());
        } else if (running) {
          loops.forEach((tween) => tween.resume());
        }
      };

      document.addEventListener("visibilitychange", visibility);

      cleanups.push(() => {
        root.removeEventListener("pointermove", onPointerMove);
        root.removeEventListener("pointerleave", onPointerLeave);
        document.removeEventListener("visibilitychange", visibility);
      });
    }, root);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <figure
      ref={rootRef}
      className={cn(
        "relative h-full min-h-0 min-w-0 cursor-crosshair overflow-hidden",
        "[mask-image:linear-gradient(180deg,transparent_0%,black_10%,black_92%,transparent_100%)]",
        "[-webkit-mask-image:linear-gradient(180deg,transparent_0%,black_10%,black_92%,transparent_100%)]",
        "lg:[mask-image:linear-gradient(90deg,transparent_0%,black_22%,black_100%)]",
        "lg:[-webkit-mask-image:linear-gradient(90deg,transparent_0%,black_22%,black_100%)]",
        className,
      )}
    >
      <figcaption className="sr-only">
        Asset price path held above a protection level, with protected downside
        below the floor.
      </figcaption>

      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hero-zone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors.accent} stopOpacity="0.14" />
            <stop offset="42%" stopColor={colors.accent} stopOpacity="0.04" />
            <stop offset="100%" stopColor={colors.accent} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hero-path" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={colors.text} stopOpacity="0" />
            <stop offset="16%" stopColor={colors.text} stopOpacity="0.85" />
            <stop offset="86%" stopColor={colors.text} stopOpacity="1" />
            <stop offset="100%" stopColor={colors.text} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hero-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors.text} stopOpacity="0.05" />
            <stop offset="100%" stopColor={colors.text} stopOpacity="0" />
          </linearGradient>
          <radialGradient id="hero-bloom" cx="70%" cy="58%" r="48%">
            <stop offset="0%" stopColor={colors.accent} stopOpacity="0.08" />
            <stop offset="100%" stopColor={colors.accent} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hero-zone-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="12%" stopColor="white" stopOpacity="1" />
            <stop offset="90%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="hero-zone-mask">
            <rect
              width={VIEW_WIDTH}
              height={VIEW_HEIGHT}
              fill="url(#hero-zone-fade)"
            />
          </mask>
        </defs>

        <g ref={sceneRef}>
          <ellipse
            cx="620"
            cy="430"
            rx="380"
            ry="260"
            fill="url(#hero-bloom)"
          />

          <path
            ref={fillRef}
            d={`${PRICE_PATH} L ${VIEW_WIDTH} ${PROTECTION_Y} L 32 ${PROTECTION_Y} Z`}
            fill="url(#hero-fill)"
            mask="url(#hero-zone-mask)"
          />

          <rect
            ref={zoneRef}
            x="0"
            y={PROTECTION_Y}
            width={VIEW_WIDTH}
            height={VIEW_HEIGHT - PROTECTION_Y}
            fill="url(#hero-zone)"
            mask="url(#hero-zone-mask)"
          />

          {DRIFT.map((spec, index) => (
            <circle
              key={spec.x}
              ref={(node) => {
                driftRef.current[index] = node;
              }}
              cx={spec.x}
              cy={spec.y}
              r={spec.r}
              fill={colors.accent}
              opacity="0.45"
            />
          ))}

          <line
            ref={glowRef}
            x1="0"
            y1={PROTECTION_Y}
            x2={VIEW_WIDTH}
            y2={PROTECTION_Y}
            stroke={colors.accent}
            strokeWidth="8"
            opacity="0.18"
            vectorEffect="non-scaling-stroke"
            mask="url(#hero-zone-mask)"
          />

          <line
            ref={boundaryRef}
            x1="0"
            y1={PROTECTION_Y}
            x2={VIEW_WIDTH}
            y2={PROTECTION_Y}
            stroke={colors.accent}
            strokeWidth="1.35"
            vectorEffect="non-scaling-stroke"
            mask="url(#hero-zone-mask)"
          />

          <path
            ref={curveRef}
            d={PRICE_PATH}
            fill="none"
            stroke="url(#hero-path)"
            strokeWidth="1.7"
            vectorEffect="non-scaling-stroke"
          />

          {TRAVELERS.map((spec, index) => (
            <g key={spec.id}>
              <circle
                ref={(node) => {
                  glowsRef.current[index] = node;
                }}
                cx="32"
                cy="312"
                r={spec.glow ? 11 : 7}
                fill={colors.accent}
                opacity="0.16"
              />
              <circle
                ref={(node) => {
                  travelersRef.current[index] = node;
                }}
                cx="32"
                cy="312"
                r={spec.r}
                fill={spec.glow ? colors.accent : colors.text}
              />
            </g>
          ))}

          <circle
            ref={cursorRingRef}
            cx="32"
            cy="312"
            r="12"
            fill="none"
            stroke={colors.accent}
            strokeWidth="1"
            opacity="0.45"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            ref={cursorRef}
            cx="32"
            cy="312"
            r="3.2"
            fill={colors.accent}
          />

          <g ref={labelsRef} className="hidden md:block" style={FONT}>
            <text
              x="248"
              y="168"
              fill={colors.textSecondary}
              fontSize="11"
              letterSpacing="1.76"
            >
              ASSET PRICE
            </text>
            <text
              x="248"
              y={PROTECTION_Y - 14}
              fill={colors.accent}
              fontSize="11"
              letterSpacing="1.76"
            >
              PROTECTION LEVEL
            </text>
            <text
              x="248"
              y={PROTECTION_Y + 30}
              fill={colors.textMuted}
              fontSize="11"
              letterSpacing="1.76"
            >
              PROTECTED DOWNSIDE
            </text>
          </g>
        </g>
      </svg>
    </figure>
  );
}

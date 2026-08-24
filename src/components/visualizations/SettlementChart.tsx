"use client";

import { useLayoutEffect, useRef } from "react";
import type { RefObject } from "react";

import { Badge } from "@/components/ui/Badge";
import { DataLabel } from "@/components/ui/DataLabel";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { colors } from "@/design/tokens";
import { illustrativeExample } from "@/data/content";
import { getPrefersReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { gsap, registerMotion } from "@/motion/gsap";

const VIEW_WIDTH = 1100;
const VIEW_HEIGHT = 380;
const PRICE_TOP = 52;
const PRICE_BOTTOM = 300;
const PRICE_HIGH = 1800;
const PRICE_LOW = 1000;
const PROTECTION = 1400;

const BELOW_PRICES = [1800, 1700, 1600, 1500, 1450, 1390] as const;
const ABOVE_PRICES = [1800, 1740, 1680, 1650, 1690, 1760] as const;

function priceToY(price: number) {
  return PRICE_TOP + ((PRICE_HIGH - price) / (PRICE_HIGH - PRICE_LOW)) * (PRICE_BOTTOM - PRICE_TOP);
}

function buildPath(prices: readonly number[]) {
  const xs = [36, 220, 400, 580, 760, 1060];
  return prices
    .map((price, index) => {
      const command = index === 0 ? "M" : "L";
      return `${command}${xs[index]} ${priceToY(price)}`;
    })
    .join(" ");
}

const BELOW_PATH = buildPath(BELOW_PRICES);
const ABOVE_PATH = buildPath(ABOVE_PRICES);
const PROTECTION_Y = priceToY(PROTECTION);

type SettlementAct = "below" | "above";

interface SettlementChartProps {
  act: SettlementAct;
  className?: string;
  sceneRef?: RefObject<HTMLElement | null>;
}

export function SettlementChart({ act, className, sceneRef }: SettlementChartProps) {
  const rootRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const travelerRef = useRef<SVGCircleElement>(null);
  const zoneRef = useRef<SVGRectElement>(null);
  const settlementRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLSpanElement>(null);

  const path = act === "below" ? BELOW_PATH : ABOVE_PATH;
  const prices = act === "below" ? BELOW_PRICES : ABOVE_PRICES;

  useLayoutEffect(() => {
    registerMotion();
    const root = rootRef.current;
    const line = pathRef.current;
    const traveler = travelerRef.current;
    const zone = zoneRef.current;
    const settlement = settlementRef.current;
    const price = priceRef.current;
    if (!root || !line || !traveler || !zone || !settlement || !price) return;

    const reduced = getPrefersReducedMotion();
    const length = line.getTotalLength();

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: 0 });
        const end = line.getPointAtLength(length);
        gsap.set(traveler, { attr: { cx: end.x, cy: end.y } });
        gsap.set(zone, { autoAlpha: act === "below" ? 1 : 0 });
        gsap.set(settlement, { autoAlpha: act === "below" ? 1 : 0 });
        price.textContent = `$${prices[prices.length - 1].toLocaleString("en-US")}`;
        return;
      }

      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
      gsap.set(zone, { autoAlpha: 0 });
      gsap.set(settlement, { autoAlpha: 0 });
      const start = line.getPointAtLength(0);
      gsap.set(traveler, { attr: { cx: start.x, cy: start.y } });
      price.textContent = `$${prices[0].toLocaleString("en-US")}`;

      const trigger = sceneRef?.current ?? root;
      const draw = { t: 0 };
      gsap.to(draw, {
        t: 1,
        ease: "none",
        scrollTrigger: {
          trigger,
          start: sceneRef ? "top 55%" : "top 70%",
          end: sceneRef ? "bottom 35%" : "top 18%",
          scrub: 0.65,
        },
        onUpdate: () => {
          const point = line.getPointAtLength(draw.t * length);
          gsap.set(line, { strokeDashoffset: length * (1 - draw.t) });
          gsap.set(traveler, { attr: { cx: point.x, cy: point.y } });

          const index = Math.min(
            prices.length - 1,
            Math.floor(draw.t * (prices.length - 0.001)),
          );
          price.textContent = `$${prices[index].toLocaleString("en-US")}`;

          const crossed = point.y >= PROTECTION_Y - 1;
          if (act === "below") {
            gsap.set(zone, { autoAlpha: crossed && draw.t > 0.72 ? 1 : 0 });
            gsap.set(settlement, { autoAlpha: crossed && draw.t > 0.78 ? 1 : 0 });
          }
        },
      });
    }, root);

    return () => ctx.revert();
  }, [act, path, prices, sceneRef]);

  const font = {
    fontFamily: "var(--font-geist), ui-sans-serif, system-ui, sans-serif",
  };

  return (
    <figure
      ref={rootRef}
      className={cn("relative min-w-0 border border-border bg-panel", className)}
    >
      <figcaption className="sr-only">
        {act === "below"
          ? "Illustrative ETH price path starting at $1,800 and falling through $1,700, $1,600, $1,500, $1,450, then $1,390, crossing a $1,400 protection level. The underlying asset remains owned. USDC settlement is illustrative."
          : "Illustrative ETH price path remaining above a $1,400 protection level. Protection expires unused and the underlying asset is returned according to protocol mechanics."}
      </figcaption>

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 md:px-5">
        <div className="flex flex-wrap items-center gap-6">
          <DataLabel label="Asset" value="ETH" />
          <div className="flex flex-col gap-1">
            <span className="text-technical uppercase tracking-technical text-foreground-muted">
              Price
            </span>
            <span
              ref={priceRef}
              className="font-medium tabular-nums text-label text-foreground"
            >
              $1,800
            </span>
          </div>
          <DataLabel label="Protection" value="$1,400" />
        </div>
        <Badge>Illustrative</Badge>
      </div>

      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        className="h-[220px] w-full md:h-[280px] lg:h-[min(38vh,340px)]"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <rect
          ref={zoneRef}
          x="0"
          y={PROTECTION_Y}
          width={VIEW_WIDTH}
          height={VIEW_HEIGHT - PROTECTION_Y}
          fill="rgba(0,216,151,0.07)"
        />
        <line
          x1="0"
          y1={PROTECTION_Y}
          x2={VIEW_WIDTH}
          y2={PROTECTION_Y}
          stroke={colors.accent}
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
        />
        <text
          x="24"
          y={PROTECTION_Y - 10}
          fill={colors.accent}
          fontSize="11"
          letterSpacing="1.6"
          style={font}
        >
          PROTECTION LEVEL
        </text>
        <path
          ref={pathRef}
          d={path}
          fill="none"
          stroke={colors.text}
          strokeWidth="1.6"
          vectorEffect="non-scaling-stroke"
        />
        <circle
          ref={travelerRef}
          cx="36"
          cy={priceToY(1800)}
          r="3.5"
          fill={colors.accent}
        />
      </svg>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3 md:px-5">
        <StatusIndicator
          tone="protected"
          label="Underlying asset owned · ETH"
        />
        <div
          ref={settlementRef}
          className={cn(
            "flex flex-wrap items-center gap-5",
            act === "above" && "hidden",
          )}
        >
          <DataLabel
            label="Coverage ratio"
            value={`${Math.round(illustrativeExample.coverageRatio * 100)}%`}
          />
          <DataLabel label="USDC settlement" value="Illustrative" />
        </div>
        {act === "above" ? (
          <StatusIndicator tone="expired" label="Expired unused" />
        ) : null}
      </div>
    </figure>
  );
}

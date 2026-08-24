"use client";

import { useLayoutEffect, useRef } from "react";

import { Badge } from "@/components/ui/Badge";
import { ChoiceGroup } from "@/components/ui/ChoiceGroup";
import { DataLabel } from "@/components/ui/DataLabel";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { colors } from "@/design/tokens";
import {
  illustrativeExample,
  illustrativeProtectionLevels,
} from "@/data/content";
import { getPrefersReducedMotion } from "@/hooks/useReducedMotion";
import { protectionDurations } from "@/types/protocol";
import { cn } from "@/lib/utils";
import { getAtumEase, gsap, registerMotion } from "@/motion/gsap";

const VIEW_WIDTH = 640;
const VIEW_HEIGHT = 220;
const PRICE_TOP = 36;
const PRICE_BOTTOM = 176;
const PRICE_HIGH = 1800;
const PRICE_LOW = 1000;

const PRICE_PATH =
  "M0 86 C 48 78, 72 108, 108 98 C 148 86, 172 48, 214 54 C 254 60, 272 118, 312 108 C 348 100, 372 148, 420 156 C 456 162, 484 132, 524 108 C 560 86, 592 96, 640 68";

function protectionY(level: number) {
  const ratio = (PRICE_HIGH - level) / (PRICE_HIGH - PRICE_LOW);
  return PRICE_TOP + ratio * (PRICE_BOTTOM - PRICE_TOP);
}

interface ProtectionDemoProps {
  step: number;
  durationDays: number;
  protectionLevelUsd: number;
  onDurationChange: (days: number) => void;
  onProtectionChange: (level: number) => void;
  className?: string;
}

export function ProtectionDemo({
  step,
  durationDays,
  protectionLevelUsd,
  onDurationChange,
  onProtectionChange,
  className,
}: ProtectionDemoProps) {
  const boundaryRef = useRef<SVGLineElement>(null);
  const zoneRef = useRef<SVGRectElement>(null);
  const glowRef = useRef<SVGLineElement>(null);

  const y = protectionY(protectionLevelUsd);
  const activated = step >= 3;
  const showBoundary = step >= 2;

  useLayoutEffect(() => {
    registerMotion();
    const boundary = boundaryRef.current;
    const zone = zoneRef.current;
    const glow = glowRef.current;
    if (!boundary || !zone || !glow) return;

    const boundaryState = {
      attr: { y1: y, y2: y, x2: showBoundary ? VIEW_WIDTH : 0 },
      opacity: showBoundary ? 1 : 0.18,
    };
    const glowState = {
      attr: { y1: y, y2: y },
      opacity: activated ? 0.28 : showBoundary ? 0.12 : 0,
    };
    const zoneState = {
      attr: { y, height: VIEW_HEIGHT - y },
      opacity: showBoundary ? 1 : 0,
    };

    if (getPrefersReducedMotion()) {
      gsap.set(boundary, boundaryState);
      gsap.set(glow, glowState);
      gsap.set(zone, zoneState);
      return;
    }

    const ease = getAtumEase();
    const tweens = [
      gsap.to(boundary, { ...boundaryState, duration: 0.55, ease, overwrite: "auto" }),
      gsap.to(glow, { ...glowState, duration: 0.55, ease, overwrite: "auto" }),
      gsap.to(zone, { ...zoneState, duration: 0.55, ease, overwrite: "auto" }),
    ];

    return () => {
      tweens.forEach((tween) => tween.kill());
    };
  }, [y, showBoundary, activated]);

  return (
    <div
      className={cn(
        "flex h-full min-w-0 flex-col border border-border bg-panel p-4 md:p-5",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-technical uppercase tracking-technical text-foreground-muted">
          Protection position
        </p>
        <Badge tone={activated ? "accent" : "neutral"}>Illustrative</Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <DataLabel label="Asset" value={illustrativeExample.asset} />
        <DataLabel label="Duration" value={`${durationDays} days`} />
        <DataLabel
          label="Protection"
          value={`$${protectionLevelUsd.toLocaleString("en-US")}`}
        />
        <DataLabel
          label="Coverage · ex."
          value={`${Math.round(illustrativeExample.coverageRatio * 100)}%`}
        />
      </div>

      <figure className="mt-4 min-w-0 flex-1">
        <figcaption className="sr-only">
          Illustrative ETH protection position. Duration {durationDays} days,
          protection level ${protectionLevelUsd.toLocaleString("en-US")}, coverage
          ratio 90 percent. Not live market data.
        </figcaption>
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="h-[160px] w-full md:h-[180px] lg:h-[min(22vh,200px)]"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <path
            d={PRICE_PATH}
            fill="none"
            stroke={colors.text}
            strokeWidth="1.4"
            vectorEffect="non-scaling-stroke"
          />
          <rect
            ref={zoneRef}
            x="0"
            y={y}
            width={VIEW_WIDTH}
            height={VIEW_HEIGHT - y}
            fill="rgba(0,216,151,0.05)"
            opacity="0"
          />
          <line
            ref={glowRef}
            x1="0"
            y1={y}
            x2={VIEW_WIDTH}
            y2={y}
            stroke={colors.accent}
            strokeWidth="6"
            opacity="0"
            vectorEffect="non-scaling-stroke"
          />
          <line
            ref={boundaryRef}
            x1="0"
            y1={y}
            x2={showBoundary ? VIEW_WIDTH : 0}
            y2={y}
            stroke={colors.accent}
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
          />
          <text
            x={VIEW_WIDTH - 16}
            y="24"
            fill={colors.textMuted}
            fontSize="11"
            letterSpacing="1.6"
            textAnchor="end"
            style={{
              fontFamily: "var(--font-geist), ui-sans-serif, system-ui, sans-serif",
            }}
          >
            {durationDays}D
          </text>
        </svg>
      </figure>

      <div className="mt-2 flex flex-col gap-4">
        <div>
          <p className="mb-2 text-technical uppercase tracking-technical text-foreground-muted">
            Duration
          </p>
          <ChoiceGroup
            label="Illustrative protection duration"
            value={durationDays}
            onChange={onDurationChange}
            options={protectionDurations.map((days) => ({
              value: days,
              label: `${days}D`,
              ariaLabel: `${days} days`,
            }))}
          />
        </div>

        <div>
          <p className="mb-2 text-technical uppercase tracking-technical text-foreground-muted">
            Protection level
          </p>
          <ChoiceGroup
            label="Illustrative protection level"
            value={protectionLevelUsd}
            onChange={onProtectionChange}
            options={illustrativeProtectionLevels.map((level) => ({
              value: level.valueUsd,
              label: level.label,
            }))}
          />
        </div>

        <div className="border-t border-border pt-3">
          <StatusIndicator
            tone={activated ? "protected" : step > 0 ? "active" : "idle"}
            label={activated ? "Protected" : step > 0 ? "Configuring" : "Deposit"}
          />
        </div>
      </div>
    </div>
  );
}

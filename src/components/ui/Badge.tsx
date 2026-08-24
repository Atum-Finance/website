import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type BadgeTone = "neutral" | "accent";

interface BadgeProps {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
}

export function Badge({ tone = "neutral", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2 py-0.5 text-technical uppercase tracking-technical",
        tone === "accent"
          ? "border-border-active text-accent"
          : "border-border text-foreground-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

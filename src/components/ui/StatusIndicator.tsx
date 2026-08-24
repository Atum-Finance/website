import { cn } from "@/lib/utils";

export type StatusTone = "idle" | "active" | "protected" | "expired" | "warning";

interface StatusIndicatorProps {
  tone?: StatusTone;
  label: string;
  className?: string;
}

const toneClass: Record<StatusTone, string> = {
  idle: "bg-foreground-muted",
  active: "bg-accent",
  protected: "bg-accent",
  expired: "bg-accent",
  warning: "bg-foreground-secondary",
};

export function StatusIndicator({
  tone = "idle",
  label,
  className,
}: StatusIndicatorProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-technical uppercase tracking-technical text-foreground-secondary",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 rounded-full",
          toneClass[tone],
          tone === "protected" && "shadow-glow",
          tone === "expired" && "shadow-glow",
        )}
      />
      {label}
    </span>
  );
}

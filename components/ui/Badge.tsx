import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "emerald" | "outline" | "secondary";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "outline",
  ...props
}) => {
  const variantStyles = {
    emerald: "bg-accent-emerald/10 border border-accent-emerald/25 text-accent-emerald",
    outline: "border border-border-subtle bg-surface/50 text-text-secondary",
    secondary: "bg-elevated border border-border-subtle text-text-primary",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xs px-2 py-0.5 text-[10px] font-medium tracking-widest uppercase font-mono leading-none",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
};

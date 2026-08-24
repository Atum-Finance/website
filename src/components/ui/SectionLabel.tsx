import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionLabelProps {
  className?: string;
  children: ReactNode;
}

export function SectionLabel({ className, children }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "text-technical font-medium uppercase tracking-technical text-accent",
        className,
      )}
    >
      {children}
    </p>
  );
}

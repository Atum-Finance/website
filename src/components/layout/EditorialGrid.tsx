import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface EditorialGridProps {
  className?: string;
  children: ReactNode;
}

export function EditorialGrid({ className, children }: EditorialGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-4 gap-grid-mobile md:grid-cols-12 md:gap-grid-desktop",
        className,
      )}
    >
      {children}
    </div>
  );
}

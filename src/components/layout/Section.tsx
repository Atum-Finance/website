import type { ReactNode, Ref } from "react";

import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  label?: string;
  className?: string;
  children: ReactNode;
  ref?: Ref<HTMLElement>;
}

export function Section({ id, label, className, children, ref }: SectionProps) {
  return (
    <section
      ref={ref}
      id={id}
      aria-label={label}
      className={cn(
        "relative z-content min-w-0 scroll-mt-[var(--nav-height)] overflow-x-clip py-section-mobile md:py-section-tablet lg:py-section-desktop",
        className,
      )}
    >
      {children}
    </section>
  );
}

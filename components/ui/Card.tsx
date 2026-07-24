"use client";

import React, { MouseEvent, useRef } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  spotlight?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, spotlight = true, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || !spotlight) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      containerRef.current.style.setProperty("--mouse-x", `${x}px`);
      containerRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    // Combine ref if present
    React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className={cn(
          "group relative overflow-hidden rounded-sm border border-border-subtle bg-[#11161C]/30 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/15",
          spotlight &&
            "before:absolute before:inset-0 before:-z-10 before:opacity-0 before:transition-opacity before:duration-500 before:bg-[radial-gradient(400px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(43,174,102,0.06),transparent_40%)] hover:before:opacity-100",
          className
        )}
        {...props}
      >
        {/* Outer border spotlight reflection */}
        {spotlight && (
          <div
            className="pointer-events-none absolute -inset-px -z-20 rounded-sm opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), rgba(43, 174, 102, 0.15), transparent 45%)`,
            }}
          />
        )}
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

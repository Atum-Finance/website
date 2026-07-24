"use client";

import React, { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  variant?: "primary" | "secondary" | "tertiary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "px-3 py-1.5 text-xs font-medium tracking-wide",
      md: "px-5 py-2.5 text-sm font-medium tracking-wide",
      lg: "px-8 py-3.5 text-base font-medium tracking-wide",
    };

    const variantClasses = {
      primary:
        "bg-accent-emerald text-background shadow-lg shadow-accent-emerald/10 hover:bg-accent-hover transition-colors font-semibold",
      secondary:
        "bg-surface border border-border-subtle text-text-primary hover:bg-elevated hover:border-white/20 transition-all",
      tertiary:
        "bg-elevated/40 border border-border-subtle/50 text-text-secondary hover:text-white hover:bg-elevated/80 transition-colors",
      outline:
        "border border-accent-emerald/40 text-accent-emerald bg-transparent hover:bg-accent-emerald/5 hover:border-accent-emerald transition-all",
      ghost: "text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all",
    };

    return (
      <motion.button
        ref={ref}
        disabled={disabled || isLoading}
        whileHover={disabled || isLoading ? {} : { y: -1, scale: 1.01 }}
        whileTap={disabled || isLoading ? {} : { y: 1, scale: 0.99 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className={cn(
          "inline-flex items-center justify-center rounded-sm font-sans tracking-tight focus:outline-none focus:ring-1 focus:ring-accent-emerald disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Processing...</span>
          </div>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

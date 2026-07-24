import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-2 text-left">
        {label && (
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-text-secondary font-mono">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "w-full rounded-xs border border-border-subtle bg-surface/30 px-4 py-3 text-sm text-text-primary placeholder-text-muted/60 outline-hidden transition-all duration-300 focus:border-accent-emerald/40 focus:bg-surface/60 focus:ring-1 focus:ring-accent-emerald/20 min-h-[100px] resize-y",
            error && "border-error/50 focus:border-error/80 focus:ring-error/20",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-error font-medium mt-1 font-mono">{error}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

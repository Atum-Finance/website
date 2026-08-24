"use client";

import { useId } from "react";

import { cn } from "@/lib/utils";

interface ChoiceOption<T extends string | number> {
  value: T;
  label: string;
  ariaLabel?: string;
}

interface ChoiceGroupProps<T extends string | number> {
  name?: string;
  label: string;
  value: T;
  options: readonly ChoiceOption<T>[];
  onChange: (value: T) => void;
  className?: string;
}

export function ChoiceGroup<T extends string | number>({
  name,
  label,
  value,
  options,
  onChange,
  className,
}: ChoiceGroupProps<T>) {
  const generatedName = useId();
  const groupName = name ?? generatedName;

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn("flex flex-wrap gap-1.5", className)}
    >
      {options.map((option) => {
        const selected = option.value === value;

        return (
          <label
            key={String(option.value)}
            className={cn(
              "inline-flex h-9 min-w-11 cursor-pointer items-center justify-center px-2.5 text-technical tracking-technical transition-colors duration-motion ease-atum",
              selected
                ? "border border-border-active text-accent"
                : "border border-border text-foreground-secondary hover:border-border-hover hover:text-foreground",
            )}
          >
            <input
              type="radio"
              name={groupName}
              className="sr-only"
              checked={selected}
              onChange={() => onChange(option.value)}
              aria-label={option.ariaLabel ?? option.label}
            />
            {option.label}
          </label>
        );
      })}
    </div>
  );
}

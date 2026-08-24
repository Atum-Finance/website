import { cn } from "@/lib/utils";

interface ArrowIconProps {
  className?: string;
}

export function ArrowIcon({ className }: ArrowIconProps) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={cn(
        "transition-transform duration-motion ease-atum group-hover:translate-x-0.5",
        className,
      )}
    >
      <path
        d="M1.5 6h9M7.5 3 10.5 6 7.5 9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

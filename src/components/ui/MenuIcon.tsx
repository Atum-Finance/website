import { cn } from "@/lib/utils";

interface MenuIconProps {
  open: boolean;
}

export function MenuIcon({ open }: MenuIconProps) {
  return (
    <span className="relative block h-3.5 w-[18px]" aria-hidden="true">
      <span
        className={cn(
          "absolute left-0 h-px w-full bg-current transition-transform duration-motion ease-atum",
          open ? "top-[7px] rotate-45" : "top-0.5",
        )}
      />
      <span
        className={cn(
          "absolute left-0 h-px w-full bg-current transition-transform duration-motion ease-atum",
          open ? "top-[7px] -rotate-45" : "top-[13px]",
        )}
      />
    </span>
  );
}

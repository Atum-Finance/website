import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  className?: string;
  density?: "default" | "fine";
}

export function GridBackground({
  className,
  density = "default",
}: GridBackgroundProps) {
  const size = density === "fine" ? "48px 48px" : "72px 72px";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-grid overflow-hidden",
        className,
      )}
    >
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 216, 151, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 216, 151, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: size,
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 18%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 18%, transparent 72%)",
        }}
      />
    </div>
  );
}

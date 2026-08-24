import { cn } from "@/lib/utils";

type LogoSize = "header" | "footer";

interface LogoProps {
  wordmark: string;
  size?: LogoSize;
  className?: string;
}

const markPx: Record<LogoSize, number> = {
  header: 28,
  footer: 32,
};

export function Logo({ wordmark, size = "header", className }: LogoProps) {
  const px = markPx[size];

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width={px}
        height={px}
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M6 22.5h20v5.5H6z"
          className="fill-accent/15"
        />
        <path
          d="M6 22.5h20"
          className="stroke-accent"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
        <path
          d="M6 20.5C10 8.5 18 7 26 17.5"
          className="stroke-current"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-nav font-medium tracking-brand">{wordmark}</span>
    </span>
  );
}

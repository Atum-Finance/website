import { cn } from "@/lib/utils";

interface DataLabelProps {
  label: string;
  value?: string;
  className?: string;
}

export function DataLabel({ label, value, className }: DataLabelProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="text-technical uppercase tracking-technical text-foreground-muted">
        {label}
      </span>
      {value ? (
        <span className="font-medium tabular-nums text-label text-foreground">
          {value}
        </span>
      ) : null}
    </div>
  );
}

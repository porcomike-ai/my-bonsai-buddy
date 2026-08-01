import { cn } from "@/lib/utils";

interface KpiCardProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  hint?: string;
  hintPositive?: boolean;
  hintNegative?: boolean;
  className?: string;
}

export function KpiCard({
  icon,
  label,
  value,
  hint,
  hintPositive,
  hintNegative,
  className,
}: KpiCardProps) {
  return (
    <div className={cn("surface-card p-4", className)}>
      <div className="flex items-center gap-2 text-label">
        <span className="text-muted-foreground">{icon}</span>
        {label}
      </div>
      <div className="mt-2 font-display text-2xl font-semibold tracking-tight">{value}</div>
      {hint && (
        <div
          className={cn(
            "mt-0.5 text-xs",
            hintPositive && "text-sage",
            hintNegative && "text-destructive",
            !hintPositive && !hintNegative && "text-muted-foreground",
          )}
        >
          {hint}
        </div>
      )}
    </div>
  );
}

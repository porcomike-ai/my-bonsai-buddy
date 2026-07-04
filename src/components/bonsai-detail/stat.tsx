import type { ReactNode } from "react";

export function Stat({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-display text-lg font-medium">{value}</dd>
    </div>
  );
}

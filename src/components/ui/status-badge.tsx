import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  Leaf,
  Scissors,
  Sprout,
  TreeDeciduous,
  Star,
  Archive,
  type LucideIcon,
} from "lucide-react";

const badgeVariants = cva(
  "badge-base border transition-colors",
  {
    variants: {
      variant: {
        culture: "border-sage/30 bg-sage/15 text-forest",
        formation: "border-terracotta/30 bg-terracotta/12 text-terracotta",
        mature: "border-forest/25 bg-forest/10 text-forest",
        exposition: "border-peach/40 bg-peach/20 text-bark",
        favori: "border-terracotta/40 bg-terracotta/15 text-terracotta",
        sorti: "border-muted-foreground/20 bg-muted text-muted-foreground",
        default: "border-border bg-secondary text-secondary-foreground",
      },
      size: {
        sm: "px-1.5 py-0.5 text-[10px]",
        md: "px-2 py-0.5 text-[11px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

const ICONS: Record<string, LucideIcon> = {
  culture: Sprout,
  formation: Scissors,
  mature: TreeDeciduous,
  exposition: Leaf,
  favori: Star,
  sorti: Archive,
};

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  label?: string;
  showIcon?: boolean;
}

export function StatusBadge({
  className,
  variant = "default",
  size,
  label,
  showIcon = true,
  children,
  ...props
}: StatusBadgeProps) {
  const Icon = variant && ICONS[variant] ? ICONS[variant] : null;

  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {showIcon && Icon && <Icon className="h-3 w-3 shrink-0" strokeWidth={2.25} />}
      {label ?? children}
    </span>
  );
}

/** Helper métier : mappe l’étape bonsaï vers le variant */
export function etapeToVariant(
  etape?: string | null,
): StatusBadgeProps["variant"] {
  switch (etape) {
    case "culture":
      return "culture";
    case "formation":
      return "formation";
    case "mature":
    case "raffinement":
      return "mature";
    case "exposition":
      return "exposition";
    default:
      return "default";
  }
}

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  Sprout,
  Leaf,
  TreeDeciduous,
  Star,
  Archive,
  type LucideIcon,
} from "lucide-react";
import type { BonsaiEtape } from "@/lib/supabase-data";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold leading-none shadow-sm backdrop-blur-md",
  {
    variants: {
      variant: {
        culture:
          "border-sage/50 bg-background/95 text-forest",
        "pre-bonsai":
          "border-terracotta/50 bg-background/95 text-terracotta",
        bonsai:
          "border-forest/40 bg-background/95 text-forest",
        favori:
          "border-terracotta/50 bg-background/95 text-terracotta",
        sorti:
          "border-muted-foreground/30 bg-background/95 text-muted-foreground",
        default:
          "border-border bg-background/95 text-secondary-foreground",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-2.5 py-1 text-[11px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

const ICONS: Partial<Record<NonNullable<StatusBadgeProps["variant"]>, LucideIcon>> = {
  culture: Sprout,
  "pre-bonsai": Leaf,
  bonsai: TreeDeciduous,
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
  const Icon = variant ? ICONS[variant] : null;

  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {showIcon && Icon && <Icon className="h-3 w-3 shrink-0" strokeWidth={2.5} />}
      {label ?? children}
    </span>
  );
}

/** Mappe l’étape métier vers le variant du badge */
export function etapeToVariant(etape?: BonsaiEtape | null): StatusBadgeProps["variant"] {
  switch (etape) {
    case "culture":
      return "culture";
    case "pre-bonsai":
      return "pre-bonsai";
    case "bonsai":
      return "bonsai";
    default:
      return "default";
  }
}

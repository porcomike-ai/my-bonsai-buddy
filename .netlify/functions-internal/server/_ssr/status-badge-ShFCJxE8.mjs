import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { d as cn } from "./router-BaPlfOky.mjs";
import { f as Sprout, g as Container, n as Archive, o as Star, T as TreeDeciduous, j as Leaf } from "../_libs/lucide-react.mjs";
const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold leading-none shadow-sm backdrop-blur-md",
  {
    variants: {
      variant: {
        culture: "border-sage/50 bg-background/95 text-forest",
        "pre-bonsai": "border-terracotta/50 bg-background/95 text-terracotta",
        bonsai: "border-forest/40 bg-background/95 text-forest",
        favori: "border-terracotta/50 bg-background/95 text-terracotta",
        sorti: "border-muted-foreground/30 bg-background/95 text-muted-foreground",
        libre: "border-muted-foreground/30 bg-background/95 text-muted-foreground",
        plantee: "border-sage/50 bg-background/95 text-forest",
        default: "border-border bg-background/95 text-secondary-foreground"
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-2.5 py-1 text-[11px]"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
const ICONS = {
  culture: Sprout,
  "pre-bonsai": Leaf,
  bonsai: TreeDeciduous,
  favori: Star,
  sorti: Archive,
  libre: Container,
  plantee: Sprout
};
function StatusBadge({
  className,
  variant = "default",
  size,
  label,
  showIcon = true,
  children,
  ...props
}) {
  const Icon = variant ? ICONS[variant] : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn(badgeVariants({ variant, size }), className), ...props, children: [
    showIcon && Icon && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3 w-3 shrink-0", strokeWidth: 2.5 }),
    label ?? children
  ] });
}
function etapeToVariant(etape) {
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
export {
  StatusBadge as S,
  etapeToVariant as e
};

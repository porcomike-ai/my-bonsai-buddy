import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { f as useRouterState, L as Link } from "../_libs/tanstack__react-router.mjs";
import { q as cn, p as listEvenements, m as saveEvenement } from "./router-C3eaBvs2.mjs";
import { f as Leaf, g as LayoutDashboard, d as Sprout, e as Container, b as Calendar, B as BookOpen, c as ChartBar, h as Settings } from "../_libs/lucide-react.mjs";
async function requestNotificationPermission() {
  if (typeof window === "undefined" || !("Notification" in window)) return "denied";
  if (Notification.permission === "default") {
    try {
      return await Notification.requestPermission();
    } catch {
      return "denied";
    }
  }
  return Notification.permission;
}
function notificationStatus() {
  if (typeof window === "undefined" || !("Notification" in window)) return "unsupported";
  return Notification.permission;
}
function triggerTimeFor(e) {
  const ts = new Date(e.dateHeure).getTime();
  const minutesBefore = e.rappelMinutes ?? 0;
  return ts - minutesBefore * 6e4;
}
async function fireNotification(e) {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  try {
    const eventDate = new Date(e.dateHeure);
    const body = e.description ? `${eventDate.toLocaleString("fr-FR")} — ${e.description}` : eventDate.toLocaleString("fr-FR");
    new Notification(`🌱 ${e.titre}`, {
      body,
      tag: `evenement-${e.id}`,
      icon: "/favicon.ico"
    });
  } catch {
  }
  await saveEvenement({ ...e, notifiedAt: (/* @__PURE__ */ new Date()).toISOString() });
}
let intervalId = null;
async function check() {
  try {
    const now = Date.now();
    const evs = await listEvenements();
    for (const e of evs) {
      if (e.notifiedAt) continue;
      const trigger = triggerTimeFor(e);
      if (trigger <= now && new Date(e.dateHeure).getTime() + 24 * 36e5 > now) {
        await fireNotification(e);
      }
    }
  } catch {
  }
}
function startNotificationScheduler() {
  if (typeof window === "undefined") return;
  if (intervalId) return;
  setTimeout(check, 2e3);
  intervalId = setInterval(check, 3e4);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") check();
  });
}
const NAV = [
  { to: "/", label: "Tableau de bord", icon: LayoutDashboard },
  { to: "/collection", label: "Mes bonsaïs", icon: Sprout },
  { to: "/poteries", label: "Poteries", icon: Container },
  { to: "/calendrier", label: "Calendrier", icon: Calendar },
  { to: "/journal", label: "Journal", icon: BookOpen },
  { to: "/statistiques", label: "Statistiques", icon: ChartBar },
  { to: "/parametres", label: "Paramètres", icon: Settings }
];
function AppShell({ children }) {
  const { location } = useRouterState();
  reactExports.useEffect(() => {
    startNotificationScheduler();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-6 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "group flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "h-4.5 w-4.5", strokeWidth: 2.25 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg font-semibold tracking-tight", children: "Bonsaï Studio" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-[0.18em] text-muted-foreground", children: "Carnet de collection" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden items-center gap-1 md:flex", children: NAV.map((item) => {
          const active = item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
          const Icon = item.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: item.to,
              className: cn(
                "flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
                item.label
              ]
            },
            item.to
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex gap-1 overflow-x-auto border-t border-border/60 px-4 py-2 md:hidden", children: NAV.map((item) => {
        const active = item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
        const Icon = item.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: item.to,
            className: cn(
              "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium",
              active ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }),
              item.label
            ]
          },
          item.to
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mx-auto max-w-7xl px-6 py-10", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border/60 py-6 text-center text-xs text-muted-foreground", children: "Bonsaï Studio · vos données sont synchronisées via Supabase" })
  ] });
}
export {
  AppShell as A,
  notificationStatus as n,
  requestNotificationPermission as r
};

import { Link, useLocation } from "@tanstack/react-router";
import { MLogo } from "./MLogo";
import { ShoppingBag } from "lucide-react";

export function BottomNav() {
  const loc = useLocation();
  const path = loc.pathname;
  const items = [
    { key: "home", label: "Home", to: "/" as const, sub: "" },
    { key: "fwd", label: "fwd", to: "/" as const, sub: "Under ₹999" },
    { key: "mnow", label: "M-Now", to: "/" as const, sub: "From 30 min" },
    { key: "luxe", label: "LUXE", to: "/" as const, sub: "Luxury" },
    { key: "bag", label: "Bag", to: "/cart" as const, sub: "" },
  ];
  return (
    <nav className="sticky bottom-0 left-0 right-0 z-40 bg-white border-t border-border h-[68px] grid grid-cols-5 text-[10px]">
      {items.map((i) => {
        const active = (i.key === "home" && path === "/") || (i.key === "bag" && path === "/cart");
        return (
          <Link key={i.key} to={i.to} className="flex flex-col items-center justify-center gap-0.5 pt-1">
            {i.key === "home" && <MLogo className="h-5 w-5" />}
            {i.key === "fwd" && (
              <span className="text-[15px] font-extrabold italic" style={{ color: active ? "#FF3F6C" : "#282C3F" }}>
                fwd
              </span>
            )}
            {i.key === "mnow" && <MLogo className="h-5 w-5" />}
            {i.key === "luxe" && <span className="text-[11px] tracking-[0.2em] font-semibold">LUXE</span>}
            {i.key === "bag" && (
              <ShoppingBag className="h-5 w-5" strokeWidth={2} color={active ? "#FF3F6C" : "#282C3F"} />
            )}
            <span className={active ? "text-[#FF3F6C] font-semibold" : "text-foreground"}>
              {i.key === "home" || i.key === "bag" ? i.label : i.sub}
            </span>
            {i.key !== "home" && i.key !== "bag" && i.label !== i.sub && (
              <span className="text-muted-foreground text-[9px]">{i.label !== "fwd" ? "" : ""}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, Mic, Camera } from "lucide-react";
import { MLogo } from "@/components/MLogo";
import { setShop, useShop } from "@/lib/shop-store";

export function SearchBar({
  variant = "yellow",
  compact = false,
}: {
  variant?: "yellow" | "plain";
  compact?: boolean;
}) {
  const shop = useShop();
  const nav = useNavigate();
  const [val, setVal] = useState(shop.searchQuery || "Formal Shirts for Men");

  const submit = (e?: FormEvent) => {
    e?.preventDefault();
    const q = val.trim() || "Formal Shirts for Men";
    setShop({ searchQuery: q });
    nav({ to: "/listing" });
  };

  return (
    <form
      onSubmit={submit}
      className={`flex-1 flex items-center gap-2 bg-white rounded-lg pl-2 pr-2 ${compact ? "h-9" : "h-10"} border ${variant === "yellow" ? "border-white/60" : "border-border"} shadow-sm`}
    >
      <MLogo className="h-5 w-5 shrink-0" />
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Formal Shirts for Men"
        className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground min-w-0"
      />
      <button type="submit" aria-label="Search" className="shrink-0 p-1">
        <Search className="h-4 w-4 text-[#FF3F6C]" />
      </button>
      {!compact && (
        <>
          <Mic className="h-4 w-4 text-muted-foreground shrink-0" />
          <Camera className="h-4 w-4 text-muted-foreground shrink-0" />
        </>
      )}
    </form>
  );
}

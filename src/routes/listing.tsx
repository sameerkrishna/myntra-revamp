import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Heart, ShoppingBag, MapPin, ChevronDown, ArrowDownUp, SlidersHorizontal } from "lucide-react";
import { MobileFrame } from "@/components/MobileFrame";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { useShop } from "@/lib/shop-store";
import { LISTING } from "@/lib/products";
import { MLogo } from "@/components/MLogo";
import catCotton from "@/assets/cat-cotton.jpg";
import catLinen from "@/assets/cat-linen.jpg";
import catCuban from "@/assets/cat-cuban.jpg";
import catOversized from "@/assets/cat-oversized.jpg";
import catTextured from "@/assets/cat-textured.jpg";

export const Route = createFileRoute("/listing")({
  head: () => ({
    meta: [
      { title: "Formal Shirts for Men — Myntra" },
      { name: "description", content: "Shop formal shirts for men with Fit Score recommendations." },
    ],
  }),
  component: Listing,
});

const chips = [
  { label: "Crazy Deal", icon: "🏷️" },
  { label: "30Day BestPrice", icon: "₹" },
  { label: "Top Brands", icon: "★" },
];
const cats = [
  { label: "Linen", img: catLinen },
  { label: "Cotton", img: catCotton },
  { label: "Cuban Collar", img: catCuban },
  { label: "Oversized", img: catOversized },
  { label: "Textured", img: catTextured },
  { label: "Beach", img: catLinen },
];

function Listing() {
  return (
    <MobileFrame pad={false}>
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-white">
        <div className="flex items-center gap-2 px-3 h-12 border-b border-border">
          <Link to="/"><ArrowLeft className="h-5 w-5" /></Link>
          <MLogo className="h-6 w-6" />
          <span className="text-[13px] font-extrabold tracking-wide flex-1 truncate">FORMAL SHIRTS FOR ME…</span>
          <Search className="h-5 w-5" />
          <Heart className="h-5 w-5" />
          <ShoppingBag className="h-5 w-5" />
        </div>
        <div className="bg-[#F4F1FA] px-3 py-2 flex items-center gap-1 text-[12.5px]">
          <MapPin className="h-3.5 w-3.5" /><span className="font-bold">110002</span>
          <ChevronDown className="h-3.5 w-3.5 ml-auto" />
        </div>
      </div>

      {/* Filter chips */}
      <div className="bg-white px-3 py-3 flex gap-2 overflow-x-auto no-scrollbar border-b border-border">
        {chips.map((c) => (
          <button key={c.label} className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-border px-3 h-8 text-[12.5px] font-semibold">
            <span>{c.icon}</span>{c.label}
          </button>
        ))}
      </div>

      {/* Category circles */}
      <div className="bg-white px-3 py-3 flex gap-3 overflow-x-auto no-scrollbar border-b border-border">
        {cats.map((c) => (
          <div key={c.label} className="shrink-0 w-16 flex flex-col items-center gap-1">
            <div className="h-16 w-16 rounded-full bg-secondary overflow-hidden">
              <img src={c.img} alt={c.label} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <span className="text-[11px] text-center font-semibold">{c.label}</span>
          </div>
        ))}
      </div>

      {/* Inline banner */}
      <div className="bg-white px-3 py-3">
        <div className="rounded-xl overflow-hidden border border-border flex">
          <img src={catLinen} alt="" loading="lazy" className="w-1/2 h-28 object-cover" />
          <div className="w-1/2 p-3 flex flex-col justify-center bg-white">
            <div className="flex items-center gap-1 text-[12px] font-bold"><MLogo className="h-4 w-4" /><span>now</span></div>
            <div className="text-[11px]">Delivery starting from <span className="text-[#FF3F6C] font-bold">30 min</span></div>
            <div className="mt-1 text-[11px] font-extrabold tracking-wide">LINEN CLUB</div>
            <div className="text-[11px] text-muted-foreground">Shirts, Trousers & More</div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-px bg-border">
        {LISTING.map((p) => (
          <ProductCard key={p.id} p={p} to="/product" />
        ))}
      </div>

      {/* Sticky Sort/Filter */}
      <div className="sticky bottom-0 left-0 right-0 grid grid-cols-2 bg-white border-t border-border h-12 text-[13px] font-bold">
        <button className="flex items-center justify-center gap-2 border-r border-border"><ArrowDownUp className="h-4 w-4" /> SORT</button>
        <button className="flex items-center justify-center gap-2"><SlidersHorizontal className="h-4 w-4" /> FILTER</button>
      </div>
    </MobileFrame>
  );
}

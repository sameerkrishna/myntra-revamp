import { Link } from "@tanstack/react-router";
import { Heart, Star, Sparkles } from "lucide-react";
import { setShop } from "@/lib/shop-store";
import { getFitScore, scoreColor } from "@/lib/fit-score";

export type Product = {
  id: string;
  brand: string;
  title: string;
  price: number;
  mrp: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
  tag?: string;
  bestPrice?: number;
  fitScore?: number;
  ad?: boolean;
};

export function ProductCard({ p, to }: { p: Product; to?: "/product" }) {
  const listingScore = getFitScore(p.id, "39");
  const listingColor = listingScore != null ? scoreColor(listingScore) : "#5A3FBF";
  const handleClick = () => {
    setShop({
      selectedProductImage: p.image,
      selectedProductId: p.id,
      selectedProduct: {
        id: p.id, brand: p.brand, title: p.title,
        price: p.price, mrp: p.mrp, discount: p.discount,
        fitScore: listingScore ?? p.fitScore, image: p.image,
      },
    });
  };
  const card = (
    <div className="bg-white overflow-hidden">
      <div className="relative bg-secondary aspect-[3/4]">
        <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover" />
        {p.ad && (
          <span className="absolute top-2 right-2 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded">AD</span>
        )}
        <button className="absolute bottom-2 right-2 h-7 w-7 rounded-full bg-white shadow flex items-center justify-center" aria-label="wishlist">
          <Heart className="h-3.5 w-3.5 text-foreground" />
        </button>
        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/95 rounded px-1.5 py-0.5 text-[10px] font-semibold shadow-sm">
          {p.rating} <Star className="h-2.5 w-2.5 fill-[#03A685] text-[#03A685]" /> <span className="text-muted-foreground">| {p.reviews}</span>
        </div>
        {listingScore != null && (
          <span
            className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-white text-[10px] font-bold px-2 py-0.5 border shadow-sm"
            style={{ color: listingColor, borderColor: listingColor }}
          >
            <Sparkles className="h-2.5 w-2.5" style={{ color: listingColor }} />
            Fit {listingScore}%
          </span>
        )}
      </div>
      <div className="px-2 pt-2 pb-3">
        {p.tag && (
          <span className="inline-block mb-1 rounded-sm bg-[#FFE7EE] text-[#F13AB1] text-[10px] font-bold px-1.5 py-0.5">{p.tag}</span>
        )}
        <div className="text-[13px] font-extrabold truncate">{p.brand}</div>
        <div className="text-[12px] text-muted-foreground truncate">{p.title}</div>
        <div className="mt-1 flex items-baseline gap-1.5">
          <span className="text-[13px] font-extrabold">₹{p.price.toLocaleString("en-IN")}</span>
          <span className="text-[11px] text-muted-foreground line-through">₹{p.mrp.toLocaleString("en-IN")}</span>
          <span className="text-[11px] font-bold text-[#FF905A]">{p.discount}% OFF</span>
        </div>
        {p.bestPrice && (
          <div className="mt-0.5 text-[10.5px] font-semibold text-[#03A685]">
            Best Price ₹{p.bestPrice.toLocaleString("en-IN")} with coupon
          </div>
        )}
      </div>
    </div>
  );
  return to ? <Link to={to} onClick={handleClick}>{card}</Link> : card;
}

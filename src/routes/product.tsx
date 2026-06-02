import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Heart, ShoppingBag, MapPin, ChevronRight, Share2, Play, Layers, Star, Truck, RotateCcw, Zap } from "lucide-react";
import { MLogo } from "@/components/MLogo";
import { MobileFrame } from "@/components/MobileFrame";
import { SearchBar } from "@/components/SearchBar";
import { FitScoreCard } from "@/components/FitScoreCard";
import { AskFriendsButton } from "@/components/AskFriendsSheet";
import { SizeSheet } from "@/components/SizeSheet";
import { PRIMARY_PRODUCT } from "@/lib/products";
import { setShop, useShop } from "@/lib/shop-store";
import { toast } from "sonner";
import shirt1 from "@/assets/shirt-white-1.jpg";
import shirt2 from "@/assets/shirt-white-2.jpg";
import shirt3 from "@/assets/shirt-white-3.jpg";
import sBlue from "@/assets/shirt-blue-linen.jpg";
import sOlive from "@/assets/shirt-olive.jpg";
import sTex from "@/assets/shirt-textured.jpg";
import sBlk from "@/assets/shirt-black.jpg";

export const Route = createFileRoute("/product")({
  head: () => ({
    meta: [
      { title: "Louis Philippe Slim Fit Formal Shirt — Myntra" },
      { name: "description", content: "Premium cotton slim fit formal shirt with Fit Score and friend feedback." },
    ],
  }),
  component: Product,
});

const SIZES = ["39", "40", "42"];
const COLORS = [sBlue, sOlive, sTex, shirt1, sBlk];

function Product() {
  const shop = useShop();
  const nav = useNavigate();
  const [imgIdx, setImgIdx] = useState(0);
  const [sizeOpen, setSizeOpen] = useState(false);
  const sp = shop.selectedProduct;
  const brand = sp?.brand ?? PRIMARY_PRODUCT.brand;
  const title = sp?.title ?? "Men Slim Fit Easy to Iron Premium Cotton Full Sleeve Formal Shirt";
  const price = sp?.price ?? PRIMARY_PRODUCT.price;
  const mrp = sp?.mrp ?? PRIMARY_PRODUCT.mrp;
  const discount = sp?.discount ?? PRIMARY_PRODUCT.discount;
  const fitScore = sp?.fitScore ?? PRIMARY_PRODUCT.fitScore ?? 87;
  const heroImg = shop.selectedProductImage ?? shirt1;
  const baseImages = [shirt1, shirt2, shirt3];
  const images = !baseImages.includes(heroImg)
    ? [heroImg, shirt2, shirt3]
    : baseImages;

  const goCart = () => {
    setShop({ inCart: true });
    nav({ to: "/cart" });
  };
  const handleAdd = () => {
    if (!shop.selectedSize) setSizeOpen(true);
    else { toast.success("Added to bag"); goCart(); }
  };

  return (
    <MobileFrame pad={false}>
      {/* Sticky top */}
      <div className="sticky top-0 z-30 bg-white">
        <div className="flex items-center gap-2 px-3 h-12">
          <Link to="/listing"><ArrowLeft className="h-5 w-5" /></Link>
          <SearchBar variant="plain" compact />
          <Heart className="h-5 w-5 shrink-0" />
          <ShoppingBag className="h-5 w-5 shrink-0" />
        </div>
      </div>

      {/* Sponsored strip */}
      <div className="flex items-center gap-2 px-3 py-2 border-y border-border bg-white">
        <img src={shirt1} alt="" className="h-12 w-10 rounded object-cover" />
        <div className="flex-1 min-w-0">
          <div className="text-[12px]"><span className="font-extrabold">Louis Philippe</span> <span className="text-muted-foreground truncate">Men Slim Fit Easy to Iron Premium Cotton F…</span></div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="flex items-center gap-0.5 bg-[#E6F7F2] text-[#03A685] text-[10px] font-bold px-1 rounded">4.4 <Star className="h-2.5 w-2.5 fill-[#03A685] text-[#03A685]" /></span>
            <span className="text-[11px] text-muted-foreground line-through">₹2,499</span>
            <span className="text-[11px] font-extrabold">₹1,249</span>
            <span className="text-[11px] font-bold text-[#FF905A]">50% Off</span>
          </div>
        </div>
        <span className="text-[10px] text-muted-foreground border border-border rounded px-1">AD</span>
        <Link to="." className="text-[12px] font-bold text-[#FF3F6C] flex items-center">View <ChevronRight className="h-3.5 w-3.5" /></Link>
      </div>

      {/* Gallery */}
      <div className="relative bg-secondary">
        <span className="absolute top-3 left-0 z-10 bg-[#F13AB1] text-white text-[11px] font-bold px-3 py-1 rounded-r-md">Crazy Deal</span>
        <img src={images[imgIdx]} alt="Louis Philippe shirt" className="w-full aspect-[3/4] object-cover" />
        <button className="absolute bottom-3 left-3 rounded-full bg-white shadow px-3 py-1.5 text-[12px] font-semibold inline-flex items-center gap-1.5">
          <Layers className="h-3.5 w-3.5" /> View Similar
        </button>
        <div className="absolute bottom-3 right-3 bg-white shadow rounded px-2 py-1 text-[12px] font-semibold flex items-center gap-1">
          {PRIMARY_PRODUCT.rating} <Star className="h-3 w-3 fill-[#03A685] text-[#03A685]" /> <span className="text-muted-foreground">| {PRIMARY_PRODUCT.reviews}</span>
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          <div className="h-14 w-12 rounded-lg bg-white shadow p-0.5">
            <div className="relative h-full w-full">
              <img src={shirt2} alt="" className="h-full w-full object-cover rounded" />
              <span className="absolute top-0 left-0 right-0 bg-black/70 text-white text-[8px] text-center rounded-t">LOOKS</span>
            </div>
          </div>
          <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-[#FF905A] to-[#F13AB1] p-[2px]">
            <div className="h-full w-full rounded-full overflow-hidden bg-white relative">
              <img src={shirt3} alt="" className="h-full w-full object-cover" />
              <Play className="absolute inset-0 m-auto h-4 w-4 text-white fill-white" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-1 py-2 bg-white">
        {images.map((_, i) => (
          <button key={i} onClick={() => setImgIdx(i)} className={`h-1.5 rounded-full ${i === imgIdx ? "w-4 bg-[#FF3F6C]" : "w-1.5 bg-border"}`} />
        ))}
      </div>

      {/* Title + price */}
      <div className="bg-white px-4 pb-3">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h1 className="text-[16px] leading-snug"><span className="font-extrabold">{brand}</span> <span className="text-foreground">{title}</span></h1>
          </div>
          <div className="flex gap-2">
            <button className="h-9 w-9 rounded-lg border border-border flex items-center justify-center"><Share2 className="h-4 w-4" /></button>
            <button className="h-9 w-9 rounded-lg border border-border flex items-center justify-center"><Heart className="h-4 w-4" /></button>
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-[12px] text-muted-foreground">MRP <span className="line-through">₹{mrp.toLocaleString("en-IN")}</span></span>
          <span className="text-[18px] font-extrabold">₹{price.toLocaleString("en-IN")}</span>
          <span className="bg-[#FF3F6C] text-white text-[11px] font-bold px-2 py-0.5 rounded">{discount}% OFF!</span>
        </div>

        {/* Coupon */}
        <div className="mt-3 rounded-xl border border-border overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 bg-[#F6F2FB]">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold bg-gradient-to-r from-[#FF905A] to-[#F13AB1] text-white px-1.5 py-0.5 rounded">MEGA DEAL</span>
              <span className="text-[13px] font-bold">Get at ₹955</span>
            </div>
            <span className="text-[11px] font-bold bg-[#03A685] text-white px-2 py-1 rounded">Extra ₹294 Off</span>
          </div>
          <div className="flex items-center justify-between px-3 py-2 bg-white text-[12px]">
            <span>With Coupon + <span className="text-[#F13AB1] font-bold">Bank Offer</span></span>
            <span className="text-[#FF3F6C] font-bold flex items-center">Details <ChevronRight className="h-3.5 w-3.5" /></span>
          </div>
        </div>

        {/* Colour */}
        <div className="mt-4">
          <div className="text-[13px]"><span className="font-extrabold">Colour</span> <span className="text-muted-foreground">White</span></div>
          <div className="mt-2 flex gap-2 overflow-x-auto no-scrollbar">
            {COLORS.map((src, i) => (
              <button key={i} className={`shrink-0 h-16 w-14 rounded-lg overflow-hidden border-2 ${i === 3 ? "border-[#FF3F6C]" : "border-transparent"}`}>
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Size */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div className="text-[13px] font-extrabold">Select Size</div>
            <button className="text-[12px] font-semibold text-[#FF3F6C] flex items-center">Size Chart <ChevronRight className="h-4 w-4" /></button>
          </div>
          <div className="mt-2 flex gap-3">
            {SIZES.map((s) => {
              const on = shop.selectedSize === s;
              return (
                <button key={s} onClick={() => setShop({ selectedSize: s })}
                  className={`h-12 w-12 rounded-full border text-[14px] font-semibold ${on ? "border-[#FF3F6C] text-[#FF3F6C] bg-[#FFF0F4]" : "border-border bg-white text-foreground"}`}>
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {/* CTAs after size selection */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button onClick={handleAdd} className="rounded-md border border-[#FF3F6C] text-[#FF3F6C] font-extrabold py-3 text-[13px] flex items-center justify-center gap-2 bg-white">
            <Zap className="h-4 w-4 fill-[#FF3F6C]" /> BUY NOW
          </button>
          <button onClick={handleAdd} className="rounded-md bg-[#FF3F6C] text-white font-extrabold py-3 text-[13px] flex items-center justify-center gap-2">
            <ShoppingBag className="h-4 w-4" /> ADD TO BAG
          </button>
        </div>
      </div>

      {/* New features */}
      <FitScoreCard size={shop.selectedSize} productId={sp?.id ?? PRIMARY_PRODUCT.id} />

      <AskFriendsButton />


      {/* Delivery & specs */}
      <div className="bg-background px-4 py-4 space-y-3">
        <h2 className="text-[15px] font-extrabold">Delivery &amp; Services</h2>
        <div className="rounded-xl border border-border bg-white px-3 py-2.5 flex items-center text-[13px]">
          <MapPin className="h-4 w-4 mr-1.5" /><span className="font-bold">110002</span>
          <span className="ml-auto text-[12px] font-semibold underline decoration-dotted">Change</span>
        </div>
        <div className="rounded-xl border border-[#FFD2DF] bg-[#FFF5F8] p-3 flex items-start gap-2">
          <span className="h-5 w-5 rounded-full bg-[#FF3F6C] text-white flex items-center justify-center text-[10px]">✓</span>
          <div className="flex-1">
            <div className="text-[11px] font-extrabold tracking-wide flex items-center gap-1"><MLogo className="h-3.5 w-3.5" /> EXPRESS<span className="text-[#FF3F6C]">+</span></div>
            <div className="text-[13px] font-bold">Get it by Tomorrow</div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-muted-foreground">MRP <span className="line-through">₹2499</span></div>
            <div className="text-[12.5px] font-extrabold">₹1249 <span className="text-[#FF905A] text-[11px]">(50% OFF)</span></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-border bg-white p-3 flex items-center gap-2">
            <span className="h-8 w-8 rounded bg-[#E6F7F2] text-[#03A685] flex items-center justify-center"><Truck className="h-4 w-4" /></span>
            <div className="text-[12px]"><div className="font-bold">Pay on Delivery</div><div className="text-muted-foreground text-[11px]">Charges applicable</div></div>
          </div>
          <div className="rounded-xl border border-border bg-white p-3 flex items-center gap-2">
            <span className="h-8 w-8 rounded bg-[#E6F7F2] text-[#03A685] flex items-center justify-center"><RotateCcw className="h-4 w-4" /></span>
            <div className="text-[12px]"><div className="font-bold">14 Day</div><div className="text-muted-foreground text-[11px]">Return &amp; Exchange</div></div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-4 grid grid-cols-2 gap-y-3 gap-x-2 text-[12.5px]">
          {[
            ["Weave Pattern", "Regular"],
            ["Transparency", "Opaque"],
            ["Fit", "Slim Fit"],
            ["Sustainable", "Regular"],
            ["Fabrics", "Cotton"],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="font-bold">{k}</div>
              <div className="text-muted-foreground">{v}</div>
            </div>
          ))}
          <div className="col-span-2 pt-2 border-t border-border">
            <div className="font-bold mb-1">Product Details</div>
            <p className="text-muted-foreground leading-snug">White textured self design opaque formal shirt, has a cutaway collar, button placket, 1 patch pocket, long regular sleeves, curved hem.</p>
          </div>
          <div className="col-span-2">
            <div className="font-bold mb-1">Material &amp; Care</div>
            <p className="text-muted-foreground leading-snug">100% Cotton · Machine Wash</p>
          </div>
        </div>

        <h2 className="text-[15px] font-extrabold pt-2">Ratings &amp; Reviews</h2>
        <div className="rounded-xl border border-border bg-white p-3 flex items-center gap-3">
          <div className="text-[28px] font-extrabold leading-none">4.5<span className="text-[14px]"> ★</span></div>
          <div className="text-[12px] text-muted-foreground">963 verified ratings · Mostly love the fit and easy-iron fabric.</div>
        </div>
      </div>


      <SizeSheet
        open={sizeOpen}
        onOpenChange={setSizeOpen}
        sizes={SIZES}
        initial={shop.selectedSize}
        onDone={(s) => { setShop({ selectedSize: s, inCart: true }); toast.success(`Size ${s} added to bag`); nav({ to: "/cart" }); }}
      />
    </MobileFrame>
  );
}

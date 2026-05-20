import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MapPin, ChevronDown, Heart, Share2, Trash2, ChevronRight, Truck, ShieldCheck, Users, Sparkles, Info } from "lucide-react";
import { MobileFrame } from "@/components/MobileFrame";
import { MLogo } from "@/components/MLogo";
import { AskFriendsSheet } from "@/components/AskFriendsSheet";


import { setShop, useShop } from "@/lib/shop-store";
import { toast } from "sonner";
import shirt from "@/assets/shirt-white-1.jpg";
import capRed from "@/assets/cap-red.jpg";
import capBlack from "@/assets/cap-black.jpg";
import capGrey from "@/assets/cap-grey.jpg";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — Myntra" },
      { name: "description", content: "Review your bag with Purchase Confidence powered by Fit Score and friend feedback." },
    ],
  }),
  component: Cart,
});

const SECTIONS = [
  { id: "items", label: "Items" },
  { id: "coupons", label: "Coupons & Bank Offers" },
  { id: "price", label: "Price Details" },
] as const;
type SectionId = (typeof SECTIONS)[number]["id"];

const SIZES = ["39", "40", "42"];

function Cart() {
  const shop = useShop();
  const [askOpen, setAskOpen] = useState(false);
  const [askInitial, setAskInitial] = useState<"compose" | "result">("compose");

  
  const [active, setActive] = useState<SectionId>("items");
  const size = shop.selectedSize ?? "39";
  const qty = shop.qty ?? 1;
  const sp = shop.selectedProduct;
  const unitPrice = sp?.price ?? 1249;
  const unitMrp = sp?.mrp ?? 2499;
  const discountPct = sp?.discount ?? 50;
  const fitScore = sp?.fitScore ?? 87;
  const brand = sp?.brand ?? "Louis Philippe";
  const title = sp?.title ?? "Men Slim Fit Easy to Iron Premium Cott…";
  const recCount = MOCK_FEEDBACK.filter((f) => f.recommend).length;

  const sectionRefs = useRef<Record<SectionId, HTMLElement | null>>({ items: null, coupons: null, price: null });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.getAttribute("data-section") as SectionId);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.5, 1] }
    );
    Object.values(sectionRefs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: SectionId) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const totalMrp = unitMrp * qty;
  const total = unitPrice * qty;
  const discount = totalMrp - total;
  const platform = 23;
  const grand = total + platform;

  const openFeedback = () => {
    if (!shop.askedFriends) setShop({ askedFriends: true, feedback: MOCK_FEEDBACK });
    setAskInitial("result"); setAskOpen(true);
  };
  const openAskAgain = () => { setAskInitial("compose"); setAskOpen(true); };

  return (
    <MobileFrame pad={false}>
      {/* Top */}
      <div className="bg-white sticky top-0 z-30">
        <div className="flex items-center gap-3 px-3 h-12">
          <Link to="/product"><ArrowLeft className="h-5 w-5" /></Link>
          <div className="flex items-center gap-1 text-[14px]"><span className="font-bold">110002</span><ChevronDown className="h-4 w-4" /></div>
          <Heart className="h-5 w-5 ml-auto" />
        </div>
        <div className="px-3 pb-2 flex gap-2 text-[13px] border-b border-border overflow-x-auto no-scrollbar">
          {SECTIONS.map((s) => {
            const on = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`shrink-0 px-3 py-1.5 rounded-full border transition-colors ${on ? "border-[#FF3F6C] text-[#FF3F6C] font-bold bg-[#FFF0F4]" : "border-border text-muted-foreground"}`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ITEMS */}
      <section data-section="items" ref={(el) => { sectionRefs.current.items = el; }} className="px-3 py-3 space-y-3 scroll-mt-24">
        <div className="flex items-center gap-2">
          <h2 className="text-[15px] font-extrabold">Your Bag</h2>
        </div>
        <div className="flex items-center gap-2 text-[13px]">
          <span className="h-5 w-5 rounded bg-[#FF3F6C] text-white flex items-center justify-center text-[11px]">✓</span>
          <span className="font-bold">1/1 Items Selected</span>
          <span className="text-[#FF3F6C] font-bold">(₹{grand.toLocaleString("en-IN")})</span>
          <div className="ml-auto flex items-center gap-3">
            <Share2 className="h-4 w-4" /><Trash2 className="h-4 w-4" /><Heart className="h-4 w-4" />
          </div>
        </div>

        <Link to="/product" className="block bg-white rounded-2xl p-3 flex gap-3 border border-border">
          <img src={sp?.image ?? shop.selectedProductImage ?? shirt} alt="" className="h-28 w-24 rounded-lg object-cover" />
          <div className="flex-1 min-w-0">
            <div className="text-[14px] font-extrabold">{brand}</div>
            <div className="text-[12px] text-muted-foreground truncate">{title}</div>
            <div className="mt-2 flex gap-2">
              <div className="relative">
                <select
                  value={size}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  onChange={(e) => { setShop({ selectedSize: e.target.value }); toast.success(`Size updated to ${e.target.value}`); }}
                  className="appearance-none rounded-md border border-border text-[12px] pl-2 pr-6 py-1 bg-white font-medium cursor-pointer"
                >
                  {SIZES.map((s) => <option key={s} value={s}>Size: {s}</option>)}
                </select>
                <ChevronDown className="h-3 w-3 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={qty}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  onChange={(e) => { setShop({ qty: Number(e.target.value) }); toast.success(`Quantity set to ${e.target.value}`); }}
                  className="appearance-none rounded-md border border-border text-[12px] pl-2 pr-6 py-1 bg-white font-medium cursor-pointer"
                >
                  {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>Qty: {n}</option>)}
                </select>
                <ChevronDown className="h-3 w-3 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-[14px] font-extrabold">₹{unitPrice.toLocaleString("en-IN")}</span>
              <span className="text-[11px] line-through text-muted-foreground">₹{unitMrp.toLocaleString("en-IN")}</span>
              <span className="text-[11px] font-bold text-[#FF905A]">{discountPct}% Off</span>
              <Info className="h-3 w-3 text-muted-foreground ml-0.5" />
            </div>
            <div className="mt-1.5 text-[11.5px] text-muted-foreground flex items-center gap-1">↻ 14 days return</div>
            <div className="mt-0.5 text-[11.5px] flex items-center gap-1"><MLogo className="h-3 w-3" /><span className="font-extrabold">EXPRESS+</span><span className="text-muted-foreground">Delivery by</span><span className="text-[#03A685] font-bold">Tomorrow</span></div>
          </div>
        </Link>

        {/* Purchase Confidence */}
        <div className="bg-white rounded-2xl p-3 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-7 w-7 rounded-full bg-[#F3EEFF] text-[#5A3FBF] flex items-center justify-center"><Sparkles className="h-4 w-4" /></span>
            <span className="text-[13px] font-extrabold">Purchase Confidence</span>
            <span className="ml-auto text-[11px] font-bold bg-[#F3EEFF] text-[#5A3FBF] border border-[#C9B8F5] rounded-full px-2 py-0.5">Fit Score {fitScore}%</span>
          </div>
          <div className="rounded-xl bg-[#F6F2FB] p-2.5 flex items-center gap-2">
            <Users className="h-4 w-4 text-[#F13AB1]" />
            <div className="text-[12.5px] leading-snug">
              <span className="font-bold">{shop.askedFriends ? `${recCount} friends recommend buying.` : "Ask friends for quick feedback."}</span>
              {shop.askedFriends && <span className="text-muted-foreground"> Riya suggested checking fabric thickness.</span>}
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button onClick={openFeedback} className="rounded-full border border-[#FF3F6C] text-[#FF3F6C] py-2 text-[12.5px] font-semibold">View feedback</button>
            <button onClick={openAskAgain} className="rounded-full bg-[#FFF0F4] text-[#FF3F6C] py-2 text-[12.5px] font-semibold">{shop.askedFriends ? "Ask again" : "Ask friends"}</button>
          </div>
        </div>


        <h3 className="text-[15px] font-extrabold pt-1">Get Summer Ready</h3>
        <div className="bg-white rounded-2xl p-3 border border-border">
          <div className="grid grid-cols-3 gap-2">
            {[
              { img: capRed, brand: "Puma", title: "Essentials Baseball…", price: 479, mrp: 599, off: 20 },
              { img: capBlack, brand: "CULT", title: "Adjustable Sports…", price: 395, mrp: 899, off: 56 },
              { img: capGrey, brand: "SELLORIA", title: "Men Cotton Baseb…", price: 225, mrp: 799, off: 72 },
            ].map((c) => (
              <div key={c.brand} className="rounded-lg border border-border overflow-hidden">
                <div className="relative bg-secondary aspect-square">
                  <img src={c.img} alt="" className="h-full w-full object-cover" />
                  <button className="absolute bottom-1 right-1 bg-white border border-[#FF3F6C] text-[#FF3F6C] text-[10px] font-bold px-2 py-0.5 rounded">Add</button>
                </div>
                <div className="p-1.5">
                  <div className="text-[11px] font-extrabold truncate">{c.brand}</div>
                  <div className="text-[10px] text-muted-foreground truncate">{c.title}</div>
                  <div className="mt-0.5 flex items-baseline gap-1">
                    <span className="text-[10px] line-through text-muted-foreground">₹{c.mrp}</span>
                    <span className="text-[11px] font-extrabold">₹{c.price}</span>
                  </div>
                  <div className="text-[10px] font-bold text-[#FF905A]">{c.off}% OFF</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COUPONS */}
      <section data-section="coupons" ref={(el) => { sectionRefs.current.coupons = el; }} className="px-3 py-3 space-y-3 scroll-mt-24 border-t border-border">
        <div className="bg-white rounded-2xl border border-border p-3 flex items-center gap-3">
          <span className="text-2xl">🎁</span>
          <div className="text-[13px] flex-1">Add gift wrap and a personalised message on a card for just ₹35.</div>
          <button className="rounded-md border border-border text-[12.5px] font-bold px-3 py-1.5">Add</button>
        </div>
        <div className="bg-white rounded-2xl border border-border p-3">
          <div className="flex items-center justify-between">
            <div className="text-[13.5px] font-bold leading-snug">Donate &amp; Support Transformative Social Work In India</div>
            <button className="text-[12px] underline decoration-dotted font-semibold">Know More</button>
          </div>
          <div className="mt-2 flex gap-2 flex-wrap">
            {["₹10", "₹20", "₹50", "₹80", "₹100"].map((v) => (
              <button key={v} className="rounded-full border border-border text-[12.5px] px-3 py-1.5 font-semibold">{v}</button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <h3 className="text-[14px] font-extrabold">Coupons &amp; Bank Offers</h3>
          <button className="text-[12px] font-semibold underline decoration-dotted">View All Offers</button>
        </div>
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-[#FFF8E1] to-white">
            <span className="text-xl">🪙</span>
            <div className="flex-1">
              <div className="text-[13px] font-bold text-[#03A685]">Save upto ₹188</div>
              <div className="text-[11px] text-muted-foreground">1 Coupon &amp; Offer Available</div>
            </div>
            <ChevronDown className="h-4 w-4" />
          </div>
          <div className="p-3 flex items-center gap-3 border-t border-border">
            <span className="h-9 w-9 rounded bg-[#F0EAFA] text-[#7A56D6] flex items-center justify-center font-extrabold">🏷️</span>
            <div className="flex-1">
              <div className="text-[13px] font-extrabold">WEMISSYOU</div>
              <div className="text-[11.5px] font-bold">Extra ₹188 OFF</div>
              <div className="text-[11px] text-muted-foreground">15% off upto Rs. 200 on minimum purchase of Rs. 1099</div>
            </div>
            <button onClick={() => toast.success("Coupon applied — ₹188 off")} className="rounded-md border border-border text-[12.5px] font-bold px-3 py-1.5">Apply</button>
          </div>
        </div>

        <h3 className="text-[14px] font-extrabold pt-1">Add GST Details</h3>
        <div className="bg-white rounded-2xl border border-border p-3 flex items-center gap-3">
          <span className="h-9 w-9 rounded bg-[#FFE7EE] text-[#F13AB1] flex items-center justify-center font-extrabold text-[10px]">GST</span>
          <div className="flex-1">
            <div className="text-[13px] font-extrabold flex items-center gap-1.5">ADD GSTIN <span className="text-[9px] bg-[#FF3F6C] text-white px-1.5 py-0.5 rounded">NEW</span></div>
            <div className="text-[11.5px] text-muted-foreground">Claim GST credit up to 28% on your order</div>
          </div>
          <ChevronRight className="h-4 w-4" />
        </div>
      </section>

      {/* PRICE */}
      <section data-section="price" ref={(el) => { sectionRefs.current.price = el; }} className="px-3 py-3 space-y-3 scroll-mt-24 border-t border-border">
        <h3 className="text-[14px] font-extrabold">Price Details</h3>
        <div className="bg-white rounded-2xl border border-border p-4 text-[13.5px] space-y-2">
          <div className="flex justify-between"><span>Total MRP</span><span>₹{totalMrp.toLocaleString("en-IN")}</span></div>
          <div className="flex justify-between"><span>Discount on MRP</span><span className="text-[#03A685]">-₹{discount.toLocaleString("en-IN")}</span></div>
          <div className="flex justify-between"><span>Platform Fee <span className="underline decoration-dotted text-muted-foreground text-[12px]">Know More</span></span><span>₹{platform}</span></div>
          <div className="border-t border-dashed border-border my-2" />
          <div className="flex justify-between font-extrabold text-[15px]"><span>Total Amount</span><span>₹{grand.toLocaleString("en-IN")}</span></div>
          <div className="mt-2 rounded-lg bg-[#E6F7F2] text-[#03A685] text-[12.5px] font-bold px-3 py-2 flex items-center gap-2">
            💰 You're saving <span className="underline">₹{discount.toLocaleString("en-IN")}</span> on this order
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-[#9B5BD6] to-[#3F7CD6] p-4 text-white flex items-center gap-3">
          <div className="flex-1">
            <div className="text-[18px] font-extrabold leading-tight">Get 7.5%<br/>cashback</div>
            <div className="text-[11px] opacity-90 mt-1">With Flipkart Axis &amp; SBI Credit Cards</div>
          </div>
          <button className="bg-white text-foreground font-bold text-[12.5px] rounded-md px-3 py-2 flex items-center gap-1">Apply Now <ChevronRight className="h-3.5 w-3.5" /></button>
        </div>

        <div className="flex items-center justify-around text-[11px] text-muted-foreground py-2">
          <div className="flex flex-col items-center gap-1"><ShieldCheck className="h-5 w-5" /><span>Genuine Products</span></div>
          <span>•</span>
          <div className="flex flex-col items-center gap-1"><Users className="h-5 w-5" /><span>Contactless Delivery</span></div>
          <span>•</span>
          <div className="flex flex-col items-center gap-1"><Truck className="h-5 w-5" /><span>Secure Payments</span></div>
        </div>

        <p className="text-[11.5px] text-muted-foreground leading-snug pb-2">
          By placing the order, you agree to Myntra's <span className="text-[#FF3F6C] font-bold">Terms of Use</span> and <span className="text-[#FF3F6C] font-bold">Privacy Policy</span>.
        </p>
      </section>

      {/* Sticky Place Order */}
      <div className="absolute bottom-0 left-0 right-0 z-40">
        <div className="bg-[#FFF0F4] text-center text-[12px] py-1.5 font-semibold">1 Item selected for order</div>
        <button
          onClick={() => toast.success("Prototype complete: Order placed.", { description: "Thanks for trying the Fit Score + Ask Friends flow." })}
          className="w-full bg-[#FF3F6C] text-white font-extrabold text-[15px] py-4"
        >Place Order</button>
      </div>

      <AskFriendsSheet key={askInitial + String(askOpen)} open={askOpen} onOpenChange={setAskOpen} initialStep={askInitial} />

    </MobileFrame>
  );
}

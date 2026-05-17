import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, ChevronDown, Mic, Camera, Bell, Heart, User, Grid3x3 } from "lucide-react";
import { MLogo } from "@/components/MLogo";
import { MobileFrame } from "@/components/MobileFrame";
import { BottomNav } from "@/components/BottomNav";
import hero from "@/assets/hero-banner.jpg";
import catFashion from "@/assets/cat-fashion.jpg";
import catBeauty from "@/assets/cat-beauty.jpg";
import catFoot from "@/assets/cat-footwear.jpg";
import catHome from "@/assets/cat-home.jpg";
import catAcc from "@/assets/cat-accessories.jpg";
import brand1 from "@/assets/shirt-white-1.jpg";
import brand2 from "@/assets/shirt-blue-linen.jpg";
import brand3 from "@/assets/shirt-textured.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Myntra — Home" },
      { name: "description", content: "Shop fashion, beauty, footwear and more on the Myntra prototype." },
    ],
  }),
  component: Home,
});

const categories = [
  { label: "Fashion", img: catFashion, active: true },
  { label: "Beauty", img: catBeauty },
  { label: "Footwear", img: catFoot },
  { label: "Homeliving", img: catHome },
  { label: "Accessories", img: catAcc },
];

function Home() {
  return (
    <MobileFrame>
      {/* Header band */}
      <div className="bg-gradient-to-b from-[#FFC97A] via-[#FFB347] to-[#FFA947] pt-3 pb-2 px-3">
        <div className="flex items-center gap-1 text-[12.5px] text-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>Deliver to <span className="font-bold">110002</span></span>
          <ChevronDown className="h-3.5 w-3.5" />
        </div>

        <div className="mt-2 flex items-center gap-2">
          <Link to="/listing" className="flex-1 flex items-center gap-2 bg-white rounded-lg pl-2 pr-2 h-10 border border-white/60 shadow-sm">
            <MLogo className="h-5 w-5" />
            <span className="text-[13px] text-muted-foreground flex-1 truncate">"Dresses"</span>
            <Mic className="h-4 w-4 text-muted-foreground" />
            <Camera className="h-4 w-4 text-muted-foreground" />
          </Link>
          <div className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-[#FF3F6C] text-white text-[8px] flex items-center justify-center font-bold">3</span>
          </div>
          <Heart className="h-5 w-5" />
          <User className="h-5 w-5" />
        </div>

        {/* tabs */}
        <div className="mt-3 flex items-center justify-between text-[12.5px] font-semibold">
          <button className="pb-1.5 border-b-2 border-[#282C3F]">ALL</button>
          <button className="pb-1.5 text-foreground/80">MEN</button>
          <button className="pb-1.5 text-foreground/80">WOMEN</button>
          <button className="pb-1.5 text-foreground/80">KIDS</button>
          <span className="h-7 w-7 rounded-md bg-[#282C3F] flex items-center justify-center"><Grid3x3 className="h-4 w-4 text-white" /></span>
        </div>

        {/* category icons */}
        <div className="mt-3 grid grid-cols-5 gap-2">
          {categories.map((c) => (
            <Link key={c.label} to="/listing" className="flex flex-col items-center gap-1">
              <div className="h-14 w-14 rounded-2xl overflow-hidden bg-white border border-white/60 shadow-sm">
                <img src={c.img} alt={c.label} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <span className={`text-[10.5px] ${c.active ? "text-[#FF3F6C] font-bold" : "text-foreground"}`}>{c.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Countdown */}
      <div className="bg-white px-4 py-3 flex items-center gap-2 text-[12.5px]">
        <span className="font-semibold">Summer Sale Ends In</span>
        {["06 h", "21 m", "41 s"].map((t) => (
          <span key={t} className="rounded-md bg-[#FFE7DA] text-[#FF905A] font-bold px-2 py-0.5 text-[11px]">{t}</span>
        ))}
      </div>

      {/* Hero */}
      <div className="px-3">
        <Link to="/listing" className="block relative rounded-2xl overflow-hidden">
          <img src={hero} alt="Summer fashion sale" className="w-full h-[260px] object-cover" />
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
            <div className="bg-white inline-block px-3 py-1 rounded font-extrabold tracking-wide text-[13px]">HIGHLANDER</div>
            <div className="mt-1 text-white font-semibold text-[13px]">Unwind In Style</div>
            <div className="text-white font-extrabold text-xl">MIN. 60% OFF</div>
          </div>
          <span className="absolute top-2 right-2 bg-black/50 text-white text-[9px] px-1.5 py-0.5 rounded">AD</span>
        </Link>
        <div className="flex justify-center gap-1 py-2">
          {[0,1,2,3,4,5].map((i) => (
            <span key={i} className={`h-1.5 rounded-full ${i === 1 ? "w-4 bg-[#FF3F6C]" : "w-1.5 bg-border"}`} />
          ))}
        </div>
      </div>

      {/* Continue Browsing band */}
      <div className="mt-2 bg-gradient-to-b from-[#FFD89B] to-[#FFC97A] px-3 pt-4 pb-5">
        <h3 className="text-center font-extrabold text-[16px] mb-3">Continue Browsing These Brands</h3>
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {[brand1, brand2, brand3].map((src, i) => (
            <Link to="/listing" key={i} className="shrink-0 w-[140px] h-[170px] rounded-xl overflow-hidden bg-white">
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </Link>
          ))}
        </div>
      </div>

      <BottomNav />
    </MobileFrame>
  );
}

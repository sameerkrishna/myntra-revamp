import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Check, Sparkles } from "lucide-react";

const breakdown = [
  { label: "Fit", value: "Runs true to size" },
  { label: "Fabric", value: "100% cotton, breathable, low transparency" },
  { label: "Style match", value: "Good for office and formal occasions" },
  { label: "Similar shoppers", value: "82% kept this item" },
  { label: "Return signal", value: "Lower return rate than similar shirts" },
];

export function FitScoreCard({ size, score = 87 }: { size: string | null; score?: number }) {
  const [open, setOpen] = useState(false);
  const pct = score / 100;
  return (
    <div className="mx-4 my-4 rounded-2xl border border-border bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="relative h-16 w-16 shrink-0">
          <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
            <circle cx="32" cy="32" r="28" stroke="#EAEAEC" strokeWidth="6" fill="none" />
            <circle
              cx="32" cy="32" r="28"
              stroke="#03A685" strokeWidth="6" fill="none" strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - pct)}`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-[15px] font-extrabold text-[#03A685]">{score}%</div>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[13px] font-bold">
            <Sparkles className="h-3.5 w-3.5 text-[#F13AB1]" /> Fit &amp; Fabric Confidence
          </div>
          <div className="mt-0.5 text-[12px] text-muted-foreground leading-snug">
            High confidence{size ? ` for selected size ${size}` : " — pick a size to refine"}
          </div>
        </div>
      </div>


      <ul className="mt-3 space-y-2 border-t border-border pt-3">
        {breakdown.map((b) => (
          <li key={b.label} className="flex items-start gap-2 text-[12.5px]">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#03A685]" strokeWidth={3} />
            <span><span className="font-semibold">{b.label}:</span> <span className="text-muted-foreground">{b.value}</span></span>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => setOpen(true)}
          className="flex-1 rounded-full border border-[#FF3F6C] py-2 text-[12.5px] font-semibold text-[#FF3F6C]"
        >Why this score?</button>
        <button className="flex-1 rounded-full bg-[#FFF0F4] py-2 text-[12.5px] font-semibold text-[#FF3F6C]">
          Improve my score
        </button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="max-w-[390px] mx-auto rounded-t-2xl p-0">
          <SheetHeader className="px-5 pt-5 pb-2">
            <SheetTitle className="text-base font-bold">Why this score?</SheetTitle>
          </SheetHeader>
          <div className="px-5 pb-6 space-y-4">
            {[
              { t: "Fit confidence", d: "Based on brand sizing, your selected size, and how similar shoppers fit this style." },
              { t: "Fabric confidence", d: "Cotton, opaque, machine washable — feels premium and breathable." },
              { t: "Style confidence", d: "Matches formal and office-wear intent based on your browsing pattern." },
              { t: "Return signal", d: "Fewer fit-related returns than similar products in this category." },
            ].map((b, i) => (
              <div key={b.t} className="flex gap-3">
                <div className="mt-0.5 h-6 w-6 rounded-full bg-[#FFF0F4] text-[#FF3F6C] flex items-center justify-center text-[11px] font-bold">{i + 1}</div>
                <div>
                  <div className="text-[13px] font-semibold">{b.t}</div>
                  <div className="text-[12.5px] text-muted-foreground leading-snug">{b.d}</div>
                </div>
              </div>
            ))}
            <button onClick={() => setOpen(false)} className="mt-2 w-full rounded-full bg-[#FF3F6C] py-3 text-sm font-bold text-white">Got it</button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

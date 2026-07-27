import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Check, Sparkles, Info } from "lucide-react";
import { getFitScore, scoreColor } from "@/lib/fit-score";

const breakdown = [
  { label: "Fit", value: "Runs true to size" },
  { label: "Fabric", value: "100% cotton, breathable, low transparency" },
  { label: "Style match", value: "Good for office and formal occasions" },
  { label: "Similar shoppers", value: "82% kept this item" },
  { label: "Return signal", value: "Lower return rate than similar shirts" },
];

const scoreFactors = [
  { t: "Brand size consistency", d: "How reliably this brand's sizes match their stated chart across recent orders." },
  {
    t: "Similar shopper behaviour",
    d: "Kept vs. returned rates from shoppers with body type and past purchases like yours.",
  },
  { t: "Review sentiment", d: "Natural-language signals from reviews on fit, fabric feel, and quality." },
  { t: "Fabric attributes", d: "Composition, weave, transparency, stretch, and breathability for this product." },
  { t: "Return reasons", d: "Top reasons buyers returned this item — size, fabric, colour, or styling." },
];

export function FitScoreCard({ size, productId }: { size: string | null; productId?: string | null; score?: number }) {
  const [open, setOpen] = useState(false);
  const score = getFitScore(productId ?? "lp-1", size);
  const pct = (score ?? 0) / 100;
  const color = score == null ? "#B0B0B0" : scoreColor(score);
  return (
    <div className="mx-4 my-4 rounded-2xl border border-border bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="relative h-16 w-16 shrink-0">
          <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
            <circle cx="32" cy="32" r="28" stroke="#EAEAEC" strokeWidth="6" fill="none" />
            {score != null && (
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke={color}
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - pct)}`}
              />
            )}
          </svg>
          <div
            className="absolute inset-0 flex items-center justify-center text-[15px] font-extrabold"
            style={{ color }}
          >
            {score == null ? "N/A" : `${score}%`}
          </div>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[13px] font-bold">
            <Sparkles className="h-3.5 w-3.5 text-[#F13AB1]" /> Fit &amp; Fabric Confidence
            <span className="ml-1 text-[8px] font-bold uppercase tracking-wider bg-[#F9F5E8] text-[#7A5C2F] border border-[#E5D9C3] rounded-full px-1.5 py-[1px]">
              New Feature
            </span>
          </div>
          <div className="mt-0.5 text-[12px] text-muted-foreground leading-snug">
            {size ? `Great match for your size ${size}` : "Select a size to see your confidence score"}
          </div>
        </div>
      </div>

      <ul className="mt-3 space-y-2 border-t border-border pt-3">
        {breakdown.map((b) => (
          <li key={b.label} className="flex items-start gap-2 text-[12.5px]">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#03A685]" strokeWidth={3} />
            <span>
              <span className="font-semibold">{b.label}:</span> <span className="text-muted-foreground">{b.value}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => setOpen(true)}
          className="flex-1 rounded-full border border-[#FF3F6C] py-2 text-[12.5px] font-semibold text-[#FF3F6C]"
        >
          Why this score?
        </button>
        <button className="flex-1 rounded-full bg-[#FFF0F4] py-2 text-[12.5px] font-semibold text-[#FF3F6C]">
          Improve my score
        </button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          className="max-w-[390px] mx-auto rounded-t-3xl overflow-hidden p-0 flex flex-col max-h-[85vh]"
        >
          <SheetHeader className="px-5 pt-5 pb-2 border-b border-border/40 shrink-0">
            <SheetTitle className="text-base font-bold">Why this score?</SheetTitle>
          </SheetHeader>
          <div className="px-5 pb-8 space-y-4 overflow-y-auto flex-1 pt-4 custom-scrollbar">
            {scoreFactors.map((b, i) => (
              <div key={b.t} className="flex gap-3">
                <div className="mt-0.5 h-6 w-6 rounded-full bg-[#FFF0F4] text-[#FF3F6C] flex items-center justify-center text-[11px] font-bold">
                  {i + 1}
                </div>
                <div>
                  <div className="text-[13px] font-semibold">{b.t}</div>
                  <div className="text-[12.5px] text-muted-foreground leading-snug">{b.d}</div>
                </div>
              </div>
            ))}
            <div className="flex items-start gap-2 rounded-xl bg-secondary/50 border border-border px-3 py-2.5">
              <Info className="h-3.5 w-3.5 mt-0.5 shrink-0 text-muted-foreground" />
              <p className="text-[11.5px] text-muted-foreground leading-snug">
                This is a confidence estimate, not a guarantee.
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="mt-2 w-full rounded-full bg-[#FF3F6C] py-3 text-sm font-bold text-white"
            >
              Got it
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

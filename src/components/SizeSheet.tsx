import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ChevronRight } from "lucide-react";

export function SizeSheet({
  open, onOpenChange, sizes, initial, onDone,
}: {
  open: boolean; onOpenChange: (b: boolean) => void;
  sizes: string[]; initial: string | null;
  onDone: (size: string) => void;
}) {
  const [sel, setSel] = useState<string | null>(initial);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-w-[390px] mx-auto rounded-t-3xl overflow-hidden p-0 flex flex-col max-h-[85vh]">
        <div className="px-5 pt-5 pb-3 flex items-center justify-between shrink-0">
          <h3 className="text-[17px] font-extrabold">Select Size</h3>
          <button className="text-[13px] font-semibold text-[#FF3F6C] flex items-center gap-0.5">
            Size Chart <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="px-5 pb-6 flex gap-3 overflow-y-auto flex-1 custom-scrollbar flex-wrap">
          {sizes.map((s) => {
            const on = sel === s;
            return (
              <button key={s} onClick={() => setSel(s)}
                className={`h-14 w-14 rounded-xl border text-[15px] font-semibold ${on ? "border-[#FF3F6C] text-[#FF3F6C] bg-[#FFF0F4]" : "border-border text-foreground bg-white"}`}>
                {s}
              </button>
            );
          })}
        </div>
        <button
          disabled={!sel}
          onClick={() => { if (sel) { onDone(sel); onOpenChange(false); } }}
          className="w-full bg-[#FF3F6C] py-4 text-[15px] font-bold tracking-wide text-white disabled:opacity-60 shrink-0"
        >DONE</button>
      </SheetContent>
    </Sheet>
  );
}

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Users, Send, Check } from "lucide-react";
import { MOCK_FEEDBACK, setShop, useShop } from "@/lib/shop-store";

const FRIENDS = ["Ananya", "Riya", "Karan"];
const SCOPES = ["Product only", "Product + size", "Product + price", "Full cart"];

export function AskFriendsButton({ openInitial = false }: { openInitial?: boolean }) {
  const [open, setOpen] = useState(openInitial);
  return (
    <>
      <div className="mx-4 mb-4 rounded-2xl border border-border bg-white p-3 flex items-center gap-3 shadow-sm">
        <div className="h-10 w-10 rounded-full bg-[#FFF0F4] flex items-center justify-center">
          <Users className="h-5 w-5 text-[#F13AB1]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-bold">Ask Friends</div>
          <div className="text-[12px] text-muted-foreground">Get quick feedback before buying</div>
        </div>
        <button onClick={() => setOpen(true)} className="rounded-full bg-[#FF3F6C] px-4 py-2 text-[12px] font-semibold text-white">Ask</button>
      </div>
      <AskFriendsSheet open={open} onOpenChange={setOpen} />
    </>
  );
}

export function AskFriendsSheet({ open, onOpenChange, initialStep }: { open: boolean; onOpenChange: (b: boolean) => void; initialStep?: "compose" | "result" }) {
  const shop = useShop();
  const [selected, setSelected] = useState<string[]>(FRIENDS);
  const [scope, setScope] = useState("Product + size");
  const [question, setQuestion] = useState("Does this work for office wear?");
  const [stage, setStage] = useState<"compose" | "sending" | "result">(initialStep ?? (shop.askedFriends ? "result" : "compose"));

  const toggle = (f: string) => setSelected((s) => s.includes(f) ? s.filter((x) => x !== f) : [...s, f]);

  const send = () => {
    setStage("sending");
    setTimeout(() => {
      const filtered = MOCK_FEEDBACK.filter((f) => selected.includes(f.name));
      setShop({ askedFriends: true, feedback: filtered });
      setStage("result");
    }, 1200);
  };

  const feedbackList = shop.feedback ?? [];
  const recCount = feedbackList.filter((f) => f.recommend).length;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-w-[390px] mx-auto rounded-t-2xl p-0 max-h-[88vh] overflow-y-auto">
        <SheetHeader className="px-5 pt-5 pb-3 border-b border-border">
          <SheetTitle className="text-base font-bold">Ask friends before buying</SheetTitle>
        </SheetHeader>

        {stage !== "result" && (
          <div className="px-5 py-4 space-y-5">
            <section>
              <div className="text-[12px] font-semibold text-muted-foreground mb-2">STEP 1 · SELECT FRIENDS</div>
              <div className="flex gap-2 flex-wrap">
                {FRIENDS.map((f) => {
                  const on = selected.includes(f);
                  return (
                    <button key={f} onClick={() => toggle(f)}
                      className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] ${on ? "border-[#FF3F6C] bg-[#FFF0F4] text-[#FF3F6C] font-semibold" : "border-border text-foreground"}`}>
                      <span className="h-6 w-6 rounded-full bg-gradient-to-br from-[#F13AB1] to-[#FF905A] text-white text-[11px] font-bold flex items-center justify-center">{f[0]}</span>
                      {f}
                      {on && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                    </button>
                  );
                })}
              </div>
            </section>

            <section>
              <div className="text-[12px] font-semibold text-muted-foreground mb-2">STEP 2 · CHOOSE WHAT TO SHARE</div>
              <div className="grid grid-cols-2 gap-2">
                {SCOPES.map((s) => {
                  const on = scope === s;
                  return (
                    <button key={s} onClick={() => setScope(s)}
                      className={`rounded-xl border px-3 py-2 text-left text-[12.5px] ${on ? "border-[#FF3F6C] bg-[#FFF0F4] text-[#FF3F6C] font-semibold" : "border-border text-foreground"}`}>
                      {s}
                    </button>
                  );
                })}
              </div>
            </section>

            <section>
              <div className="text-[12px] font-semibold text-muted-foreground mb-2">STEP 3 · ADD A QUESTION</div>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={2}
                className="w-full rounded-xl border border-border bg-secondary/40 p-3 text-[13px] outline-none focus:border-[#FF3F6C]"
              />
            </section>

            <button
              disabled={selected.length === 0 || stage === "sending"}
              onClick={send}
              className="w-full rounded-full bg-[#FF3F6C] py-3 text-sm font-bold text-white flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {stage === "sending" ? "Sending…" : (<><Send className="h-4 w-4" /> Send for feedback</>)}
            </button>
          </div>
        )}

        {stage === "result" && (
          <div className="px-5 py-4 space-y-3">
            <div className="text-[12px] font-semibold text-muted-foreground">FRIENDS' FEEDBACK</div>
            {feedbackList.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border bg-white p-4 text-center text-[12.5px] text-muted-foreground">
                No feedback yet. Ask friends to get quick opinions.
              </div>
            )}
            {feedbackList.map((f) => (
              <div key={f.name} className="rounded-2xl border border-border bg-white p-3">
                <div className="flex items-center gap-2">
                  <span className="h-7 w-7 rounded-full bg-gradient-to-br from-[#F13AB1] to-[#FF905A] text-white text-[12px] font-bold flex items-center justify-center">{f.name[0]}</span>
                  <span className="text-[13px] font-bold">{f.name}</span>
                  <span className={`ml-auto text-[11px] font-semibold px-2 py-0.5 rounded-full ${f.recommend ? "bg-[#E6F7F2] text-[#03A685]" : "bg-[#FFF1E6] text-[#FF905A]"}`}>
                    {f.recommend ? "Recommends" : "Suggests check"}
                  </span>
                </div>
                <p className="mt-1.5 text-[13px] text-foreground leading-snug">{f.text}</p>
              </div>
            ))}

            {feedbackList.length > 0 && (
              <div className="rounded-2xl bg-[#FFF0F4] border border-[#FFD2DF] p-3 text-[12.5px]">
                <span className="font-semibold text-[#FF3F6C]">{recCount} {recCount === 1 ? "friend recommends" : "friends recommend"} buying.</span>{" "}
                {feedbackList.length - recCount > 0 && (
                  <span className="text-foreground">{feedbackList.length - recCount} {feedbackList.length - recCount === 1 ? "friend suggests" : "friends suggest"} checking fabric thickness.</span>
                )}
              </div>
            )}

            <button onClick={() => onOpenChange(false)} className="w-full rounded-full bg-[#FF3F6C] py-3 text-sm font-bold text-white">
              Add to Bag with feedback
            </button>
            <button onClick={() => setStage("compose")} className="w-full text-[12.5px] text-muted-foreground py-1">Ask again</button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

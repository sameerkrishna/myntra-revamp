import type { ReactNode } from "react";

export function MobileFrame({ children, pad = true }: { children: ReactNode; pad?: boolean }) {
  return (
    <div className="min-h-screen w-full flex justify-center bg-[#efefef]">
      <div
        className="relative w-full max-w-[390px] min-h-screen bg-background shadow-[0_0_40px_rgba(0,0,0,0.08)] overflow-hidden"
        style={{ paddingBottom: pad ? 96 : 0 }}
      >
        {children}
      </div>
    </div>
  );
}

import type { ReactNode } from "react";

export function MobileFrame({ children, pad = true }: { children: ReactNode; pad?: boolean }) {
  return (
    <div className="h-screen max-h-screen w-full flex justify-center bg-[#efefef] overflow-hidden">
      <div
        className="relative w-full max-w-[390px] h-full max-h-screen bg-background shadow-[0_0_40px_rgba(0,0,0,0.08)] overflow-y-auto"
        style={{ paddingBottom: pad ? 96 : 0 }}
      >
        {children}
      </div>
    </div>
  );
}

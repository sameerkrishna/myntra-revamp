import type { ReactNode } from "react";

export function MobileFrame({
  children,
  pad = true,
  fit = false,
}: {
  children: ReactNode;
  pad?: boolean;
  fit?: boolean;
}) {
  if (fit) {
    return (
      <div className="h-screen w-full flex justify-center bg-[#efefef] overflow-hidden">
        <div className="relative w-full max-w-[390px] h-screen bg-background shadow-[0_0_40px_rgba(0,0,0,0.08)] flex flex-col overflow-hidden">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen w-full flex justify-center bg-[#efefef]">
      <div
        className="relative w-full max-w-[390px] min-h-screen bg-background shadow-[0_0_40px_rgba(0,0,0,0.08)]"
        style={{ paddingBottom: pad ? 96 : 0 }}
      >
        {children}
      </div>
    </div>
  );
}

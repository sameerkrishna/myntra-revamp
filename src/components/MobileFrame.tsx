import type { ReactNode } from "react";

// Outer padding + rounded inner frame so the phone "edges" are always visible
const OUTER = "min-h-screen w-full flex justify-center items-center bg-[#efefef] p-2 sm:p-4";
const INNER_BASE =
  "relative w-full max-w-[358px] bg-background shadow-[0_8px_40px_rgba(0,0,0,0.18)] rounded-[28px] overflow-hidden border border-black/10";

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
      <div className={`${OUTER} h-screen overflow-hidden`}>
        <div className={`${INNER_BASE} h-[calc(100vh-1rem)] sm:h-[calc(100vh-2rem)] flex flex-col`}>
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className={OUTER}>
      <div
        className={`${INNER_BASE} min-h-[calc(100vh-1rem)] sm:min-h-[calc(100vh-2rem)]`}
        style={{ paddingBottom: pad ? 96 : 0 }}
      >
        {children}
      </div>
    </div>
  );
}

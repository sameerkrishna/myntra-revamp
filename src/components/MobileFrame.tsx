import type { ReactNode } from "react";
import { Wifi, Signal, Battery } from "lucide-react";

export function MobileFrame({ children, pad = true }: { children: ReactNode; pad?: boolean }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#EAEBED] sm:py-6 sm:px-4 font-sans select-none antialiased">
      {/* Phone Chassis Container */}
      <div className="relative w-full max-w-[390px] h-screen sm:h-[844px] bg-background sm:rounded-[48px] sm:border-[10px] sm:border-zinc-900 sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.1)] flex flex-col overflow-hidden transition-all duration-300">
        {/* iOS Top Status Bar */}
        <div className="h-11 shrink-0 bg-white border-b border-border/30 px-5 flex items-center justify-between z-40 text-foreground">
          {/* Time */}
          <span className="font-semibold text-[13px] tracking-tight text-[#111] w-12">9:41</span>

          {/* Dynamic Island / Camera Notch */}
          <div className="w-24 h-4.5 bg-black rounded-full flex items-center justify-end px-2 gap-1.5 shadow-inner">
            <div className="h-2 w-2 rounded-full bg-zinc-900 border border-zinc-800" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#0a192f] border border-blue-900/50" />
          </div>

          {/* Signal / Wifi / Battery */}
          <div className="flex items-center gap-1.5 text-zinc-800 w-12 justify-end">
            <Signal className="h-3.5 w-3.5 fill-current" />
            <Wifi className="h-3.5 w-3.5" />
            <Battery className="h-4 w-4" />
          </div>
        </div>

        {/* Inner Scrollable Viewport */}
        <div className="flex-1 overflow-y-auto relative no-scrollbar" style={{ paddingBottom: pad ? 80 : 0 }}>
          {children}
        </div>

        {/* Bottom Home Indicator Bar */}
        <div className="h-6 shrink-0 bg-white flex items-center justify-center border-t border-border/20 z-40">
          <div className="w-32 h-1 bg-zinc-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}

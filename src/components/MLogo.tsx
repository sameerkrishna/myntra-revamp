export function MLogo({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <defs>
        <linearGradient id="mg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF905A" />
          <stop offset="55%" stopColor="#F13AB1" />
          <stop offset="100%" stopColor="#FF3F6C" />
        </linearGradient>
      </defs>
      <path
        d="M3 26 L8 6 L13 18 L18 6 L23 26"
        fill="none"
        stroke="url(#mg)"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="26.5" cy="9.5" r="2.4" fill="#FF3F6C" />
    </svg>
  );
}

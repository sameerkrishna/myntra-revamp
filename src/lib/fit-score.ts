// Deterministic per-(product, size) Fit & Fabric Confidence score in [65, 95].
// Returns null when no size is selected — UI should show "N/A".
export function getFitScore(productId: string | null | undefined, size: string | null | undefined): number | null {
  if (!size || !productId) return null;
  const s = `${productId}:${size}`;
  let h = 2166136261 >>> 0; // FNV-ish
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return 65 + (h % 31); // 65..95 inclusive
}

// Interpolate amber (low) -> green (high) across the 65..95 range.
export function scoreColor(score: number): string {
  const t = Math.min(1, Math.max(0, (score - 65) / 30));
  const lerp = (a: number, b: number) => Math.round(a + (b - a) * t);
  // #F5B400 (amber) -> #03A685 (green)
  const r = lerp(0xf5, 0x03);
  const g = lerp(0xb4, 0xa6);
  const b = lerp(0x00, 0x85);
  return `rgb(${r}, ${g}, ${b})`;
}

import { useEffect, useState } from "react";

export type FeedbackResult = { name: string; text: string; recommend: boolean };

export type ShopState = {
  selectedSize: string | null;
  inCart: boolean;
  askedFriends: boolean;
  feedback: FeedbackResult[];
  searchQuery: string;
  selectedProductImage: string | null;
  selectedProductId: string | null;
  qty: number;
};

const KEY = "myntra-proto-state-v1";
const DEFAULT: ShopState = {
  selectedSize: null,
  inCart: false,
  askedFriends: false,
  feedback: [],
  searchQuery: "Formal Shirts for Men",
  selectedProductImage: null,
  selectedProductId: null,
  qty: 1,
};

const listeners = new Set<() => void>();
let state: ShopState = DEFAULT;

function load() {
  if (typeof window === "undefined") return;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw) state = { ...DEFAULT, ...JSON.parse(raw) };
  } catch { /* ignore */ }
}
function persist() {
  if (typeof window === "undefined") return;
  try { sessionStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ }
}

export function setShop(patch: Partial<ShopState>) {
  state = { ...state, ...patch };
  persist();
  listeners.forEach((l) => l());
}

export function useShop(): ShopState {
  const [, force] = useState(0);
  useEffect(() => {
    load();
    force((n) => n + 1);
    const l = () => force((n) => n + 1);
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);
  return state;
}

export const MOCK_FEEDBACK: FeedbackResult[] = [
  { name: "Ananya", text: "Looks sharp for office. Buy it.", recommend: true },
  { name: "Riya", text: "White looks good, but check if fabric is thick enough.", recommend: false },
  { name: "Karan", text: "Good pick. Louis Philippe usually fits well.", recommend: true },
];

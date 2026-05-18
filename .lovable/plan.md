# Prototype refinements

Scope: presentation-only tweaks across the existing 4 screens. No backend, no new routes.

## 1. Typable search (home + all pages)
- Convert the static search "pill" into a controlled `<input>` (placeholder defaults to "Formal Shirts for Men").
- Pressing Enter or tapping the search icon navigates to `/listing` with the query in store (`shop.searchQuery`).
- Apply the same pattern to the search field on `/listing` and `/product` (small reusable `SearchBar` component).

## 2. Product image continuity (listing → product)
- Extend `shop-store` with `selectedProductImage` (and `selectedProductId`).
- `ProductCard` sets it on click before navigating.
- `/product` uses that image as the first slide in the gallery (falls back to current shirt-white-1 if none).

## 3. Fit Score on every listing card
- In `src/lib/products.ts`, give every `LISTING` item a `fitScore` (deterministic 75–95 based on id hash so it's stable across renders).
- Restyle the Fit Score pill in `ProductCard`:
  - Background: soft lavender `#F3EEFF`
  - Border: `#C9B8F5`
  - Text: deep violet `#5A3FBF`
  - Add a tiny sparkle dot before the number.
- Keep the same pill style in `FitScoreCard` header for consistency (optional minor tweak).

## 4. Product page CTA icons
- Update the sticky bottom bar so "Buy Now" uses a lightning/bolt icon and "Add to Bag" uses the bag icon, matching the reference screenshots (icon on the left of the label, both buttons full-height, pink solid + pink outline).

## 5. Cart item → product page
- Wrap the cart item row in a `<Link to="/product">` so tapping it returns to the PDP.
- Size/qty controls inside the row use `e.stopPropagation()` / are rendered as buttons outside the link area to avoid accidental nav.

## 6. Editable size & qty in cart
- Replace the static "Size: 40 | Qty: 1" line with two pill buttons.
- Size pill opens the existing `SizeSheet` (reused) and writes back to `shop.selectedSize`.
- Qty pill opens a small inline popover/sheet with 1–5 options; selection stored in `shop.qty` (new field, default 1). Price details multiply by qty.

## 7. Single scrollable cart (no tabs)
- Remove the tab switcher. Render Items → Coupons → Price Details as three stacked sections on one scroll.
- Add a sticky section indicator at top (Items • Coupons • Price) where the active label highlights based on scroll position using `IntersectionObserver` on each section's wrapper.
- Tapping a label smooth-scrolls to that section.

## 8. View feedback in cart
- The "View feedback" button in `PurchaseConfidenceCard` opens the existing `AskFriendsSheet` in a read-only "results" mode (skip the friend-selection step, jump straight to the feedback list using `shop.feedback`).
- Add an `initialStep="results"` prop to `AskFriendsSheet`.

## Files touched
- `src/lib/shop-store.ts` — add `searchQuery`, `selectedProductImage`, `qty`.
- `src/lib/products.ts` — add `fitScore` to all listing items.
- `src/components/SearchBar.tsx` (new) — shared typable search.
- `src/components/ProductCard.tsx` — new pill colors, persist clicked image.
- `src/components/FitScoreCard.tsx` — (optional) match new pill palette.
- `src/components/AskFriendsSheet.tsx` — `initialStep` prop.
- `src/routes/index.tsx` — use `SearchBar`, default "Formal Shirts for Men".
- `src/routes/listing.tsx` — `SearchBar` in top bar.
- `src/routes/product.tsx` — `SearchBar`, gallery uses selected image, updated sticky CTAs.
- `src/routes/cart.tsx` — single scroll layout w/ section indicator, link-wrapped item, editable size/qty, wire View Feedback.

## Out of scope
- Real search results filtering (query is just shown in the listing header).
- Persisting cart across reloads beyond existing sessionStorage.
- New routes or backend.

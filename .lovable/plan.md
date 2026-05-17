# Myntra-Inspired Mobile Shopping Prototype

A mobile-first (390px) clickable prototype that closely mirrors the uploaded Myntra screenshots, with two new features layered in: **Fit & Fabric Confidence Score** and **Collaborative Shopping (Ask Friends)**. Mock data only, no backend.

## Visual System

Update `src/styles.css` with Myntra-like tokens:
- `--background: #F5F5F6` (page), `--card: #FFFFFF`
- `--primary: #FF3F6C` (CTA), `--accent: #F13AB1` (badge highlight)
- `--foreground: #282C3F`, `--muted-foreground: #535766`
- `--border: #EAEAEC`, `--success: #03A685`, `--discount: #FF905A`
- Inter font via Google Fonts link in `__root.tsx`
- Card style: white, `rounded-2xl`, soft shadow, 12–16px padding
- Pill filters: white, `border-border`, `rounded-full`, compact text
- Sticky bottom CTA: full-width pink `#FF3F6C`, white bold label
- Compact product-card type: brand 14px bold, title 13px regular muted, price 14px bold

A centered 390px "device frame" wrapper (max-w-[390px], min-h-screen, page bg) on desktop; full bleed on actual mobile.

## Routes (TanStack Start)

```
src/routes/
  __root.tsx          (keep; add Inter font + Outlet)
  index.tsx           Home
  listing.tsx         Formal Shirts listing
  product.tsx         Louis Philippe PDP (scrollable: gallery → details → delivery → specs)
  cart.tsx            Bag (scrollable: Items → Coupons → Price Details)
```

Each route gets its own `head()` metadata.

## Shared Components

```
src/components/
  MobileFrame.tsx              390px wrapper + page bg
  MLogo.tsx                    stylized "M" SVG (pink→orange gradient)
  BottomNav.tsx                Home / FWD / M-Now / Luxe / Bag
  TopBar.tsx                   variants for home, listing, pdp, cart
  ProductCard.tsx              grid card; optional Fit Score pill
  PillFilter.tsx, CategoryCircle.tsx
  FitScoreCard.tsx             new feature on PDP
  WhyScoreSheet.tsx            bottom sheet breakdown
  AskFriendsButton.tsx + AskFriendsSheet.tsx   3-step + simulated feedback
  SizeSheet.tsx                bottom sheet for size selection
  PurchaseConfidenceCard.tsx   summary on cart
  StickyCTA.tsx                shared sticky footer
```

Light Zustand store (`src/store/shop.ts`) for: selected size, cart items, ask-friends state, feedback results. Persist in `sessionStorage` so the flow survives navigation.

## Screen Specs (matching screenshots)

**Home (`/`)** — warm yellow gradient header band (matches homepage.jpeg) wrapping location + search + tabs + category circles, then white page below. Sticky pink-accent bottom nav.
- "Deliver to 110002" with chevron
- Search bar with M logo prefix, mic + camera icons, bell (red dot 3), wishlist, profile
- ALL / MEN / WOMEN / KIDS tabs (active underline)
- 5 rounded-square category icons (Fashion, Beauty, Footwear, Homeliving, Accessories)
- Summer Sale countdown chips (orange pill numerals)
- Hero banner card (Highlander-style) with rounded corners, dot pager
- Bank offers strip
- "Continue Browsing These Brands" peach panel with 2.5 cards visible
- Bottom nav with M-logo Home highlighted pink

**Listing (`/listing`)** — matches product_listing_page.jpeg
- Top bar: back, M logo, "FORMAL SHIRTS FOR ME…", search, wishlist, bag
- Lilac strip with 110002 + chevron
- Pill filters (Crazy Deal, 30Day BestPrice, Top Brands) — horizontal scroll
- Circular category row (Linen, Cotton, Cuban Collar, Oversized, Textured, Beach)
- M-Now × Linen Club banner card
- 2-col product grid (image fills card, edge-to-edge, AD tag, 4.5★ pill bottom-left). Below image: brand bold, title, "Crazy Deal" pink pill, strike MRP + price + orange % OFF, green "Best Price ₹X with coupon"
- Louis Philippe card adds a small green **"Fit Score 87%"** pill near rating
- Sticky bottom split bar: SORT | FILTER

**Product Detail (`/product`)** — matches product_page1/2/3.jpeg
- Sticky top: back, search bar with M, wishlist, bag
- Sponsored brand strip ("Louis Philippe … 4.4★ … View")
- Large gallery image with "Crazy Deal" pink ribbon top-left, LOOKS thumbnails + play badge right, View Similar pill bottom-left, 4.5★|963 pill bottom-right
- Dot pager
- Brand bold + title; share + wishlist square buttons
- MRP strike, ₹1,249, pink 50% OFF! tag
- "Get at ₹955 / Extra ₹294 Off / With Coupon + Bank Offer / Details" card
- Colour: White, 5 thumbnail squares (selected has pink border)
- Select Size + Size Chart link; size pills 39/40/42
- **FitScoreCard** (new): big 87% ring, subtitle, 5-row breakdown, "Why this score?" + "Improve my score"
- **AskFriendsButton** (new): outline pill "Ask Friends — Get quick feedback before buying"
- Sticky bottom: Buy Now (outline pink) + Add to Bag (solid pink)
- Below fold: Delivery & Services (110002 Change), Express+ Get it by Tomorrow card, Pay on Delivery + 14 Day return tiles, Specs grid (Weave/Transparency/Fit/Sustainable/Fabrics), Product Details, Size & Fit, Material & Care, Ratings & Reviews stub

**Size Sheet** — matches addtobag.jpeg
- Backdrop dim, bottom sheet with "Select Size" + Size Chart link, 3 size pills, full-width pink DONE

**Why-Score Sheet** — 4 labeled sections + close
**Ask-Friends Sheet** — 3 steps (friend chips, share scope radios default "Product + size", prefilled question), Send → 1.2s simulated wait → 3 feedback bubbles + summary → "Add to Bag with feedback"

**Cart (`/cart`)** — matches cartpage1/2/3.jpeg in one scroll
- Top bar: back, 110002 ▾, wishlist
- Pill tabs: Items / Coupons & Bank Offers / Price Details (active = pink pill border)
- Your Bag header, "1/1 Items Selected (₹1,272)" with share/trash/wishlist
- White product card: image left, brand + title, Size 39 ▾ Qty 1 ▾, ₹1,249 ~₹2,499~ 50% Off, 14 days return, M-Express+ Delivery by Tomorrow
- **PurchaseConfidenceCard** (new): Fit Score 87%, "2 friends recommend buying", "Riya suggested checking fabric thickness", buttons View feedback + Ask again
- "Get Summer Ready" 3-col tiles with Add pill
- +75 More Styles row with View All
- Gift wrap card, Donate row with ₹ pills
- Coupons & Bank Offers — Save upto ₹188 expander, WEMISSYOU card with Apply
- Add GST Details → ADD GSTIN NEW card
- Price Details card (Total MRP, Discount green, Platform Fee Know More, Total Amount, green "You're saving ₹1,250" banner)
- Purple→blue 7.5% cashback banner with Apply Now
- Trust badges row (Genuine Products • Contactless Delivery • Secure Payments)
- T&C text with pink Terms/Privacy links
- Sticky bottom: pale-pink strip "1 Item selected for order" + pink Place Order
- Place Order → sonner toast "Prototype complete: Order placed."

## Images

Generate ~10 apparel placeholders into `src/assets/` (imagegen `fast`, neutral studio backgrounds, no logos/text):
- White formal shirt (3 angles for carousel)
- 5 listing thumbs (cotton/linen/casual/oversized/textured)
- 5 category circle thumbs
- Hero banner, brand-row tiles, cap/accessory add-on tiles

## Navigation Flow

```
/  → /listing → /product → WhyScoreSheet
                       ↘ AskFriendsSheet → feedback → /cart
                       ↘ SizeSheet → /cart → Place Order toast
                                          ↳ View feedback re-opens sheet
```

## Out of Scope

No auth, no Lovable Cloud, no real payments. Pure frontend prototype with mocked data and clickable interactions.

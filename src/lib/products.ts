import shirtWhite from "@/assets/shirt-white-1.jpg";
import shirtBlack from "@/assets/shirt-black.jpg";
import shirtBlueLinen from "@/assets/shirt-blue-linen.jpg";
import shirtOlive from "@/assets/shirt-olive.jpg";
import shirtOversized from "@/assets/shirt-oversized.jpg";
import shirtTextured from "@/assets/shirt-textured.jpg";
import type { Product } from "@/components/ProductCard";

export const PRIMARY_PRODUCT: Product = {
  id: "lp-1",
  brand: "Louis Philippe",
  title: "Slim Fit Cotton Formal Shirt",
  price: 1249,
  mrp: 2499,
  discount: 50,
  rating: 4.5,
  reviews: 963,
  image: shirtWhite,
  tag: "Crazy Deal",
  bestPrice: 1061,
  fitScore: 87,
  ad: true,
};

export const LISTING: Product[] = [
  PRIMARY_PRODUCT,
  { id: "bb", brand: "Blackberrys", title: "Pure Cotton Formal Shirt", price: 1247, mrp: 2599, discount: 52, rating: 4.3, reviews: 421, image: shirtBlack, tag: "30Day BestPrice", bestPrice: 1059, fitScore: 82, ad: true },
  { id: "lc", brand: "Linen Club", title: "Blue Linen Shirt", price: 1799, mrp: 2999, discount: 40, rating: 4.4, reviews: 318, image: shirtBlueLinen, bestPrice: 1529, fitScore: 91 },
  { id: "hl", brand: "Highlander", title: "Casual Olive Shirt", price: 699, mrp: 1499, discount: 53, rating: 4.2, reviews: 1124, image: shirtOlive, tag: "Crazy Deal", bestPrice: 594, fitScore: 78 },
  { id: "rd", brand: "Roadster", title: "Oversized Cotton Shirt", price: 899, mrp: 1899, discount: 52, rating: 4.1, reviews: 882, image: shirtOversized, bestPrice: 764, fitScore: 85 },
  { id: "mh", brand: "Mast & Harbour", title: "Textured Weave Shirt", price: 1099, mrp: 2199, discount: 50, rating: 4.0, reviews: 256, image: shirtTextured, tag: "30Day BestPrice", bestPrice: 934, fitScore: 88 },
];

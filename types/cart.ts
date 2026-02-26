import { ImageProp, ProductVariant } from "./product";

export interface CartItem {
  pid: string;
  _id?: string;
  name: string;
  slug: string;
  price: number;
  salePrice: number;
  quantity: number;
  stockQuantity: number;
  rating: number;
  type: "simple" | "variable";
  variant: ProductVariant;
  images: ImageProp[];
  //cartQuantity: number; // quantity added to cart
}

export interface CartSummary {
  subtotal: number;
  shipping: number | "Free";
  discount?: number;
  total: number;
}

export interface Cart {
  items: CartItem[];
  summary: CartSummary;
}

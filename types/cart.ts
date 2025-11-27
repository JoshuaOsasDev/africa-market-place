export interface CartItem {
    id: string;
    productId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    maxQuantity?: number;
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
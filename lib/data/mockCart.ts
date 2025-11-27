import { Cart, CartItem } from "@/types/cart";

export const getMockCart = (): Cart => {
  const items: CartItem[] = [
    {
      id: "cart-1",
      productId: "1",
      name: "Green Capsicum",
      image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200",
      price: 14.0,
      quantity: 5,
      maxQuantity: 20,
    },
    {
      id: "cart-2",
      productId: "2",
      name: "Green Capsicum",
      image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200",
      price: 14.0,
      quantity: 5,
      maxQuantity: 15,
    },
    {
      id: "cart-3",
      productId: "3",
      name: "Green Capsicum",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200",
      price: 14.0,
      quantity: 5,
      maxQuantity: 10,
    },
    {
      id: "cart-4",
      productId: "4",
      name: "Green Capsicum",
      image: "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?w=200",
      price: 14.0,
      quantity: 5,
      maxQuantity: 25,
    },
  ];

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return {
    items,
    summary: {
      subtotal,
      shipping: "Free",
      total: subtotal,
    },
  };
};
import { CheckoutSummary } from "@/types/checkout";

export const getMockCheckoutSummary = (): CheckoutSummary => {
  const items = [
    {
      id: "checkout-1",
      name: "Green Capsicum",
      image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200",
      price: 38.0,
      quantity: 1,
    },
    {
      id: "checkout-2",
      name: "Green Capsicum",
      image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200",
      price: 38.0,
      quantity: 1,
    },
    {
      id: "checkout-3",
      name: "Green Capsicum",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200",
      price: 38.0,
      quantity: 1,
    },
  ];

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return {
    items,
    subtotal: 99.0,
    shipping: "Free",
    total: 234.0,
  };
};
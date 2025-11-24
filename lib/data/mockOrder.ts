import { OrderDetails } from "@/types/order";

export const getMockOrderDetails = (): OrderDetails => {
  return {
    orderCode: "#0123_45678",
    date: "October 13, 2025",
    total: 1345.0,
    paymentMethod: "Credit Card",
    items: [
      {
        id: "order-item-1",
        name: "Green Capsicum",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200",
        quantity: 3,
        price: 38.0,
      },
      {
        id: "order-item-2",
        name: "Red Tomato",
        image: "https://images.unsplash.com/photo-1640958904911-65668b264e26?w=200",
        quantity: 2,
        price: 25.0,
      },
      {
        id: "order-item-3",
        name: "Chinese Cabbage",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200",
        quantity: 1,
        price: 17.28,
      },
    ],
  };
};
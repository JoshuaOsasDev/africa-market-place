export interface OrderItem {
  pid?: string;
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

export interface OrderDetails {
  orderCode: string;
  date: string;
  total: number;
  paymentMethod: string;
  items: OrderItem[];
}

export type UsersOrder = {
  _id: string;

  orderNo: string;

  status: "pending" | "on-the-way" | "delivered" | "canceled" | "returned";

  currency: string; // e.g. "NGN"

  subTotal: number;
  shipping: number;
  discount: number;
  total: number;

  totalItems: number;

  conversionRate: number;

  isPaid: boolean;

  paymentMethod: string; // e.g. "COD"
  paymentStatus: "successful" | "failed" | "pending";
  paymentId: string;

  courierName: string;
  trackingId: string;
  trackingLink: string;

  createdAt: string; // ISO timestamp
  updatedAt: string;

  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    state: string;
    country: string;
    zip: string;
    address: string;
    city: string;
    county: string;

    // add more if backend sends more fields
  };

  items: OrderItem[];
};

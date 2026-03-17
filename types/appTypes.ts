import { LucideIcon } from "lucide-react";
import { StaticImageData } from "next/image";
import { ReactElement, ReactNode } from "react";

export type searchFieldCompType = {
  inputDivStyle: string;
};

export type sliderCardPropType = {
  _id: string;
  mobileImageUrl: string;
  webImageUrl: string;
  productId: string;
  productName: string;
};

export type changePasswordType = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};

type Image = {
  url: string;
};

export type Product = {
  id: string;
  name: string;
  image: Image;
  sku: string;
  category: string;
  stock: number;
  price: number;
  status: "published" | "draft" | "pending" | "Out of Stock" | "pending";
  createdAt: Date;
  slug: string;
  stockQuantity: number;
};

export type ModalContextType = {
  openName: string;
  open: (name: string) => void;
  close: () => void;
};

export interface ModalProps {
  children: ReactNode;
}

export type OpenProps = {
  opens: string;
  children: ReactElement<{ onClick?: () => void }>;
};

export type WindowProps = {
  name: string;
  className: string;
  children: ReactElement<{ onCloseModal: () => void }>;
};

export type WishlistItem = {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  status: string;
  image: string;
};

export type ShippingDataType = {
  id: string;
  trackingNo: string;
  customer: string;
  destination: string;
  deliveryDate: string;
  status: string;
};

export type OrderItem = {
  image?: string;
  imageUrl: string;
  name: string;
  pid: string;
  quantity: number;
  salePrice: number;
  shop: string;
  sku: string;
  subtotal: number;
  total: number;
  variantId?: string | null;
};

export type OrderUser = {
  address: string;
  city: string;
  country: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  state: string;
  zip: string;
};

export type userInfoType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  cover: {
    _id: string;
    url: string;
  };
};

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentMethod =
  | "COD"
  | "Mastercard"
  | "Visa"
  | "Transfer"
  | "Paypal";

export type Order = {
  _id: string;
  orderNo: string;
  status: OrderStatus;
  user: OrderUser;
  items: OrderItem[];
  subTotal: number;
  shipping: number;
  discount: number;
  total: number;
  totalItems: number;
  currency: string;
  paymentMethod: PaymentMethod;
  paymentId: string;
  courierName: string;
  trackingId: string;
  trackingLink: string;
  conversionRate: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// For API requests
export type CreateOrderRequest = {
  user: OrderUser;
  items: Omit<OrderItem, "subtotal" | "total">[];
  paymentMethod: PaymentMethod;
  discount?: number;
  courierName?: string;
};

export type UpdateOrderRequest = {
  status?: OrderStatus;
  paymentId?: string;
  trackingId?: string;
  trackingLink?: string;
  courierName?: string;
};

export type NavItem = {
  href: string;
  name: string;
  image?: StaticImageData; // for next/image
  icon?: LucideIcon; // for Lucide icons
};

export type DealsTodayProps = {
  _id: string;
  images?: { url: string }[];
  rate: number;
  discount: string;
  name: string;
  price: number;
  salePrice: number;
  description: string;
  slug: string;
};

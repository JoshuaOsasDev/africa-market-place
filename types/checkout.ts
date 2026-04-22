export interface ContactInformation {
  firstName: string | undefined;
  lastName: string | undefined;
  phoneNumber: string | undefined;
  emailAddress: string | undefined;
}

export interface ShippingAddress {
  id: string;
  address: string;
  country: string;
  city: string;
  county: string;
  postCode?: string;
  email: string;
  phoneNumber: number;
  houseNumber?: string;
  zip?: string;
}

export interface BillingAddress extends ShippingAddress {
  useDifferentBilling: boolean;
}

export interface CardPayment {
  cardNumber: string;
  expirationDate: string;
  cvc: string;
}

export type PaymentMethod = "stripe" | "card";

export interface CheckoutFormData {
  contact: ContactInformation;
  shipping: ShippingAddress;
  billing: BillingAddress;
  paymentMethod: PaymentMethod;
  cardDetails?: CardPayment;
}

export interface CheckoutOrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface CheckoutSummary {
  items: CheckoutOrderItem[];
  subtotal: number;
  shipping: number | "Free";
  total: number;
}

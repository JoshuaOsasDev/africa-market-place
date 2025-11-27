export interface ContactInformation {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
  }
  
  export interface ShippingAddress {
    streetAddress: string;
    country: string;
    townCity: string;
    state: string;
    zipCode: string;
  }
  
  export interface BillingAddress extends ShippingAddress {
    useDifferentBilling: boolean;
  }
  
  export interface CardPayment {
    cardNumber: string;
    expirationDate: string;
    cvc: string;
  }
  
  export type PaymentMethod = "card" | "paypal";
  
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
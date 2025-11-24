export interface OrderItem {
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
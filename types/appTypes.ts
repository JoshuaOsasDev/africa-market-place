import { ReactElement, ReactNode } from "react";

export type searchFieldCompType = {
  inputPlaceholder: string;
  inputTextStyle: string;
  inputDivStyle: string;
  inputState: string;
  setInputState: React.Dispatch<React.SetStateAction<string>>;
};

export type sliderCardPropType = {
  imgUrl: string;
  link: string;
  alt: string;
  id: number;
};

export type Product = {
  id: string;
  name: string;
  image: string;
  sku: string;
  category: string;
  stock: number;
  price: number;
  state: "Published" | "Draft" | "Low Stock" | "Out of Stock";
  addedDate: string;
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
export type userInfoType = {
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  DOB: string,
  city: string,
  state: string,
  address: string,
  image: string
}

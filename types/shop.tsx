import { Product } from "./product";

// Shop Address Type
export type ShopAddress = {
  streetAddress: string;
  city: string;
  state: string;
  country: string;
};

// Image/Document Type
export type ShopImage = {
  url: string;
  _id: string;
  file?: File;
} | null;

// Identity Verification Type
export type IdentityVerification = {
  proofOfAddress: ShopImage;
  governmentId: ShopImage;
};

// Main Shop Type
export type Shop = {
  _id?: string;
  name: string;
  slug: string;
  shopEmail: string;
  shopPhone: string;
  description: string;
  registrationNumber: string;
  taxIdentificationNumber: string;
  metaTitle: string;
  metaDescription?: string;
  commission: number;
  address: ShopAddress;
  logo?: ShopImage;
  status: string;
  products: Product[];
  identityVerification?: IdentityVerification;
  createdAt?: string;
  updatedAt?: string;
};

// Shop Form Input Type (for form submission - before file upload)
export type ShopFormInput = {
  name: string;
  slug: string;
  shopEmail: string;
  shopPhone: string;
  description: string;
  registrationNumber: string;
  taxIdentificationNumber: string;
  metaTitle: string;
  metaDescription?: string;
  commission: number;
  address: ShopAddress;
};

// Shop Update Payload Type
export interface UpdateShopPayload extends Partial<ShopFormInput> {
  logoFile?: File;
  proofOfAddressFile?: File;
  governmentIdFile?: File;
}

// Shop Response Type (from API)
export type ShopResponse = {
  success: boolean;
  message: string;
  data: Shop;
};

// Shop List Response Type
export type ShopListResponse = {
  success: boolean;
  message: string;
  data: Shop[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

// Shop Status Type
export type ShopStatus = "active" | "pending" | "suspended" | "inactive";

// Extended Shop Type with Status
export interface ShopWithStatus extends Shop {
  status: ShopStatus;
  isVerified: boolean;
  rating?: number;
  totalProducts?: number;
  totalOrders?: number;
}
// Shop Filter Type (for querying)
export type ShopFilter = {
  status?: ShopStatus;
  isVerified?: boolean;
  city?: string;
  state?: string;
  country?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "name" | "rating" | "totalOrders";
  sortOrder?: "asc" | "desc";
};

// Image Upload State Type (for UI state management)
export type ImageUploadState = {
  url: string;
  file: File;
  _id?: string;
};

export type Proof = {
  url: string;
  _id?: string;
};

// Form Errors Type
export type ShopFormErrors = {
  name?: string;
  slug?: string;
  shopEmail?: string;
  shopPhone?: string;
  description?: string;
  registrationNumber?: string;
  taxIdentificationNumber?: string;
  metaTitle?: string;
  metaDescription?: string;
  commission?: string;
  address?: {
    streetAddress?: string;
    city?: string;
    state?: string;
    country?: string;
  };
  logo?: string;
  identityVerification?: {
    proofOfAddress?: Proof;
    governmentId?: Proof;
  };
};

export type CreateShopPayload = ShopFormInput & {
  logo?: ShopImage;
  identityVerification?: IdentityVerification;
};

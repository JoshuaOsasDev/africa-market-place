import { Review } from "./review";

export type ImageProp = {
  _id: string;
  url: string;
};

export type CategoryType = {
  _id: string;
  slug: string;
  name: string;
};

export type CategoryMock = {
  id: string;
  name: string;
  slug: string;
};

type AdditionalInfo = Record<string, string | number | boolean>;

export type AdditionalInfoMock = {
  weight: string;
  dimensions: string;
  origin: string;
  storage: string;
};

export type ProductImageMock = string;

export type ProductStatus = "published" | "draft" | "pending";
export type ProductType = "simple" | "variable";
export type DeliveryType = "physical" | "digital";

export type ProductVariant = {
  variant: string; // e.g. "size", "color"
  name: string; // e.g. "Large", "Red"
  price: number;
  salePrice?: number;
  sku: string;
  stockQuantity: number;
  images: ImageProp[];

  // Digital products
  downloadLink?: string;
};

export type ProductMock = {
  id: string;
  name: string;
  slug: string;
  description: string;

  images: ProductImageMock[];

  price: number;
  originalPrice: number;
  discount: number;

  inStock: boolean;
  stockQuantity: number;
  sku: string;

  rating: number;
  reviewCount: number;

  category: CategoryMock;
  tags: string[];
  features: string[];

  additionalInfo: AdditionalInfoMock;
};

export type Product = {
  _id: string;

  // Core
  name: string;
  slug: string;
  type: ProductType;
  status: ProductStatus;
  isFeatured: boolean;

  // Pricing
  price: number;
  salePrice?: number;
  oldSalePrice?: number;
  discountType?: number;
  percentage?: number;
  barcode?: number;
  isDeal?: boolean;

  // Inventory
  sku: string;
  stockQuantity: number;
  sold: number;
  likes: number;
  discount?: number;

  // Description / SEO
  description: string;
  content?: string;
  metaTitle: string;
  metaDescription?: string;

  // Media
  images: ImageProp[];

  // Categories
  category: CategoryType;
  subCategory: string;
  childCategory: string;

  // Product attributes
  tags: string[];
  gender?: string;
  inStock?: boolean;

  // Shipping / dimensions
  deliveryType: DeliveryType;
  width?: string;
  length?: string;
  height?: string;
  weight?: string;

  // Relations
  shop: string;
  relatedProducts: RelatedProduct[];
  reviews: Review[];
  rating?: number;
  isFeatures: string[];

  // Variants (only when type === "variable")
  variants: ProductVariant[];

  // Ratings (optional if computed later)
  averageRating?: number | null;

  additionalInfo?: AdditionalInfo;

  // Timestamps
  createdAt: string;
  updatedAt: string;

  pid?: string;
};

// export type RelatedProduct = {
//   id: string;
//   name: string;
//   slug: string;
//   image: string;
//   price: number;
//   originalPrice?: number;
//   discount?: number;
//   rating?: number;
//   reviewCount?: number;
//   inStock?: boolean;
// };

export interface ProductCardProps {
  _id: string;
  name: string;
  slug: string;
  images: ImageProp;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  onAddToCart?: (id: string) => void;
  onToggleWishlist?: (id: string) => void;
  isWishlisted?: boolean;
  className?: string;
}

export type wishlistProps = {
  averageRating: null;
  images: ImageProp;
  likes: number;
  price: number;
  salePrice: number;
  shop: string;
  slug: string;
  _id: string;
  name: string;
  createdAt?: Date;
};
export type ProductCompletionInput = {
  name?: string;
  description?: string;
  sku?: string;
  price?: number;
  stockQuantity?: number;
  barcode?: number;
  category?: CategoryType;
  status?: string;
  width?: string;
  images?: { url: string }[];
};
export interface productType {
  id: string;
  name: string;
  slug: string;
  description: string;
  images: string[];
  price: number;
  originalPrice?: number;
  discount?: number;
  inStock: boolean;
  stockQuantity?: number;
  sku: string;
  rating: number;
  reviewCount: number;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  tags: string[];
  features?: string[];
  additionalInfo?: {
    weight?: string;
    dimensions?: string;
    origin?: string;
    storage?: string;
    [key: string]: string | undefined;
  };
}

export interface RelatedProduct {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
}

export type ProductReview = {
  _id: string;
  name: string;
  price: number;
  salesPrice?: number;
  slug: string;
  status: string;
  shop: {
    _id: string;
    name: string;
  };
  createdAt: Date;
  image: {
    url: string;
  };
};

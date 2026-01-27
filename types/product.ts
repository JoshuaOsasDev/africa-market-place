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

  // Inventory
  sku: string;
  stockQuantity: number;
  sold: number;
  likes: number;

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

  // Shipping / dimensions
  deliveryType: DeliveryType;
  width?: string;
  length?: string;
  height?: string;
  weight?: string;

  // Relations
  shop: string;
  relatedProducts: string[];
  reviews: string[];

  // Variants (only when type === "variable")
  variants: ProductVariant[];

  // Ratings (optional if computed later)
  averageRating?: number | null;

  // Timestamps
  createdAt: string;
  updatedAt: string;
};

export type RelatedProduct = {
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

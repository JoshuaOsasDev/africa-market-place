export interface Product {
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
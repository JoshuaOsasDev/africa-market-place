import {
  getMockProduct,
  getMockRelatedProducts,
} from "@/lib/data/mockProducts";
import { ProductDetailClient } from "./ProductDetailClient";
import { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = getMockProduct(resolvedParams.slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} - Africa Marketplace`,
    description: product.description.substring(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.substring(0, 160),
      images: [product.images[0]],
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;

  //  Fetching Mock Data

  //const product = getMockProduct(resolvedParams.slug);

  const relatedProducts = getMockRelatedProducts();

  return (
    <div>
      <ProductDetailClient
        resolvedParams={resolvedParams}
        relatedProducts={relatedProducts}
      />
    </div>
  );
}

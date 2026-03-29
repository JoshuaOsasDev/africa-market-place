import { getUserProductsBySlug } from "@/services/apiServices/userDashboard";
import { ProductDetailClient } from "./productDetailClient";
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

  const product = await getUserProductsBySlug(resolvedParams.slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product?.data?.name} - Africa Marketplace`,
    description: product?.data?.description?.substring(0, 160),
    openGraph: {
      title: product?.data?.name,
      description: product?.data?.description?.substring(0, 160),
      images: [product?.data?.images?.[0]],
      type: "website",
    },
  };
}
export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;


  return (
    <div>
      <ProductDetailClient resolvedParams={resolvedParams} />
    </div>
  );
}

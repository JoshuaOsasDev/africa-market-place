import ProductCardExample from "@/components/product/productCardExample";
import { getUserProducts } from "@/services/apiServices/userDashboard";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const res = await getUserProducts();

  if (!res || !res.data || res.data.length === 0) {
    return {
      title: "Products - Africa Marketplace",
      description: "Browse products on Africa Marketplace",
    };
  }

  // Use first product as preview (optional)
  const firstProduct = res.data[0];

  return {
    title: "Products - Africa Marketplace",
    description: firstProduct?.description?.substring(0, 160),
    openGraph: {
      title: "Products - Africa Marketplace",
      description: firstProduct?.description?.substring(0, 160),
      images: [firstProduct?.images?.[0]],
      type: "website",
    },
  };
}

export default function Page() {
  return (
    <div>
      <ProductCardExample />
    </div>
  );
}

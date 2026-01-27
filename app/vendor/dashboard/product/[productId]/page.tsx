import ProductIdPage from "@/components/pageComponents/vendor/product/productIdPage";
//import { useVendorProductById } from "@/lib/hooks/vendorDashboard/useVendor";

// export async function generateMetadata({
//   params,
// }: {
//   params: { productId: string };
// }) {
//   const { productId } = await params;

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/vendor/products/${productId}`,
//     {
//       cache: "no-store",
//       // credentials: "include",
//     },
//   );

//   if (!res.ok) return null;
//   const product = await res.json();

//   if (!product?.data) {
//     return { title: "Product not found" };
//   }
//   console.log(product, "meta product");
//   console.log(res, "meta res");
//   return {
//     title: product.data.name,
//     description: product.data.metaDescription,
//   };
// }

// export const metadata = {
//   title: "wide",
//   discription: "home",
// };

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  return <ProductIdPage productId={productId} />;
}

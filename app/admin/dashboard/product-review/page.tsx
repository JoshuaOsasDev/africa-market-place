import ProductReviewPage from "@/components/pageComponents/admin/productReview/productReviewPage";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  // const page = await Number(searchParams);

  return <ProductReviewPage />;
}

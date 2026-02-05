import ProductCategory from "@/components/pageComponents/user/categories/productCategory";

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.category;

  // console.log("Slug value:", slug); // This will log: "operating-systems-ai-ml"

  return (
    <div>
      <ProductCategory category={slug} />
    </div>
  );
}

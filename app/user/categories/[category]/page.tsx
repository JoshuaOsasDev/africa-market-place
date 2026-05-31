import ProductCategory from "@/components/pageComponents/user/categories/productCategory";

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.category;

  return (
    <div>
      <ProductCategory category={slug} />
    </div>
  );
}

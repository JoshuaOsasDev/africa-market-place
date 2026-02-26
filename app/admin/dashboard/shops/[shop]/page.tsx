import ShopSlugPage from "@/components/pageComponents/admin/shops/shopSlugPage";

export default async function page({
  params,
}: {
  params: Promise<{ shop: string }>;
}) {
  const { shop } = await params;
  //   console.log(params, "params");
  return (
    <div>
      <ShopSlugPage shop={shop} />
    </div>
  );
}

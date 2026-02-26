import ShopsPage from "@/components/pageComponents/admin/shops/shopsPage";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const page = (await Number(searchParams)) || 1;
  return <ShopsPage page={page} />;
}

import UsersPage from "@/components/pageComponents/admin/user/userPage";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const page = (await Number(searchParams)) || 1;
  // console.log(page, "search");
  return <UsersPage page={page} />;
}

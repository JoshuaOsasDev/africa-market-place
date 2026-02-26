import OrderUserPage from "@/components/pageComponents/user/order/orderPage";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { order } = (await searchParams) ?? "all";
  console.log("filter", order);

  return <OrderUserPage orderParams={order} />;
}

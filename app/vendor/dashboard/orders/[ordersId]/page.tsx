import OrderIdPage from "@/components/pageComponents/vendor/order/orderIdPage";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ ordersId: string }>;
}) {
  const { ordersId } = await params;

  return (
    <div>
      <OrderIdPage ordersId={ordersId} />
    </div>
  );
}

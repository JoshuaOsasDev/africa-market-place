import PaymentForm from "../paymentComp";

export default async function Page({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  return <PaymentForm orderId={orderId} />;
}

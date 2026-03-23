"use client";
import { getUserOrderId } from "@/services/apiServices/userDashboard";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, JSX } from "react";

type PaymentStatusType = "successful" | "pending" | "failed";

// Icons
const CheckIcon = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XIcon = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const BagIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const CONFIG: Record<
  PaymentStatusType,
  {
    icon: JSX.Element;
    badge: string;
    heading: string;
    sub: string;
    note: string;
    ctaLabel: string;
  }
> = {
  successful: {
    icon: <CheckIcon />,
    badge: "Confirmed",
    heading: "Payment Successful!",
    sub: "Your order has been placed and is being prepared.",
    note: "A confirmation email has been sent.",
    ctaLabel: "Check Order Status",
  },
  pending: {
    icon: <ClockIcon />,
    badge: "Processing",
    heading: "Payment Pending",
    sub: "Your transaction is being processed.",
    note: "We'll notify you once payment clears.",
    ctaLabel: "Check Order Status",
  },
  failed: {
    icon: <XIcon />,
    badge: "Declined",
    heading: "Payment failed",
    sub: "We couldn't process your payment.",
    note: "Please verify your card details.",
    ctaLabel: "Try Again",
  },
};

function StepTracker({ stepDone }: { stepDone: any }) {
  const steps = ["Initiated", "Confirmed", "Delivered"];

  return (
    <div className="mt-6 flex items-center">
      {steps.map((label, i) => (
        <div key={i} className="flex flex-1 items-center pl-5">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full ${i <= stepDone ? "bg-[#2E7D32]" : "bg-[#E1E2E4]"}`}
            >
              {i <= stepDone ? (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <div className="h-2 w-2 rounded-full bg-gray-400" />
              )}
            </div>

            <span
              className={`text-[11px] font-semibold ${
                i <= stepDone ? "text-[#2E7D32]" : "text-gray-400"
              }`}
            >
              {label}
            </span>
          </div>

          {i !== steps.length - 1 && (
            <div
              className={`mx-2 h-[2px] flex-1 ${
                i < stepDone ? "bg-[#2E7D32]" : "bg-[#E1E2E4]"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function PaymentStatus({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<any>(null);
  const [show, setShow] = useState(false);
  const status = order?.data?.paymentStatus as PaymentStatusType;
  const router = useRouter();

  useEffect(() => {
    async function fecthOrder() {
      try {
        if (!orderId) return;

        // 1. Fetch order
        const res = await getUserOrderId(orderId);

        const orderData = res;
        if (!orderData) throw new Error("Order not found");

        setOrder(orderData);
      } catch (error) {
        console.log(error, "Error 1");
      }
    }

    fecthOrder();
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, [orderId]);

  // useEffect(() => {
  //   if (status === "successful") {
  //     const preventBack = () => {
  //       window.history.go(1);
  //     };

  //     window.history.pushState(null, "", window.location.href);
  //     window.addEventListener("popstate", preventBack);

  //     return () => {
  //       window.removeEventListener("popstate", preventBack);
  //     };
  //   }
  // }, [status]);
  //console.log(order, "order");

  const cfg = CONFIG[status];
  const rows = [
    { label: "Order ID", value: order?.data?.orderNo },
    { label: "Amount", value: `£${order?.data?.total}` },
    { label: "Merchant", value: "Africa Marketplace" },
    {
      label: "Date",
      value: order?.data?.updatedAt
        ? new Date(order.data.updatedAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "—",
    },
  ];

  if (!order?.data) {
    return <div className="mt-10 text-center">Loading...</div>;
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#E1E2E4] px-4">
      {/* Logo */}
      <div
        className={`mt-2 mb-4 flex items-center gap-2 transition-all duration-500 ${
          show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2E7D32]">
          <BagIcon />
        </div>

        <span className="text-lg font-bold">Africa Marketplace</span>
      </div>

      {/* Card */}
      <div
        className={`w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-500 ${
          show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div className="h-1 bg-[#2E7D32]" />

        {/* Hero */}
        <div className="border-b border-[#E1E2E4] px-8 py-10 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#2E7D32] text-white">
            {cfg?.icon}
          </div>

          <div className="mb-3 text-xs font-bold tracking-widest text-[#2E7D32] uppercase">
            {cfg?.badge}
          </div>

          <h1 className="mb-2 text-2xl font-bold">{cfg?.heading}</h1>

          <p className="text-sm text-gray-500">{cfg?.sub}</p>

          <StepTracker stepDone={2} />
        </div>

        {/* Details */}
        <div>
          {rows.map((row, i) => (
            <div
              key={row?.label}
              className="flex justify-between border-b border-[#E1E2E4] px-8 py-4"
            >
              <span className="text-sm text-gray-400">{row?.label}</span>
              <span className="text-sm font-semibold">{row?.value}</span>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mx-6 mt-4 rounded-lg bg-[#E1E2E4] px-4 py-3 text-sm">
          {cfg?.note}
        </div>

        {/* CTA */}
        <div className="p-6">
          <Link href={"/user/dashboard/orders"}>
            <button className="w-full rounded-lg bg-[#2E7D32] py-3 font-semibold text-white transition hover:opacity-90">
              {cfg?.ctaLabel}
            </button>
          </Link>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-1 border-t border-[#E1E2E4] py-4 text-xs text-gray-500">
          <ShieldIcon />
          Payments secured
        </div>
      </div>
    </div>
  );
}

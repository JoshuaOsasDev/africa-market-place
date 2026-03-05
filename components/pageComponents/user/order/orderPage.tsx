"use client";
import OrderTable from "@/components/pageComponents/user/order/orderTable";
import OrderTabs from "@/components/pageComponents/user/order/orderTabs";
import { Button } from "@/components/ui/button";
import { useUserOder } from "@/lib/hooks/userDashboard/useUser";
import { UsersOrder } from "@/types/order";
import { SlidersHorizontal } from "lucide-react";

export default function OrderUserPage({
  orderParams,
}: {
  orderParams: string | string[] | undefined;
}) {
  const { userOders, isLoading } = useUserOder();

  const orders: UsersOrder[] = userOders?.data || [];

  console.log(orders, "orders");
  const tabCounts = {
    all: orders.length,

    pending: orders.filter((o) => o.status?.toLowerCase() === "pending").length,

    "on-the-way": orders.filter((o) => o.status?.toLowerCase() === "on-the-way")
      .length,

    delivered: orders.filter((o) => o.status?.toLowerCase() === "delivered")
      .length,

    canceled: orders.filter((o) => o.status?.toLowerCase() === "canceled")
      .length,

    returned: orders.filter((o) => o.status?.toLowerCase() === "returned")
      .length,
  };

  return (
    <div>
      <div className="mt-7.5 md:my-2.5">
        <h3 className="md:text[28px] text-xl font-semibold">
          Hi John! Welcome back 👋
        </h3>
        <p className="text-sm text-[#6F6F6F] md:text-[16px]">
          What do you want to order today?
        </p>
      </div>

      <OrderTabs tabCounts={tabCounts} />

      <div className="rounded-xl border border-[#E0E2E7] md:my-3">
        <div className="">
          <div className="flex items-center space-x-2.5 bg-white px-6 py-4.5 md:w-full md:justify-between">
            <div className="flex items-center md:space-x-2.5">
              <h3 className="text-[18px] font-medium">Recent Orders</h3>
              <div className="hidden w-fit rounded-full bg-[#E7F4EE] px-3 py-1 md:block">
                <p className="font-semibold text-[#2E7D32]">+2 Orders</p>
              </div>
            </div>
            <div className="flex items-center space-x-2.5">
              <Button className="text rounded-xl border border-[#E0E2E7] bg-[#FFFFFF] px-3.5 py-2.5 font-semibold text-black">
                <span>
                  <SlidersHorizontal />
                </span>{" "}
                <span>Filter</span>
              </Button>
              <Button className="rounded-xl bg-[#2E7D32] px-3.5 py-2.5 font-semibold text-white">
                Order Again
              </Button>
            </div>
          </div>
        </div>

        <OrderTable
          orderParams={orderParams}
          userOders={orders}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

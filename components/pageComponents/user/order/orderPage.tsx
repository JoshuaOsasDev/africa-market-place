"use client";
import OrderTable from "@/components/pageComponents/user/order/orderTable";
import OrderTabs from "@/components/pageComponents/user/order/orderTabs";

import { useUserOder } from "@/lib/hooks/userDashboard/useUser";
import { useAppSelector } from "@/redux/store";
import { UsersOrder } from "@/types/order";

import Link from "next/link";
import { useSearchParams } from "next/navigation"; // ✅ read page from URL

export default function OrderUserPage({
  orderParams,
}: {
  orderParams: string | string[] | undefined;
}) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const params = {
    page: page,
    limit: 10,
  };
  const user = useAppSelector((state) => state.user.user);
  const { userOders, isLoading, error } = useUserOder(params);

  const orders: UsersOrder[] = userOders?.data || [];

  const totalCount: number = userOders?.counts ?? 10;

  const totalPages =
    totalCount || Math.max(1, Math.ceil(totalCount / params.limit));

  console.log(totalCount, "count of total");
  const tabCounts = {
    all: totalCount,
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
      <div className="mt-15 md:my-2.5">
        <h3 className="md:text[28px] text-xl font-semibold">
          Hi {user?.firstName}! Welcome back 👋
        </h3>
        <p className="text-sm text-[#6F6F6F] md:text-[16px]">
          What do you want to order today?
        </p>
      </div>

      <OrderTabs tabCounts={tabCounts} />

      <div className="rounded-xl border border-[#E0E2E7] md:my-3">
        <div className="flex w-full items-center justify-between space-x-2.5 bg-white px-6 py-4.5">
          <div className="flex items-center md:space-x-2.5">
            <h3 className="text-[18px] font-medium">Recent Orders</h3>
            <div className="hidden w-fit rounded-full bg-[#E7F4EE] px-3 py-1 md:block">
              <p className="font-semibold text-[#2E7D32]">+2 Orders</p>
            </div>
          </div>
          <div className="flex items-center space-x-2.5">
            <Link
              href={"/user/products"}
              className="rounded-xl bg-[#2E7D32] px-3.5 py-2.5 font-semibold text-white"
            >
              Order Again
            </Link>
          </div>
        </div>

        <OrderTable
          orderParams={orderParams}
          userOders={orders}
          isLoading={isLoading}
          totalPages={totalPages} //
        />
      </div>
    </div>
  );
}

"use client";

import Modal from "@/components/common/modal";
import PayoutHistoryTable from "@/components/pageComponents/vendor/wallet/payoutHistoryTable";
import WithdrawModal from "@/components/pageComponents/vendor/wallet/withdrawModal";
import { Button } from "@/components/ui/button";
import { useVendorPayment } from "@/lib/hooks/vendorDashboard/useVendor";
import { Plus, Wallet } from "lucide-react";

export type Payout = {
  _id: string;
  account: string;
  transactionId: string;
  amount: number;
  status: "successful" | "declined" | "pending";
  date: string;
  currency?: string;
};

/*  Transform backend Payment → UI Payout */
const transformPaymentsToPayouts = (payments: any[]): Payout[] => {
  return payments.map((payment) => {
    let status: Payout["status"];

    if (payment.status === "paid") {
      status = "successful";
    } else if (payment.status === "failed") {
      status = "declined";
    } else {
      status = "pending";
    }

    return {
      _id: payment._id,
      account: payment.shop || "N/A",
      transactionId: payment._id,
      amount: payment.totalIncome || payment.total || 0,
      status,
      date: payment.createdAt,
      currency: "£",
    };
  });
};

const Page = () => {
  const { vendorPayment, isLoading } = useVendorPayment();

  /*  Extract & transform data safely */
  const payouts = transformPaymentsToPayouts(vendorPayment?.data || []);

  /*  Optional: calculate balances */
  const totalIncome = payouts.reduce((acc, curr) => acc + curr.amount, 0);

  const pendingBalance = payouts
    .filter((p) => p.status === "pending")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const holdBalance = payouts
    .filter((p) => p.status === "declined")
    .reduce((acc, curr) => acc + curr.amount, 0);

  if (isLoading) {
    return <p className="p-4">Loading payments...</p>;
  }

  return (
    <div className="flex flex-col gap-5">
      <Button className="ml-auto hidden items-center justify-center rounded-[12px] bg-[#2E7D32] px-4 py-5.5 hover:bg-[#2E7D32]/80 lg:flex">
        <span>
          <Plus />
        </span>
        <span>Add new account</span>
      </Button>

      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {/* Withdrawable Balance */}
          <div className="col-span-2 rounded-[12px] bg-gray-200 px-3.5 py-2.5 md:col-span-1 md:bg-white">
            <div className="flex h-full flex-col justify-between gap-7">
              <div className="w-fit rounded-xl bg-[#EAF2EA] p-2">
                <Wallet className="text-[#2E7D32]" />
              </div>

              <div className="flex flex-col">
                <p className="text-sm text-[#8B8D97]">Withdrawable Balance</p>

                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold">
                    £{totalIncome.toLocaleString()}
                  </p>

                  <Modal>
                    <Modal.Open opens="withdraw">
                      <Button size="sm" className="bg-[#2E7D32]">
                        Withdraw
                      </Button>
                    </Modal.Open>

                    <Modal.Window name="withdraw" className="max-w-sm">
                      <WithdrawModal />
                    </Modal.Window>
                  </Modal>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Balance */}
          <div className="rounded-[12px] bg-gray-200 px-3.5 py-2.5 md:bg-white">
            <div className="flex h-full flex-col justify-between gap-7">
              <div className="w-fit rounded-xl bg-[#FFF9EA] p-2">
                <Wallet className="text-[#FBC02D]" />
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-sm text-[#8B8D97]">Pending Balance</p>
                <p className="text-lg font-semibold">
                  £{pendingBalance.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Balance on Hold */}
          <div className="rounded-[12px] bg-gray-200 px-3.5 py-2.5 md:bg-white">
            <div className="flex h-full flex-col justify-between gap-7">
              <div className="w-fit rounded-xl bg-[#FFE8E5] p-2">
                <Wallet className="text-[#FF4733]" />
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-sm text-[#8B8D97]">Balance on Hold</p>
                <p className="text-lg font-semibold">
                  £{holdBalance.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <PayoutHistoryTable payouts={payouts} />
      </div>
    </div>
  );
};

export default Page;

"use client";
import Modal from "@/components/common/Modal";
import PayoutHistoryTable from "@/components/pageComponents/vendor/wallet/payoutHistoryTable";
import WithdrawModal from "@/components/pageComponents/vendor/wallet/withdrawModal";
import { Button } from "@/components/ui/button";
import { Plus, Wallet } from "lucide-react";
// Mock data for testing

export type Payout = {
  _id: string;
  account: string;
  transactionId: string;
  amount: number;
  status: "Successful" | "Declined" | "Pending";
  date: string;
  currency?: string;
};

export const mockPayouts: Payout[] = [
  {
    _id: "1",
    account: "21053624234",
    transactionId: "46575fgdpsknam",
    amount: 45000,
    status: "Successful",
    date: "2023-01-15",
    currency: "₦",
  },
  {
    _id: "2",
    account: "21053624234",
    transactionId: "46575fgdpsknam",
    amount: 45000,
    status: "Successful",
    date: "2023-01-14",
    currency: "₦",
  },
  {
    _id: "3",
    account: "21053624234",
    transactionId: "46575fgdpsknam",
    amount: 45000,
    status: "Successful",
    date: "2023-01-13",
    currency: "₦",
  },
  {
    _id: "4",
    account: "21053624234",
    transactionId: "46575fgdpsknam",
    amount: 45000,
    status: "Successful",
    date: "2023-01-12",
    currency: "₦",
  },
  {
    _id: "5",
    account: "21053624234",
    transactionId: "46575fgdpsknam",
    amount: 45000,
    status: "Successful",
    date: "2023-01-11",
    currency: "₦",
  },
  {
    _id: "6",
    account: "21053624234",
    transactionId: "46575fgdpsknam",
    amount: 45000,
    status: "Declined",
    date: "2023-01-10",
    currency: "₦",
  },
  {
    _id: "7",
    account: "21053624234",
    transactionId: "46575fgdpsknam",
    amount: 45000,
    status: "Pending",
    date: "2023-01-09",
    currency: "₦",
  },
  {
    _id: "8",
    account: "21053624234",
    transactionId: "46575fgdpsknam",
    amount: 45000,
    status: "Declined",
    date: "2023-01-08",
    currency: "₦",
  },
];

const page = () => {
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
                  <p className="text-lg font-semibold">₦150,000.00</p>

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
                <p className="text-lg font-semibold">₦150,000.00</p>
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
                <p className="text-lg font-semibold">₦150,000.00</p>
              </div>
            </div>
          </div>
        </div>

        <PayoutHistoryTable payouts={mockPayouts} />
      </div>
    </div>
  );
};

export default page;

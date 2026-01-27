import { Button } from "@/components/ui/button";

export default function WithdrawModal() {
  return (
    <div className="w-full p-6">
      {/* Title */}
      <h2 className="text-center text-[24px] font-bold text-[#000000]">
        Withdraw Money
      </h2>

      {/* Subtitle */}
      <p className="mt-1 text-center text-[16px] text-[#909090]">
        Your money will be sent to account linked to{" "}
        <span className="font-medium">African Kitchen</span>
      </p>

      {/* Amount */}
      <div className="mt-5">
        <label className="mb-1 block text-sm font-medium text-[#020E17]">
          Amount
        </label>

        <input
          type="number"
          placeholder="Enter amount"
          className="w-full rounded-lg border border-[#D0D5DD] px-3 py-2.5 text-sm text-[#101828] outline-none placeholder:text-[#98A2B3] focus:border-green-600 focus:ring-1 focus:ring-green-600"
        />
      </div>

      {/* Withdraw Button */}
      <Button className="mt-6 w-full rounded-lg bg-[#2E7D32] py-2.5 text-sm font-medium hover:bg-[#256528]">
        Withdraw
      </Button>
    </div>
  );
}

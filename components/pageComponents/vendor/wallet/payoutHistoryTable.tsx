"use client";
import { Payout } from "@/app/vendor/dashboard/wallet/page";
import ReusableTable from "@/components/common/reusableTable";
import { Search, Filter, Download } from "lucide-react";
import { useState } from "react";

// Payout type definition

export default function PayoutHistoryTable({ payouts }: { payouts: Payout[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Status badge styles
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Successful":
        return "bg-[#D4EDDA] text-[#155724]";
      case "Declined":
        return "bg-[#F8D7DA] text-[#721C24]";
      case "Pending":
        return "bg-[#FFF9EA] text-[#FBC02D]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Filter payouts based on search
  const filteredPayouts = payouts.filter(
    (payout) =>
      payout.account.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payout.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payout.status.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="rounded-lg border border-[#E0E2E7] bg-white">
      {/* Header */}
      <div className="border-b border-[#E0E2E7] p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Payout History
          </h2>

          <div className="hidden items-center gap-3 md:flex">
            {/* Search */}
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-lg border border-[#E0E2E7] bg-white py-2 pr-4 pl-10 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Filter Button */}
            <button className="flex items-center gap-2 rounded-lg border border-[#E0E2E7] bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              Filter
            </button>

            {/* Download Button */}
            <button className="flex items-center gap-2 rounded-lg border border-[#E0E2E7] bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <ReusableTable
        order="wallet"
        data={filteredPayouts}
        columns={[
          {
            label: "Account",
            renderCell: (item) => (
              <span className="text-sm font-medium text-[#333843]">
                {item.account}
              </span>
            ),
          },
          {
            label: "Transaction ID",
            renderCell: (item) => (
              <span className="text-sm text-[#667085]">
                {item.transactionId}
              </span>
            ),
          },
          {
            label: "Amount",
            renderCell: (item) => (
              <span className="text-sm font-semibold text-[#333843]">
                {item.currency || "₦"}
                {item.amount.toLocaleString()}
              </span>
            ),
          },
          {
            label: "Status",
            renderCell: (item) => (
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getStatusStyles(
                  item.status,
                )}`}
              >
                {item.status}
              </span>
            ),
          },
        ]}
        columnsStyle="50px 1fr 1fr 1fr 1fr"
        itemsPerPage={10}
        onSelectChange={(selectedIds) =>
          setSelectedIds(selectedIds as string[])
        }
      />
    </div>
  );
}

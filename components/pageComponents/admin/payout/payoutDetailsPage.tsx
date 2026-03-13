"use client";
import { useState } from "react";
import { BadgeCheck, Ban, Copy, Eye, MoreVertical } from "lucide-react";
import ReusableTable from "@/components/common/reusableTable";
import Modal from "@/components/common/modal";
import Menus from "@/components/common/menus";
import DeleteProductModal from "@/components/pageComponents/vendor/product/deleteProductModal";

export default function PayoutDetailsPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Mock payout data
  const payoutData = [
    {
      id: "1",
      name: "Janet Adebayo",
      bankName: "United Bank of Africa",
      bankCode: "205968899",
      date: "20-03-2025",
      status: "Pending",
    },
    {
      id: "2",
      name: "Janet Adebayo",
      bankName: "United Bank of Africa",
      bankCode: "205968899",
      date: "20-03-2025",
      status: "Approved",
    },
    {
      id: "3",
      name: "Janet Adebayo",
      bankName: "United Bank of Africa",
      bankCode: "205968899",
      date: "20-03-2025",
      status: "Declined",
    },
    {
      id: "4",
      name: "Janet Adebayo",
      bankName: "United Bank of Africa",
      bankCode: "205968899",
      date: "20-03-2025",
      status: "Approved",
    },
    {
      id: "5",
      name: "Janet Adebayo",
      bankName: "United Bank of Africa",
      bankCode: "205968899",
      date: "20-03-2025",
      status: "Declined",
    },
  ];

  // Status badge styles
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-[#FFF3CD] text-[#856404]";
      case "Approved":
        return "bg-[#D4EDDA] text-[#155724]";
      case "Declined":
        return "bg-[#F8D7DA] text-[#721C24]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-lg bg-white">
        <ReusableTable
          order="asc"
          data={payoutData}
          columns={[
            {
              label: "Name",
              renderCell: (item) => (
                <span className="font-medium text-[#333843]">{item.name}</span>
              ),
            },
            {
              label: "Bank details",
              renderCell: (item) => (
                <div className="flex flex-col">
                  <span className="font-medium text-[#333843]">
                    {item.bankName}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[13px] text-[#667085]">
                      {item.bankCode}
                    </span>
                    <button className="text-[#667085] hover:text-[#333843]">
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
              ),
            },
            {
              label: "Date",
              renderCell: (item) => (
                <span className="text-[#667085]">{item.date}</span>
              ),
            },
            {
              label: "Status",
              renderCell: (item) => (
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getStatusStyles(
                    item.status,
                  )}`}
                >
                  {item.status}
                </span>
              ),
            },
            {
              label: "Action",
              renderCell: (item) => (
                <div className="flex items-center justify-center">
                  <Modal>
                    <Menus>
                      <Menus.Menu>
                        <Menus.Toggle id={item.id} />
                        <Menus.List id={item.id}>
                          <Menus.Button
                            icon={
                              <div className="rounded-full bg-[#EAF2EA] p-2">
                                <BadgeCheck
                                  className="text-[#2E7D32]"
                                  size={16}
                                />
                              </div>
                            }
                            onClick={() => console.log("View:")}
                          >
                            Approve Withdrawal
                          </Menus.Button>

                          <Menus.Button
                            icon={
                              <div className="rounded-full bg-[#FEECC0] p-2">
                                <Eye className="text-[#FCCD57]" size={16} />
                              </div>
                            }
                            onClick={() => console.log("View:")}
                          >
                            Preview Withdrawal
                          </Menus.Button>

                          <Modal.Open opens="payout">
                            <Menus.Button
                              icon={
                                <div className="rounded-full bg-[#FFE8E5] p-2">
                                  <Ban className="text-[#FF4733]" size={16} />
                                </div>
                              }
                              onClick={() => console.log("View:", item.id)}
                            >
                              Decline Withdrawal
                            </Menus.Button>
                          </Modal.Open>
                        </Menus.List>

                        <Modal.Window name="payout" className="max-w-md">
                          <DeleteProductModal
                            text={`Payouts ${item.id}`}
                            productName="Payouts"
                            onConfirm={() =>
                              console.log("Delete payout:", item.id)
                            }
                          />
                        </Modal.Window>
                      </Menus.Menu>
                    </Menus>
                  </Modal>
                </div>
              ),
            },
          ]}
          columnsStyle="80px 1fr 1fr 150px 150px 100px"
          itemsPerPage={10}
          onSelectChange={(selectedIds) =>
            setSelectedIds(selectedIds as string[])
          }
        />
      </div>
    </div>
  );
}

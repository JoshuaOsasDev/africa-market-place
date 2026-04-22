"use client";

import { useCreateTicket } from "@/lib/hooks/userDashboard/useUser";
import { UsersOrder } from "@/types/order";
import { X, Camera, ChevronLeft } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import Image from "next/image";
import Loader from "@/components/common/loader";

export function RaiseTicketModal({
  order,
  onClose,
}: {
  order: UsersOrder;
  onClose: () => void;
}) {
  const { mutate: createTicket, isPending } = useCreateTicket();

  const [form, setForm] = useState({
    orderId: order._id,
    userId: order.user?._id,
    orderNo: order.orderNo || "",
    items: [] as string[],
    email: order?.user?.email || "",
    description: "",
    subject: "",
    imageUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(form, "form");
    createTicket({
      orderId: form.orderId,
      orderNo: form.orderNo,
      items: form.items,
      userId: form.userId,
      imageUrl: form.imageUrl,
      subject: form.subject,
      description: form.description,
    });
    onClose();
  };

  if (isPending) return <Loader />;
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="no-scrollbar relative flex h-full w-full flex-col overflow-y-auto bg-white p-5 shadow-xl sm:h-full sm:max-w-sm sm:rounded-3xl"
      >
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="block sm:hidden">
              <ChevronLeft size={22} className="text-[#1A1A1A]" />
            </button>
            <h2 className="text-[17px] font-bold text-[#1A1A1A]">
              Raise Support Ticket
            </h2>
          </div>
          <button
            onClick={onClose}
            className="hidden h-7 w-7 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200 sm:flex"
          >
            <X size={14} className="text-gray-600" />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 space-y-4">
          <div>
            <label className="mb-1 block text-[11px] font-bold tracking-tight text-[#AAAAAA] uppercase">
              Order Number
            </label>
            <input
              type="text"
              value={form.orderNo}
              readOnly
              className="w-full rounded-xl border border-gray-100 bg-[#FAFAFA] p-2.5 text-sm font-medium text-gray-500 outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-bold tracking-tight text-[#AAAAAA] uppercase">
              Subject
            </label>
            <input
              type="subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Add a Subject"
              className="w-full rounded-xl border border-[#F0F0F0] p-2.5 text-sm transition-all focus:border-[#2E7D32] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-bold tracking-tight text-[#AAAAAA] uppercase">
              Select Items
            </label>
            <select
              multiple
              value={form.items}
              onChange={(e) => {
                const selectedValues = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value,
                );
                setForm({ ...form, items: selectedValues });
              }}
              className="w-full rounded-xl border border-[#F0F0F0] p-2.5 text-sm transition-all focus:border-[#2E7D32] focus:outline-none"
            >
              {order.items?.map((item, i) => (
                <option key={i} value={item.pid} className="py-1">
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-bold tracking-tight text-[#AAAAAA] uppercase">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="e.g. user@example.com"
              className="w-full rounded-xl border border-[#F0F0F0] p-2.5 text-sm transition-all focus:border-[#2E7D32] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-bold tracking-tight text-[#AAAAAA] uppercase">
              Describe the Issue
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Tell us what went wrong..."
              rows={3}
              className="w-full rounded-xl border border-[#F0F0F0] p-2.5 text-sm transition-all focus:border-[#2E7D32] focus:outline-none"
            />
          </div>

          {/* Upload Widget */}
          <div className="w-full">
            <CldUploadWidget
              uploadPreset="africamarketplace"
              onSuccess={(result: any) => {
                setForm((prev) => ({
                  ...prev,
                  imageUrl: result.info.secure_url,
                }));
              }}
              options={{ multiple: false, folder: "support-tickets" }}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open()}
                  className="relative flex h-28 w-full flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-[#F0F0F0] bg-[#FAFAFA] transition-all hover:border-[#2E7D32]/50 hover:bg-[#F0F7F0]"
                >
                  {form.imageUrl ? (
                    <Image
                      src={form.imageUrl}
                      alt="Proof"
                      fill
                      className="rounded-xl object-cover p-1"
                    />
                  ) : (
                    <>
                      <Camera className="text-[#2E7D32]" size={20} />
                      <p className="text-[12px] font-medium text-gray-500">
                        Upload photo proof
                      </p>
                    </>
                  )}
                </button>
              )}
            </CldUploadWidget>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pb-4 sm:pb-0">
          <button
            onClick={handleSubmit}
            disabled={isPending || !form.description}
            className="w-full rounded-xl bg-[#2E7D32] py-3.5 text-sm font-bold text-white transition-all hover:bg-[#1B5E20] active:scale-[0.98] disabled:bg-gray-200 disabled:text-gray-400"
          >
            {isPending ? "Submitting..." : "Submit Ticket"}
          </button>
        </div>
      </div>
    </div>
  );
}

import { UsersOrder } from "@/types/order";
import { div } from "framer-motion/client";
import { X } from "lucide-react";
import { useState } from "react";

export function RaiseTicketModal({
  order,
  onClose,
}: {
  order: UsersOrder;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    orderId: order.orderNo || "",
    items: [] as string[],
    email: order?.user?.email || "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Ticket submitted:", form);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex items-center justify-center p-4"
      >
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">Raise Support Ticket</h2>
            <button onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <input
              type="text"
              name="orderId"
              value={form.orderId}
              readOnly
              className="w-full rounded-lg border bg-gray-100 p-2 text-sm"
              placeholder="Order ID"
            />

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
              className="h-fit w-full rounded-lg border p-2 text-sm"
            >
              {order.items?.map((item, i) => (
                <option key={i} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full rounded-lg border p-2 text-sm"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Describe your issue..."
              rows={4}
              className="w-full rounded-lg border p-2 text-sm"
            />
          </div>

          {/* Actions */}
          <button
            onClick={handleSubmit}
            className="mt-5 w-full rounded-xl bg-[#2E7D32] py-3 font-semibold text-white hover:bg-[#1B5E20]"
          >
            Submit Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

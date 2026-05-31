"use client";
import { useState, useMemo } from "react";
import { Search, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Modal from "@/components/common/modal";
import DeleteProductModal from "@/components/pageComponents/vendor/product/deleteProductModal";

export default function InboxUI() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);

  const messages = [
    {
      id: 1,
      sender: "Christian N.",
      avatar: "👤",
      bgColor: "bg-blue-500",
      subject: "Order for green pepper",
      body: "Hello, I noticed you ordered green pepper. We have fresh stock arriving this morning if you need more.",
      time: "2 hours ago",
      unread: true,
      images: ["🥬", "🫑"],
      iconImage: "/images/cus2.jpg",
    },
    {
      id: 2,
      sender: "Marvel",
      avatar: "M",
      bgColor: "bg-emerald-500",
      subject: "Shipping Update",
      body: "Your order has been picked up by the courier. You should receive it within 24 hours.",
      time: "1 hour ago",
      unread: false,
      images: ["📦"],
      iconImage: "/images/cus2.jpg",
    },
    {
      id: 3,
      sender: "Emeka Joy.",
      avatar: "👤",
      bgColor: "bg-green-500",
      subject: "Order for tomatoes",
      body: "Hello, I noticed you ordered green pepper. We have fresh stock arriving this morning if you need more.",
      time: "2 hours ago",
      unread: true,
      images: ["🥬", "🫑"],
      iconImage: "/images/cus2.jpg",
    },
  ];

  const filteredMessages = useMemo(() => {
    if (activeFilter === "Unread") return messages.filter((m) => m.unread);
    if (activeFilter === "Read") return messages.filter((m) => !m.unread);
    return messages;
  }, [activeFilter]);

  const currentMessage =
    messages.find((m) => m.id === selectedId) || messages[0];

  const handleSelectMessage = (id: number) => {
    setSelectedId(id);
    setIsMobileDetailOpen(true);
  };

  return (
    <div className="mt-5 flex flex-col gap-5 md:mt-0">
      <h2 className="text-2xl font-semibold text-[#1C1D22] md:text-3xl">
        Notification
      </h2>

      <div className="relative flex h-[85vh] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm md:h-[750px]">
        {/* LEFT SIDEBAR: Hidden on mobile when a message is open */}
        <div
          className={`flex w-full flex-col border-r border-gray-100 md:w-[400px] ${isMobileDetailOpen ? "hidden md:flex" : "flex"}`}
        >
          {/* Filter Header */}
          <div className="flex items-center justify-between p-4">
            <div className="flex gap-4">
              {["All", "Unread", "Read"].map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`text-sm font-semibold transition-colors ${
                    activeFilter === type
                      ? "border-b border-[#2E7D32] text-[#2E7D32]"
                      : "text-[#8C8B8D]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <Search className="h-5 w-5 text-[#8C8B8D]" />
          </div>

          {/* List */}
          <div className="flex-1 divide-y divide-gray-50 overflow-y-auto">
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => handleSelectMessage(msg.id)}
                className={`flex cursor-pointer items-start gap-3 p-4 transition-all hover:bg-gray-50 ${selectedId === msg.id ? "border-b-0 border-l-4 border-[#2E7D32] bg-[#F0F7F0]/40" : "border-l-4 border-transparent"} `}
              >
                <div
                  className={`h-10 w-10 flex-shrink-0 rounded-full ${msg.bgColor} flex items-center justify-center font-bold text-white`}
                >
                  {msg.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p
                      className={`truncate text-sm ${msg.unread ? "font-bold text-gray-900" : "text-gray-600"}`}
                    >
                      {msg.sender}
                    </p>
                    <span className="text-[10px] text-gray-400 uppercase">
                      {msg.time}
                    </span>
                  </div>
                  <p className="truncate text-xs text-gray-500">
                    {msg.subject}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE / MOBILE DETAIL VIEW */}
        <div
          className={`flex-1 flex-col bg-white ${isMobileDetailOpen ? "flex" : "hidden md:flex"}`}
        >
          {/* Mobile Back Button & Header */}
          <div className="flex items-center justify-between border-b border-gray-50 p-4 md:hidden">
            <button
              onClick={() => setIsMobileDetailOpen(false)}
              className="flex items-center gap-2 font-medium text-[#2E7D32]"
            >
              <ArrowLeft size={20} /> Back
            </button>
          </div>

          {currentMessage ? (
            <div className="flex-1 overflow-y-auto p-5 md:p-8">
              {/* Message Context Header */}
              <div className="mb-6 flex items-center justify-between rounded-xl bg-[#FAFAFA] p-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-200">
                    <Image
                      src={currentMessage.iconImage}
                      alt="User"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 md:text-xl">
                      {currentMessage.sender}
                    </h3>
                    <p className="text-xs text-gray-400">
                      Topic: {currentMessage.subject}
                    </p>
                  </div>
                </div>

                <Modal>
                  <Modal.Open opens="delete-notif">
                    <Button
                      variant="ghost"
                      className="h-9 w-9 rounded-full bg-red-50 text-red-500 hover:bg-red-100"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </Modal.Open>
                  <Modal.Window name="delete-notif" className="max-w-xs">
                    <DeleteProductModal
                      onConfirm={() => {
                        console.log("Deleted");
                        setIsMobileDetailOpen(false);
                      }}
                      text="notification"
                      productName={"message"}
                    />
                  </Modal.Window>
                </Modal>
              </div>

              <div className="max-w-2xl">
                <p className="text-xs text-gray-400">
                  Sent {currentMessage.time}
                </p>
                <p className="mt-4 text-base leading-relaxed text-gray-700 md:text-lg">
                  {currentMessage.body}
                </p>

                {currentMessage.images && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {currentMessage.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="flex h-20 w-20 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 text-3xl shadow-sm"
                      >
                        {img}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              Select a notification
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

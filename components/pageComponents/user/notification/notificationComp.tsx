"use client";
import { Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Modal from "@/components/common/Modal";
import DeleteProductModal from "../../vendor/product/DeleteProductModal";

export default function InboxUI() {
  const messages = [
    {
      id: 1,
      sender: "Christian N.",
      avatar: "👤",
      bgColor: "bg-blue-500",
      subject: "Hello you ordered for green pepper",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      sender: "Marvel",
      avatar: "M",
      bgColor: "bg-emerald-500",
      subject: "Hello you ordered for green pepper",
      time: "1 hour ago",
      unread: false,
    },
    {
      id: 3,
      sender: "Christian N.",
      avatar: "👤",
      bgColor: "bg-blue-500",
      subject: "Hello you ordered for green pepper",
      time: "3 hours ago",
      unread: false,
    },
    {
      id: 4,
      sender: "Elizabeth John",
      avatar: "EJ",
      bgColor: "bg-blue-600",
      subject: "Hello you ordered for green pepper",
      time: "5 hours ago",
      unread: true,
    },
    {
      id: 5,
      sender: "Emeka Eze",
      avatar: "👤",
      bgColor: "bg-amber-600",
      subject: "Hello you ordered for green pepper",
      time: "2 days ago",
      unread: false,
    },
    {
      id: 6,
      sender: "Chidimma",
      avatar: "C",
      bgColor: "bg-yellow-400",
      subject: "Hello you ordered for green pepper",
      time: "3 days ago",
      unread: false,
    },
    {
      id: 7,
      sender: "Ayomide Tolu",
      avatar: "AT",
      bgColor: "bg-purple-500",
      subject: "Hello you ordered for green pepper",
      time: "1 week ago",
      unread: false,
    },
  ];

  const selectedMessage = {
    sender: "Christian N.",
    subject: "Vendor",
    time: "3 days ago",
    body: "Lorem ipsum enim sed felis gravida ornare mauris erat eu pousere odio urna blandit eu varius auctor sit nec blandit nec habitant nulla dictum vestibulum mauris diam feugiat a consectetur.",
    images: ["🥬", "🍆", "🌶️"],
    iconImage: "/images/cus2.jpg",
  };

  return (
    <div className="mt-10 flex flex-col gap-5 md:mt-0">
      <h2 className="text-3xl font-semibold">Notification</h2>
      <div className="flex rounded-2xl bg-white">
        {/* Left Sidebar - Message List */}

        <div className="hidden md:block">
          {/* Header */}
          <div className="overflow-y-auto">
            <div className="flex items-center gap-10 p-4">
              <Button
                variant="ghost"
                className="text-xl font-semibold text-[#8C8B8D]"
              >
                All
              </Button>
              <Button
                variant="ghost"
                className="text-xl font-medium text-[#8C8B8D]"
              >
                Unread
              </Button>
              <Button
                variant="ghost"
                className="text-xl font-medium text-[#8C8B8D]"
              >
                Read
              </Button>

              <Search className="text-[#8C8B8D]" />
            </div>
          </div>

          {/* Messages */}
          {/* add overflow-y-auto height calculation */}
          <div className="divide-y divide-gray-100 overflow-y-auto border-r border-gray-200">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`ml-3 w-fit cursor-pointer rounded-[10px] border-l-4 border-transparent p-4 transition-colors hover:bg-gray-100 ${msg.unread ? "bg-[#FAFAFA]" : "bg-white"}`}
              >
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" />
                  <div
                    className={`h-10 w-10 rounded-full ${msg.bgColor} flex flex-shrink-0 items-center justify-center text-sm font-semibold text-white`}
                  >
                    {msg.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <div className="flex items-center space-x-2.5">
                        <p
                          className={` ${msg.unread ? "font-semibold" : "font-medium"} text-lg`}
                        >
                          {msg.sender}
                        </p>

                        <p className="mt-1 text-xs font-medium text-[#C3C3C3]">
                          {msg.time}
                        </p>
                      </div>
                      {msg.unread && (
                        <div className="flex h-4.5 w-3.5 items-center rounded-full bg-red-500 px-1 py-0.5">
                          <span className="text-xs font-semibold text-white">
                            2
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="truncate text-[#757575]">{msg.subject}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Message Detail */}
        <div className="flex-1 p-2 md:p-8">
          <div className="max-w-2xl">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between rounded-[10px] bg-[#FAFAFA] p-3">
              <div className="flex items-center space-x-2.5">
                <div className="relative h-10 w-10 rounded-full">
                  <Image
                    src={selectedMessage.iconImage}
                    alt={selectedMessage.time}
                    fill
                    className="rounded-full object-cover object-center"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">
                    {selectedMessage.sender}
                  </h1>
                  <p className="text-sm text-[#ACACAC]">
                    {selectedMessage.subject}
                  </p>
                </div>
              </div>
              <Modal>
                <Modal.Open opens="notification">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text rounded-full bg-[#FFEDEB] hover:bg-red-200 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5 text-[#FF5E4D]" />
                  </Button>
                </Modal.Open>

                <Modal.Window name="notification" className="max-w-md">
                  <DeleteProductModal
                    onConfirm={() => console.log("DELETE:")}
                    text="notification"
                    productName={"Notification"}
                  />
                </Modal.Window>
              </Modal>
            </div>

            {/* Time */}
            <p className="mb-6 text-sm text-gray-400">{selectedMessage.time}</p>

            {/* Body Text */}
            <p className="mb-6 leading-relaxed text-gray-700">
              {selectedMessage.body}
            </p>

            {/* Images */}
            <div className="mb-6 flex gap-3">
              {selectedMessage.images.map((img, idx) => (
                <div
                  key={idx}
                  className="flex h-24 w-24 items-center justify-center rounded-lg border border-gray-200 bg-gray-100 text-3xl"
                >
                  {img}
                </div>
              ))}
            </div>

            {/* Footer */}
            <p className="text-xs text-gray-400">{selectedMessage.time}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

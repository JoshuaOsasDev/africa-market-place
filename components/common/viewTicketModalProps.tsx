"use client";

import { X, Ticket, MessageSquare, Clock, CheckCircle2 } from "lucide-react";
import { UsersOrder } from "@/types/order";
import { formatDate, formatTimeAgo } from "@/lib/utils";
import { useTicket } from "@/lib/hooks/userDashboard/useUser";
import { getTicket } from "@/services/apiServices/userDashboard";

interface ViewTicketModalProps {
  ticket: any;
  onClose: () => void;
}

export function ViewTicketModal({ ticket, onClose }: ViewTicketModalProps) {
  if (!ticket) return;
  const ticketData = {
    ticketId: `${ticket?.orderNo?.slice(-5) || "001"}`,
    subject: ticket?.data?.subject || "Missing item in delivery",
    status: ticket?.data?.status === "resolved" ? "Reviewed" : "In Progress",
    createdAt: ticket?.data?.createdAt,
    lastUpdate: ticket?.data?.updatedAt || "2 hours ago",
    description: ticket?.data?.description,
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[60] animate-[fadeIn_0.18s_ease] bg-black/40 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <div className="fixed top-0 left-0 z-[60] h-full w-full sm:top-1/2 sm:left-1/2 sm:h-auto sm:max-w-md sm:-translate-x-1/2 sm:-translate-y-1/2 sm:px-4">
        <div className="flex h-full flex-col bg-white sm:h-auto sm:rounded-3xl sm:shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#F0F0F0] px-6 py-4">
            <div className="flex items-center gap-2">
              <Ticket size={18} className="text-[#2E7D32]" />
              <h2 className="text-lg font-bold text-[#1A1A1A]">
                Ticket Details
              </h2>
            </div>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F5F5] transition-colors hover:bg-[#EBEBEB]"
            >
              <X size={15} color="#666" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium tracking-wider text-[#AAAAAA] uppercase">
                  Ticket ID
                </p>
                <p className="text-base font-bold text-[#1A1A1A]">
                  {ticketData.ticketId}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF9EA] px-3 py-1 text-xs font-semibold text-[#FBC02D]">
                <Clock size={12} />
                {ticketData.status}
              </span>
            </div>

            <div className="space-y-5">
              <DetailItem label="Subject" value={ticketData.subject} />
              <DetailItem
                label="Date Opened"
                value={formatDate(ticketData.createdAt)}
              />

              <div className="rounded-2xl border border-[#F0F0F0] bg-[#FAFAFA] p-4">
                <p className="mb-2 text-[11px] font-bold text-[#888] uppercase">
                  Description
                </p>
                <p className="text-sm leading-relaxed text-[#555]">
                  {ticketData.description}
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-[#F0F7F0] p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#2E7D32]">
                  <MessageSquare size={14} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-[#2E7D32]">
                    Support agent will respond shortly
                  </p>
                  <p className="text-[10px] text-[#2E7D32]/70">
                    Last activity: {formatTimeAgo(ticketData.lastUpdate)}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-8 w-full rounded-xl bg-[#2E7D32] py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#1B5E20]"
            >
              Close Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-medium text-[#AAAAAA]">{label}</p>
      <p className="text-[14px] font-semibold text-[#333]">{value}</p>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Eye,
  X,
  ChevronLeft,
  CreditCard,
  MapPin,
  RotateCcw,
  Package,
  Rotate3DIcon,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { UsersOrder } from "@/types/order";
import Image from "next/image";
import { RaiseTicketModal } from "./raiseTicketModal";
import { ViewTicketModal } from "@/components/common/viewTicketModalProps";
import { useTicket } from "@/lib/hooks/userDashboard/useUser";

// ── Status badge ──────────────────────────────────────────────────────────────
const STATUS_STYLES: Record<string, string> = {
  pending: "bg-[#FFF9EA] text-[#FBC02D]",
  shipped: "bg-[#E8F8FD] text-[#13B2E4]",
  cancelled: "bg-[#FFE8E5] text-[#FF4733]",
  canceled: "bg-[#FFE8E5] text-[#FF4733]",
  delivered: "bg-[#E8F5E9] text-[#2E7D32]",
  returned: "bg-[#F3E5F5] text-[#8E24AA]",
};

const DOT_STYLES: Record<string, string> = {
  pending: "bg-[#FBC02D]",
  shipped: "bg-[#13B2E4]",
  cancelled: "bg-[#FF4733]",
  canceled: "bg-[#FF4733]",
  delivered: "bg-[#2E7D32]",
  returned: "bg-[#8E24AA]",
};

function StatusBadge({ status }: { status: string }) {
  const key = status.toLowerCase();
  const badge = STATUS_STYLES[key] ?? "bg-green-100 text-green-700";
  const dot = DOT_STYLES[key] ?? "bg-green-500";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        {icon}
        <h3 className="text-[15px] font-bold text-[#1A1A1A]">{title}</h3>
      </div>
      <div className="space-y-3 rounded-2xl border border-[#F0F0F0] bg-[#FAFAFA] p-4">
        {children}
      </div>
    </div>
  );
}

// ── Row inside a card ─────────────────────────────────────────────────────────
function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-[#888]">{label}</span>
      {children}
    </div>
  );
}

// ── Labelled field ────────────────────────────────────────────────────────────
function LabelField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="mb-0.5 block text-[11px] text-[#AAAAAA]">{label} *</span>
      <span className="text-[13px] font-medium text-[#333]">{value}</span>
    </div>
  );
}

// ── Order Summary Modal ───────────────────────────────────────────────────────
function OrderSummaryModal({
  order,
  onClose,
}: {
  order: UsersOrder;
  onClose: () => void;
}) {
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showViewTicketModal, setShowViewTicketModal] = useState(false);

  const { data: ticket, isLoading } = useTicket(order._id);
  const hasTicket = !!ticket?.data;
  console.log(order, "active order");
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 animate-[fadeIn_0.18s_ease] bg-black/40 backdrop-blur-sm"
      />

      {/* Slide-in panel */}
      <div className="fixed top-0 right-0 bottom-0 z-50 flex w-full max-w-[440px] animate-[slideIn_0.22s_cubic-bezier(0.4,0,0.2,1)] flex-col overflow-y-auto bg-white shadow-2xl">
        {/* Sticky header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#F0F0F0] bg-white px-6 py-4">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm text-[#555] transition-colors hover:bg-[#F5F5F5]"
          >
            <ChevronLeft size={16} />
            Back
          </button>

          <h2 className="text-[18px] font-bold text-[#1A1A1A]">
            Order Summary
          </h2>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F5F5] transition-colors hover:bg-[#EBEBEB]"
          >
            <X size={15} color="#666" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-5 p-6 pb-10">
          {/* Product emoji chips */}
          <div className="flex flex-wrap gap-4">
            {order.items?.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-[#E8F0E8] bg-[#F8FBF8] text-2xl">
                  {item.image ? (
                    <Image
                      src={item.image ?? ""}
                      alt={item.name}
                      fill
                      className="rounded-lg object-cover"
                    />
                  ) : (
                    <Package size={20} color="#2E7D32" />
                  )}
                </div>
                <span className="max-w-16 text-center text-[11px] leading-tight text-[#888]">
                  {item.name ?? `Item ${i + 1}`}
                </span>
              </div>
            ))}
          </div>

          {/* Order info */}
          <div className="space-y-3 rounded-2xl border border-[#F0F0F0] bg-[#FAFAFA] p-4">
            <Row label="Order ID:">
              <span className="font-bold text-[#1A1A1A]">#{order.orderNo}</span>
            </Row>
            <Row label="Status:">
              <StatusBadge status={order.status ?? "pending"} />
            </Row>
            <Row label="Date:">
              <span className="text-[#555]">{formatDate(order.createdAt)}</span>
            </Row>
            <Row label="Tracking No:">
              <span className="font-semibold tracking-wide text-[#2E7D32]">
                {order.trackingId || "—"}
              </span>
            </Row>
          </div>

          {/* Payment Summary */}
          <Section
            icon={<CreditCard size={16} color="#2E7D32" />}
            title="Payment Summary"
          >
            <Row label="Total:">
              <span className="font-bold text-[#1A1A1A]">{order.total}</span>
            </Row>
            <Row label="Shipping:">
              <span className="font-medium text-[#2E7D32]">
                {order.shipping ?? "Free"}
              </span>
            </Row>
            <div className="h-px bg-[#EFEFEF]" />

            <Row label="Subtotal:">
              <span className="font-bold text-[#1A1A1A]">
                {order.subTotal ?? order.total}
              </span>
            </Row>
            <Row label="Payment Status:">
              <span className="font-bold text-[#1A1A1A]">
                {order.paymentStatus}
              </span>
            </Row>
            <div className="mt-1 flex items-center gap-2 rounded-xl bg-[#F0F7F0] px-3 py-2.5">
              <CreditCard size={16} color="#2E7D32" />
              <span className="text-[13px] font-medium text-[#2E7D32]">
                {order.paymentMethod}
              </span>
            </div>
          </Section>

          {/* Shipping Address */}
          <Section
            icon={<MapPin size={16} color="#2E7D32" />}
            title="Shipping Address"
          >
            <LabelField
              label="Street Address"
              value={order?.user?.address ?? "—"}
            />
            <LabelField label="Country" value={order?.user?.country ?? "—"} />
            <LabelField label="Town / City" value={order?.user?.city ?? "—"} />
            <div className="grid grid-cols-2 gap-3">
              <LabelField label="County" value={order.user?.county ?? "—"} />
              <LabelField label="Zip Code" value={order.user?.zip ?? "—"} />
            </div>
          </Section>

          {/* CTA */}
          <div className="flex space-x-2.5">
            {hasTicket && (
              <button
                className="bg-white] flex w-full items-center justify-center gap-2 rounded-xl border border-[#2E7D32] py-3.5 text-[15px] font-bold text-[#2E7D32] transition-colors hover:bg-[#1B5E20] hover:text-white active:scale-[0.98]"
                onClick={() => setShowViewTicketModal(true)}
              >
                <RotateCcw size={16} />
                View A Ticket
              </button>
            )}
            <button
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2E7D32] py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-[#1B5E20] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-900"
              onClick={() => setShowTicketModal(true)}
              disabled={hasTicket}
            >
              <Rotate3DIcon size={16} />
              {hasTicket ? "Raised A Ticket" : "Raise A Ticket"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn  { from { opacity: 0 }               to { opacity: 1 } }
        @keyframes slideIn { from { transform: translateX(100%) } to { transform: translateX(0) } }
      `}</style>

      {showTicketModal && (
        <RaiseTicketModal
          order={order}
          onClose={() => setShowTicketModal(false)}
        />
      )}

      {showViewTicketModal && (
        <ViewTicketModal
          ticket={ticket}
          onClose={() => setShowViewTicketModal(false)}
        />
      )}
    </>
  );
}

export default OrderSummaryModal;

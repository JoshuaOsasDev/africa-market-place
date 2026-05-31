"use client";

import { useState } from "react";

// Types based on your Parcel JSON
interface ParcelData {
  parcel: {
    tracking_number: string;
    order_number: string;
    address: string;
    city: string;
    postal_code: string;
    date_created: string;
    date_updated: string;
    tracking_url: string;
    shipment: { name: string };
    carrier: { code: string };
    status: { id: number; message: string };
  };
}

type Status = "pending" | "transit" | "delivered";

const stepLabels = ["Order placed", "In transit", "Delivered"];

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <polyline
      points="2,7 5.5,11 12,3"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function TrackerComp({ data }: { data: ParcelData }) {
  const { parcel } = data;
  const statuses: Record<
    Status,
    {
      badge: string;
      badgeStyle: string;
      steps: ("done" | "active" | null)[];
      lines: ("done" | "upcoming")[];
      sublabels: string[];
      timeline: { title: string; time: string }[];
    }
  > = {
    pending: {
      badge: "Pending",
      badgeStyle: "bg-amber-100 text-amber-900",
      steps: ["active", null, null],
      lines: ["upcoming", "upcoming"],
      sublabels: ["2 Apr", "–", "–"],
      timeline: [
        { title: "Preparing for dispatch", time: `${parcel.date_updated}` },
        { title: "Order confirmed", time: `${parcel.date_created}` },
      ],
    },
    transit: {
      badge: "In transit",
      badgeStyle: "bg-blue-100 text-blue-900",
      steps: ["done", "active", null],
      lines: ["done", "upcoming"],
      sublabels: ["2 Apr", "3 Apr", "–"],
      timeline: [
        {
          title: "Arrived at delivery hub – Heathrow",
          time: "03 Apr 2026, 06:45",
        },
        { title: "Departed sorting facility", time: "03 Apr 2026, 02:10" },
        { title: "Dispatched from sender", time: "02 Apr 2026, 16:55" },
        { title: "Order confirmed", time: "02 Apr 2026, 09:14" },
      ],
    },
    delivered: {
      badge: "Delivered",
      badgeStyle: "bg-green-100 text-green-900",
      steps: ["done", "done", "active"],
      lines: ["done", "done"],
      sublabels: ["2 Apr", "3 Apr", "9 Apr"],
      timeline: [
        { title: "Successfully delivered", time: "09 Apr 2026, 11:22" },
        { title: "Out for delivery", time: "09 Apr 2026, 07:05" },
        { title: "Cleared customs – Abuja", time: "08 Apr 2026, 14:33" },
        {
          title: "In transit – international flight",
          time: "05 Apr 2026, 22:00",
        },
        { title: "Departed Heathrow", time: "04 Apr 2026, 18:15" },
      ],
    },
  };

  // Logic to determine internal status from parcel status ID
  // (Assuming 1000 is ready/pending)
  const [status] = useState<Status>(
    parcel.status.id === 1000 ? "pending" : "transit",
  );

  const s = statuses[status];

  return (
    <div className="mt-12 w-full px-4 py-2 font-sans md:mt-0">
      {/* Top bar */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-lg font-medium text-gray-700 uppercase">
          Live Shipment Status
        </p>
        <div className="rounded bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-600">
          {parcel.status.message}
        </div>
      </div>

      {/* Order card */}
      <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-400">
              Tracking Number{" "}
              <span className="font-mono font-medium text-gray-800 uppercase">
                {parcel.tracking_number}
              </span>
            </p>
            <p className="mt-1 text-[15px] font-medium">
              {parcel.shipment.name}
            </p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${s.badgeStyle}`}
          >
            {s.badge}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-0.5 text-xs text-gray-400">Destination</p>
            <p className="text-sm font-medium text-gray-800">
              {parcel.address}, {parcel.city}
            </p>
            <p className="text-xs text-gray-500 uppercase">
              {parcel.postal_code}
            </p>
          </div>
          <div>
            <p className="mb-0.5 text-xs text-gray-400">Order Reference</p>
            <p className="text-sm font-medium text-gray-800">
              {parcel.order_number}
            </p>
          </div>
          <div>
            <p className="mb-0.5 text-xs text-gray-400">Date Created</p>
            <p className="text-sm font-medium text-gray-800">
              {parcel.date_created}
            </p>
          </div>
          <div>
            <p className="mb-0.5 text-xs text-gray-400">Carrier</p>
            <p className="text-sm font-medium text-gray-800 uppercase">
              {parcel.carrier.code.replace("_", " ")}
            </p>
          </div>
        </div>
      </div>

      {/* Stepper */}
      <div className="mb-10 flex items-start">
        {s.steps.map((stepState: any, i: number) => (
          <div key={i} className="relative flex flex-1 flex-col items-center">
            {i < 2 && (
              <div
                className={`absolute top-4 left-1/2 z-0 h-0.5 w-full ${s.lines[i] === "done" ? "bg-emerald-500" : "bg-gray-200"}`}
              />
            )}
            <div
              className={`z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                stepState === "done"
                  ? "border-emerald-700 bg-emerald-700"
                  : stepState === "active"
                    ? "animate-pulse border-emerald-500 bg-emerald-500"
                    : "border-gray-300 bg-gray-100"
              }`}
            >
              {stepState === "done" ? (
                <CheckIcon />
              ) : (
                <div
                  className={`h-2 w-2 rounded-full ${stepState === "active" ? "bg-white" : "bg-gray-400"}`}
                />
              )}
            </div>
            <p
              className={`mt-2 text-center text-xs font-medium ${stepState === "active" ? "text-emerald-700" : "text-gray-400"}`}
            >
              {stepLabels[i]}
            </p>
          </div>
        ))}
      </div>

      {/* Activity Timeline */}
      {/* Timeline */}
      <div className="mb-6 border-t border-gray-100 pt-4">
        <p className="mb-3 text-[11px] font-medium tracking-widest text-gray-400 uppercase">
          Activity
        </p>
        <div>
          {s.timeline.map((item, idx) => (
            <div key={idx} className="mb-3 flex gap-3">
              <div className="flex flex-col items-center">
                <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
                {idx < s.timeline.length - 1 && (
                  <div className="my-1 w-px flex-1 bg-gray-200" />
                )}
              </div>
              <div className="pb-1">
                <p className="text-sm font-medium text-gray-800">
                  {item.title}
                </p>
                <p className="mt-0.5 text-xs text-gray-400">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* External Carrier Link */}
      <div>
        <p className="mb-2 text-[11px] font-medium tracking-widest text-gray-400 uppercase">
          Carrier Portal
        </p>
        <a
          href={parcel.tracking_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 no-underline transition-colors hover:bg-gray-100"
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-black text-[8px] font-bold text-white">
            IN
          </div>
          <span className="text-sm font-medium text-gray-800">
            View detailed tracking on InPost website
          </span>
          <span className="ml-auto text-gray-400">↗</span>
        </a>
      </div>
    </div>
  );
}

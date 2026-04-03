"use client";

import { useState } from "react";

type Status = "pending" | "transit" | "delivered";

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
      { title: "Order confirmed", time: "02 Apr 2026, 09:14" },
      { title: "Preparing for dispatch", time: "02 Apr 2026, 10:30" },
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

export default function TrackerComp() {
  const [status, setStatus] = useState<Status>("pending");
  const s = statuses[status];

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 font-sans">
      {/* Top bar */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[11px] font-medium tracking-widest text-gray-400 uppercase">
          Order tracker
        </p>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Status)}
          className="cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-800 focus:outline-none"
        >
          <option value="pending">Pending</option>
          <option value="transit">In transit</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      {/* Order card */}
      <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-400">
              Order{" "}
              <span className="font-mono font-medium text-gray-800">
                RM 4821 7734 9B
              </span>
            </p>
            <p className="mt-1 text-[15px] font-medium">Standard Delivery</p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${s.badgeStyle}`}
          >
            {s.badge}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[
            ["Dispatched from", "London, UK"],
            ["Destination", "Abuja, NG"],
            ["Estimated delivery", "7–10 Apr 2026"],
            ["Last updated", "02 Apr 2026"],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="mb-0.5 text-xs text-gray-400">{label}</p>
              <p className="text-sm font-medium text-gray-800">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stepper */}
      <div className="mb-6 flex items-start">
        {s.steps.map((stepState, i) => (
          <div key={i} className="relative flex flex-1 flex-col items-center">
            {/* Connector line */}
            {i < 2 && (
              <div
                className={`absolute top-4 left-1/2 z-0 h-0.5 w-full transition-colors duration-300 ${
                  s.lines[i] === "done" ? "bg-emerald-500" : "bg-gray-200"
                }`}
              />
            )}

            {/* Icon */}
            <div
              className={`z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                stepState === "done"
                  ? "border-emerald-700 bg-emerald-700"
                  : stepState === "active"
                    ? "animate-pulse border-emerald-500 bg-emerald-500"
                    : "border-gray-300 bg-gray-100"
              }`}
            >
              {stepState === "done" ? (
                <CheckIcon />
              ) : stepState === "active" ? (
                <div className="h-2 w-2 rounded-full bg-white" />
              ) : (
                <div className="h-2 w-2 rounded-full bg-gray-400" />
              )}
            </div>

            {/* Label */}
            <p
              className={`mt-2 text-center text-xs font-medium ${
                stepState === "active" ? "text-emerald-700" : "text-gray-400"
              }`}
            >
              {stepLabels[i]}
            </p>
            <p className="mt-0.5 text-center text-[11px] text-gray-400">
              {s.sublabels[i]}
            </p>
          </div>
        ))}
      </div>

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

      {/* Royal Mail link */}
      <div>
        <p className="mb-2 text-[11px] font-medium tracking-widest text-gray-400 uppercase">
          Track on Royal Mail
        </p>
        <a
          href="https://www.royalmail.com/track-your-item#/tracking-results/RM482177349B"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 no-underline transition-colors duration-150 hover:bg-gray-100"
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#E8001D]">
            <span className="text-[9px] leading-none font-bold text-white">
              RM
            </span>
          </div>
          <span className="text-sm font-medium text-gray-800">
            Track on Royal Mail website
          </span>
          <span className="ml-auto text-base text-gray-400">↗</span>
        </a>
      </div>
    </div>
  );
}

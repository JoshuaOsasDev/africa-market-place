"use client";

import Whatapp from "@/components/common/whatapp";
import { useState } from "react";

// --- Configuration Data ---

const tabCategories = [
  {
    id: "place-order",
    label: "Place an Order",
    sidebarKey: "orders",
    hasVideo: true,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with your actual tutorial ID
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none">
        <rect
          x="10"
          y="8"
          width="28"
          height="36"
          rx="3"
          stroke="#2E7D32"
          strokeWidth="2.5"
          fill="#E8F5E9"
        />
        <path
          d="M17 20h14M17 27h10"
          stroke="#2E7D32"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="35" cy="13" r="7" fill="#2E7D32" />
        <path
          d="M32 13l2 2 4-4"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "pay-order",
    label: "Pay for Your Order",
    sidebarKey: "payments",
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none">
        <rect
          x="6"
          y="14"
          width="36"
          height="24"
          rx="4"
          stroke="#2E7D32"
          strokeWidth="2.5"
          fill="#E8F5E9"
        />
        <path d="M6 21h36" stroke="#2E7D32" strokeWidth="2.5" />
        <rect x="11" y="27" width="8" height="4" rx="1" fill="#2E7D32" />
        <rect x="23" y="27" width="5" height="4" rx="1" fill="#A5D6A7" />
      </svg>
    ),
  },
  {
    id: "track-order",
    label: "Track Your Order",
    sidebarKey: "delivery",
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none">
        <circle
          cx="24"
          cy="24"
          r="14"
          stroke="#2E7D32"
          strokeWidth="2.5"
          fill="#E8F5E9"
        />
        <circle cx="24" cy="24" r="5" fill="#2E7D32" />
        <path
          d="M24 10v4M24 34v4M10 24h4M34 24h4"
          stroke="#2E7D32"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "cancel-order",
    label: "Cancel an Order",
    sidebarKey: "orders",
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none">
        <circle
          cx="24"
          cy="24"
          r="16"
          stroke="#2E7D32"
          strokeWidth="2.5"
          fill="#E8F5E9"
        />
        <path
          d="M17 17l14 14M31 17L17 31"
          stroke="#2E7D32"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "create-return",
    label: "Create a Return",
    sidebarKey: "returns",
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none">
        <path
          d="M34 16c-2.5-4-7-7-12-7a14 14 0 100 28c5 0 9.5-3 12-7"
          stroke="#2E7D32"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M38 10l-4 6-6-4"
          stroke="#2E7D32"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

type FaqItem = { question: string; answer: string };

const sidebarData: Record<
  string,
  { label: string; icon: string; faqs: FaqItem[] }
> = {
  payments: {
    label: "Payments",
    icon: "💳",
    faqs: [
      {
        question: "What payment methods are accepted?",
        answer:
          "We accept debit/credit cards, bank transfers, USSD, and cash on delivery for eligible orders.",
      },
      {
        question: "How secure is my information?",
        answer:
          "All transactions are encrypted using SSL technology and processed via PCI-DSS compliant gateways.",
      },
    ],
  },
  delivery: {
    label: "Delivery",
    icon: "🚚",
    faqs: [
      {
        question: "How long does delivery take?",
        answer:
          "Standard delivery typically takes 2–5 business days depending on your location.",
      },
      {
        question: "How do I track my order?",
        answer:
          "Go to 'My Orders' in your account, select the order, and click 'Track Order'.",
      },
    ],
  },
  returns: {
    label: "Returns & Refunds",
    icon: "🔄",
    faqs: [
      {
        question: "How do I create a return?",
        answer:
          "Go to 'My Orders', select the item, and click 'Return Item' to start the process.",
      },
    ],
  },
  orders: {
    label: "Orders",
    icon: "📋",
    faqs: [
      {
        question: "How do I place an order?",
        answer:
          "Browse products, add to cart, and follow the checkout process to confirm your purchase.",
      },
      {
        question: "Can I cancel an order?",
        answer:
          "Yes, you can cancel an order from 'My Orders' before it is shipped.",
      },
    ],
  },
};

const tabToSidebar: Record<string, string> = {
  "place-order": "orders",
  "pay-order": "payments",
  "track-order": "delivery",
  "cancel-order": "orders",
  "create-return": "returns",
};

// --- Component ---

export default function JumiaHelpCenter() {
  const [activeTab, setActiveTab] = useState("place-order");
  const [activeSidebar, setActiveSidebar] = useState("orders");
  const [expandedFaqs, setExpandedFaqs] = useState<
    Record<string, number | null>
  >({});

  function handleTabClick(tabId: string) {
    setActiveTab(tabId);
    const sidebarKey = tabToSidebar[tabId];
    if (sidebarKey) setActiveSidebar(sidebarKey);
    setExpandedFaqs({});
  }

  function toggleFaq(sidebarKey: string, idx: number) {
    setExpandedFaqs((prev) => ({
      ...prev,
      [sidebarKey]: prev[sidebarKey] === idx ? null : idx,
    }));
  }

  const currentSection = sidebarData[activeSidebar] || sidebarData["orders"];
  const activeTabData = tabCategories.find((t) => t.id === activeTab);

  return (
    <div className="mt-15 min-h-screen bg-white font-sans md:mt-0">
      {/* Hero + Tabs Section */}
      <div className="border-b border-green-100 bg-[#2E7D32]/90">
        {/* decorative circles */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-10 left-1/3 h-48 w-48 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute top-1/2 right-1/4 h-24 w-24 rounded-full bg-white/10" />

        <div className="mx-auto max-w-7xl px-4 pt-8 pb-0">
          <p className="mb-1 text-sm text-white">Help Center</p>
          <h1 className="mb-6 text-2xl font-bold text-gray-900">
            Hi, how can we help you?
          </h1>

          <div className="scrollbar-hide flex gap-3 overflow-x-auto">
            {tabCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleTabClick(cat.id)}
                className={`flex min-w-[152px] flex-shrink-0 flex-col items-center gap-2 rounded-t-xl border px-4 pt-4 pb-3 transition-all duration-150 ${
                  activeTab === cat.id
                    ? "z-10 border-green-200 border-b-white bg-white shadow-sm"
                    : "border-transparent bg-[#E8F5E9]/30 hover:bg-[#E8F5E9]/60"
                }`}
              >
                {cat.icon}
                <span
                  className={`text-center text-sm leading-tight font-semibold ${
                    activeTab === cat.id ? "text-[#2E7D32]" : "text-gray-700"
                  }`}
                >
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="flex max-w-lg items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm focus-within:border-[#2E7D32] focus-within:ring-1 focus-within:ring-[#2E7D32]/20">
            <svg
              className="h-4 w-4 flex-shrink-0 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder='Type keywords like "return"'
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <main className="flex-1">
            {/* Conditional Video Player */}
            {activeTabData?.hasVideo && (
              <div className="mb-8 overflow-hidden rounded-xl border border-gray-200 bg-black shadow-md">
                <div className="aspect-video w-full">
                  <iframe
                    className="h-full w-full"
                    src={activeTabData.videoUrl}
                    title="Tutorial Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="bg-white p-4">
                  <h3 className="text-sm font-bold text-[#2E7D32]">
                    Video Tutorial
                  </h3>
                  <p className="text-xs text-gray-500">
                    Learn how to {activeTabData.label.toLowerCase()} in 60
                    seconds.
                  </p>
                </div>
              </div>
            )}

            {/* Section Header */}
            <div className="mb-4 flex items-center gap-2">
              <span className="text-xl">{currentSection.icon}</span>
              <h2 className="text-base font-bold text-gray-800">
                {currentSection.label}
              </h2>
            </div>

            {/* FAQ Accordion */}
            <div className="divide-y divide-gray-100 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              {currentSection.faqs.map((faq, idx) => {
                const isOpen = expandedFaqs[activeSidebar] === idx;
                return (
                  <div key={idx}>
                    <button
                      onClick={() => toggleFaq(activeSidebar, idx)}
                      className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-gray-50"
                    >
                      <div>
                        <p className="mb-1 text-[10px] font-bold tracking-wider text-[#2E7D32] uppercase">
                          {currentSection.label}
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                          {faq.question}
                        </p>
                      </div>
                      <span
                        className={`ml-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-lg font-light transition-all duration-200 ${
                          isOpen
                            ? "rotate-45 border-[#2E7D32] bg-[#E8F5E9] text-[#2E7D32]"
                            : "border-gray-300 text-gray-400"
                        }`}
                      >
                        +
                      </span>
                    </button>
                    {isOpen && (
                      <div className="border-t border-green-50 bg-[#E8F5E9]/10 px-6 py-4 text-sm leading-relaxed text-gray-600">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </main>

          {/* Optional Sidebar Space (Can be used for promos/contact info) */}
          <aside className="lg:w-72">
            <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 p-5">
              <h4 className="mb-2 text-sm font-bold text-gray-800">
                Still need help?
              </h4>
              <p className="mb-4 text-xs text-gray-500">
                Our agents are available to assist you 24/7.
              </p>
              <button className="w-full rounded-md bg-[#2E7D32] py-2 text-xs font-bold text-white transition-colors hover:bg-[#1B5E20]">
                Contact Support
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <div className="fixed right-6 bottom-6 z-50">
        <Whatapp />
      </div>
    </div>
  );
}

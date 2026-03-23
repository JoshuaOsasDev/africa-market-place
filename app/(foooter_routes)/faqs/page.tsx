"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  MessageCircle,
  Mail,
  Phone,
  MessageSquare,
  Search,
} from "lucide-react";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { Category, FAQGroup, FAQItem } from "@/types/appTypes";
import { FAQS } from "@/lib/data";
import Link from "next/link";

const CATEGORIES: { label: string; value: Category }[] = [
  { label: "All Topics", value: "all" },
  { label: "Orders", value: "orders" },
  { label: "Shipping", value: "shipping" },
  { label: "Returns", value: "returns" },
  { label: "Payments", value: "payments" },
  { label: "Account", value: "account" },
];

function AccordionItem({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`rounded-2xl border bg-white transition-all duration-200 ${
        open
          ? "border-[#C8E6C9] shadow-[0_4px_20px_rgba(46,125,50,0.08)]"
          : "border-[#F0F0F0]"
      }`}
      style={{ animationDelay: `${index * 0.04}s` }}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 px-5 py-[18px] text-left"
      >
        <span
          className={`text-[14.5px] leading-snug font-semibold transition-colors ${
            open ? "text-[#2E7D32]" : "text-[#1A1A1A] hover:text-[#2E7D32]"
          }`}
        >
          {item.q}
        </span>
        <span
          className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-all duration-250 ${
            open ? "rotate-45 bg-[#2E7D32]" : "bg-[#E8F5E9]"
          }`}
        >
          <Plus
            size={13}
            strokeWidth={2.5}
            className={open ? "text-white" : "text-[#2E7D32]"}
          />
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <p className="px-5 pb-5 text-sm leading-[1.72] text-[#555]">{item.a}</p>
      </div>
    </div>
  );
}

function FAQGroupSection({ group }: { group: FAQGroup }) {
  return (
    <div className="mb-10">
      <div className="mb-4 flex items-center gap-2.5 border-b border-[#E8E4DD] pb-3">
        <span className="h-2 w-2 flex-shrink-0 rounded-full bg-[#2E7D32]" />
        <h3 className="text-[20px] font-bold text-[#1A1A1A]">{group.group}</h3>
      </div>
      <div className="space-y-2.5">
        {group.items.map((item, i) => (
          <AccordionItem key={i} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return FAQS.filter((group) =>
      activeCategory === "all" ? true : group.cat === activeCategory,
    )
      .map((group) => ({
        ...group,
        items: q
          ? group.items.filter(
              (item) =>
                item.q.toLowerCase().includes(q) ||
                item.a.toLowerCase().includes(q),
            )
          : group.items,
      }))
      .filter((group) => group.items.length > 0);
  }, [activeCategory, searchQuery]);

  const totalResults = filtered.reduce((acc, g) => acc + g.items.length, 0);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />

      {/* ── Hero — mirrors ContactPage style ── */}
      <section className="relative overflow-hidden bg-[#2E7D32] px-6 py-20 text-white">
        {/* decorative circles */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-10 left-1/3 h-48 w-48 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute top-1/2 right-1/4 h-24 w-24 rounded-full bg-white/10" />

        <div className="relative mx-auto mt-20 max-w-4xl text-center md:mt-0">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[12px] font-medium tracking-widest uppercase">
            <MessageSquare className="h-3.5 w-3.5" />
            Help Center
          </span>
          <h1 className="mt-4 text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Got{" "}
            <span className="relative inline-block italic">
              questions?
              <span className="absolute right-0 -bottom-1 left-0 h-1 rounded-full bg-white/30" />
            </span>{" "}
            We&apos;ve got answers.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-white/75">
            Browse our most common questions below. Can&apos;t find what
            you&apos;re looking for? Our support team is always happy to help.
          </p>

          {/* Search */}
          <div className="relative mx-auto mt-8 max-w-lg">
            <Search
              size={20}
              className="absolute top-1/2 left-4 z-50 -translate-y-1/2 text-white/50"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions…"
              className="w-full rounded-2xl border border-white/20 bg-white/10 py-3.5 pr-5 pl-12 text-sm text-white placeholder-white/40 backdrop-blur-sm transition-all outline-none focus:border-white/40 focus:bg-white/15"
            />
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="relative z-10 -mt-2 px-6 pt-8 pb-2">
        <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2.5">
          {CATEGORIES.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActiveCategory(value)}
              className={`rounded-full border px-5 py-2 text-[13px] font-medium transition-all ${
                activeCategory === value
                  ? "border-[#2E7D32] bg-[#2E7D32] text-white"
                  : "border-gray-200 bg-white text-gray-500 hover:border-[#2E7D32] hover:text-[#2E7D32]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* ── FAQ List ── */}
      <section className="mx-auto max-w-3xl px-6 pt-10 pb-24">
        {totalResults === 0 ? (
          <div className="py-16 text-center">
            <div className="mb-3 text-4xl">🔍</div>
            <p className="text-sm text-gray-400">
              {searchQuery
                ? "No results found. Try a different search term."
                : "No questions in this category yet."}
            </p>
          </div>
        ) : (
          filtered.map((group) => (
            <FAQGroupSection key={group.cat} group={group} />
          ))
        )}

        {/* ── Still Need Help ── */}
        <div className="relative mt-4 overflow-hidden rounded-3xl bg-[#2E7D32] px-8 py-10 text-center text-white">
          <div className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full bg-white/[0.06]" />
          <div className="pointer-events-none absolute -bottom-14 -left-8 h-44 w-44 rounded-full bg-white/[0.05]" />

          <h3 className="relative z-10 mb-2.5 text-[26px] font-bold">
            Still need help?
          </h3>
          <p className="relative z-10 mb-6 text-sm leading-[1.6] text-white/80">
            Our support team is available Monday–Friday, 9am–6pm WAT.
            <br />
            We typically reply within 2 hours.
          </p>

          <div className="relative z-10 flex flex-wrap justify-center gap-3">
            <Link href={"user/dashboard/messages"}>
              <button className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-[13.5px] font-semibold text-[#2E7D32] transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <MessageCircle size={15} />
                Live Chat
              </button>
            </Link>
            <button className="flex items-center gap-2 rounded-xl border border-white/40 px-5 py-2.5 text-[13.5px] font-semibold text-white transition-all hover:border-white hover:bg-white/10">
              <Mail size={15} />
              Email Us
            </button>
            <button className="flex items-center gap-2 rounded-xl border border-white/40 px-5 py-2.5 text-[13.5px] font-semibold text-white transition-all hover:border-white hover:bg-white/10">
              <Phone size={15} />
              Call Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

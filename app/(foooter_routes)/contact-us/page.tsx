"use client";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import Link from "next/link";
import Whatapp from "@/components/common/whatapp";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactCards = [
    {
      icon: Mail,
      label: "Email Us",
      value: "hello@africamarket.com",
      sub: "We reply within 24 hours",
    },
    {
      icon: Phone,
      label: "Call Us",
      value: "+234 800 000 0000",
      sub: "Mon – Fri, 9am – 6pm WAT",
    },
    {
      icon: MapPin,
      label: "Visit Us",
      value: "12 Commerce Drive, Lagos",
      sub: "Nigeria, West Africa",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#2E7D32] px-6 py-20 text-white">
        {/* decorative circles */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-10 left-1/3 h-48 w-48 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute top-1/2 right-1/4 h-24 w-24 rounded-full bg-white/10" />

        <div className="relative mx-auto mt-20 max-w-4xl text-center md:mt-0">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[12px] font-medium tracking-widest uppercase">
            <MessageSquare className="h-3.5 w-3.5" />
            Get in touch
          </span>
          <h1 className="mt-4 text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl">
            We would love to{" "}
            <span className="relative inline-block">
              hear from you
              <span className="absolute right-0 -bottom-1 left-0 h-1 rounded-full bg-white/30" />
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-white/75">
            Whether you have a question about our marketplace, need support with
            an order, or want to explore a partnership — our team is ready to
            help.
          </p>
        </div>
      </section>

      {/* ── Contact cards ── */}
      <section className="relative z-10 -mt-8 px-6">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          {contactCards.map(({ icon: Icon, label, value, sub }) => (
            <div
              key={label}
              className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2E7D32]/10">
                <Icon className="h-5 w-5 text-[#2E7D32]" />
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                  {label}
                </p>
                <p className="mt-0.5 text-[14px] font-semibold text-gray-800">
                  {value}
                </p>
                <p className="mt-0.5 text-[12px] text-gray-400">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Form + aside ── */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 lg:grid-cols-5">
          {/* Form — 3 cols */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="text-[20px] font-bold text-gray-900">
                Send us a message
              </h2>
              <p className="mt-1 text-[13px] text-gray-400">
                Fill out the form and we will get back to you shortly.
              </p>

              <div className="mt-6 space-y-4">
                {/* Name + Email */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[12px] font-semibold tracking-wide text-gray-500 uppercase">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[14px] text-gray-800 placeholder-gray-300 transition-all outline-none focus:border-[#2E7D32] focus:bg-white focus:ring-2 focus:ring-[#2E7D32]/15"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[12px] font-semibold tracking-wide text-gray-500 uppercase">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[14px] text-gray-800 placeholder-gray-300 transition-all outline-none focus:border-[#2E7D32] focus:bg-white focus:ring-2 focus:ring-[#2E7D32]/15"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold tracking-wide text-gray-500 uppercase">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[14px] text-gray-800 transition-all outline-none focus:border-[#2E7D32] focus:bg-white focus:ring-2 focus:ring-[#2E7D32]/15"
                  >
                    <option value="" disabled>
                      Select a topic…
                    </option>
                    <option>General Inquiry</option>
                    <option>Order Support</option>
                    <option>Seller Partnership</option>
                    <option>Technical Issue</option>
                    <option>Feedback</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold tracking-wide text-gray-500 uppercase">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us how we can help…"
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[14px] text-gray-800 placeholder-gray-300 transition-all outline-none focus:border-[#2E7D32] focus:bg-white focus:ring-2 focus:ring-[#2E7D32]/15"
                  />
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2E7D32] px-6 py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-[#256428] active:scale-[0.98]"
                >
                  {submitted ? (
                    <>
                      <span>Message Sent!</span>
                      <span>🎉</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Aside — 2 cols */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {/* Hours */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2E7D32]/10">
                  <Clock className="h-5 w-5 text-[#2E7D32]" />
                </div>
                <h3 className="text-[15px] font-bold text-gray-900">
                  Business Hours
                </h3>
              </div>
              <div className="mt-4 space-y-2.5">
                {[
                  { day: "Monday – Friday", hours: "9:00 AM – 6:00 PM" },
                  { day: "Saturday", hours: "10:00 AM – 4:00 PM" },
                  { day: "Sunday", hours: "Closed" },
                ].map(({ day, hours }) => (
                  <div
                    key={day}
                    className="flex items-center justify-between border-b border-gray-100 pb-2.5 last:border-0 last:pb-0"
                  >
                    <span className="text-[13px] text-gray-500">{day}</span>
                    <span
                      className={`text-[13px] font-semibold ${
                        hours === "Closed" ? "text-red-400" : "text-[#2E7D32]"
                      }`}
                    >
                      {hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ nudge */}
            <div className="rounded-2xl border border-[#2E7D32]/20 bg-[#2E7D32]/5 p-6">
              <h3 className="text-[15px] font-bold text-gray-900">
                Looking for quick answers?
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-gray-500">
                Browse our FAQ section for instant answers to the most common
                questions about orders, shipping, and payments.
              </p>
              <Link href={"/faqs"}>
                <button className="mt-4 flex items-center gap-1.5 text-[13px] font-semibold text-[#2E7D32] transition-opacity hover:opacity-70">
                  Visit FAQ Centre
                  <ChevronRight className="h-4 w-4" />
                </button>
              </Link>
            </div>

            {/* Response time */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-[13px] leading-relaxed text-gray-500">
                ⚡ Our average response time is{" "}
                <span className="font-semibold text-gray-800">
                  under 4 hours
                </span>{" "}
                during business hours. For urgent matters, please call us
                directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map placeholder ── */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
          <iframe
            title="Stoke-on-Trent, England"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d77948.24!2d-2.1916!3d53.0027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487a4e354a2617db%3A0xa649dbf2d7c42f!2sStoke-on-Trent%2C%20UK!5e0!3m2!1sen!2sng!4v1700000000000"
            width="100%"
            height="380"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <Footer />

      {/* Floating WhatsApp Button */}
      <div className="">
        <Whatapp />
      </div>
    </div>
  );
}

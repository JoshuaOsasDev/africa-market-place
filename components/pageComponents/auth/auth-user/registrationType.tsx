"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { User, Store, ArrowRight } from "lucide-react";
import logo from "../../../../lib/public/images/africa1_logo.png";
import covertwo from "../../../../lib/public/images/abot_africa_3.jpg";

const RegistrationType = () => {
  const cards = [
    {
      title: "Register as a User",
      description:
        "Discover unique African products and shop from top vendors across the continent.",
      icon: <User className="h-6 w-6" />,
      href: "/auth-user/register/customer",
      color: "bg-[#2e7d32]",
    },
    {
      title: "Register as a Vendor",
      description:
        "Grow your business, manage inventory, and reach thousands of customers worldwide.",
      icon: <Store className="h-6 w-6" />,
      href: "/auth-user/register/vendor",
      color: "bg-[#111f12]",
    },
  ];

  return (
    <div className="flex min-h-screen w-full py-5">
      {/* ── LEFT PANEL (Consistent with your SignUpComp) ── */}
      <div className="relative hidden w-120 flex-col justify-between overflow-hidden bg-[#111f12] p-10 lg:flex">
        <Image
          src={covertwo}
          alt="selection cover"
          fill
          className="object-cover opacity-80"
        />
        <div className="relative z-10">
          <Image
            src={logo}
            alt="logo"
            width={50}
            height={50}
            className="object-contain brightness-0 invert"
          />
        </div>
        <div className="relative z-10 text-white">
          <h2 className="font-serif text-3xl">Join the marketplace.</h2>
          <p className="mt-2 text-sm text-gray-300">
            Choose how you want to experience Africa Market Place.
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          {/* Mobile brand */}
          <Link
            href={"/"}
            className="relative mb-8 flex h-10 w-10 items-center gap-2 lg:hidden"
          >
            <Image src={logo} alt="logo" fill className="object-contain" />
          </Link>

          <header className="mb-10">
            <h1 className="mb-2 font-serif text-[2.5rem] leading-tight text-[#111f12]">
              Get Started
            </h1>
            <p className="text-[#7a8b7a]">
              Select your account type to continue with registration.
            </p>
          </header>

          <div className="flex flex-col gap-4">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={card.href}
                  className="group flex items-center justify-between rounded-2xl border border-[#e2e8e2] bg-white p-6 transition-all hover:border-[#2e7d32] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white ${card.color}`}
                    >
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#111f12] group-hover:text-[#2e7d32]">
                        {card.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#7a8b7a]">
                        {card.description}
                      </p>
                    </div>
                  </div>
                  <div className="ml-4 rounded-full bg-[#f0f4f0] p-2 text-[#2e7d32] transition-colors group-hover:bg-[#2e7d32] group-hover:text-white">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <p className="mt-8 text-center text-[13.5px] text-[#7a8b7a]">
            Already have an account?{" "}
            <Link
              href="/auth-user/login"
              className="font-semibold text-[#2e7d32] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationType;

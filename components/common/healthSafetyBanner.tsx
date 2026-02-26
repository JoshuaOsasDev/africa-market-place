"use client";
import React from "react";
import Image from "next/image";

interface HealthSafetyBannerProps {
  className?: string;
}

export function HealthSafetyBanner({
  className = "",
}: HealthSafetyBannerProps) {
  return (
    <div
      className={`relative mb-2 w-full overflow-hidden bg-[#F1F1F1] px-2 ${className} rounded-[6px]`}
    >
      <div className="hidden max-w-7xl items-center justify-between gap-8 px-4 py-4 sm:px-6 lg:flex lg:px-8">
        {/* Text Content */}
        <div className="relative z-10 flex-1">
          <h2 className="text-xl leading-tight font-bold text-[#2E7D32] sm:text-[22px]">
            In store or online your health & safety is our top priority
          </h2>
          <p className="max-w-2xl text-sm text-[#6B7280]">
            The only supermarket that makes your life easier, makes you enjoy
            life and makes it better
          </p>
        </div>

        {/* Large Background Text */}
        <div className="absolute top-1/2 left-160 -translate-y-1/2 opacity-5 select-none">
          <span className="bg-gradient-to-r from-[#4F912F66] to-[#4F912F00] text-[130px] leading-none font-black text-[#2E7D32]">
            %50
          </span>
        </div>

        {/* Illustration */}
        <div className="absolute top-0 right-0">
          <div className="relative z-10 hidden flex-shrink-0 md:block">
            <div className="relative h-fit w-[400px] lg:h-[220px] lg:w-[500px]">
              <Image
                src="/images/health_safety.png"
                alt="Health and Safety - Fresh Food Illustration"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      {/* <div className="pointer-events-none absolute top-4 left-10 h-3 w-3 rounded-full bg-[#81C784] opacity-40" />
      <div className="pointer-events-none absolute right-40 bottom-6 h-2 w-2 rounded-full bg-[#AED581] opacity-40" />
      <div className="pointer-events-none absolute bottom-3 left-1/3 h-4 w-4 rounded-full bg-[#C5E1A5] opacity-30" /> */}
    </div>
  );
}

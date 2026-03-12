import React from "react";
import { cn } from "@/lib/utils";

interface CountryFlagProps {
  countryCode: string;
  className?: string;
  size?: "sm" | "default" | "lg";
}

const flagEmojis: Record<string, string> = {
  NG: "🇳🇬", // Nigeria
  GH: "🇬🇭", // Ghana
  CN: "🇨🇳", // China
  BW: "🇧🇼", // Botswana
  US: "🇺🇸", // USA
  GB: "🇬🇧", // UK
  KE: "🇰🇪", // Kenya
  ZA: "🇿🇦", // South Africa
};

export function CountryFlag({
  countryCode,
  className,
  size = "default",
}: CountryFlagProps) {
  const sizeClasses = {
    sm: "text-base",
    default: "text-xl",
    lg: "text-2xl",
  };

  return (
    <span className={cn(sizeClasses[size], className)}>
      {flagEmojis[countryCode] || "🌍"}
    </span>
  );
}
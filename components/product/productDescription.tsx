import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductDescriptionProps {
  description: string;
  features?: string[];
  className?: string;
}

export function ProductDescription({
  description,
  features = [],
  className,
}: ProductDescriptionProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="text-base leading-relaxed text-[#6F6F6F]">
        {description?.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-4 last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>

      {features && features.length > 0 && (
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EAF2EA]">
                <Check size={14} className="text-[#2E7D32]" />
              </div>
              <span className="flex-1 text-base leading-relaxed text-[#6F6F6F]">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

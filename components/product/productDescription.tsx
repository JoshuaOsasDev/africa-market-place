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
      <div className="text-[#6F6F6F] text-base leading-relaxed">
        {description.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4 last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>

      {features && features.length > 0 && (
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="shrink-0 w-5 h-5 rounded-full bg-[#EAF2EA] flex items-center justify-center mt-0.5">
                <Check size={14} className="text-[#2E7D32]" />
              </div>
              <span className="text-[#6F6F6F] text-base leading-relaxed flex-1">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
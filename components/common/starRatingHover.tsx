"use client";

import { useState } from "react";

const LABELS = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];

interface StarRatingProps {
  value?: number;
  onChange?: (rating: number) => void;
  size?: number;
  readOnly?: boolean;
  showLabel?: boolean;
  color?: string;
  hoverColor?: string;
  emptyColor?: string;
}

export function StarRatingHover({
  value = 0,
  onChange,
  size = 32,
  readOnly = false,
  showLabel = true,
  color = "#F59E0B",
  hoverColor = "#FBBF24",
  emptyColor = "#D1D5DB",
}: StarRatingProps) {
  const [hovered, setHovered] = useState(0);

  const active = hovered || value;

  const handleClick = (num: number) => {
    if (readOnly) return;
    onChange?.(num);
  };

  return (
    <div>
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((num) => {
          const isFilled = num <= active;
          const isHovered = !!hovered && num <= hovered;
          const fill = isFilled ? (isHovered ? hoverColor : color) : emptyColor;

          return (
            <button
              key={num}
              type="button"
              disabled={readOnly}
              onClick={() => handleClick(num)}
              onMouseEnter={() => !readOnly && setHovered(num)}
              onMouseLeave={() => !readOnly && setHovered(0)}
              className="p-0.5 transition-transform active:scale-90 disabled:cursor-default"
            >
              <svg
                viewBox="0 0 24 24"
                width={size}
                height={size}
                xmlns="http://www.w3.org/2000/svg"
                className="transition-all duration-150"
              >
                <polygon
                  points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  fill={fill}
                  stroke={fill}
                />
              </svg>
            </button>
          );
        })}
      </div>

      {showLabel && (
        <p className="mt-1.5 h-4 text-xs text-gray-500 transition-opacity">
          {LABELS[hovered || value] ?? ""}
        </p>
      )}
    </div>
  );
}

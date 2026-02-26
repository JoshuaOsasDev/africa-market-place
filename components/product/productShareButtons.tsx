"use client";

import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { FaPinterest } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface ProductShareButtonsProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
}

export function ProductShareButtons({
  url,
  title,
  description,
  className,
}: ProductShareButtonsProps) {
  const shareUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");
  const shareTitle = title || "Check out this product";
  const shareDescription = description || "";

  // const handleShare = async (platform: string) => {
  //   const encodedUrl = encodeURIComponent(shareUrl);
  //   const encodedTitle = encodeURIComponent(shareTitle);
  //   const encodedDescription = encodeURIComponent(shareDescription);

  //   const shareUrls: Record<string, string> = {
  //     facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  //     twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
  //     pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
  //     instagram: `https://www.instagram.com/`, // Instagram doesn't have direct share URL
  //   };

  //   if (navigator.share && platform === "native") {
  //     try {
  //       await navigator.share({
  //         title: shareTitle,
  //         text: shareDescription,
  //         url: shareUrl,
  //       });
  //       return;
  //     } catch (error) {
  //       console.log("Share cancelled or failed:", error);
  //     }
  //   }

  //   // Fallback to opening share URL in new window
  //   const url = shareUrls[platform];
  //   if (url) {
  //     window.open(url, "_blank", "width=600,height=400");
  //   }
  // };

  const handleShare = async (platform: string) => {
    const shareUrl =
      url || (typeof window !== "undefined" ? window.location.href : "");

    const shareTitle = title || "Check out this product";
    const shareText = description || shareTitle;

    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(shareTitle);
    const encodedText = encodeURIComponent(shareText);

    // 1️⃣ Native share first (mobile)
    if (navigator.share && platform === "native") {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err) {
        console.log("Native share cancelled");
      }
    }

    // 2️⃣ Platform URLs (Updated 2026 safe versions)
    const shareLinks: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,

      twitter: `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,

      pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,

      whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    };

    const link = shareLinks[platform];

    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  const socialButtons = [
    {
      name: "Facebook",
      icon: Facebook,
      color: "hover:bg-[#1877F2] hover:text-white",
      onClick: () => handleShare("facebook"),
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "hover:bg-[#1DA1F2] hover:text-white",
      onClick: () => handleShare("twitter"),
    },
    {
      name: "Pinterest",
      icon: FaPinterest,
      color: "hover:bg-[#E60023] hover:text-white",
      onClick: () => handleShare("pinterest"),
    },
    {
      name: "Instagram",
      icon: Instagram,
      color:
        "hover:bg-gradient-to-r hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] hover:text-white",
      onClick: () => handleShare("instagram"),
    },
  ];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="text-sm font-medium text-[#6F6F6F]">Share item:</span>
      <div className="flex items-center gap-2">
        {socialButtons.map((button) => {
          const Icon = button.icon;
          return (
            <button
              key={button.name}
              onClick={button.onClick}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full bg-[#2E7D32] text-white transition-all duration-300",
                button.color,
              )}
              aria-label={`Share on ${button.name}`}
            >
              <Icon size={16} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

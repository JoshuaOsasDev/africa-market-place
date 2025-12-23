"use client";
import { Reply } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/onboarding")}
      className="mb:p-4 mt-3 mb-6 hidden space-x-2 rounded-sm border p-2 hover:bg-[#2E7D32]/90 md:mt-0 md:flex md:bg-white"
    >
      <span>
        <Reply />
      </span>
      <span>Go Back</span>
    </button>
  );
}

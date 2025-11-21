"use client";
import { Reply } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/onboarding")}
      className="hidden border rounded-sm p-2  mb:p-4 md:bg-white  space-x-2 mb-6 mt-3 md:mt-0 hover:bg-[#2E7D32]/90 md:flex"
    >
      <span>
        <Reply />
      </span>
      <span>Go Back</span>
    </button>
  );
}

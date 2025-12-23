"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProductLinkNav() {
  const pathname = usePathname();

  const isDetailsPage = pathname.includes("/dashboard/product/details");

  return (
    <nav className="hidden items-center gap-2 md:flex">
      <Link
        href="/dashboard"
        className="text-sm leading-5 font-medium tracking-[0.5%] text-[#2E7D32] hover:opacity-80"
      >
        Dashboard
      </Link>

      <span className="px-1 leading-5 font-medium tracking-[0.5%] text-[#667085]">
        <ChevronRight className="h-3.5 w-4" />
      </span>

      <Link
        href="/dashboard/product"
        className="text-sm leading-5 font-medium tracking-[0.5%] text-[#667085] hover:opacity-80"
      >
        Product List
      </Link>

      {isDetailsPage && (
        <>
          <span className="px-1 leading-5 font-medium tracking-[0.5%] text-[#667085]">
            <ChevronRight className="h-3.5 w-4" />
          </span>
          <Link
            href={"/dashboard/product/details"}
            className="text-sm leading-5 font-medium tracking-[0.5%] text-[#667085] hover:opacity-80"
          >
            Product Details
          </Link>
        </>
      )}
    </nav>
  );
}

"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProductLinkNav({
  name,
  id,
}: {
  name: string;
  id: string;
}) {
  const pathname = usePathname();

  const isDetailsPage = pathname.includes(
    `/dashboard/${name.toLowerCase()}/${id}`,
  );

  return (
    <nav className="hidden items-center gap-2 md:flex">
      <Link
        href="/vendor/dashboard"
        className="text-sm leading-5 font-medium tracking-[0.5%] text-[#2E7D32] hover:opacity-80"
      >
        Dashboard
      </Link>

      <span
        className={`px-1 leading-5 font-medium tracking-[0.5%] text-[#667085] ${isDetailsPage ? "text-[#2E7D32]" : "text-[#2E7D32]"}`}
      >
        <ChevronRight className="h-3.5 w-4" />
      </span>

      <Link
        href={`/vendor/dashboard/${name.toLowerCase()}`}
        className={`"text-sm hover:opacity-80" leading-5 font-medium tracking-[0.5%] ${isDetailsPage ? "text-[#2E7D32]" : "text-[#667085]"}`}
      >
        {name} List
      </Link>

      {isDetailsPage && (
        <>
          <span className="px-1 leading-5 font-medium tracking-[0.5%] text-[#667085]">
            <ChevronRight className="h-3.5 w-4" />
          </span>
          <Link
            href={``}
            className="text-sm leading-5 font-medium tracking-[0.5%] text-[#667085] hover:opacity-80"
          >
            {name} Details
          </Link>
        </>
      )}
    </nav>
  );
}

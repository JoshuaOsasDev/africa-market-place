"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import dashboardPageIcon from "../../../../public/dashboard-images/dashboard-page-icon.svg";
import productPageIcon from "../../../../public/dashboard-images/product-page-icon.svg";
import ordersPageIcon from "../../../../public/dashboard-images/orders-page-icon.svg";
import customersPageIcon from "../../../../public/dashboard-images/customers-page-icon.svg";
import sellerPageIcon from "../../../../public/dashboard-images/seller-page-icon.svg";
import analyticsPageIcon from "../../../../public/dashboard-images/analytics-page-icon.svg";

const links = [
  { name: "Dashboard", href: "/vendor/dashboard", icon: dashboardPageIcon },
  {
    name: "Product",
    href: "/vendor/dashboard/product",
    icon: productPageIcon,
  },
  { name: "Orders", href: "/vendor/dashboard/orders", icon: ordersPageIcon },
  { name: "Customers", href: "/vendor/dashboard/customers", icon: customersPageIcon },
  { name: "Seller", href: "/vendor/dashboard/seller", icon: sellerPageIcon },
  { name: "Analytics", href: "/vendor/dashboard/analytics", icon: analyticsPageIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        
        const isActive =
          link.href === "/vendor/dashboard"
            ? pathname === "/vendor/dashboard"
            : pathname.startsWith(link.href);

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "hidden md:flex px-3 py-2 grow items-center justify-center gap-2 rounded-xl p-3 text-[14px] font-bold hover:bg-[#EAF2EA] hover:text-[#2E7D32] md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-[#EAF2EA] text-[#2E7D32]": isActive, 
                "text-[#667085]": !isActive, 
              }
            )}
          >
            <Image
              src={link.icon}
              alt="nav-icons"
              style={{
                filter: isActive
                  ? "invert(41%) sepia(35%) saturate(904%) hue-rotate(73deg) brightness(89%) contrast(86%)"
                  : "invert(53%) sepia(13%) saturate(582%) hue-rotate(186deg) brightness(93%) contrast(86%)",
              }}
            />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

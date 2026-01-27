"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import dashboardPageIcon from "../../lib/public/vendor/dashboard-images/dashboard-page-icon.svg";
import productPageIcon from "../../lib/public/vendor/dashboard-images/product-page-icon.svg";
import ordersPageIcon from "../../lib/public/vendor/dashboard-images/orders-page-icon.svg";

import sellerPageIcon from "../../lib/public/admin/dashboard_images_and_icons/sellers-page-icon.svg";

import { ChevronDown } from "lucide-react";

const links = [
  { name: "Dashboard", href: "/vendor/dashboard", icon: dashboardPageIcon },
  {
    name: "Product",
    href: "/vendor/dashboard/product",
    icon: productPageIcon,
    iconChevron: <ChevronDown />,
  },
  { name: "Orders", href: "/vendor/dashboard/orders", icon: ordersPageIcon },
  {
    name: "Customers",
    href: "/vendor/dashboard/customers",
    icon: sellerPageIcon,
  },
  { name: "Seller", href: "/vendor/dashboard/seller", icon: sellerPageIcon },
  {
    name: "Wallets",
    href: "/vendor/dashboard/wallet",
    icon: sellerPageIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "hidden grow place-items-start justify-center gap-2 rounded-xl p-3 px-3 py-2 text-[14px] font-bold text-[#667085] hover:bg-[#EAF2EA] hover:text-[#2E7D32] md:flex md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-[#EAF2EA] text-[#2E7D32]": pathname === link.href,
              },
            )}
          >
            <div className="mr-20 flex items-center justify-between gap-2">
              <Image
                src={link.icon}
                alt="nav-icons"
                style={{
                  filter:
                    pathname === link.href
                      ? "invert(41%) sepia(35%) saturate(904%) hue-rotate(73deg) brightness(89%) contrast(86%)"
                      : "invert(53%) sepia(13%) saturate(582%) hue-rotate(186deg) brightness(93%) contrast(86%)",
                }}
              />
              <p className="hidden md:block">{link.name}</p>
            </div>
            {link.iconChevron && (
              <span className="width-[12.83px] hidden h-[7.52px] md:block">
                {link.iconChevron}
              </span>
            )}
          </Link>
        );
      })}
    </>
  );
}

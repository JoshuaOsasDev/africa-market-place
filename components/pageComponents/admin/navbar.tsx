"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();

  const routes: { prefix: string; title: string }[] = [
    { prefix: "/admin/dashboard/users", title: "Users" },
    { prefix: "/admin/dashboard/sellers", title: "Sellers" },
    { prefix: "/admin/dashboard/productReview", title: "Product Review" },
    { prefix: "/admin/dashboard/shipping", title: "Shipping" },
    { prefix: "/admin/dashboard/roles", title: "Roles" },
    { prefix: "/admin/dashboard/payout", title: "Payout" },
    { prefix: "/admin/dashboard/pageSetups", title: "Page Setups" },
    { prefix: "/admin/dashboard/reports", title: "Reports" },
    { prefix: "/admin/dashboard/settings", title: "Settings" },
    { prefix: "/admin/dashboard", title: "Overview" },
  ];

  const getPageTitle = (path: string) => {
    const match = routes.find(
      (route) => path === route.prefix || path.startsWith(`${route.prefix}/`),
    );
    return match?.title ?? "";
  };

  // Extract slug from pathname
  const getSlugDetails = (path: string) => {
    const match = routes.find(
      (route) => path === route.prefix || path.startsWith(`${route.prefix}/`),
    );

    if (match && path.startsWith(`${match.prefix}/`)) {
      // Extract everything after the route prefix
      const slug = path.slice(`${match.prefix}/`.length);
      return slug;
    }
    return null;
  };

  const headerText = getPageTitle(pathname);
  const slugDetails = getSlugDetails(pathname);

  // console.log(headerText, "path");
  // console.log(slugDetails, "slug");

  return (
    <nav className="fixed z-100 h-[60px] w-full bg-white">
      {/* Mobile view */}
      {/* <div className="flex h-[50px] items-center justify-between bg-[#FAFAFF] px-6 md:hidden">
        <div className="">
          <Image
            src={hamburgerMenu}
            alt="hamburger-menu"
            className="h-[30px] w-[30px] rounded-[4px] border border-[#DBDBDB] px-1.5 py-1.5"
          />
        </div>

        <div className="flex gap-2.5">
          <Image src={notificationIconFilled} alt="notification-icon-filled" />
          <Image
            src={mobileViewUserIcon}
            alt="user-icon"
            className="h-[29px] w-[29px] rounded-[32.22px] bg-[#EAF2EA] p-[4.83px]"
          />
        </div>
      </div> */}

      {/* Desktop view */}
      <div className="flex h-full items-center">
        {/* LOGO */}
        <div className="hidden w-[296px] items-center justify-between md:flex">
          <Link href="/" className="px-[30px] py-3">
            <h1
              className={`text-2xl text-[#2E7D32]`}
              style={{ fontFamily: "var(--font-changa)" }}
            >
              African Kitchen{" "}
            </h1>
          </Link>
        </div>

        <div className="hidden items-center px-[21px] md:flex">
          <h1 className="text-[20px] font-medium text-[#45464E]">
            Dashboard/{headerText}
            {slugDetails && (
              <span className="text-[#667085]">
                /Shipping-information ({slugDetails})
              </span>
            )}
          </h1>

          <div className="absolute right-[21px] flex items-center gap-5">
            <button className="flex items-center justify-center gap-2.5 rounded-xl bg-[#FAFAFA] px-3 py-1.5">
              <span className="text-[14px] font-normal text-[#1C1D22]">
                Admin
              </span>
              <span>
                {" "}
                <ChevronDown />
              </span>
            </button>
            <Bell fill="#2E7D32" className="text-[#2E7D32]" />

            <div className="relative h-8 w-8">
              <Image
                fill
                src={"/admin-dashboard-image/admin-profile-image.jpg"}
                alt="profile-picture"
                className="object-fit rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

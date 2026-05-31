import React from "react";
import { Zap } from "lucide-react"; // Using Lucide for the lightning bolt icon
import Link from "next/link";

const DashboardGrid = () => {
  const menuItems = [
    { title: "Home Page", link: "/admin/dashboard/pageSetups/homeSetup" },
    { title: "Shop", link: "#" },
    {
      title: "Categories",
      link: "/admin/dashboard/pageSetups/categoriesSetup",
    },
    { title: "Help & Support", link: "#" },
    { title: "About Us Pages", link: "#" },
    { title: "FAQs", link: "#" },
    { title: "Terms of Use Pages", link: "#" },
    { title: "Privacy Policy Pages", link: "#" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FD] p-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {menuItems.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className="flex cursor-pointer flex-col items-center justify-center rounded-[12px] border border-transparent bg-white p-8 shadow-sm transition-shadow hover:border-gray-100 hover:shadow-md"
            >
              {/* Icon Container */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E9F0EE]">
                <Zap className="h-6 w-6 fill-[#2D7A39] text-[#2D7A39]" />
              </div>

              {/* Title */}
              <h3 className="text-center text-sm font-bold text-[#1A1A1A]">
                {item.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardGrid;

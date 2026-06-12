"use client";
import Image from "next/image";
import Link from "next/link";
//import logo from "../../lib/public/images/africa1_logo.png";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

import TextStyle from "./textStyle";
import { socialData, socialData2, socialData3, socialData4 } from "@/lib/data";
import { useAppSelector } from "@/redux/store";
import { useState } from "react";
import { CookieModal } from "./cookieModal";

const logo =
  "https://res.cloudinary.com/dtxai4k4r/image/upload/v1781291048/WhatsApp_Image_2026-06-12_at_20.00.49_amxpv1.jpg";
function Footer() {
  const user = useAppSelector((state) => state.user);
  const [cookieModalOpen, setCookieModalOpen] = useState(false);
  return (
    <>
      <div className="mx-2 mb-4 grid grid-cols-1 gap-6 rounded-[20px] bg-[#1A1A1A] p-4 md:grid-cols-5">
        <div className="col-span-2 flex flex-col space-y-3">
          {/* logo */}
          <div className="relative h-15 w-15">
            <Link href={"/"}>
              <Image
                src={logo}
                alt="africa market place logo"
                fill
                className="rounded-full bg-white object-contain p-2"
              />
            </Link>
          </div>
          {/*  logo ends */}
          <TextStyle
            textContent="Discover quality African products, support local vendors, and enjoy a seamless shopping experience with Africa Market Place."
            textStyle="text-white"
          />
          {/* social icons start */}
          <div className="flex flex-row items-center space-x-4">
            {socialData.map((icon) => (
              <Link
                href={icon.url}
                key={icon.id}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#636363] transition-all duration-500 ease-in-out hover:bg-[#a0b7a1]">
                  {icon.id === 1 ? (
                    <Facebook className="h-5 w-5 text-white" />
                  ) : icon.id === 2 ? (
                    <Instagram className="h-5 w-5 text-white" />
                  ) : icon.id === 3 ? (
                    <Twitter className="h-5 w-5 text-white" />
                  ) : (
                    <Mail className="h-5 w-5 text-white" />
                  )}
                </div>
              </Link>
            ))}
          </div>
          {/* social icon start */}
        </div>
        <div className="grid grid-cols-1 gap-10 md:col-span-3 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] md:gap-4">
          {user?.user && (
            <div className="flex flex-col space-y-2">
              {socialData2.map((data) => (
                <Link href={data.url} key={data.id}>
                  <TextStyle
                    textContent={data.name}
                    textStyle="text-white text-[16px] hover:text-[#a0b7a1] duration-500 transtion-all ease-in-out "
                  />
                </Link>
              ))}
            </div>
          )}
          <div className="flex flex-col items-start justify-start space-y-2">
            {socialData3.map((data) => (
              <Link href={data.url} key={data.id}>
                <TextStyle
                  textContent={data.name}
                  textStyle="text-white text-[16px] hover:text-[#a0b7a1] duration-500 transtion-all ease-in-out"
                />
              </Link>
            ))}

            <button
              onClick={() => setCookieModalOpen(true)}
              className="transtion-all text-[14px] text-white duration-500 ease-in-out hover:cursor-pointer hover:text-[#a0b7a1]"
            >
              Cookies Policy
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            {socialData4.map((data) => (
              <Link href={data.url} key={data.id}>
                <TextStyle
                  textContent={data.name}
                  textStyle="text-white text-[16px] hover:text-[#a0b7a1] duration-500 transtion-all ease-in-out"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Cookie Modal — rendered outside the footer grid so it's never clipped */}
      <CookieModal
        isOpen={cookieModalOpen}
        onClose={() => setCookieModalOpen(false)}
      />
    </>
  );
}

export default Footer;

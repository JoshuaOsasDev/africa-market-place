"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { countryListAndFlags, navListArray } from "@/lib/data";
import SearchFieldComp from "@/components/common/search";
import TextStyle from "@/components/common/textStyle";
import LanguageSelect from "@/components/common/selectdropdown";

import {
  Menu,
  X,
  ShoppingCart,
  House,
  MapPinCheckInside,
  Heart,
  Store,
  LogInIcon,
  LogIn,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

function Header() {
  const [userTextInput, setuserTextInput] = useState("");
  const [countryListData, setCountryListData] = useState<
    | {
        name: string;
        flagImage: string;
        alt: string;
        selected: boolean;
      }[]
    | []
  >([]);

  const [isOpen, setIsOpen] = useState(false);

  const [selectedCountryListData, setselectedCountryListData] = useState<{
    name: string;
    flagImage: string;
    alt: string;
  } | null>(null);

  useEffect(() => {
    setCountryListData(countryListAndFlags);
    const isSelected = countryListAndFlags.filter((data) => {
      if (data.selected) return data;
    });
    isSelected.length > 0
      ? setselectedCountryListData({
          alt: isSelected[0].alt,
          flagImage: isSelected[0].flagImage,
          name: isSelected[0].name,
        })
      : setselectedCountryListData({
          alt: countryListAndFlags[0].alt,
          flagImage: countryListAndFlags[0].flagImage,
          name: countryListAndFlags[0].name,
        });
  }, []);

  return (
    <div>
      <div className="w-full bg-white px-2 shadow-md md:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-2 py-3 md:py-4">
          {/* Logo */}
          <div className="relative h-[50px] w-[100px] sm:h-[60px] sm:w-[182px] lg:h-[83px] lg:w-[292px]">
            <Link href={"/"}>
              <Image
                src={"/logo.png"}
                alt="africa market place logo"
                fill
                className="object-contain"
              />
            </Link>
          </div>

          {/* Hamburger Menu Button (Mobile only) */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg text-gray-700 hover:bg-gray-100 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          {/* Navbar Links - Hidden on Mobile */}
          <nav className="z-23 hidden space-x-8 bg-white font-medium text-gray-700 md:flex">
            <a href="#home" className="transition-colors hover:text-blue-600">
              Home
            </a>
            <a href="#about" className="transition-colors hover:text-blue-600">
              About
            </a>
            <a
              href="#services"
              className="transition-colors hover:text-blue-600"
            >
              Services
            </a>
            <a
              href="#contact"
              className="transition-colors hover:text-blue-600"
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Animated Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed top-0 right-0 z-40 flex h-full w-2/6 flex-col border-l border-gray-200 bg-white shadow-lg md:hidden"
            >
              <div className="flex justify-end p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <nav className="flex flex-col space-y-4 px-6 font-medium text-gray-700">
                <motion.a
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  href="/"
                  className="transition-colors ease-in-out hover:text-green-600"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex flex-row items-center space-x-2">
                    <House className="h-5 w-5 hover:text-green-700" />
                    <TextStyle textContent="Home" textStyle="text-14" />
                  </div>
                </motion.a>
                <motion.a
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  href="/order/track"
                  className="transition-colors ease-in-out hover:text-green-600"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex flex-row items-center space-x-2">
                    <MapPinCheckInside className="h-5 w-5 hover:text-green-700" />
                    <TextStyle
                      textContent="Order Tracking"
                      textStyle="text-14"
                    />
                  </div>
                </motion.a>
                <motion.a
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  href="/wishlist"
                  className="transition-colors ease-in-out hover:text-green-600"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex flex-row items-center space-x-2">
                    <Heart className="h-5 w-5 hover:text-green-700" />
                    <TextStyle textContent="Wishlist" textStyle="text-14" />
                  </div>
                </motion.a>
                <motion.a
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  href="/sell"
                  className="transition-colors ease-in-out hover:text-green-600"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex flex-row items-center space-x-2">
                    <Store className="h-5 w-5 hover:text-green-700" />
                    <TextStyle textContent="Sell" textStyle="text-14" />
                  </div>
                </motion.a>
              </nav>
              <div className="flex flex-1 flex-col items-end justify-end p-4">
                <div className="flex flex-row items-center justify-center space-x-2">
                  <LogIn />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="hidden flex-row space-x-4 px-4 py-2 md:flex">
        {/* logo section starts */}
        <div className="relative h-[50px] w-[100px] sm:h-[60px] sm:w-[182px] lg:h-[83px] lg:w-[292px]">
          <Link href={"/"}>
            <Image
              src={"/images/logo.png"}
              alt="africa market place logo"
              fill
              className="object-contain"
            />
          </Link>
        </div>
        {/* logo section ends */}
        {/* other section starts */}
        <div className="w-full flex-1 space-y-6">
          {/* top left section starts */}
          <div className="flex flex-1 flex-row space-x-5">
            <div className="flex-1">
              <SearchFieldComp
                inputDivStyle="block w-full"
                inputPlaceholder="Search for food items here..."
                setInputState={setuserTextInput}
                inputState={userTextInput}
                inputTextStyle="flex-1"
              />
            </div>
            <div className="flex flex-row items-center space-x-2">
              <div className="hidden flex-row space-x-2 lg:flex">
                {selectedCountryListData && (
                  <div className="flex flex-row items-center justify-center space-x-1">
                    <div className="relative h-5 w-5">
                      <Image
                        src={selectedCountryListData.flagImage}
                        alt={selectedCountryListData.alt}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>

                    <select
                      name=""
                      id=""
                      onChange={(e) => {
                        setselectedCountryListData(JSON.parse(e.target.value));
                      }}
                    >
                      {countryListData.map((data, id) => (
                        <option key={id} value={JSON.stringify(data)}>
                          {data.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div className="flex flex-row items-center space-x-2">
                <Image
                  src={"/images/user.jpg"}
                  alt={"user pic"}
                  width={16.2}
                  height={15}
                  className=""
                />
                <Link href={"/auth-user/login"}>
                  <TextStyle textContent="Sign In" textStyle="" />
                </Link>
                <hr className="h-5 w-px bg-[#b0adad]" />
                <Link href={"/auth-user/register/vendor"}>
                  <TextStyle textContent="Register" textStyle="" />
                </Link>
              </div>
            </div>
            <div className="ml-2 flex flex-row items-center space-x-3">
              <div className="relative h-6 w-6">
                <Heart className="h-6 w-6" />
                <div className="absolute -right-2 bottom-3 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF0000] p-1">
                  <span className="text-[10px] text-white">5</span>
                </div>
              </div>
              <div className="relative h-6 w-6">
                <ShoppingCart className="h-6 w-6" />
                <div className="absolute -right-2 bottom-3 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF0000] p-1">
                  <span className="text-[10px] text-white">10</span>
                </div>
              </div>
            </div>
          </div>
          {/* top left section ends */}
          <div className="flex flex-row items-center lg:justify-between">
            <div className="flex flex-row items-center space-x-4 lg:space-x-8">
              {
                /*  */
                navListArray.map((item, i) => {
                  return (
                    <div className="group flex flex-col space-y-2 pt-3" key={i}>
                      <Link
                        className="cursor-pointer text-lg font-medium hover:text-blue-500"
                        key={item.url}
                        href={item.url}
                      >
                        <TextStyle
                          textContent={item.name}
                          textStyle="hover:text-[#4F912F]"
                        />
                      </Link>
                      <div className="h-0.5 w-0 bg-[#4F912F] transition-all duration-500 ease-in-out group-hover:block group-hover:w-full"></div>
                    </div>
                  );
                })
              }
              <div className="group flex flex-col space-y-2 pt-2 lg:hidden">
                <Link
                  className="cursor-pointer text-lg font-medium hover:text-blue-500"
                  href={"/tracking"}
                >
                  <TextStyle
                    textContent={"Order Tracking"}
                    textStyle="hover:text-[#4F912F]"
                  />
                </Link>
                <div className="h-0.5 w-0 bg-[#4F912F] transition-all duration-500 ease-in-out group-hover:block group-hover:w-full lg:hidden"></div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4 lg:flex-1">
              <LanguageSelect showFlag={false} />
              <LanguageSelect showFlag={true} />

              <div className="group hidden flex-col space-y-2 pt-2 lg:flex">
                <Link
                  className="cursor-pointer text-lg font-medium hover:text-blue-500"
                  href={"/tracking"}
                >
                  <TextStyle
                    textContent={"Order Tracking"}
                    textStyle="hover:text-[#4F912F]"
                  />
                </Link>
                <div className="h-0.5 w-0 bg-[#4F912F] transition-all duration-500 ease-in-out group-hover:block group-hover:w-full"></div>
              </div>
            </div>
          </div>
        </div>
        {/* other section ends */}
      </div>
    </div>
  );
}

export default Header;

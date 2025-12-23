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

  // useEffect(() => {
  //   setCountryListData(countryListAndFlags);
  //   const isSelected = countryListAndFlags.filter((data) => {
  //     if (data.selected) return data;
  //   });
  //   isSelected.length > 0
  //     ? setselectedCountryListData({
  //         alt: isSelected[0].alt,
  //         flagImage: isSelected[0].flagImage,
  //         name: isSelected[0].name,
  //       })
  //     : setselectedCountryListData({
  //         alt: countryListAndFlags[0].alt,
  //         flagImage: countryListAndFlags[0].flagImage,
  //         name: countryListAndFlags[0].name,
  //       });
  // }, []);

  return (
    <div>
      <div className="w-full bg-white shadow-md md:hidden px-2 ">
        <div className="mx-auto flex items-center justify-between  px-2 py-3 md:py-4">
          {/* Logo */}
          <div className="relative  w-[100px] h-[50px] sm:w-[182px] sm:h-[60px]  lg:w-[292px] lg:h-[83px] ">
            <Link href={"/"}>
              <Image
                src={"/images/logo.png"}
                alt="africa market place logo"
                fill
                className="object-contain object-center"
              />
            </Link>
          </div>

          {/* Hamburger Menu Button (Mobile only) */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-lg text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          {/* Navbar Links - Hidden on Mobile */}
          <nav className="hidden md:flex space-x-8 text-gray-700 font-medium z-23 bg-white">
            <a href="#home" className="hover:text-blue-600 transition-colors">
              Home
            </a>
            <a href="#about" className="hover:text-blue-600 transition-colors">
              About
            </a>
            <a
              href="#services"
              className="hover:text-blue-600 transition-colors"
            >
              Services
            </a>
            <a
              href="#contact"
              className="hover:text-blue-600 transition-colors"
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
              className="fixed flex flex-col top-0 right-0 z-40 h-full w-2/6 bg-white  shadow-lg border-l border-gray-200 md:hidden  "
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
              <nav className="flex flex-col space-y-4 px-6 text-gray-700 font-medium">
                <motion.a
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  href="/"
                  className="hover:text-green-600 transition-colors ease-in-out"
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
                  className="hover:text-green-600 transition-colors ease-in-out"
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
                  className="hover:text-green-600 transition-colors ease-in-out"
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
                  className="hover:text-green-600 transition-colors ease-in-out"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex flex-row items-center space-x-2">
                    <Store className="h-5 w-5 hover:text-green-700" />
                    <TextStyle textContent="Sell" textStyle="text-14" />
                  </div>
                </motion.a>
              </nav>
              <div className="  flex-1 flex flex-col items-end justify-end p-4">
                <div className="flex flex-row items-center space-x-2 justify-center">
                  <LogIn />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="hidden md:flex flex-row py-2 space-x-4 px-4">
        {/* logo section starts */}
        <div className="relative  w-[100px] h-[50px] sm:w-[182px] sm:h-[60px]  lg:w-[292px] lg:h-[83px] ">
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              alt="africa market place logo"
              fill
              className="object-contain"
            />
          </Link>
        </div>
        {/* logo section ends */}
        {/* other section starts */}
        <div className="flex-1 space-y-6  w-full">
          {/* top left section starts */}
          <div className="flex flex-1 flex-row space-x-5 ">
            <div className="flex-1">
              <SearchFieldComp
                inputDivStyle="block w-full"
                inputPlaceholder="Search for food items here..."
                setInputState={setuserTextInput}
                inputState={userTextInput}
                inputTextStyle="flex-1"
              />
            </div>
            <div className="flex  flex-row items-center space-x-2">
              <div className="hidden lg:flex flex-row space-x-2">
                {selectedCountryListData && (
                  <div className="flex flex-row justify-center items-center space-x-1">
                    <div className="w-5 relative h-5">
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
                <hr className="bg-[#b0adad] w-px h-5" />
                <Link href={"/auth-user/register/vendor"}>
                  <TextStyle textContent="Register" textStyle="" />
                </Link>
              </div>
            </div>
            <div className="flex flex-row space-x-3 ml-2 items-center ">
              <div className="relative w-6 h-6 ">
                <Heart className="w-6 h-6" />
                <div className="flex z-10 items-center justify-center rounded-full absolute bottom-3 w-4 h-4 -right-2 bg-[#FF0000] p-1 ">
                  <span className="text-[10px] text-white">5</span>
                </div>
              </div>
              <div className="relative w-6 h-6 ">
                <ShoppingCart className="w-6 h-6" />
                <div className="flex items-center justify-center rounded-full absolute bottom-3 w-4 h-4 -right-2 bg-[#FF0000] p-1 ">
                  <span className="text-[10px] text-white">10</span>
                </div>
              </div>
            </div>
          </div>
          {/* top left section ends */}
          <div className="flex flex-row lg:justify-between items-center">
            <div className="flex  flex-row items-center lg:space-x-8 space-x-4">
              {
                /*  */
                navListArray.map((item, i) => {
                  return (
                    <div className="group pt-3 flex flex-col space-y-2" key={i}>
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
                      <div className="h-0.5 w-0  bg-[#4F912F]  transition-all duration-500 group-hover:w-full group-hover:block ease-in-out"></div>
                    </div>
                  );
                })
              }
              <div className="group pt-2 flex flex-col space-y-2 lg:hidden ">
                <Link
                  className="cursor-pointer text-lg font-medium hover:text-blue-500"
                  href={"/tracking"}
                >
                  <TextStyle
                    textContent={"Order Tracking"}
                    textStyle="hover:text-[#4F912F]"
                  />
                </Link>
                <div className="lg:hidden h-0.5 w-0  bg-[#4F912F]  transition-all duration-500 group-hover:w-full group-hover:block ease-in-out "></div>
              </div>
            </div>
            <div className="flex lg:flex-1  justify-center items-center space-x-4">
              <LanguageSelect showFlag={false} />
              <LanguageSelect showFlag={true} />

              <div className="group pt-2 hidden lg:flex flex-col space-y-2 ">
                <Link
                  className="cursor-pointer text-lg font-medium hover:text-blue-500"
                  href={"/tracking"}
                >
                  <TextStyle
                    textContent={"Order Tracking"}
                    textStyle="hover:text-[#4F912F]"
                  />
                </Link>
                <div className="h-0.5 w-0  bg-[#4F912F]  transition-all duration-500 group-hover:w-full group-hover:block ease-in-out "></div>
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

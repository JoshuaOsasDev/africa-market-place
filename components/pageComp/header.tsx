"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SearchFieldComp from "../common/search";
import { countryListAndFlags, navListArray } from "@/lib/data";
import TextStyle from "../common/textStyle";
import LanguageSelect from "../common/selectdropdown";

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

  console.log(countryListData);
  return (
    <div className=" flex flex-row py-2 space-x-4 px-4">
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
          <div className="flex flex-row items-center space-x-2">
            <div className="flex flex-row space-x-2">
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
              <TextStyle textContent="Sign In" textStyle="" />
              <hr className="bg-[#b0adad] w-px h-5" />
              <TextStyle textContent="Register" textStyle="" />
            </div>
          </div>
          <div className="flex flex-row space-x-3 ml-2 items-center ">
            <div className="relative w-6 h-6 ">
              <Image
                src={"/images/iconoir_heart.jpg"}
                alt={"love icon"}
                fill
                className=""
              />
              <div className="flex items-center justify-center rounded-full absolute bottom-3 w-4 h-4 -right-2 bg-[#FF0000] p-1 ">
                <span className="text-[10px] text-white">5</span>
              </div>
            </div>
            <div className="relative w-6 h-6 ">
              <Image
                src={"/images/solar_cart-outline.jpg"}
                alt={"cart icon"}
                fill
                className=""
              />
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
  );
}

export default Header;

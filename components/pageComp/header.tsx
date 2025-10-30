"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SearchFieldComp from "../common/search";
import { countryListAndFlags } from "@/lib/data";

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
    <div className=" flex flex-row py-2 space-x-[94px]">
      {/* logo section starts */}
      <div>
        <div className="relative w-[292px] h-[83px] ">
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              alt="africa market place logo"
              fill
              className="object-contain"
            />
          </Link>
        </div>
      </div>
      {/* logo section ends */}
      {/* other section starts */}
      <div className="flex-1">
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
        </div>
        {/* top left section ends */}
        <div></div>
      </div>
      {/* other section ends */}
    </div>
  );
}

export default Header;

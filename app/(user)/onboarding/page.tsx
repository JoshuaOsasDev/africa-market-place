"use client";
import { useState } from "react";
import { Mail, Store } from "lucide-react";
import Link from "next/link";
import TextStyle from "@/components/common/textStyle";
import AuthProgressbar from "@/components/common/authProgressbar";


function page() {
 
  const [level, setLevel] = useState(1);

  const cardData = [
    {
      heading: "Register as a customer",
      text: "Lorem ipsum felis fermentum rhoncus leo blandit dui egestas aliquet habitan",
      cardId: 1,
    },
    {
      heading: "Register as a vendor",
      text: "Lorem ipsum felis fermentum rhoncus leo blandit dui egestas aliquet habitan",
      cardId: 2,
    },
  ];

  const [selectedCardId, setSelectedCardId] = useState(1);
  const CardComp = ({
    heading,
    text,
    cardId,
  }: {
    heading: string;
    text: string;
    cardId: number;
  }) => {
    return (
      <Link
        href={cardId === 1 ? "/register/customer" : "/register/vendor"}
        key={cardId}
      >
        <div 
          onClick={() => setSelectedCardId(cardId)}
          className={`flex items-center  p-4 space-x-2 cursor-pointer ${
            selectedCardId === cardId
              ? "border-[#C0D8C1] border-2 rounded-lg"
              : "bg-[#FAFAFA] rounded-[12px]"
          }`}
          key={cardId}
        >
          <div
            className={`rounded-full  ${
              cardId === 1 ? "bg-[#EAF2EA]" : "bg-[#FFF9EA]"
            }   w-[60px] h-[60px] flex  justify-center items-center`}
          >
            <div
              className={`rounded-full  ${
                cardId === 1 ? "bg-[#D5E5D6]" : "bg-[#FEF2D5]"
              }  w-[50px] h-[50px] flex justify-center items-center`}
            >
              {cardId === 1 ? <Mail /> : <Store />}
            </div>
          </div>
          <div className="flex-1 flex flex-col space-y-2">
            <TextStyle
              textContent={heading}
              textStyle='text-[#000000] text-[20px]  font-["Nunito Sans"]'
            />
            <TextStyle textContent={text} textStyle="text-[#757575] text-4" />
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center flex-1 w-5/6 md:w-2/3 lg:w-1/3 mx-auto  space-y-2 bg-white my-4 rounded-lg p-8">
      <div className="rounded-md   p-2 lg:p-4 ">
        {/* stages start */}
        <AuthProgressbar 
       level={level}
        />
        {/* stages ends */}
        {/* heading */}
        <div className="flex flex-col justify-center">
          <TextStyle
            textContent="Choose how you want sign up as."
            textStyle='text-[#000000] text-[24px] text-center font-["Nunito Sans"]'
          />
          <TextStyle
            textContent="Lorem ipsum dictum neque consequat sodales orci sagittis ac nunc semper lacus adipiscing duis scelerisque"
            textStyle="text-center text-[#757575]"
          />
        </div>
        {/* heading test */}
      </div>
      <div className="flex flex-col space-y-2">
        {cardData.map((data) => {
          return (
            <CardComp
              key={data.cardId}
              cardId={data.cardId}
              heading={data.heading}
              text={data.text}
            />
          );
        })}
      </div>
    </div>
  );
}

export default page;

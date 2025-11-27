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
        href={
          cardId === 1
            ? "auth-user/register/customer"
            : "auth-vendor/register/vendor"
        }
        key={cardId}
      >
        <div
          onClick={() => setSelectedCardId(cardId)}
          className={`flex cursor-pointer items-center space-x-2 p-4 ${
            selectedCardId === cardId
              ? "rounded-lg border-2 border-[#C0D8C1]"
              : "rounded-[12px] bg-[#FAFAFA]"
          }`}
          key={cardId}
        >
          <div
            className={`rounded-full ${
              cardId === 1 ? "bg-[#EAF2EA]" : "bg-[#FFF9EA]"
            } flex h-[60px] w-[60px] items-center justify-center`}
          >
            <div
              className={`rounded-full ${
                cardId === 1 ? "bg-[#D5E5D6]" : "bg-[#FEF2D5]"
              } flex h-[50px] w-[50px] items-center justify-center`}
            >
              {cardId === 1 ? <Mail /> : <Store />}
            </div>
          </div>
          <div className="flex flex-1 flex-col space-y-2">
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
    <div className="mx-auto my-4 flex w-5/6 flex-1 flex-col items-center justify-center space-y-2 rounded-lg bg-white p-8 md:w-2/3 lg:w-1/3">
      <div className="rounded-md p-2 lg:p-4">
        {/* stages start */}
        <AuthProgressbar level={level} />
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

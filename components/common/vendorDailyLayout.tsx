import Image from "next/image";
import AuthProgressbar from "./authProgressbar";

export default function DailyLayout(props: { textStyle?: string }) {
  return (
    <div
      className={`hidden h-fit w-[635px] rounded-[25px] bg-linear-to-b from-[#113D13] to-[#042106] lg:block ${props.textStyle}`}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="mt-15">
          <div className="px-20">
            <AuthProgressbar level={3} />
            <div className="mt-8 px-15 text-white">
              <h2 className="text-center align-middle text-4xl leading-[40px] font-extrabold tracking-[0.3px]">
                Get Daily Order and Make Profits
              </h2>
              <p className="text-center align-middle text-[20px] leading-[24px] tracking-[0.3px] text-[#BABABA]">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit,
                ratione.
              </p>
            </div>
            <div className="relative mt-10 h-100 w-140">
              <Image
                src="/images/image1.png"
                alt="profits illustration"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

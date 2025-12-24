import Image from "next/image";
import AuthProgressbar from "./authProgressbar";

export default function DailyLayout(props: { textStyle?: string }) {
  return (
    <div
      className={`
      hidden lg:block 
      w-[635px] 
      h-fit
      rounded-[25px] 
      bg-linear-to-b 
      from-[#113D13]
      to-[#042106]
      ${props.textStyle}`}
    >
      <div className="flex flex-col justify-center items-center">
        <div className="mt-15">
          <div className="px-20">
            <AuthProgressbar level={3} />
            <div className="text-white mt-8 px-15">
              <h2 className="font-extrabold text-4xl leading-[40px] tracking-[0.3px] text-center align-middle">
                Get Daily Order and Make Profits
              </h2>
              <p className="text-[20px] leading-[24px] text-[#BABABA]  tracking-[0.3px] text-center align-middle">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit,
                ratione.
              </p>
            </div>
            <div className="relative h-100 w-140 mt-10">
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

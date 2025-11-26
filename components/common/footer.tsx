import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

import TextStyle from "./textStyle";
import { socialData, socialData2, socialData3, socialData4 } from "@/lib/data";

function Footer() {
  return (
    <div className="grid mx-2 grid-cols-1 md:grid-cols-5 gap-6 mb-4 bg-[#1A1A1A] rounded-[20px] p-4">
      <div className="col-span-2 flex flex-col space-y-4 ">
        {/* logo */}
        <div className="relative  w-[100px] h-[50px] sm:w-[182px] sm:h-[60px]  lg:w-[292px] lg:h-[83px] ">
          <Link href={"/"}>
            <Image
              src={"/images/logo.png"}
              alt="africa market place logo"
              fill
              className="object-contain"
            />
          </Link>
        </div>
        {/*  logo ends */}
        <TextStyle
          textContent="Lorem ipsum consequat neque sed erat id mauris non eu ac nunc sed enim "
          textStyle="text-white"
        />
        {/* social icons start */}
        <div className="flex flex-row items-center space-x-4">
          {socialData.map((icon) => (
            <Link href={icon.url} key={icon.id}>
              <div className="rounded-full flex items-center justify-center w-9 h-9 transition-all hover:bg-[#a0b7a1] bg-[#636363] duration-500 ease-in-out ">
                {icon.id === 1 ? (
                  <Facebook className="w-5 h-5 text-white" />
                ) : icon.id === 2 ? (
                  <Instagram className="w-5 h-5 text-white" />
                ) : icon.id === 3 ? (
                  <Twitter className="w-5 h-5 text-white" />
                ) : (
                  <Mail className="w-5 h-5 text-white" />
                )}
              </div>
            </Link>
          ))}
        </div>
        {/* social icon start */}
      </div>
      <div className="col-span-3 grid  grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
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
        <div className="flex flex-col space-y-2">
          {socialData3.map((data) => (
            <Link href={data.url} key={data.id}>
              <TextStyle
                textContent={data.name}
                textStyle="text-white text-[16px] hover:text-[#a0b7a1] duration-500 transtion-all ease-in-out"
              />
            </Link>
          ))}
        </div>
        <div className="flex flex-col space-y-2 ">
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
  );
}

export default Footer;

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

import TextStyle from "./textStyle";
import { socialData, socialData2, socialData3, socialData4 } from "@/lib/data";

function Footer() {
  return (
    <div className="mx-2 mb-4 grid grid-cols-1 gap-6 rounded-[20px] bg-[#1A1A1A] p-4 md:grid-cols-5">
      <div className="col-span-2 flex flex-col space-y-4">
        {/* logo */}
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
        {/*  logo ends */}
        <TextStyle
          textContent="Lorem ipsum consequat neque sed erat id mauris non eu ac nunc sed enim "
          textStyle="text-white"
        />
        {/* social icons start */}
        <div className="flex flex-row items-center space-x-4">
          {socialData.map((icon) => (
            <Link href={icon.url} key={icon.id}>
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
      <div className="col-span-3 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
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
  );
}

export default Footer;

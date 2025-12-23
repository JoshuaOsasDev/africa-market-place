import { sliderCardPropType } from "@/types/appTypes";
import Image from "next/image";
import Link from "next/link";

function SlideCard({ id, imgUrl, link, alt }: sliderCardPropType) {
  return (
    <Link href={link} key={id} className="w-full ">
      <div className="relative w-full h-[250px] md:h-[320px] lg:h-[443px] rounded-[30px] overflow-hidden">
        <Image alt={alt} src={imgUrl} fill  />
      </div>
    </Link>
  );
}

export default SlideCard;

import { sliderCardPropType } from "@/types/appTypes";
import Image from "next/image";
import Link from "next/link";

function SlideCard({ id, imgUrl, link, alt }: sliderCardPropType) {
  return (
    <Link href={link} key={id} className="w-full">
      <div className="relative h-[503px] w-full overflow-hidden rounded-[30px] md:h-[320px] lg:h-[400px]">
        <Image alt={alt} src={imgUrl} fill />
      </div>
    </Link>
  );
}

export default SlideCard;

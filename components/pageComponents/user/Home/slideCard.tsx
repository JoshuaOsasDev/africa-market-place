import { sliderCardPropType } from "@/types/appTypes";
import Image from "next/image";
import Link from "next/link";

function SlideCard({
  mobileImageUrl,
  webImageUrl,
  productId,
  productName,
}: sliderCardPropType) {
  return (
    <Link
      href={`/user/products/${productName}`}
      key={productId}
      className="w-full"
    >
      <div className="relative hidden h-125.75 w-full overflow-hidden rounded-[30px] md:block md:h-[320px] lg:h-[400px]">
        <Image alt={productName} src={webImageUrl} fill />
      </div>

      <div className="relative h-87.5 w-full overflow-hidden rounded-[30px] md:hidden">
        <Image alt={productName} src={mobileImageUrl} fill />
      </div>
    </Link>
  );
}

export default SlideCard;

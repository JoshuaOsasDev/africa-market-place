import Image from "next/image";
import {
  ShoppingCart,
  MessageSquare,
  RotateCcw,
  ShieldCheck,
  Headphones,
} from "lucide-react";

import yamImage from "../../lib/public/images/yam_image_1.png";
import tomatoesImage from "../../lib/public/images/tomatoes_image.png";
const PromoSection = () => {
  const features = [
    {
      icon: <ShoppingCart size={20} />,
      title: "Free Delivery",
      desc: "When you spend £30+",
    },
    {
      icon: <MessageSquare size={20} />,
      title: "Feedbacks",
      desc: "100% Customer",
    },
    {
      icon: <RotateCcw size={20} />,
      title: "Free Return",
      desc: "7 Day Returns Policy",
    },
    {
      icon: <ShieldCheck size={20} />,
      title: "Secure System",
      desc: "100% Secure Guarantee",
    },
    {
      icon: <Headphones size={20} />,
      title: "Online Supports",
      desc: "24/7 Dedicated Support",
    },
  ];

  return (
    <div className="hidden w-full space-y-6 bg-white p-4 md:block md:py-8">
      {/* Upper Banners */}
      <div className="grid cursor-pointer grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Banner: Shoes */}

        <div className="relative h-[260px] w-full overflow-hidden rounded-3xl bg-[#F0F7F0] sm:h-[320px] lg:h-[260px]">
          <Image
            src={yamImage}
            alt="Consumable"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Right Banner: Watch */}

        <div className="relative h-[160px] w-full overflow-hidden rounded-3xl bg-[#F0F7F0] sm:h-[320px] lg:h-[260px]">
          <Image
            src={tomatoesImage}
            alt="Consumable Ag Products"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Features Bar */}
      <div className="rounded-2xl border-1 border-gray-300 bg-white py-6">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-gray-300">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-4 lg:justify-center lg:px-4"
            >
              <div className="hover:bg-accent flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F0F4F8] text-[#2E7D32]">
                {feature.icon}
              </div>
              <div className="min-w-0">
                <h4 className="truncate text-xl font-bold text-gray-900">
                  {feature.title}
                </h4>
                <p className="text-xs text-gray-500">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoSection;

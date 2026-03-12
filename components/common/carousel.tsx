"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { sliderCardData } from "@/lib/data";
import SlideCard from "../pageComponents/user/Home/slideCard";
import { sliderCardPropType } from "@/types/appTypes";
import { useSlider } from "@/lib/hooks/userDashboard/useUser";
import SliderSkeleton from "./sliderSkeleton";

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<Slider>(null);
  const { isLoading, sliderImage } = useSlider();
  const settings = {
    fade: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    pauseOnHover: true,
    cssEase: "linear",
    arrows: false,
    dots: false,
    beforeChange: (_: number, next: number) => setCurrentIndex(next),
  };

  const goToSlide = (index: number) => {
    sliderRef.current?.slickGoTo(index);
    setCurrentIndex(index);
  };

  // console.log(sliderImage, "image slider");
  const slider = sliderImage?.data;

  if (isLoading) {
    return <SliderSkeleton />;
  }
  return (
    <div className="relative">
      <Slider ref={sliderRef} {...settings}>
        {slider?.map((data: sliderCardPropType) => (
          <SlideCard key={data._id} {...data} />
        ))}
      </Slider>

      {/* Clickable dot indicators */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {slider?.map((_id: sliderCardPropType, index: number) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`block cursor-pointer rounded-full transition-all duration-500 ease-in-out ${
              index === currentIndex
                ? "h-2 w-5 bg-[#2d6a2d]"
                : "h-2 w-2 rounded-full bg-[#a8d5a8] hover:bg-[#4a8f4a]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;

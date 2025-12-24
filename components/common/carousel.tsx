"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import { sliderCardData } from "@/lib/data";
import SlideCard from "../pageComponents/user/Home/slideCard";
import { sliderCardPropType } from "@/types/appTypes";

function Carousel() {
  const [curentIndex, setCurentIndex] = useState(0);

  const settings = {
    fade: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    pauseOnHover: false,
    cssEase: "linear",
    dots: true,
    arrows: false,
  };
  return (
    <div className="">
      <Slider {...settings}>
        {sliderCardData.map((data: sliderCardPropType) => {
          return <SlideCard {...data} />;
        })}
      </Slider>
    </div>
  );
}

export default Carousel;

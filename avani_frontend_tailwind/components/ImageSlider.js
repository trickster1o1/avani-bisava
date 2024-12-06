import { Carousel } from "flowbite-react";
import Image from "next/image";
import React, { useState } from "react";
import product1 from "../public/product1.jpg";
import show1 from "../public/show1.jpg";
import show3 from "../public/show3.webp";
import Slider from "react-slick";
import axios from "axios";
import Link from "next/link";
import { baseUrl } from "../config";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        right: "23px",
        fontSize: "40px !important",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, left: "10px !important", zIndex: "100" }}
      onClick={onClick}
    />
  );
}

const ImageSlider = ({ banners }) => {
  const [isLoading, setLoading] = useState(true);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
  };

  console.log(banners.filter((value) => value.type === 0));
  function cn(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div>
      <Slider {...settings}>
        {banners
          .filter((value) => value.type === 0)
          .map((banner) => (
            <div className=" w-full h-48 md:h-96 overflow-hidden bg-gray-200 relative">
              <Link
                href={`/product/${banner.product.slug}?main_category=${banner.product.main_category}`}
                // href="/"
              >
                <a>
                  <Image
                    alt="Mountains"
                    src={`${baseUrl}/${banner.image}`}
                    priority
                    objectFit="cover"
                    layout="fill"
                  />
                </a>
              </Link>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;

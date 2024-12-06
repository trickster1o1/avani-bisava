import Link from "next/link";
import React from "react";
import Container from "./Container";
import { categoryData } from "../data/categoryData";
import logo from "../public/avani_logo.jpg";

const Footer = () => {
  console.log("categoryData", categoryData);
  return (
    <div className="bg-primary mt-5">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-10 text-white py-8">
          <div className="md:col-span-5">
            <div className="log">
              <Link href="/">
                <a className="flex justify-center items-center">
                  <Image
                    src={logo}
                    alt="Picture of the author"
                    width={50}
                    height={50}
                  />
                  <h1 className="text-lg md:text-2xl font-semibold ml-2">
                    {APP_NAME}
                  </h1>
                </a>
              </Link>
            </div>
            <h1 className="text-xl uppercase font-bold mb-5">Avani Nepal</h1>
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga
                velit totam unde molestias officiis repellat{" "}
                <Link href="/">
                  <a className="text-white underline">Read More ...</a>
                </Link>
              </p>
            </div>
          </div>
          <div className="md:col-span-2">
            <h1 className="text-xl uppercase font-bold mb-5">Shop</h1>
            <ul>
              {categoryData.map((value) => (
                <li className="pb-3">
                  <Link href="/">
                    <a className="text-white capitalize">
                      {value.categoryName}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* <div className="md:col-span-2">
            <h1 className="text-xl uppercase font-bold mb-5">About</h1>
            <ul>
              <li className="pb-3">
                <Link href="/">
                  <a className="text-white">Our Story</a>
                </Link>
              </li>
            </ul>
          </div> */}
          <div className="md:col-span-2">
            <h1 className="text-xl uppercase font-bold mb-5">Help</h1>
            <ul>
              <li className="pb-3">
                <Link href="/about-us">
                  <a className="text-white">About Us</a>
                </Link>
              </li>
              <li className="pb-3">
                <Link href="/contact-us">
                  <a className="text-white">Contact Us</a>
                </Link>
              </li>
              <li className="pb-3">
                <Link href="/privacy-policy">
                  <a className="text-white">Privacy Policy</a>
                </Link>
              </li>
              <li className="pb-3">
                <Link href="/refund-policy">
                  <a className="text-white">Refund Policy</a>
                </Link>
              </li>
              <li className="pb-3">
                <Link href="/shipping-policy">
                  <a className="text-white">Shipping Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service">
                  <a className="text-white">Terms Of Service</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <h1 className="text-xl uppercase font-bold mb-5">Stay Updated</h1>
            <div className="flex">
              <Link href="/">
                <a className="text-3xl text-white">
                  <i class="fa-brands fa-facebook "></i>
                </a>
              </Link>
              <Link href="/">
                <a className="text-3xl text-white ml-5">
                  <i class="fa-brands fa-instagram"></i>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;

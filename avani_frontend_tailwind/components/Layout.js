import React from "react";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";
import TopHeader from "./TopHeader";
import { categoryData } from "../data/categoryData";
import Link from "next/link";
import { APP_NAME } from "../config";
import Image from "next/image";

const Layout = ({ children, header = true, footer = true, aboutUsData }) => {
  console.log("object", categoryData);
  let categoryDataValue = [];

  // footer text color===============

  const customColor = '[#6b8874]';
  // const customColor = 'white';
  
  // footer background===============

  // const bgTheme = '[#edfae9]';
  // const bgTheme = 'primary';
  const bgTheme = '[white]';
  
  // ================================

  for (let i = 0; i < categoryData.length; i++) {
    // categoryDataValue.push(categoryData[i].categoryName);
    for (let j = 0; j < categoryData[i].subCategory.length; j++) {
      // categoryDataValue.push(categoryData[i].subCategory[j].subCategoryName);
      for (
        let k = 0;
        k < categoryData[i].subCategory[j].childCategory.length;
        k++
      ) {
        let categoryObject = {};
        categoryObject.title =
          categoryData[i].subCategory[j].childCategory[k].childCategoryName;
        categoryObject.value =
          categoryData[i].subCategory[j].childCategory[k].value;
        categoryDataValue.push(categoryObject);
        // categoryDataValue.push(
        //   categoryData[i].subCategory[j].childCategory[k].childCategoryName,
        //   categoryData[i].subCategory[j].childCategory[k].value
        // );
      }
    }
  }
  console.log("categoryDataValue", categoryDataValue);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const random = Math.floor(Math.random() * categoryDataValue.length);
  console.log(
    Math.floor(Math.random() * categoryDataValue.length),
    categoryDataValue[Math.floor(Math.random() * categoryDataValue.length)]
  );
  console.log(
    Math.floor(Math.random() * categoryDataValue.length),
    categoryDataValue[Math.floor(Math.random() * categoryDataValue.length)]
  );
  console.log(
    Math.floor(Math.random() * categoryDataValue.length),
    categoryDataValue[Math.floor(Math.random() * categoryDataValue.length)]
  );
  const cat1 =
    categoryDataValue[Math.floor(Math.random() * categoryDataValue.length)];
  const cat2 =
    categoryDataValue[Math.floor(Math.random() * categoryDataValue.length)];
  const cat3 =
    categoryDataValue[Math.floor(Math.random() * categoryDataValue.length)];
  const cat4 =
    categoryDataValue[Math.floor(Math.random() * categoryDataValue.length)];
  const cat5 =
    categoryDataValue[Math.floor(Math.random() * categoryDataValue.length)];
  const cat6 =
    categoryDataValue[Math.floor(Math.random() * categoryDataValue.length)];
  const cat7 =
    categoryDataValue[Math.floor(Math.random() * categoryDataValue.length)];
  return (
    <>
      <div>
        <TopHeader />
        {!header && <div className="border-primary border-b"></div>}
      </div>
      {header && <Header />}
      {children}
      {footer && (
        <div className={"bg-"+bgTheme+" border border-t-primary"}>
        {/* <div className="bg-[#edfae9]"> */}
          <Container>
            <div className={"grid grid-cols-2 lg:grid-cols-12 gap-10 py-8 text-"+customColor}>
              <div className="md:col-span-5">
                <div className="log mb-3">
                  <Link href="/">
                    <a className="flex items-center">
                      <Image
                        src="/avani_logo.jpg"
                        alt="Picture of the author"
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <h1 className={"text-xl uppercase font-bold  ml-2 text-"+customColor}>
                        {APP_NAME}
                      </h1>
                    </a>
                  </Link>
                </div>
                <div>
                  {aboutUsData.description.length > 250 ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          aboutUsData.description
                            .split(" ")
                            .slice(0, 20)
                            .join(" ") + "...",
                      }}
                    />
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: aboutUsData.description,
                      }}
                    />
                  )}
                  <Link href="/about-us">
                    <a className={"underline text-"+customColor}>Read More ...</a>
                  </Link>
                  {/* <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Fuga velit totam unde molestias officiis repellat{" "}
                    <Link href="/">
                      <a className="text-white underline">Read More ...</a>
                    </Link>
                  </p> */}
                </div>
              </div>
              <div className="md:col-span-2">
                <h1 className="text-xl uppercase font-bold mb-5">Shop</h1>
                <ul>
                  {/* {categoryData.map((value) => (
                    <li className="pb-3">
                      <Link href="/">
                        <a className="text-customColor capitalize">
                          {value.categoryName}
                        </a>
                      </Link>
                    </li>
                  ))} */}
                  <li className="pb-3">
                    <Link
                      href={`/products?search=&sort=&category=${cat1.value}`}
                    >
                      <a className={"capitalize text-"+customColor}>{cat1.title}</a>
                    </Link>
                  </li>
                  <li className="pb-3">
                    <Link
                      href={`/products?search=&sort=&category=${cat2.value}`}
                    >
                      <a className={"capitalize text-"+customColor}>{cat2.title}</a>
                    </Link>
                  </li>
                  <li className="pb-3">
                    <Link
                      href={`/products?search=&sort=&category=${cat3.value}`}
                    >
                      <a className={"capitalize text-"+customColor}>{cat3.title}</a>
                    </Link>
                  </li>
                  <li className="pb-3">
                    <Link
                      href={`/products?search=&sort=&category=${cat4.value}`}
                    >
                      <a className={"capitalize text-"+customColor}>{cat4.title}</a>
                    </Link>
                  </li>
                  <li className="pb-3">
                    <Link
                      href={`/products?search=&sort=&category=${cat5.value}`}
                    >
                      <a className={"capitalize text-"+customColor}>{cat5.title}</a>
                    </Link>
                  </li>
                  <li className="pb-3">
                    <Link
                      href={`/products?search=&sort=&category=${cat6.value}`}
                    >
                      <a className={"capitalize text-"+customColor}>{cat6.title}</a>
                    </Link>
                  </li>
                  {/* <li className="pb-3">
                    <Link
                      href={`/products?search=&sort=&category=${cat7.value}`}
                    >
                      <a className="text-customColor capitalize">{cat7.title}</a>
                    </Link>
                  </li> */}
                </ul>
              </div>
              <div className="md:col-span-2">
                <h1 className="text-xl uppercase font-bold mb-5">Help</h1>
                <ul>
                  <li className="pb-3">
                    <Link href="/about-us">
                      <a className={"text-"+customColor}>About Us</a>
                    </Link>
                  </li>
                  <li className="pb-3">
                    <Link href="/contact-us">
                      <a className={"text-"+customColor}>Contact Us</a>
                    </Link>
                  </li>
                  <li className="pb-3">
                    <Link href="/privacy-policy">
                      <a className={"text-"+customColor}>Privacy Policy</a>
                    </Link>
                  </li>
                  <li className="pb-3">
                    <Link href="/refund-policy">
                      <a className={"text-"+customColor}>Refund Policy</a>
                    </Link>
                  </li>
                  <li className="pb-3">
                    <Link href="/shipping-policy">
                      <a className={"text-"+customColor}>Shipping Policy</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms-of-service">
                      <a className={"text-"+customColor}>Terms Of Service</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="md:col-span-3">
                <h1 className="text-xl uppercase font-bold mb-5">
                  Stay Updated
                </h1>
                <div className="flex">
                  <Link href="/">
                    <a className={"text-3xl text-"+customColor}>
                      <i className="fa-brands fa-facebook "></i>
                    </a>
                  </Link>
                  <Link href="/">
                    <a className={"text-3xl ml-5 text-"+customColor}>
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default Layout;

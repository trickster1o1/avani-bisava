import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React from "react";
import Container from "./Container";
import { categoryData, singleCategoryData } from "../data/categoryData";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  return (
    <>
      {/* drawer end */}
      <nav className="hidden md:block m-auto border-t border-primary border-b">
        <ul className="flex flex-col mt-4 md:flex-row md:mt-0 md:text-sm md:font-medium justify-center relative ">
          {categoryData.map((value, index) => (
            <li className="hover:bg-gray-100 mega_menu_link" key={'m'+index}>
              <a
                href="#"
                className="block text-white py-3 px-4 bg-primary rounded md:bg-transparent md:text-primaryDark  dark:text-white uppercase"
                aria-current="page"
              >
                {value.categoryName}
              </a>
              {value.subCategory.length > 0 && (
                <div className="mega_menu border-t border-primary">
                  <ul className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-14 bg-white flex space-x-16">
                    {value.subCategory.map((value, index) => (
                      <div key={'sb'+index}>
                        <p className="mb-2 text-lg uppercase font-[400]">
                          {value.subCategoryName}
                        </p>
                        {value.childCategory.map((value, index) => (
                          <li className="my-2 text-base font-[100]" key={'l'+index}>
                            <Link
                              href={`/products?search=&sort=&category=${value.value}`}
                            >
                              <a className="uppercase">
                                {value.childCategoryName}
                              </a>
                            </Link>
                          </li>
                        ))}
                      </div>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
          {singleCategoryData.map((value, index) => (
            <li className="hover:bg-gray-100 single_mega_menu_link" key={'s'+index}>
              <a
                href="#"
                className="block text-white py-3 px-4 bg-primary rounded md:bg-transparent md:text-primaryDark  dark:text-white uppercase"
                aria-current="page"
              >
                {value.categoryName}
              </a>
              {value.subCategory.length > 0 && (
                <div className="single_mega_menu border-t border-primary">
                  <ul className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-7 bg-white flex space-x-16">
                    {value.subCategory.map((value, index) => (
                      <div key={'s'+index}>
                        <p className="mb-2 text-lg uppercase">
                          {value.subCategoryName}
                        </p>
                        {value.childCategory.map((value, index) => (
                          <li className="my-2 text-base" key={'c'+index}>
                            <Link
                              href={`/products?search=&sort=&category=${value.value}`}
                            >
                              <a className="uppercase font-[100]">
                                {value.childCategoryName}
                              </a>
                            </Link>
                          </li>
                        ))}
                      </div>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
          <li>
            <Link href="/products?search=&sort=&category=">
              <a
                className="block text-white py-3 px-4 bg-primary rounded md:bg-transparent md:text-primaryDark  dark:text-white uppercase"
                aria-current="page"
              >
                All Products
              </a>
            </Link>
          </li>
          {/* <li className="hover:bg-gray-100 mega_menu_link">
          <a
            href="#"
            className="block text-white py-3 px-4 bg-blue-700 rounded md:bg-transparent md:text-blue-700  dark:text-white"
            aria-current="page"
          >
            Home
          </a>
          <div className="mega_menu border-t border-primary">
            <ul className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-14 bg-white flex space-x-16">
              <div>
                <p className="mb-2 text-lg">shop by concern</p>
                <li className="my-2 text-base">
                  <a href="/">kldjfalskfd</a>
                </li>
                <li className="my-2 text-base">
                  <a href="/">kldjfalskfd</a>
                </li>
                <li className="my-2 text-base">
                  <a href="/">kldjfalskfd</a>
                </li>
                <li className="my-2 text-base">
                  <a href="/">kldjfalskfd</a>
                </li>
              </div>
              <div>
                <p className="mb-2 text-lg">shop by concern</p>
                <li className="my-2 text-base">
                  <a href="/">kldjfalskfd</a>
                </li>
                <li className="my-2 text-base">
                  <a href="/">kldjfalskfd</a>
                </li>
                <li className="my-2 text-base">
                  <a href="/">kldjfalskfd</a>
                </li>
                <li className="my-2 text-base">
                  <a href="/">kldjfalskfd</a>
                </li>
              </div>
              <div>
                <p className="mb-2 text-lg">shop by concern</p>
                <li className="my-2 text-base">
                  <a href="/">kldjfalskfd</a>
                </li>
                <li className="my-2 text-base">
                  <a href="/">kldjfalskfd</a>
                </li>
                <li className="my-2 text-base">
                  <a href="/">kldjfalskfd</a>
                </li>
                <li className="my-2 text-base">
                  <a href="/">kldjfalskfd</a>
                </li>
              </div>
              <div>
                <p className="mb-2 text-lg">shop by concern</p>
                <li className="my-2 text-base">
                  <a href="/">kldjfalskfd</a>
                </li>
                <li className="my-2 text-base">
                  <a href="/">kldjfalskfd</a>
                </li>
                <li className="my-2 text-base">
                  <a href="/">kldjfalskfd</a>
                </li>
                <li className="my-2 text-base">
                  <a href="/">kldjfalskfd</a>
                </li>
              </div>
              <div>
                <p className="mb-2 text-lg">shop by concern</p>
                <li className="my-2 text-base">
                  <a href="/">kldjfalskfd</a>
                </li>
                <li className="my-2 text-base">
                  <a href="/">kldjfalskfd</a>
                </li>
                <li className="my-2 text-base">
                  <a href="/">kldjfalskfd</a>
                </li>
                <li className="my-2 text-base">
                  <a href="/">kldjfalskfd</a>
                </li>
              </div>
            </ul>
          </div>
        </li> */}
          {/* <li>
          <a
            href="#"
            className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            Contact
          </a>
        </li> */}
        </ul>
      </nav>
    </>
  );
};

export default Header;

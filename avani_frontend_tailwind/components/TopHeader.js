import React, { useEffect, useState, Fragment } from "react";
import Container from "./Container";
import logo from "../public/avani_logo.jpg";
import Link from "next/link";
import Image from "next/image";
import { TextInput } from "flowbite-react";
import { APP_NAME } from "../config";
import { getCartItemsFromLocalStorage } from "../actions/cart";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userAction";
import { isAuth } from "../redux/utils";
import { useRouter } from "next/router";
import { Menu, Transition } from "@headlessui/react";
import { categoryData, singleCategoryData } from "../data/categoryData";

const TopHeader = () => {
  const Router = useRouter();
  console.log("isAtuh", isAuth());
  const [toggleMenu, setToggleMenu] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openSubCategory, setOpenSubCategory] = useState();
  const [openChildCategory, setOpenChildCategory] = useState();
  const [openSingleChildCategory, setOpenSingleChildCategory] = useState();
  const [searchTag, setSearchTag] = useState("");
  const dispatch = useDispatch();
  const productAddToCart = useSelector((state) => state.productAddToCart);
  const { cartItems } = productAddToCart;

  console.log("categoryData", categoryData);
  console.log("singleCategoryData", singleCategoryData);

  const handleSearchBtn = (e) => {
    e.preventDefault();
    console.log("object", searchTag);
    Router.push(`/products?search=${searchTag}&sort=&category=`);
    setSearchTag("");
  };
  return (
    <div>
      <Container>
        <div className="md:flex md:justify-between items-center">
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
          {/* search and cart */}
          <div className="flex items-center justify-between">
            <div
              className="block md:hidden"
              onClick={() => setOpenDrawer(!openDrawer)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>
            {/* <form
              className="hidden md:flex items-center mr-5"
              onSubmit={handleSearchBtn}
            >
              <div className="mr-3">
                <input
                  id="base"
                  type="text"
                  sizing="sm"
                  placeholder="Search..."
                  className="mr-3 placeholder-gray-600 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  onChange={(e) => setSearchTag(e.target.value)}
                  defaultValue={searchTag}
                />
              </div>
              <input
                type="submit"
                value="Search"
                className="text-white bg-primary hover:bg-primaryDark focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center cursor-pointer"
              />
            </form> */}
            <div className="flex items-center">
              <div className="border-r">
                <a
                  href="https://m.facebook.com/profile.php?id=100064108204945&eav=Afbwf2xBx_S1s72sRgG_ODvDXolufNgdrZ8oRodsswDi1XL0jTAovGMACrcgeHq02hM&paipv=0&_rdr"
                  className=""
                  target="_blank"
                >
                  <i className="fa-brands fa-facebook text-2xl"></i>
                </a>
                <a
                  href="https://www.instagram.com/avaninepal/?hl=en"
                  className="mx-4"
                  target="_blank"
                >
                  {/* <i className="fa-brands fa-facebook"></i> */}
                  <i className="fa-brands fa-instagram text-2xl"></i>
                  {/* <i className="fa-brands fa-square-instagram"></i> */}
                </a>
              </div>
              {!isAuth() && (
                <>
                  {/* <div className="mr-2 flex flex-col sm:flex-row">
                <Link href="/signin">
                  <a className="-m-2 mr-0 p-2 block  text-gray-900">SignIn</a>
                </Link>{" "}
                <div className="sm:border sm:border-gray-400"></div>
                <Link href="/register">
                  <a className="-m-2 sm:p-2 ml-0 block  text-gray-900">
                    Register{" "}
                  </a>
                </Link>
              </div> */}
                  {/* <i className="fa-solid fa-user"></i> */}
                  <Link href="/signin">
                    <a className="mx-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </a>
                  </Link>
                </>
              )}
              <Link href="/cart">
                <a>
                  <div className=" flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    <span className="ml-1 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {cartItems && cartItems.length}
                    </span>
                  </div>
                </a>
              </Link>
              <div>
                {isAuth() && (
                  <>
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex w-full justify-center rounded-md text-black bg-opacity-20 px-4 py-2 text-sm font-medium  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                          {isAuth().name}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-2 -mr-1 h-5 w-5 text-gray-400 hover:text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                          <ul className="px-1 py-1">
                            <li>
                              <Link href="/profile">
                                <a
                                  onClick={() => setToggleMenu(false)}
                                  className="cursor-pointer block py-2 px-4 hover:bg-gray-100 rounded-md"
                                >
                                  Profile
                                </a>
                              </Link>
                            </li>
                            <li>
                              <a
                                onClick={() =>
                                  dispatch(logout(), setToggleMenu(false))
                                }
                                className="block py-2 px-4 text-gray-700 hover:bg-gray-100 cursor-pointer rounded-md"
                              >
                                Sign out
                              </a>
                            </li>
                          </ul>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                    {/* <button
                    id="dropdownNavbarLink"
                    onClick={() => setToggleMenu(!toggleMenu)}
                    data-dropdown-toggle="dropdownNavbar"
                    className="ml-3 flex justify-between items-center py-2 pr-4 pl-3 w-full font-medium text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto "
                  >
                    {isAuth().name}{" "}
                    <svg
                      className="ml-1 w-4 h-4"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>

                  <div
                    id="dropdownNavbar"
                    className={
                      toggleMenu
                        ? "z-10 w-44 font-normal bg-white rounded divide-y divide-gray-100 shadow block"
                        : "z-10 w-44 font-normal bg-white rounded divide-y divide-gray-100 shadow hidden"
                    }
                    style={{
                      position: "absolute",
                      margin: "0px",
                      right: "40px",
                      top: "57px",
                    }}
                  >
                    <ul
                      className="py-1 text-sm text-gray-700 dark:text-gray-400"
                      aria-labelledby="dropdownLargeButton"
                    >
                      <li>
                        <Link href="/profile">
                          <a
                            onClick={() => setToggleMenu(false)}
                            className="cursor-pointer block py-2 px-4 hover:bg-gray-100 "
                          >
                            Profile
                          </a>
                        </Link>
                      </li>
                    </ul>
                    <div className="py-1">
                      <a
                        onClick={() => dispatch(logout(), setToggleMenu(false))}
                        className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white cursor-pointer"
                      >
                        Sign out
                      </a>
                    </div>
                  </div> */}
                  </>
                )}
              </div>
            </div>
          </div>
          {/* search and cart end */}
        </div>
      </Container>
      {/* drawer */}
      {openDrawer && (
        <div className="block md:hidden absolute z-[1000] h-[90vh] p-4 overflow-scroll bg-white w-80">
          <h5 className="inline-flex items-center mb-2 text-lg font-semibold">
            Category
          </h5>
          <button
            type="button"
            data-drawer-dismiss="drawer-example"
            aria-controls="drawer-example"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center"
            onClick={() => setOpenDrawer(false)}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
          {/* content */}
          <div>
            <ul>
              {categoryData.map((value, i) => (
                <li className="my-1">
                  <div className="flex justify-between">
                    <h1 className="text-xl">{value.categoryName}</h1>
                    <div>
                      {openSubCategory === i ? (
                        <div onClick={() => setOpenSubCategory(false)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M18 12H6"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div onClick={() => setOpenSubCategory(i)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6v12m6-6H6"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                  {openSubCategory === i && (
                    <ul className="ml-5 my-3">
                      {value.subCategory.map((value1, j) => (
                        <li>
                          <div className="flex justify-between">
                            <h1 className="text-lg">
                              {value1.subCategoryName}
                            </h1>
                            <div>
                              {openChildCategory === j ? (
                                <div
                                  onClick={() => setOpenChildCategory(false)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M18 12H6"
                                    />
                                  </svg>
                                </div>
                              ) : (
                                <div onClick={() => setOpenChildCategory(j)}>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 6v12m6-6H6"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </div>
                          {openChildCategory === j && (
                            <ul className="ml-5 my-3">
                              {value1.childCategory.map((value2) => (
                                <li>
                                  <Link
                                    href={`/products?search=&sort=&category=${value2.value}`}
                                  >
                                    <a className="text-lg">
                                      {value2.childCategoryName}
                                    </a>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              {singleCategoryData.map((value, i) => (
                <li className="my-1">
                  <div className="flex justify-between">
                    <h1 className="text-xl">{value.categoryName}</h1>
                    <div>
                      {openSingleChildCategory === i ? (
                        <div onClick={() => setOpenSingleChildCategory(false)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M18 12H6"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div onClick={() => setOpenSingleChildCategory(i)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6v12m6-6H6"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                  {openSingleChildCategory === i && (
                    <ul className="ml-5 my-3">
                      {value.subCategory[0].childCategory.map((value1, j) => (
                        <li>
                          <Link
                            href={`/products?search=&sort=&category=${value1.value}`}
                          >
                            <a className="text-lg">
                              {value1.childCategoryName}
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
          {/* content end */}
        </div>
      )}
      {/* drawer end */}
    </div>
  );
};

export default TopHeader;

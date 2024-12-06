import { Card } from "flowbite-react";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../public/avani_logo.jpg";
import product1 from "../public/product1.jpg";
import Link from "next/link";
// import { addToCart } from "../actions/cart";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cartAction";
import {
  createLovedProduct,
  updateProductToTrending,
} from "../redux/actions/productAction";
import { baseUrl } from "../config";

const ProductCard = ({ value }) => {
  const dispatch = useDispatch();
  const userLoginState = useSelector((state) => state.userLogin);
  const { userInfo } = userLoginState;
  const [isLoading, setLoading] = useState(true);
  function cn(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div className="md:h-[400px] m-2 bg-white product__item">
      {/* <div className="md:h-[400px] m-2 bg-white rounded-sm border border-gray-200 shadow-md product__item"> */}
      <div className="product__item__pic">
        <Link
          href={`/product/${value.slug}?main_category=${value.main_category}`}
        >
          <a onClick={() => dispatch(updateProductToTrending(value.uuid))}>
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 xl:aspect-w-3 xl:aspect-h-3">
              <Image
                src={`${baseUrl}/${value.image}`}
                layout="fill"
                objectFit="cover"
                className={cn(
                  "duration-700 ease-in-out group-hover:opacity-75 rounded-t-sm",
                  isLoading
                    ? "scale-110 blur-2xl grayscale rounded-t-sm"
                    : "scale-100 blur-0 grayscale-0 rounded-t-sm"
                )}
                onLoadingComplete={() => setLoading(false)}
              />
            </div>
            {value.price_discount > 0 && (
              <div className="absolute top-[1px] right-[1px] bg-white px-3">
                <span>{value.price_discount}% OFF</span>
              </div>
            )}
          </a>
        </Link>
        <ul className="product__item__hover">
          <li>
            <a href="#">
              <span>
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
            </a>
          </li>
          <li>
            <a
              className="cursor-pointer"
              onClick={(e) => dispatch(addToCart(value.uuid, 1))}
            >
              <span>
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
              </span>
            </a>
          </li>
          <li>
            <a
              className="cursor-pointer"
              onClick={() =>
                dispatch(createLovedProduct(userInfo.uuid, value.uuid))
              }
            >
              <span>
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </span>
            </a>
          </li>
        </ul>
      </div>
      <div className="px-1 product__item__text">
        <h5 className="text-xl font-semibold text-gray-900 text-center">
          {value.name}
        </h5>
        {/* <h5 className="text-lg font-semibold text-gray-900 text-center">
          {value.bestSeller}
        </h5> */}
        <div className="mt-1 h-[50px] relative overflow-hidden flex justify-center items-center">
          {value.price_discount > 0 ? (
            <div className="font-bold text-gray-700 text-center price">
              <span className="line-through mr-3">MRP: Rs. {value.price}</span>{" "}
              <br />
              OFFER PRICE: Rs.{" "}
              {Math.round(
                value.price - (value.price * value.price_discount) / 100
              )}
            </div>
          ) : (
            <div className=" font-bold text-xl text-gray-700 text-center price">
              MRP: Rs. {value.price}
            </div>
          )}
          <div
            className="cart-btn-container cursor-pointer"
            onClick={(e) => dispatch(addToCart(value.uuid, 1))}
          >
            <a className="cart-btn">Add to cart</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

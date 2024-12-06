import Link from "next/link";
import React, { useEffect, useState } from "react";
// import { getCartItemsFromLocalStorage, removeCartItem } from "../actions/cart";
import Layout from "../components/Layout";
import show3 from "../public/show3.webp";
import { useDispatch, useSelector } from "react-redux";
// import { removeCartItem } from "../actions/cart";
import { addToCart, removeToCart } from "../redux/actions/cartAction";
import Router from "next/router";
import { API, baseUrl } from "../config";
import axios from "axios";

const cart = ({ aboutUsData }) => {
  const dispatch = useDispatch();
  const productAddToCart = useSelector((state) => state.productAddToCart);
  const { cartItems } = productAddToCart;
  const [qty, setQty] = useState(0);

  const handleRemoveCartItem = (uuid) => {
    dispatch(removeToCart(uuid));
  };

  const handleClickCheckoutBtn = () => {
    Router.push("/shipping");
  };
  return (
    <Layout header={false} aboutUsData={aboutUsData}>
      <div className="mt-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="md:grid md:grid-cols-12 gap-4 mt-4">
            <div class="md:col-span-8">
              <div>
                <h1 class="font-semibold text-3xl text-center">
                  My Shopping Cart test
                </h1>
              </div>
              {cartItems && cartItems.length > 0 ? (
                <div class="border rounded mt-3 mb-3 px-5 py-3">
                  <div class="shopping-cart-content">
                    <table class="w-full table-auto">
                      <thead class="border-b">
                        <tr>
                          <th class="pt-1 py-2">Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody id="cartTable">
                        {cartItems &&
                          cartItems.map((value) => (
                            <tr class="border-b">
                              <td class="py-3 md:flex items-center">
                                <div class="mr-3">
                                  <img
                                    class="h-16 w-16 rounded"
                                    src={`${baseUrl}/${value.image}`}
                                    alt=""
                                  />
                                </div>
                                <div>
                                  <span class="font-medium">{value.name}</span>
                                </div>
                              </td>
                              <td class="text-center">
                                <span
                                  className={`${
                                    value.discount !== 0 && "line-through"
                                  }`}
                                >
                                  Rs. {value.price}
                                </span>
                                <br />
                                {value.discount !== 0 && (
                                  <div>
                                    <span>
                                      Rs.{" "}
                                      {Math.round(
                                        value.price -
                                          (value.price * value.discount) / 100
                                      )}
                                    </span>
                                    <span className="ml-2 text-xs text-gray-500">
                                      {value.discount}% OFF
                                    </span>
                                  </div>
                                )}
                              </td>
                              <td class="text-center">
                                <div className="border w-max flex items-center px-1 m-auto">
                                  <div
                                    className={`px-2 ${
                                      value.qty > 1 && "cursor-pointer"
                                    }`}
                                    onClick={() =>
                                      dispatch(
                                        addToCart(value.uuid, value.qty - 1)
                                      )
                                    }
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M18 12H6"
                                      />
                                    </svg>
                                  </div>
                                  <div className="px-2">{value.qty}</div>
                                  <div
                                    className="px-2 cursor-pointer"
                                    onClick={() =>
                                      dispatch(
                                        addToCart(value.uuid, value.qty + 1)
                                      )
                                    }
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </td>
                              <td class="text-center">
                                <a
                                  onClick={() =>
                                    handleRemoveCartItem(value.uuid)
                                  }
                                  class="text-red-500 hover:text-indigo-900 text-xl px-1 cursor-pointer"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-center m-auto"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </a>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div
                  class="p-4 mt-5 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                  role="alert"
                >
                  <span class="font-medium">Info alert!</span> Your Cart is
                  Empty <Link href="/">Back</Link>
                </div>
              )}
            </div>
            <div class="md:col-span-4">
              <div class="border">
                <div class="border-b px-5 py-2">
                  <h2 class="uppercase text-lg font-medium">
                    SubTotal (
                    <span id="subtotal">
                      {cartItems &&
                        cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </span>
                    ) Items
                  </h2>
                  <span class="totalPrice" id="totalPrice">
                    Rs.{" "}
                    {cartItems &&
                      cartItems
                        .reduce(
                          (acc, item) =>
                            acc +
                            item.qty *
                              Math.round(
                                item.price - (item.price * item.discount) / 100
                              ),
                          0
                        )
                        .toFixed(2)}
                  </span>
                </div>
                <div class="px-5 py-2">
                  {" "}
                  <button
                    class={
                      cartItems && cartItems.length > 0
                        ? "py-2 w-full bg-primary text-white hover:bg-hover-color add-to-cart-btn checkout-btn"
                        : "py-2 w-full bg-gray-500 text-white hover:bg-hover-color add-to-cart-btn checkout-btn"
                    }
                    id="addCart"
                    disabled={cartItems && cartItems.length > 0 ? false : true}
                    onClick={handleClickCheckoutBtn}
                  >
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const aboutUs = await axios.get(`${API}/aboutus`);

  return {
    props: {
      aboutUsData: aboutUs.data[0],
    },
  };
}

export default cart;

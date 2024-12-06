import Image from "next/image";
import React, { useEffect } from "react";
import CheckoutSteps from "../components/checkoutSteps";
import Container from "../components/Container";
import Layout from "../components/Layout";
import productone from "../public/product1.jpg";
import { useSelector, useDispatch } from "react-redux";
import { createOrders } from "../redux/actions/orderAction";
import Router from "next/router";
import { ORDER_ADD_RESET } from "../redux/constants/orderConstant";
import { isAuth } from "../redux/utils";
import { API, baseUrl } from "../config";
import axios from "axios";

const placeorder = ({ aboutUsData }) => {
  const dispatch = useDispatch();
  const userLoginState = useSelector((state) => state.userLogin);
  const { userInfo } = userLoginState;
  const createOrdersState = useSelector((state) => state.createOrders);
  const { success: orderCreateSuccess, orders } = createOrdersState;
  const productAddToCart = useSelector((state) => state.productAddToCart);
  const shippingAddressValue =
    productAddToCart && productAddToCart.shippingAddress;
  const email =
    productAddToCart.paymentMethod && productAddToCart.shippingAddress.email;
  const phone =
    productAddToCart.shippingAddress && productAddToCart.shippingAddress.number;
  const address =
    productAddToCart.shippingAddress &&
    productAddToCart.shippingAddress.address;
  const city =
    productAddToCart.shippingAddress && productAddToCart.shippingAddress.city;
  const paymentMethod =
    productAddToCart.paymentMethod && productAddToCart.paymentMethod;
  const cartItems = productAddToCart.cartItems && productAddToCart.cartItems;
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  // calculate prices
  productAddToCart.itemsPrice = productAddToCart.cartItems
    .reduce(
      (acc, item) =>
        acc + (item.price - (item.price * item.discount) / 100) * item.qty,
      0
    )
    .toFixed(2);
  // shipping price
  productAddToCart.shippingPrice =
    city === "kathmandu"
      ? 100
      : city === "bhaktapur"
      ? 150
      : city === "lalitpur"
      ? 100
      : "";
  // tax price
  // productAddToCart.taxPrice = addDecimals(
  //   Number((0.15 * productAddToCart.itemsPrice).toFixed(2))
  // );
  productAddToCart.taxPrice = 0;
  productAddToCart.totalPrice = (
    Number(productAddToCart.itemsPrice) +
    Number(productAddToCart.shippingPrice) +
    Number(productAddToCart.taxPrice)
  ).toFixed(2);

  const handleSubmitPlaceOrder = () => {
    dispatch(
      createOrders({
        itemPrice: productAddToCart.itemsPrice,
        orderItems: JSON.stringify(cartItems),
        paymentMethod: paymentMethod,
        shippingAddress: JSON.stringify(shippingAddressValue),
        shippingPrice: productAddToCart.shippingPrice,
        taxPrice: productAddToCart.taxPrice,
        totalPrice: productAddToCart.totalPrice,
        userId: userInfo && userInfo.uuid,
      })
    );
  };

  useEffect(() => {
    if (orderCreateSuccess) {
      Router.push(`/order/${orders.uuid}`);
      dispatch({ type: ORDER_ADD_RESET });
    }
    if (!isAuth()) {
      Router.push("/signin");
    }
  }, [orderCreateSuccess]);
  return (
    <Layout header={false} aboutUsData={aboutUsData}>
      <CheckoutSteps step1 step2 step3 step4 />
      <Container>
        <div class="grid md:grid-cols-12 gap-4 mt-7">
          {/* left column */}
          <div class="md:col-span-8">
            <div class="shipping ml-5">
              <h1 class="uppercase text-2xl font-medium text-[#55595C]">
                Shipping
              </h1>
              <div class="info py-2">
                <h1 class="text-[#86898B] text-lg">
                  Email: <span>{email}</span>
                </h1>
                <h1 class="text-[#86898B] text-lg">
                  Phone: <span>{phone}</span>
                </h1>
                <h1 class="text-[#86898B] text-lg">
                  Address:{" "}
                  <span>
                    {address} ,{city}
                  </span>
                </h1>
              </div>
            </div>
            <hr />
            <div class="shipping ml-5 my-3">
              <h1 class="uppercase text-2xl font-medium text-[#55595C]">
                Payment Method
              </h1>
              <div class="info py-2">
                <h1 class="text-[#86898B] text-lg">
                  Method:{" "}
                  <span>
                    {paymentMethod === "cash" ? "Cash on Deliver" : ""}
                  </span>
                </h1>
              </div>
            </div>
            <hr />
            <div class="shipping ml-5 my-3">
              <h1 class="uppercase text-2xl font-medium text-[#55595C]">
                Order Items
              </h1>
              <div class="py-4 md:px-4">
                {/* product items */}
                {cartItems.map((value) => (
                  <div className="md:flex md:justify-between md:items-center border-b py-3 md:px-3">
                    <div className="flex items-center gap-4">
                      <Image
                        src={`${baseUrl}/${value.image}`}
                        width={50}
                        height={50}
                      />
                      <h2 className="text-xl text-[#55595C]">{value.name}</h2>
                    </div>
                    {/* price */}
                    <div className="flex flex-col md:items-end mt-3 md:mt-0">
                      <h2>
                        {value.qty}*{value.price} = {value.qty * value.price}
                      </h2>
                      <h2>
                        {value.discount > 0 &&
                          `${value.discount}% Discount = ${Math.round(
                            value.price - (value.price * value.discount) / 100
                          )}`}
                      </h2>
                    </div>
                    {/* price */}
                  </div>
                ))}
                {/* product items end */}
              </div>
            </div>
          </div>
          {/* left column end */}
          {/* right column */}
          <div class="md:col-span-4">
            <div class="border">
              <div class="bg-gray-100 dark:bg-gray-700 rounded-t-md py-3">
                <h1 class="uppercase text-center text-[#303030] text-lg">
                  order Summery
                </h1>
              </div>
              <div class=" px-7">
                <div class="flex justify-between py-2 px-2">
                  <span>Items</span>
                  <span>Rs. {productAddToCart.itemsPrice}</span>
                </div>
                <hr />
                <div class="flex justify-between py-2 px-2">
                  <span>Delivery Charge</span>
                  <span>Rs. {productAddToCart.shippingPrice}</span>
                </div>
                <hr />
                <div class="flex justify-between py-2 px-2">
                  <span>Tax</span>
                  <span>Rs. {productAddToCart.taxPrice}</span>
                </div>
                <hr />
                <div class="flex justify-between py-2 px-2">
                  <span>Total</span>
                  <span>Rs. {productAddToCart.totalPrice}</span>
                </div>
                <hr />
                <button
                  type="submit"
                  class="py-2 my-4 w-full bg-primary text-white hover:bg-hover-color add-to-cart-btn checkout-btn uppercase"
                  onClick={handleSubmitPlaceOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
          {/* right column end */}
        </div>
      </Container>
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

export default placeorder;

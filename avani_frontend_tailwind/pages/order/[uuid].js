import React, { useEffect } from "react";
import Container from "../../components/Container";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../redux/actions/orderAction";
import { useRouter } from "next/router";
import Image from "next/image";
import moment from "moment";
import { isAuth } from "../../redux/utils";
import { API } from "../../config";
import axios from "axios";

const OrderDetailsPage = ({ uuid, aboutUsData }) => {
  // const router = useRouter();
  // const { uuid } = router.query;
  const dispatch = useDispatch();
  const listOrderState = useSelector((state) => state.listOrder);
  const { order } = listOrderState;

  useEffect(() => {
    dispatch(getOrder(uuid));
    if (!isAuth()) {
      Router.push("/signin");
    }
  }, [dispatch]);
  // get shipping Address
  const shippingValue = order && JSON.parse(order.shippingAddress);
  const email = shippingValue && shippingValue.email;
  const phone = shippingValue && shippingValue.number;
  const address = shippingValue && shippingValue.address;
  const city = shippingValue && shippingValue.city;
  // get shipping Address end
  const orderItems = order && JSON.parse(order.orderItems);
  return (
    <Layout header={false} aboutUsData={aboutUsData}>
      <Container>
        <div class="grid md:grid-cols-12 gap-4 mt-7">
          {/* left column */}
          <div class="md:col-span-8">
            <div class="shipping ml-5">
              <h1 className="text-3xl uppercase mb-4">
                Order: {order && order.uuid}
              </h1>
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
              {/* not Delivered */}
              {order && order.isDelivered ? (
                <div
                  class="p-4 mb-4 text-sm text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800"
                  role="alert"
                >
                  <span class="font-medium">
                    Delivered :{" "}
                    {`${moment(order && order.deliveredAt).format(
                      "MMMM Do YYYY"
                    )}`}
                  </span>
                </div>
              ) : (
                <div
                  class="p-3 mb-4 text-sm text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800"
                  role="alert"
                >
                  <span class="font-medium">Not Delivered</span>
                </div>
              )}
              {/*  Delivered end */}
            </div>
            <hr />
            <div class="shipping ml-5 my-3">
              <h1 class="uppercase text-2xl font-medium text-[#55595C]">
                Payment Method
              </h1>
              <div class="info py-2">
                <h1 class="text-[#86898B] text-lg">
                  Method: <span>{order && order.paymentMethod}</span>
                </h1>
              </div>
              {/*  Paid */}
              {order && order.isPaid ? (
                <div
                  class="p-4 mb-4 text-sm text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800"
                  role="alert"
                >
                  <span class="font-medium">
                    Paid :{" "}
                    {`${moment(order && order.isPaid).format("MMMM Do YYYY")}`}
                  </span>
                </div>
              ) : (
                <div
                  class="p-3 mb-4 text-sm text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800"
                  role="alert"
                >
                  <span class="font-medium">Not Paid</span>
                </div>
              )}
              {/*  Paid end */}
            </div>
            <hr />
            <div class="shipping ml-5 my-3">
              <h1 class="uppercase text-2xl font-medium text-[#55595C]">
                Order Items
              </h1>
              <div class="py-4 md:px-4">
                {/* product items */}
                {orderItems &&
                  orderItems.map((value) => (
                    <div className="md:flex md:justify-between items-center border-b py-3 md:px-3">
                      <div className="flex items-center gap-4">
                        <Image
                          src={`${API}/${value.image}`}
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
                  <span>Rs. {order && order.itemPrice}</span>
                </div>
                <hr />
                <div class="flex justify-between py-2 px-2">
                  <span>Delivery Charge</span>
                  <span>Rs. {order && order.shippingPrice}</span>
                </div>
                <hr />
                <div class="flex justify-between py-2 px-2">
                  <span>Tax</span>
                  <span>Rs. {order && order.taxPrice}</span>
                </div>
                <hr />
                <div class="flex justify-between py-2 px-2">
                  <span>Total</span>
                  <span>Rs. {order && order.totalPrice}</span>
                </div>
                <hr />
                {/* <button
                  type="submit"
                  class="py-2 my-4 w-full bg-primary text-white hover:bg-hover-color add-to-cart-btn checkout-btn uppercase"
                >
                  Cash On Delivery
                </button> */}
              </div>
            </div>
          </div>
          {/* right column end */}
        </div>
      </Container>
    </Layout>
  );
};

OrderDetailsPage.getInitialProps = async ({ query }) => {
  const { uuid } = query;
  const aboutUs = await axios.get(`${API}/aboutus`);

  return {
    uuid: uuid,
    aboutUsData: aboutUs.data[0],
  };
};

export default OrderDetailsPage;

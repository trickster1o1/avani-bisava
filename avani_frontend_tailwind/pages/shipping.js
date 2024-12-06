import React, { useEffect, useState } from "react";
import CheckoutSteps from "../components/checkoutSteps";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAddress } from "../redux/actions/cartAction";
import Router from "next/router";
import { isAuth } from "../redux/utils";
import { API } from "../config";
import axios from "axios";

const shipping = ({ aboutUsData }) => {
  const dispatch = useDispatch();
  const productAddToCart = useSelector((state) => state.productAddToCart);
  const { shippingAddress } = productAddToCart;
  const [address, setAddress] = useState(
    shippingAddress && shippingAddress.address
  );
  const [city, setCity] = useState(shippingAddress && shippingAddress.city);
  const [number, setNumber] = useState(
    shippingAddress && shippingAddress.number
  );
  const [email, setEmail] = useState(shippingAddress && shippingAddress.email);

  const handleSubmitShipping = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, number, email }));
    Router.push("/payment");
  };

  useEffect(() => {
    if (!isAuth()) {
      Router.push("/signin");
    }
  }, []);
  return (
    <Layout header={false} aboutUsData={aboutUsData}>
      <div className="m-auto w-4/5 md:w-max">
        <CheckoutSteps step1 step2 />
        <div class="mt-8">
          <h1 class="uppercase text-2xl font-medium">Shipping</h1>
          <form class="mt-3" onSubmit={handleSubmitShipping}>
            <div class="grid grid-cols-12 gap-6">
              <div class="col-span-12">
                <label for="" class="text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  class="mt-2 p-3 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 "
                  placeholder="Enter Address"
                  onChange={(e) => setAddress(e.target.value)}
                  defaultValue={address}
                  required
                />
              </div>
              <div class="col-span-12">
                <label for="" class="text-sm font-medium text-gray-700">
                  City
                </label>
                <select
                  id="city"
                  name="category_id"
                  autocomplete="country-name"
                  class="mt-2 p-3 block w-full py-2 px-3 border border-gray-300 bg-white shadow-sm focus:outline-none focus:border-primary  sm:text-sm text-gray-700"
                  onChange={(e) => setCity(e.target.value)}
                  required
                >
                  <option value="">---select city---</option>
                  <option
                    value="kathmandu"
                    selected={city === "kathmandu" ? true : false}
                  >
                    kathmandu
                  </option>
                  <option
                    value="bhaktapur"
                    selected={city === "bhaktapur" ? true : false}
                  >
                    Bhaktapur
                  </option>
                  <option
                    value="lalitpur"
                    selected={city === "lalitpur" ? true : false}
                  >
                    Lalitpur
                  </option>
                </select>
              </div>
              <div class="col-span-12">
                <label for="" class="text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="contact_number"
                  id="contact_number"
                  class="mt-2 p-3 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300"
                  placeholder="Enter Contact Number"
                  onChange={(e) => setNumber(e.target.value)}
                  defaultValue={number}
                  required
                />
              </div>
              <div class="col-span-12">
                <label for="" class="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email_address"
                  id="email_address"
                  class="mt-2 p-3 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300"
                  placeholder="Enter Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                  defaultValue={email}
                  required
                />
              </div>
            </div>
            <input
              type="submit"
              class="col-span-12 mt-5 group relative flex justify-center py-2 px-4 border border-transparent text-lg font-medium text-white bg-primary hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer"
              value="Continue"
            />
          </form>
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

export default shipping;

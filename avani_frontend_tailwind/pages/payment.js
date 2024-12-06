import React, { useEffect, useState } from "react";
import CheckoutSteps from "../components/checkoutSteps";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { savePaymentMethod } from "../redux/actions/cartAction";
import Router from "next/router";
import { isAuth } from "../redux/utils";
import axios from "axios";
import { API } from "../config";

const payment = ({ aboutUsData }) => {
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    Router.push("/placeorder");
  };
  useEffect(() => {
    if (!isAuth()) {
      Router.push("/signin");
    }
  }, []);
  return (
    <Layout header={false} aboutUsData={aboutUsData}>
      <div className="m-auto w-4/5 md:w-max">
        <CheckoutSteps step1 step2 step3 />
        <div class="mt-8">
          <h1 class="uppercase text-3xl font-medium">payment method</h1>
          <h1 class="text-xl my-5">Select Method</h1>
          <form class="mt-4" onSubmit={handlePaymentSubmit}>
            {/* <div class="flex items-center mb-4">
              <input
                id="esewa"
                type="radio"
                name="countries"
                value="Esewa"
                class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                aria-labelledby="esewa"
                aria-describedby="esewa"
                checked
              />
              <label
                for="esewa"
                class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Esewa
              </label>
            </div>

            <div class="flex items-center mb-4">
              <input
                id="bank_transfer"
                type="radio"
                name="countries"
                value="Bank Transfer"
                class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                aria-labelledby="bank_transfer"
                aria-describedby="bank_transfer"
              />
              <label
                for="bank_transfer"
                class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Bank Transfer
              </label>
            </div> */}

            <div class="flex items-center mb-4 ml-4">
              <input
                id="cash_delivery"
                type="radio"
                name="cash"
                value="cash"
                class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-primary "
                aria-labelledby="cash_delivery"
                aria-describedby="cash_delivery"
                onChange={(e) => setPaymentMethod(e.target.value)}
                checked
                required
              />
              <label
                for="cash_delivery"
                class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Cash on Delivery
              </label>
            </div>

            {/* <div class="flex items-center mb-4">
              <input
                id="khalti"
                type="radio"
                name="countries"
                value="Khalti"
                class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                aria-labelledby="khalti"
                aria-describedby="khalti"
              />
              <label
                for="khalti"
                class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Khalti
              </label>
            </div>

            <div class="flex items-center mb-4">
              <input
                id="fone_pay"
                type="radio"
                name="countries"
                value="Fone Pay"
                class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                aria-labelledby="fone_pay"
                aria-describedby="fone_pay"
              />
              <label
                for="fone_pay"
                class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Fone Pay
              </label>
            </div> */}

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

export default payment;

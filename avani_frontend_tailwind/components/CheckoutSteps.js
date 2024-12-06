import Link from "next/link";
import React from "react";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav class="mt-5 bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded">
      <div class="container flex flex-wrap justify-center items-center mx-auto">
        <div class=" w-full block md:w-auto">
          <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium gap-2 md:gap-8">
            <li>
              {step1 ? (
                <Link href="/sigin">
                  <a
                    href="#"
                    class="block py-2 pr-4 pl-3 rounded text-primary text-lg md:p-0"
                    aria-current="page"
                  >
                    SignIn
                  </a>
                </Link>
              ) : (
                <p class="block py-2 pr-4 pl-3 rounded text-gray-600 text-lg md:p-0">
                  SignIn
                </p>
              )}
            </li>
            <li>
              {step2 ? (
                <Link href="/shipping">
                  <a
                    href="#"
                    class="block py-2 pr-4 pl-3 rounded text-primary text-lg md:p-0"
                    aria-current="page"
                  >
                    Shipping
                  </a>
                </Link>
              ) : (
                <p class="block py-2 pr-4 pl-3 rounded text-gray-600 text-lg md:p-0">
                  Shipping
                </p>
              )}
            </li>
            <li>
              {step3 ? (
                <Link href="/payment">
                  <a
                    href="#"
                    class="block py-2 pr-4 pl-3 rounded text-primary text-lg md:p-0"
                    aria-current="page"
                  >
                    Payment
                  </a>
                </Link>
              ) : (
                <p class="block py-2 pr-4 pl-3 rounded text-gray-600 text-lg md:p-0">
                  Payment
                </p>
              )}
            </li>
            <li>
              {step4 ? (
                <Link href="/placeorder">
                  <a
                    href="#"
                    class="block py-2 pr-4 pl-3 rounded text-primary text-lg md:p-0"
                    aria-current="page"
                  >
                    Place Order
                  </a>
                </Link>
              ) : (
                <p class="block py-2 pr-4 pl-3 rounded text-gray-600 text-lg md:p-0">
                  Place Order
                </p>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default CheckoutSteps;

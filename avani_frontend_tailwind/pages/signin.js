import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import logo from "../public/avani_logo.jpg";
import google from "../public/google.svg";
import facebook from "../public/facebook.svg";
import { siginin, authenticate } from "../actions/auth";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/actions/userAction";
import { isAuth } from "../redux/utils";

const signin = () => {
  const dispatch = useDispatch();
  const userLoginState = useSelector((state) => state.userLogin);
  const { userInfo } = userLoginState;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuth()) {
      Router.push("/");
    }
  }, [userInfo]);

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(userLogin(email, password));
    // siginin(email, password).then((data) => {
    //   console.log("data", data);
    //   if (data === true) {
    //     setLoading(false);
    //   } else {
    //     authenticate(data, () => {
    //       Router.push("/");
    //     });
    //     setLoading(false);
    //   }
    // });
  };
  return (
    <Layout header={false} footer={false}>
      <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
          <div className="text-center">
            <Image
              class=""
              src={logo}
              alt="Workflow"
              width={100}
              height={100}
            />
            <p class="font-medium text-lg text-gray-600">
              Sign in to your account
            </p>
          </div>
          {/* loading component */}
          {loading && (
            <button
              disabled
              type="button"
              class="text-white w-full bg-primaryDark focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center mr-2  inline-flex items-center"
            >
              <svg
                role="status"
                class="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </button>
          )}
          {/* loading component end */}
          {/* <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <button className="py-3 px-6 rounded-xl bg-blue-50 hover:bg-blue-100 focus:bg-blue-100 active:bg-blue-200">
              <div className="flex gap-4 justify-center">
                <Image
                  src={google}
                  className="w-5"
                  alt=""
                  width={20}
                  height={20}
                />
                <span className="block w-max font-medium tracking-wide text-sm text-blue-700">
                  with Google
                </span>
              </div>
            </button>
            <button className="py-3 px-6 rounded-xl bg-gray-900 transition hover:bg-gray-800 active:bg-gray-600 focus:bg-gray-700">
              <div className="flex gap-4 items-center justify-center text-white">
                <Image
                  src={facebook}
                  className="w-5"
                  alt=""
                  width={20}
                  height={20}
                />
                <span className="block w-max font-medium tracking-wide text-sm text-white">
                  with Facebook
                </span>
              </div>
            </button>
          </div> */}
          {/* <div role="hidden" className="mt-12 border-t">
            <span className="block w-max mx-auto -mt-3 px-4 text-center text-gray-500 bg-white">
              Or
            </span>
          </div> */}
          <form onSubmit={submitForm} className="space-y-6 py-1">
            <div>
              <input
                type="email"
                placeholder="Your Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div className="flex flex-col items-end">
              <input
                type="password"
                placeholder="Your Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none focus:ring-primary focus:border-primary"
                required
              />
              <button type="reset" className="w-max p-3 -mr-3">
                <span className="text-sm tracking-wide text-primary">
                  Forgot password ?
                </span>
              </button>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-xl bg-primary transition hover:bg-primary focus:bg-primary active:bg-primary"
              >
                <span className="font-semibold text-white text-lg">Login</span>
              </button>
              <Link href="/register" type="reset" className="w-max p-3 -ml-3">
                <a>
                  <span className="text-sm tracking-wide text-primary">
                    Create new account
                  </span>
                </a>
              </Link>
            </div>

            {/* <div>
              <input
                type="password"
                value={password}
                onChange={handleChange("password")}
                autocomplete="given-name"
                class="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Password"
              />
            </div>

            <div class="flex items-center justify-between mb-5">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label
                  for="remember-me"
                  class="ml-2 block text-sm text-gray-900"
                >
                  {" "}
                  Remember me{" "}
                </label>
              </div>

              <div class="text-sm">
                <a href="#" class="font-medium text-primary hover:text-primary">
                  {" "}
                  Forgot your password?{" "}
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    class="h-5 w-5 bg-primary group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                Sign in
              </button>
            </div> */}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default signin;

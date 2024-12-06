import Image from "next/image";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import logo from "../public/avani_logo.jpg";
import { registerUser, siginup } from "../actions/auth";
import axios from "axios";
import { API } from "../config";
import { toast } from "react-toastify";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { userRegister } from "../redux/actions/userAction";
import { USER_LOGIN_RESET } from "../redux/constants/userConstant";

const register = ({ aboutUsData }) => {
  const dispatch = useDispatch();
  const userLoginState = useSelector((state) => state.userLogin);
  const { success } = userLoginState;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (success) {
      Router.push("/signin");
      dispatch({ type: USER_LOGIN_RESET });
    }
  }, [success]);

  const handleRegisterForm = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      // registerUser(name, phone, email, password).then((data) => {
      //   console.log(data);
      //   if (data === true) {
      //     setLoading(false);
      //   } else {
      //     Router.push("/signin");
      //     setLoading(false);
      //   }
      // });
      dispatch(userRegister(name, phone, email, password));
    } else {
      toast.error("Password Doesnot Match", {
        autoClose: 1000,
      });
    }
  };

  return (
    <Layout header={false} footer={false}>
      <div class="min-h-full flex items-center justify-center pb-12 pt-9 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
          <div className="text-center">
            <Image
              class=""
              src={logo}
              alt="Workflow"
              width={100}
              height={100}
            />
            <p class="font-medium text-lg text-gray-600">Create Your Account</p>
          </div>

          <form class="mt-8 space-y-6" onSubmit={handleRegisterForm}>
            <div>
              <label
                for="first-name"
                class="block text-base font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none focus:ring-primary focus:border-primary"
                placeholder="Enter Your Full Name"
                required
              />
            </div>
            <div>
              <label
                for="first-name"
                class="block text-base font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                onChange={(e) => setPhone(e.target.value)}
                className="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none focus:ring-primary focus:border-primary"
                placeholder="Enter Your Phone Number"
                required
              />
            </div>
            <div>
              <label
                for="first-name"
                class="block text-base font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none focus:ring-primary focus:border-primary"
                placeholder="Enter Your Email Address"
                required
              />
            </div>
            <div>
              <label
                for="first-name"
                class="block text-base font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none focus:ring-primary focus:border-primary"
                placeholder="Enter Your Password"
                required
              />
            </div>
            <div>
              <label
                for="first-name"
                class="block text-base font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none focus:ring-primary focus:border-primary"
                placeholder="Enter Confirm Password"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-xl bg-primary transition hover:bg-primary focus:bg-primary active:bg-primary"
              >
                <span className="font-semibold text-white text-lg">
                  Register
                </span>
              </button>
            </div>
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

export default register;

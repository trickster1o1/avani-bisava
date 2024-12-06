import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { getOrdersByUserId } from "../redux/actions/orderAction";
import moment from "moment";
import Link from "next/link";
import { userUpdate } from "../redux/actions/userAction";
import { USER_UPDATE_RESET } from "../redux/constants/userConstant";
import Router from "next/router";
import { getLovedProductByUserId } from "../redux/actions/productAction";
import ProductCard from "../components/ProductCard";
import { getBlogsByUserId } from "../redux/actions/blogAction";
import BlogCard from "../components/BlogCard";
import { BLOG_DELETE_RESET } from "../redux/constants/blogConstant";
import { isAuth } from "../redux/utils";
import { API } from "../config";
import axios from "axios";

const profile = ({ aboutUsData }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [tab, setTab] = useState(1);

  const dispatch = useDispatch();
  const userLoginState = useSelector((state) => state.userLogin);
  const { userInfo } = userLoginState;
  const userUpdateState = useSelector((state) => state.userUpdate);
  const { success } = userUpdateState;
  const listOrdersByUserIdState = useSelector(
    (state) => state.listOrdersByUserId
  );
  const { orders } = listOrdersByUserIdState;
  const listBlogsByUserIdState = useSelector(
    (state) => state.listBlogsByUserId
  );
  const { blogs } = listBlogsByUserIdState;
  const getLovedProductByUserIdState = useSelector(
    (state) => state.getLovedProductByUserId
  );
  const { products } = getLovedProductByUserIdState;
  const deleteBlogState = useSelector((state) => state.deleteBlog);
  const { success: deleteBlogSuccess } = deleteBlogState;
  useEffect(() => {
    if (!isAuth()) {
      Router.push("/signin");
    }
    dispatch(getOrdersByUserId(userInfo && userInfo.uuid));
    dispatch(getLovedProductByUserId(userInfo && userInfo.uuid));
    dispatch(getBlogsByUserId(userInfo && userInfo.uuid));
    if (success) {
      dispatch({ type: USER_UPDATE_RESET });
      Router.push("/signin");
    }
    if (deleteBlogSuccess) {
      dispatch({ type: BLOG_DELETE_RESET });
    }
  }, [success, deleteBlogSuccess]);

  const handleUpdateProfileForm = (e) => {
    e.preventDefault();
    dispatch(
      userUpdate(name, phone, email, password, userInfo && userInfo.uuid)
    );
  };

  return (
    <Layout header={false} aboutUsData={aboutUsData}>
      <Container>
        <div class="md:grid md:grid-cols-12 gap-8 mt-7">
          {/* left column */}
          <div class="md:col-span-3">
            {/* profile update */}
            <div>
              <h1 className="text-2xl tracking-widest font-medium uppercase">
                Update Profile
              </h1>
              <form className="mt-3" onSubmit={handleUpdateProfileForm}>
                <div class="">
                  <label for="" class="text-base font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    class="mt-2 p-3 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300"
                    placeholder="Enter Full Name"
                    onChange={(e) => setName(e.target.value)}
                    defaultValue={userInfo && userInfo.name}
                    required
                  />
                </div>
                <div class="mt-3">
                  <label for="" class="text-base font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    class="mt-2 p-3 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300"
                    placeholder="Enter Phone Number"
                    onChange={(e) => setPhone(e.target.value)}
                    defaultValue={userInfo && userInfo.phone}
                    required
                  />
                </div>
                <div class="mt-3">
                  <label for="" class="text-base font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    class="mt-2 p-3 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300"
                    placeholder="Enter Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    defaultValue={userInfo && userInfo.email}
                    required
                  />
                </div>
                <div class="mt-3">
                  <label for="" class="text-base font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="address"
                      id="address"
                      class="mt-2 p-3 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300"
                      placeholder="Enter Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div
                      className="absolute top-[25%] right-1 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
                <div class="mt-3">
                  <label for="" class="text-base font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="address"
                    id="address"
                    class="mt-2 p-3 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300"
                    placeholder="Enter Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  class="py-2 my-5 w-full bg-primary text-white hover:bg-hover-color uppercase"
                >
                  Update
                </button>
              </form>
            </div>

            {/* profile update end */}
          </div>
          <div className="md:col-span-9">
            {/* Tabs Menu */}

            <div class="border-b border-gray-200 dark:border-gray-700 mb-5">
              <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                <li class="mr-2">
                  <a
                    onClick={() => setTab(1)}
                    className={
                      tab === 1
                        ? "inline-flex p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500 group cursor-pointer"
                        : "inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 cursor-pointer"
                    }
                    aria-current="page"
                  >
                    <svg
                      aria-hidden="true"
                      className={
                        tab === 1
                          ? "mr-2 w-5 h-5 text-blue-600"
                          : "mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500"
                      }
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                    </svg>
                    Orders
                  </a>
                </li>
                <li class="mr-2">
                  <a
                    onClick={() => setTab(2)}
                    className={
                      tab === 2
                        ? "inline-flex p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500 group cursor-pointer"
                        : "inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 cursor-pointer"
                    }
                  >
                    <svg
                      aria-hidden="true"
                      className={
                        tab === 2
                          ? "mr-2 w-5 h-5 text-blue-600"
                          : "mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500"
                      }
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                      <path
                        fill-rule="evenodd"
                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Loved Product
                  </a>
                </li>
                <li class="mr-2">
                  <a
                    onClick={() => setTab(3)}
                    className={
                      tab === 3
                        ? "inline-flex p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500 group cursor-pointer"
                        : "inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 cursor-pointer"
                    }
                  >
                    <svg
                      aria-hidden="true"
                      className={
                        tab === 3
                          ? "mr-2 w-5 h-5 text-blue-600"
                          : "mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500"
                      }
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                    </svg>
                    Your Blogs
                  </a>
                </li>
              </ul>
            </div>

            {/* Tabs Menu End */}

            {/* order List */}
            {tab === 1 && (
              <div>
                <h1 className="text-2xl tracking-widest font-medium uppercase">
                  Orders
                </h1>
                <div className="overflow-x-auto relative mt-5">
                  {orders && orders.length > 0 ? (
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border">
                        <tr>
                          <th scope="col" className="py-4 px-6 border">
                            Order ID
                          </th>
                          <th scope="col" className="py-4 px-6 border">
                            Date
                          </th>
                          <th scope="col" className="py-4 px-6 border">
                            Total
                          </th>
                          <th scope="col" className="py-4 px-6 border">
                            Paid
                          </th>
                          <th scope="col" className="py-4 px-6 border">
                            Deliv <br /> ered
                          </th>
                          <th scope="col" className="py-4 px-6 border">
                            {/* Action */}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders &&
                          orders.map((value) => (
                            <tr className="bg-white border dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-50">
                              <th
                                scope="row"
                                className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border"
                              >
                                {value.uuid}
                              </th>
                              <td className="py-4 px-4 border">
                                {moment(value.createdAt).format("MMMM Do YYYY")}
                              </td>
                              <td className="py-4 px-6 border">
                                Rs. {value.totalPrice}
                              </td>
                              <td className="py-4 px-4 border">
                                {value.isPaid ? (
                                  moment(value.paidAt).format("MMMM Do YYYY")
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-red-600"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                              </td>
                              <td className="py-4 px-4 border">
                                {value.isDelivered ? (
                                  moment(value.deliveredAt).format(
                                    "MMMM Do YYYY"
                                  )
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-red-600"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                              </td>
                              <td className="py-4 px-4 border">
                                <Link href={`/order/${value.uuid}`}>
                                  <a
                                    type="button"
                                    class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-3 py-1.5 mr-2 mb-2"
                                  >
                                    Details
                                  </a>
                                </Link>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  ) : (
                    <div
                      class="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                      role="alert"
                    >
                      <span class="font-medium">
                        You Have Not Order Any Product
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
            {tab === 2 && (
              <div>
                {products && products.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
                    {products &&
                      products.map((value) => <ProductCard value={value} />)}
                  </div>
                ) : (
                  <div
                    class="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                    role="alert"
                  >
                    <span class="font-medium">
                      You Have Not Loved Any Product
                    </span>
                  </div>
                )}
              </div>
            )}
            {/* order List end */}
            {/* blogs Lists */}
            {tab === 3 && (
              <div>
                <Link href="/blogs/add-blogs">
                  <a className="text-white bg-primary hover:bg-primaryDark focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm w-max sm:w-maz px-5 py-2.5 text-center my-3 flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Add Blog
                  </a>
                </Link>
                {blogs && blogs.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-7">
                    {blogs &&
                      blogs.map((value) => (
                        <BlogCard value={value} action={true} />
                      ))}
                  </div>
                ) : (
                  <div
                    class="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                    role="alert"
                  >
                    <span class="font-medium">No Blogs Found</span>
                  </div>
                )}
              </div>
            )}
            {/* blogs Lists end */}
          </div>
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

export default profile;

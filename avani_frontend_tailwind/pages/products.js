import React, { useState, Fragment, useRef } from "react";
import Container from "../components/Container";
import Layout from "../components/Layout";
import { Menu, Transition } from "@headlessui/react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { API } from "../config";

const products = ({ filterProducts, aboutUsData }) => {
  const Router = useRouter();
  const urlQuery = Router.query;
  console.log("object", urlQuery);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [searchTag, setSearchTag] = useState("");
  const [sort, setSort] = useState("");

  const handleSearchTag = (e) => {
    e.preventDefault();
    Router.push(
      `/products?search=${searchTag}&sort=${sort}&category=${urlQuery.category}`
    );
    setSearchTag("");
  };
  const handleSortBtn = (e) => {
    setSort(e.target.value);
    Router.push(
      `/products?search=${searchTag}&sort=${e.target.value}&category=${
        e.target.value === "all" ? "" : urlQuery.category
      }`
    );
  };
  return (
    <Layout aboutUsData={aboutUsData}>
      <div className="mt-5">
        <Container>
          {/* breadcrumb */}
          <nav class="flex" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3 w-full">
              <li class="inline-flex items-center">
                <Link href="/">
                  <a class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    <svg
                      class="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                    </svg>
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <div class="flex items-center w-max">
                  <svg
                    class="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <Link
                    href={`/products?search=${searchTag}&sort=${sort}&category=`}
                  >
                    <a class="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                      Products
                    </a>
                  </Link>
                </div>
              </li>
              {urlQuery.category && (
                <li aria-current="page">
                  <div class="flex items-center w-max">
                    <svg
                      class="w-6 h-6 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                      {urlQuery.category.replace(/_/g, " ")}
                    </span>
                  </div>
                </li>
              )}
            </ol>
          </nav>
          {/* breadcrumb end */}
          <div class="grid md:grid-cols-12 gap-5 mt-7">
            {/* left column */}
            {/* <div class="md:col-span-3">
              <div className="border bg-gray-100 px-3 py-4">
                <div>
                  <h1>Price</h1>
                  <form className="flex items-center mt-2">
                    <input
                      type="number"
                      placeholder="min"
                      className="w-[37%] h-9 mr-1 border-gray-300 focus:border-primary focus:ring-primary"
                      onChange={(e) => setMinPrice(e.target.value)}
                    />{" "}
                    -
                    <input
                      type="number"
                      placeholder="max"
                      className="w-[37%] h-9 ml-1 border-gray-300 focus:border-primary focus:ring-primary"
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                    <button className="ml-3 bg-primary px-2 py-1 text-white">
                      ok
                    </button>
                  </form>
                </div>
              </div>
            </div> */}
            <div class="md:col-span-12">
              <div>
                <div className="bg-gray-100 rounded px-3 py-4">
                  <div className="md:flex md:justify-between items-center">
                    <form className="md:flex" onClick={handleSearchTag}>
                      <input
                        type="text"
                        id="search"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full md:w-64 p-2.5 mr-3"
                        placeholder="Search..."
                        onChange={(e) => setSearchTag(e.target.value)}
                        defaultValue={searchTag}
                        required
                      />
                      <button
                        type="submit"
                        class="text-white bg-primary hover:bg-primaryDark focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-2 md:mt-0"
                      >
                        Search
                      </button>
                    </form>
                    <select
                      id="countries"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary w-full md:w-32 focus:border-primary block p-2.5 mt-2 md:mt-0"
                      onChange={handleSortBtn}
                    >
                      <option
                        value="all"
                        selected={urlQuery.sort === "all" ? true : false}
                      >
                        All Products
                      </option>
                      <option
                        value="bestSeller"
                        selected={urlQuery.sort === "bestSeller" ? true : false}
                      >
                        Best Seller
                      </option>
                      <option
                        value="trending"
                        selected={urlQuery.sort === "trending" ? true : false}
                      >
                        Trending
                      </option>
                      <option
                        value="discount"
                        selected={urlQuery.sort === "discount" ? true : false}
                      >
                        Discount
                      </option>
                    </select>
                  </div>
                </div>
                {/* product component */}
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {filterProducts.map((value) => (
                      <div>
                        <ProductCard value={value} />
                      </div>
                    ))}
                  </div>
                </div>
                {/* product component end */}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
  const { search, sort, category } = query;
  const filterProducts = await axios.get(
    `${API}/product/filter/product?${sort !== "all" && sort}=2&${
      search && "search"
    }=${search}&${category && "category"}=${category}`
  );
  const aboutUs = await axios.get(`${API}/aboutus`);
  // let valueData = "discount";
  // console.log("sort", valueData);
  return {
    props: {
      filterProducts: sort
        ? sort === "bestSeller"
          ? filterProducts.data.sort(
              (a, b) => parseInt(b.bestSeller) - parseInt(a.bestSeller)
            )
          : sort === "trending"
          ? filterProducts.data.sort(
              (a, b) => parseInt(b.trending) - parseInt(a.trending)
            )
          : sort === "discount"
          ? filterProducts.data.sort(
              (a, b) => parseInt(b.price_discount) - parseInt(a.price_discount)
            )
          : filterProducts.data
        : filterProducts.data,
      // filterProducts: filterProducts.data,
      aboutUsData: aboutUs.data[0],
    },
  };
}

export default products;

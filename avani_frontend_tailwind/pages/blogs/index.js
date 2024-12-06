import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";
import BlogCard from "../../components/BlogCard";
import Container from "../../components/Container";
import Layout from "../../components/Layout";
import { API } from "../../config";
import { isAuth } from "../../redux/utils";

const Blogs = ({ blogs, aboutUsData }) => {
  const [searchTag, setSearchTag] = useState("");
  const handleSearchBlog = (e) => {
    e.preventDefault();
    Router.push(`/blogs?search=${searchTag}`);
  };
  const handleClearSearch = () => {
    setSearchTag("");
    Router.push(`/blogs`);
  };
  return (
    <Layout aboutUsData={aboutUsData}>
      <Container>
        <div className="mt-5">
          {/* blog header */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl">Blogs</h1>
            {/* blog action */}
            <div className="flex">
              <form className="flex" onSubmit={handleSearchBlog}>
                <input
                  type="text"
                  id="search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-64 p-2.5 mr-3"
                  placeholder="Search..."
                  onChange={(e) => setSearchTag(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  class="text-white bg-primary hover:bg-primaryDark focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                >
                  Search
                </button>
              </form>
              {searchTag && (
                <button
                  type="button"
                  class="text-white ml-3 bg-primary hover:bg-primaryDark focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                  onClick={handleClearSearch}
                >
                  Clear Search
                </button>
              )}
              {isAuth() && (
                <Link href="/blogs/add-blogs">
                  <a className="text-white bg-primary hover:bg-primaryDark focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ml-3 flex">
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
              )}
            </div>
            {/* blog action end */}
          </div>
          {/* blog Header end */}
          {/* blog list */}
          <div className="grid grid-cols-3 gap-4 mt-5">
            {blogs.map((value) => (
              <BlogCard value={value} />
            ))}
          </div>
          {/* blog list end */}
        </div>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
  const { search } = query;
  const blogs = await axios.get(
    `${API}/blog/published?${search && "search"}=${search}`
  );
  const aboutUs = await axios.get(`${API}/aboutus`);
  return {
    props: {
      blogs: blogs.data,
      aboutUsData: aboutUs.data[0],
    },
  };
}

export default Blogs;

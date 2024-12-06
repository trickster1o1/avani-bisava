import axios from "axios";
import Image from "next/image";
import React from "react";
import Layout from "../../components/Layout";
import pro from "../../public/product1.jpg";
import moment from "moment";
import { API, baseUrl } from "../../config";

const BlogDetails = ({ blog, user, aboutUsData }) => {
  // console.log("blog", blog, user);
  return (
    <Layout aboutUsData={aboutUsData}>
      <div className="max-w-4xl mx-auto mt-8 px-10">
        <div>
          <h1 className="text-3xl md:text-5xl">{blog.title}</h1>
          <div className="my-5">
            <span>
              {/* {user.name} on {moment(blog.createdAt).format("MMMM Do YYYY")} */}
            </span>
          </div>
        </div>
        <div className=" w-full h-48 md:h-96 overflow-hidden bg-gray-200 relative">
          <Image
            alt="Mountains"
            src={`${baseUrl}/${blog.image}`}
            objectFit="cover"
            layout="fill"
          />
        </div>
        {/* <Image src={pro} /> */}
        <div className="mt-3">
          <p className="text-xl">
            <div
              dangerouslySetInnerHTML={{
                __html: blog.description,
              }}
            />
          </p>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
  // console.log("slug", query);
  const blogData = await axios.get(`${API}/blog/slug/${query.slug}`);
  const aboutUs = await axios.get(`${API}/aboutus`);
  return {
    props: {
      blog: blogData.data.blog,
      user: blogData.data.user,
      aboutUsData: aboutUs.data[0],
    },
  };
}

export default BlogDetails;

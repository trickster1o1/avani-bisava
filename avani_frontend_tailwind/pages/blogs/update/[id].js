import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import dynamic from "next/dynamic";
import { isAuth } from "../../../redux/utils";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import slugify from "slugify";
import { API, baseUrl } from "../../../config";
import axios from "axios";
import { getBlog, updateBlog } from "../../../redux/actions/blogAction";
import { BLOG_UPDATE_RESET } from "../../../redux/constants/blogConstant";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../../../components/CkEditor"),
  { ssr: false }
);

const UpdateBlog = ({ blog, aboutUsData }) => {
  const Router = useRouter();
  // const BlogUuid = Router.query.slug;
  const dispatch = useDispatch();
  const userLoginState = useSelector((state) => state.userLogin);
  const { userInfo } = userLoginState;
  const updateBlogState = useSelector((state) => state.updateBlog);
  const { success: updateBlogSuccess } = updateBlogState;
  const [title, setTitle] = useState();
  const [image, setImage] = useState();
  const [description, setDescription] = useState();
  const [previewSource, setPreviewSource] = useState();

  const handleUpdatedBlog = (e) => {
    e.preventDefault();
    dispatch(updateBlog(slugify(title), title, image, description, blog.uuid));
  };

  useEffect(() => {
    if (!isAuth()) {
      Router.push("/signin");
    }
    if (updateBlogSuccess) {
      dispatch({ type: BLOG_UPDATE_RESET });
      Router.push("/profile");
    }
  }, [updateBlogSuccess]);

  const getData = (data) => {
    setDescription(data);
  };

  const previewFile = (file) => {
    console.log(file);
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];

    previewFile(file);
    const formData = new FormData();
    formData.append("image", file);
    // setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(`${API}/upload`, formData, config);

      setImage(data[0].path);
      // setUploading(false);
    } catch (err) {
      console.error(err);
      // setUploading(false);
    }
  };
  return (
    <Layout aboutUsData={aboutUsData}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-8">
          <h1 className="text-center text-3xl">Update Blog</h1>
          <div className="border shadow bg-white rounded py-4 px-4 max-w-2xl m-auto mt-4">
            <form onSubmit={handleUpdatedBlog}>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                  <label htmlFor="" className="text-sm font-medium">
                    Blog Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    className="mt-1 focus:ring-gray-300 focus:border-gray-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Blog Title"
                    onChange={(e) => setTitle(e.target.value)}
                    defaultValue={blog.title}
                  />
                </div>
                <div className="col-span-12">
                  <label
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    for="file_input"
                  >
                    Upload file
                  </label>
                  <input
                    class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer"
                    aria-describedby="file_input_help"
                    id="file_input"
                    type="file"
                    onChange={uploadFileHandler}
                  />
                  <p class="mt-1 text-sm text-gray-500" id="file_input_help">
                    SVG, PNG, JPG or GIF (MAX. 800x400px).
                  </p>
                  {previewSource && (
                    <div className="previewImage">
                      <img src={previewSource} alt="profile" />
                    </div>
                  )}
                  {/* exiting image */}
                  <div className="my-5">
                    <h1>Old Image</h1>
                    <img src={`${baseUrl}/${blog.image}`} alt="" />
                  </div>
                  {/* exiting image end */}
                </div>
                <div className="col-span-12">
                  <label htmlFor="" className="text-sm font-medium">
                    Blog Description
                  </label>
                  <DynamicComponentWithNoSSR
                    value={blog.description}
                    onSubmit={getData}
                  />
                </div>
              </div>
              <input
                type="submit"
                className="col-span-12 mt-3 group relative w-full flex  uppercase cursor-pointer justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primaryDark "
                value="Update"
              />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
  console.log("slug", query.id);
  const blogData = await axios.get(`${API}/blog/${query.id}`);
  const aboutUs = await axios.get(`${API}/aboutus`);
  return {
    props: {
      blog: blogData.data,
      aboutUsData: aboutUs.data[0],
    },
  };
}

export default UpdateBlog;

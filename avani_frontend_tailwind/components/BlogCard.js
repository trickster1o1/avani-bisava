import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import blog from "../public/blog.webp";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getBlog } from "../redux/actions/blogAction";
import { baseUrl } from "../config";

const BlogCard = ({ value, action = false }) => {
  const dispatch = useDispatch();
  const userLoginState = useSelector((state) => state.userLogin);
  const { userInfo } = userLoginState;
  const [isLoading, setLoading] = useState(true);
  function cn(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div>
      <div class="bg-white md:h-[432px]">
        {/* <div class="bg-white rounded-sm border border-gray-200 shadow-md md:h-[432px]"> */}
        <Link href={`/blogs/${value.slug}`}>
          <a>
            <div className="w-full h-48 md:h-52 overflow-hidden bg-gray-200 relative">
              <Image
                alt="Mountains"
                src={`${baseUrl}/${value.image}`}
                objectFit="cover"
                layout="fill"
                className={cn(
                  "duration-700 ease-in-out group-hover:opacity-75",
                  isLoading
                    ? "scale-110 blur-2xl grayscale"
                    : "scale-100 blur-0 grayscale-0"
                )}
                onLoadingComplete={() => setLoading(false)}
              />
            </div>
          </a>
        </Link>
        <div class="px-3 py-2">
          <Link href={`/blogs/${value.slug}`}>
            <a>
              <h2 className="font-semibold text-base text-center mb-2">
                {value.title}
              </h2>
              <h5 class="mb-2 text-base font-normal text-gray-900">
                {value.description.length > 250 ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: value.description.substring(0, 210) + "...",
                    }}
                  />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: value.description,
                    }}
                  />
                )}
              </h5>
              <span className="text-primary underline">Read More ...</span>
            </a>
          </Link>
        </div>
      </div>

      {action && (
        <div className="bg-gray-200 px-3 py-2 flex items-center">
          <div
            className="cursor-pointer mr-5"
            onClick={() => dispatch(deleteBlog(value.uuid, userInfo.uuid))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              style={{ color: "red" }}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <Link href={`/blogs/update/${value.uuid}`}>
            <a className="cursor-pointer mr-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                style={{ color: "blue" }}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path
                  fillRule="evenodd"
                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </Link>
          {value.isPublished ? (
            <div
              class="p-2 text-sm text-blue-700 bg-blue-100 rounded-lg"
              role="alert"
            >
              <span class="font-medium">Published</span>
            </div>
          ) : (
            <div
              class="p-2 text-sm text-red-700 bg-red-100 rounded-lg"
              role="alert"
            >
              <span class="font-medium">No Published</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogCard;

import axios from "axios";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";
import { baseUrl } from "../../utils/env";
import {
  BLOG_LIST_FAIL,
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  BLOG_UPDATE_TO_PUBLISH_FAIL,
  BLOG_UPDATE_TO_PUBLISH_REQUEST,
  BLOG_UPDATE_TO_PUBLISH_SUCCESS,
} from "../constants/blogConstant";

export const getBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: BLOG_LIST_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`${baseUrl}/blog`, config);
    dispatch({
      type: BLOG_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: BLOG_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const updateBlogToPublished =
  (isPublished, uuid) => async (dispatch, getState) => {
    try {
      dispatch({ type: BLOG_UPDATE_TO_PUBLISH_REQUEST });
      const {
        adminLogin: { adminInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `${baseUrl}/blog/${uuid}/published`,
        { isPublished },
        config
      );

      if (isPublished) {
        toast.info("Blog Updated To Published", {
          autoClose: 1000,
        });
      } else {
        toast.info("Blog Remove From Published", {
          autoClose: 1000,
        });
      }
      dispatch({
        type: BLOG_UPDATE_TO_PUBLISH_SUCCESS,
        payload: data,
      });
    } catch (err) {
      toast.error(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
        {
          autoClose: 700,
        }
      );
      dispatch({
        type: BLOG_UPDATE_TO_PUBLISH_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

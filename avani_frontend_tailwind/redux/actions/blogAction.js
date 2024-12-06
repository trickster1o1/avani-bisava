import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../config";
import {
  BLOG_ADD_FAIL,
  BLOG_ADD_REQUEST,
  BLOG_ADD_SUCCESS,
  BLOG_DELETE_FAIL,
  BLOG_DELETE_REQUEST,
  BLOG_DELETE_SUCCESS,
  BLOG_DETAILS_FAIL,
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_SUCCESS,
  BLOG_LIST_BY_USERID_FAIL,
  BLOG_LIST_BY_USERID_REQUEST,
  BLOG_LIST_BY_USERID_SUCCESS,
  BLOG_LIST_FAIL,
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  BLOG_UPDATE_FAIL,
  BLOG_UPDATE_REQUEST,
  BLOG_UPDATE_SUCCESS,
} from "../constants/blogConstant";
import { getCookie } from "../utils";

export const getBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: BLOG_LIST_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`${API}/blog`, config);
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
export const getBlogsByUserId = (uuid) => async (dispatch) => {
  try {
    dispatch({ type: BLOG_LIST_BY_USERID_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };
    const { data } = await axios.get(`${API}/blog/user/${uuid}`, config);
    dispatch({
      type: BLOG_LIST_BY_USERID_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: BLOG_LIST_BY_USERID_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getBlog = (uuid) => async (dispatch) => {
  try {
    dispatch({ type: BLOG_DETAILS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`${API}/blog/${uuid}`, config);
    dispatch({
      type: BLOG_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: BLOG_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const createBlog =
  (slug, title, image, description, userId) => async (dispatch) => {
    try {
      dispatch({ type: BLOG_ADD_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      };
      const { data } = await axios.post(
        `${API}/blog`,
        { slug, title, image, description, userId },
        config
      );
      dispatch({
        type: BLOG_ADD_SUCCESS,
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
        type: BLOG_ADD_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
export const updateBlog =
  (slug, title, image, description, uuid) => async (dispatch) => {
    try {
      dispatch({ type: BLOG_UPDATE_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      };
      const { data } = await axios.put(
        `${API}/blog/${uuid}`,
        { slug, title, image, description },
        config
      );
      dispatch({
        type: BLOG_UPDATE_SUCCESS,
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
        type: BLOG_UPDATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
export const deleteBlog = (uuid, userId) => async (dispatch) => {
  try {
    dispatch({ type: BLOG_DELETE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };
    const { data } = await axios.delete(
      `${API}/blog/${uuid}/${userId}`,
      config
    );
    dispatch({
      type: BLOG_DELETE_SUCCESS,
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
      type: BLOG_DELETE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

import { baseUrl } from "../../utils/env";
import axios from "axios";
import {
  PRODUCT_ADD_FAIL,
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_FEATURED_LIST_FAIL,
  PRODUCT_FEATURED_LIST_REQUEST,
  PRODUCT_FEATURED_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_TO_FEATURED_FAIL,
  PRODUCT_UPDATE_TO_FEATURED_REQUEST,
  PRODUCT_UPDATE_TO_FEATURED_SUCCESS,
  PRODUCT_UPDATE_TO_PUBLISHED_FAIL,
  PRODUCT_UPDATE_TO_PUBLISHED_REQUEST,
  PRODUCT_UPDATE_TO_PUBLISHED_SUCCESS,
} from "../constants/productConstant";
import { toast } from "react-toastify";

export const listProduct =
  (page = "", key = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `${baseUrl}/product?page=${page}&key=${key}`,
        config
      );

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
export const listFeaturedProduct = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_FEATURED_LIST_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`${baseUrl}/product/featured`, config);

    dispatch({
      type: PRODUCT_FEATURED_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_FEATURED_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const detailProduct = (uuid) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`${baseUrl}/product/${uuid}`, config);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const addProduct =
  (
    slug,
    name,
    image,
    imageArray,
    main_category,
    child_category,
    sub_category,
    isFeatured,
    isPublished,
    price,
    price_discount,
    description
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_ADD_REQUEST });
      const {
        adminLogin: { adminInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `${baseUrl}/product`,
        {
          slug,
          name,
          image,
          imageArray,
          main_category,
          child_category,
          sub_category,
          isFeatured,
          isPublished,
          price,
          price_discount,
          description,
        },
        config
      );

      toast.info("Product Added", {
        autoClose: 700,
      });
      dispatch({
        type: PRODUCT_ADD_SUCCESS,
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
        type: PRODUCT_ADD_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
export const updateProduct =
  (
    slug,
    name,
    image,
    imageArray,
    main_category,
    child_category,
    sub_category,
    price,
    price_discount,
    description,
    productId
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_REQUEST });
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
        `${baseUrl}/product/${productId}`,
        {
          slug,
          name,
          image,
          imageArray,
          main_category,
          child_category,
          sub_category,
          price,
          price_discount,
          description,
        },
        config
      );

      toast.info("Product Updated", {
        autoClose: 700,
      });
      dispatch({
        type: PRODUCT_UPDATE_SUCCESS,
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
        type: PRODUCT_UPDATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
export const updateProductToFeatured =
  (isFeatured, productId) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_TO_FEATURED_REQUEST });
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
        `${baseUrl}/product/${productId}/featured`,
        {
          isFeatured,
        },
        config
      );

      toast.info("Product Updated To Featured", {
        autoClose: 700,
      });
      dispatch({
        type: PRODUCT_UPDATE_TO_FEATURED_SUCCESS,
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
        type: PRODUCT_UPDATE_TO_FEATURED_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const updateProductToPublished =
  (isPublished, productId) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_TO_PUBLISHED_REQUEST });
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
        `${baseUrl}/product/${productId}/published`,
        {
          isPublished,
        },
        config
      );

      if (isPublished) {
        toast.info("Product Updated To Published", {
          autoClose: 700,
        });
      } else {
        toast.info("Product Removed From Published", {
          autoClose: 700,
        });
      }

      dispatch({
        type: PRODUCT_UPDATE_TO_PUBLISHED_SUCCESS,
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
        type: PRODUCT_UPDATE_TO_PUBLISHED_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
export const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    const {
      adminLogin: { adminInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };
    const { data } = await axios.delete(
      `${baseUrl}/product/${productId}`,
      config
    );

    toast.info("Product Deleted Successfully", {
      autoClose: 700,
    });
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
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
      type: PRODUCT_DELETE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

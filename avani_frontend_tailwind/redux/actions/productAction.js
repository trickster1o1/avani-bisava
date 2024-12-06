import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../config";
import {
  CREATE_LOVED_PRODUCT_FAIL,
  CREATE_LOVED_PRODUCT_REQUEST,
  CREATE_LOVED_PRODUCT_SUCCESS,
  CREATE_PRODUCT_REVIEW_FAIL,
  CREATE_PRODUCT_REVIEW_REQUEST,
  CREATE_PRODUCT_REVIEW_SUCCESS,
  GET_LOVED_PRODUCT_FAIL,
  GET_LOVED_PRODUCT_REQUEST,
  GET_LOVED_PRODUCT_SUCCESS,
  PRODUCT_UPDATE_TO_TRENDING_FAIL,
  PRODUCT_UPDATE_TO_TRENDING_REQUEST,
  PRODUCT_UPDATE_TO_TRENDING_SUCCESS,
} from "../constants/productConstant";
import { getCookie } from "../utils";

export const updateProductToTrending = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_TO_TRENDING_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${API}/product/${productId}/trending`,
      {},
      config
    );

    dispatch({
      type: PRODUCT_UPDATE_TO_TRENDING_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_UPDATE_TO_TRENDING_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createLovedProduct =
  (userId, productId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_LOVED_PRODUCT_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      };

      const { data } = await axios.post(
        `${API}/lovedProduct`,
        { userId, productId },
        config
      );

      dispatch({
        type: CREATE_LOVED_PRODUCT_SUCCESS,
        payload: data,
      });

      toast.info("Product Loved", {
        autoClose: 700,
      });
    } catch (err) {
      toast.error("Login To React This Product", {
        autoClose: 700,
      });
      dispatch({
        type: CREATE_LOVED_PRODUCT_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const getLovedProductByUserId =
  (userId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_LOVED_PRODUCT_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      };

      const { data } = await axios.get(`${API}/lovedProduct/${userId}`, config);

      dispatch({
        type: GET_LOVED_PRODUCT_SUCCESS,
        payload: data.products,
      });
    } catch (err) {
      dispatch({
        type: GET_LOVED_PRODUCT_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const createProductReview =
  (rating, comment, user_id, product_id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_PRODUCT_REVIEW_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      };

      const { data } = await axios.post(
        `${API}/review`,
        { rating, comment, user_id, product_id },
        config
      );

      dispatch({
        type: CREATE_PRODUCT_REVIEW_SUCCESS,
        payload: data,
      });

      toast.info("Review Added To This Product", {
        autoClose: 700,
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
        type: CREATE_PRODUCT_REVIEW_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

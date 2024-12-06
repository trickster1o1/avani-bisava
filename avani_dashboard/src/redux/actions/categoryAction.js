import { baseUrl } from "../../utils/env";
import axios from "axios";
import {
  ADD_CATEGORY,
  ADD_SINGLE_CATEGORY,
  CHILD_CATEGORY_IMAGE_ADD_FAIL,
  CHILD_CATEGORY_IMAGE_ADD_REQUEST,
  CHILD_CATEGORY_IMAGE_ADD_SUCCESS,
  CHILD_CATEGORY_IMAGE_DELETE_FAIL,
  CHILD_CATEGORY_IMAGE_DELETE_REQUEST,
  CHILD_CATEGORY_IMAGE_DELETE_SUCCESS,
  CHILD_CATEGORY_IMAGE_DETAIL_FAIL,
  CHILD_CATEGORY_IMAGE_DETAIL_REQUEST,
  CHILD_CATEGORY_IMAGE_DETAIL_SUCCESS,
  CHILD_CATEGORY_IMAGE_LIST_FAIL,
  CHILD_CATEGORY_IMAGE_LIST_REQUEST,
  CHILD_CATEGORY_IMAGE_LIST_SUCCESS,
  CHILD_CATEGORY_IMAGE_UPDATE_FAIL,
  CHILD_CATEGORY_IMAGE_UPDATE_REQUEST,
  CHILD_CATEGORY_IMAGE_UPDATE_SUCCESS,
} from "../constants/categoryConstant";

export const saveCategory = (category) => async (dispatch) => {
  dispatch({
    type: ADD_CATEGORY,
    payload: category,
  });
};

export const saveSingleCategory = (category) => async (dispatch) => {
  dispatch({
    type: ADD_SINGLE_CATEGORY,
    payload: category,
  });
};

export const listChildCategoryImage = () => async (dispatch) => {
  try {
    dispatch({ type: CHILD_CATEGORY_IMAGE_LIST_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`${baseUrl}/childCategoryImage`, config);

    dispatch({
      type: CHILD_CATEGORY_IMAGE_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: CHILD_CATEGORY_IMAGE_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const detailChildCategoryImage =
  (uuid) => async (dispatch, getState) => {
    try {
      dispatch({ type: CHILD_CATEGORY_IMAGE_DETAIL_REQUEST });
      const {
        adminLogin: { adminInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `${baseUrl}/childCategoryImage/${uuid}`,
        config
      );

      dispatch({
        type: CHILD_CATEGORY_IMAGE_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: CHILD_CATEGORY_IMAGE_DETAIL_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const addChildCategoryImage =
  (main_category, sub_category, child_category, image) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: CHILD_CATEGORY_IMAGE_ADD_REQUEST });
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
        `${baseUrl}/childCategoryImage`,
        {
          main_category,
          child_category,
          sub_category,
          image,
        },
        config
      );

      // toast.info("Login Successfully", {
      //   autoClose: 1000,
      // });
      dispatch({
        type: CHILD_CATEGORY_IMAGE_ADD_SUCCESS,
        payload: data,
      });
    } catch (err) {
      // toast.error("Invalid Crenditial", {
      //   autoClose: 1000,
      // });
      dispatch({
        type: CHILD_CATEGORY_IMAGE_ADD_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const updateChildCategoryImage =
  (main_category, child_category, sub_category, image, categoryId) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: CHILD_CATEGORY_IMAGE_UPDATE_REQUEST });
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
        `${baseUrl}/childCategoryImage/${categoryId}`,
        {
          main_category,
          child_category,
          sub_category,
          image,
        },
        config
      );

      // toast.info("Login Successfully", {
      //   autoClose: 1000,
      // });
      dispatch({
        type: CHILD_CATEGORY_IMAGE_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (err) {
      // toast.error("Invalid Crenditial", {
      //   autoClose: 1000,
      // });
      dispatch({
        type: CHILD_CATEGORY_IMAGE_UPDATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const deleteChildCategoryImage =
  (categoryId) => async (dispatch, getState) => {
    try {
      dispatch({ type: CHILD_CATEGORY_IMAGE_DELETE_REQUEST });
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
        `${baseUrl}/childCategoryImage/${categoryId}`,
        config
      );

      // toast.info("Login Successfully", {
      //   autoClose: 1000,
      // });
      dispatch({
        type: CHILD_CATEGORY_IMAGE_DELETE_SUCCESS,
        payload: data,
      });
    } catch (err) {
      // toast.error("Invalid Crenditial", {
      //   autoClose: 1000,
      // });
      dispatch({
        type: CHILD_CATEGORY_IMAGE_DELETE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

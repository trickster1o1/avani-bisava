import { baseUrl } from "../../utils/env";
import axios from "axios";
import {
  BANNER_ADD_FAIL,
  BANNER_ADD_REQUEST,
  BANNER_ADD_SUCCESS,
  BANNER_DELETE_FAIL,
  BANNER_DELETE_REQUEST,
  BANNER_DELETE_SUCCESS,
  BANNER_DETAIL_FAIL,
  BANNER_DETAIL_REQUEST,
  BANNER_DETAIL_SUCCESS,
  BANNER_LIST_FAIL,
  BANNER_LIST_REQUEST,
  BANNER_LIST_SUCCESS,
  BANNER_UPDATE_FAIL,
  BANNER_UPDATE_REQUEST,
  BANNER_UPDATE_SUCCESS,
  BANNER_UPDATE_TO_PUBLISHED_FAIL,
  BANNER_UPDATE_TO_PUBLISHED_REQUEST,
  BANNER_UPDATE_TO_PUBLISHED_SUCCESS,
} from "../constants/bannerConstant";
import { toast } from "react-toastify";

export const listBanner = () => async (dispatch) => {
  try {
    dispatch({ type: BANNER_LIST_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`${baseUrl}/banner`, config);

    dispatch({
      type: BANNER_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: BANNER_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getBannerDetail = (uuid) => async (dispatch) => {
  try {
    dispatch({ type: BANNER_DETAIL_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`${baseUrl}/banner/${uuid}`, config);

    dispatch({
      type: BANNER_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: BANNER_DETAIL_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const addBanner =
  (name, image, type, product_id) => async (dispatch, getState) => {
    try {
      dispatch({ type: BANNER_ADD_REQUEST });
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
        `${baseUrl}/banner`,
        {
          name,
          image,
          type,
          product_id,
        },
        config
      );

      toast.info("Banner Added Successfully", {
        autoClose: 1000,
      });
      dispatch({
        type: BANNER_ADD_SUCCESS,
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
        type: BANNER_ADD_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
export const updateBanner =
  (name, image, type, product_id, id) => async (dispatch, getState) => {
    try {
      dispatch({ type: BANNER_UPDATE_REQUEST });
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
        `${baseUrl}/banner/${id}`,
        {
          name,
          image,
          type,
          product_id,
        },
        config
      );

      toast.info("Banner Updated Successfully", {
        autoClose: 700,
      });
      dispatch({
        type: BANNER_UPDATE_SUCCESS,
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
        type: BANNER_UPDATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
export const updateBannerToPublished =
  (isPublished, id) => async (dispatch, getState) => {
    try {
      dispatch({ type: BANNER_UPDATE_TO_PUBLISHED_REQUEST });
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
        `${baseUrl}/banner/${id}/published`,
        {
          isPublished,
        },
        config
      );
      if (isPublished) {
        toast.info("Banner Updated To Published", {
          autoClose: 1000,
        });
      } else {
        toast.info("Banner Remove From Published", {
          autoClose: 1000,
        });
      }
      dispatch({
        type: BANNER_UPDATE_TO_PUBLISHED_SUCCESS,
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
        type: BANNER_UPDATE_TO_PUBLISHED_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
export const deleteBanner = (bannerId) => async (dispatch, getState) => {
  try {
    dispatch({ type: BANNER_DELETE_REQUEST });
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
      `${baseUrl}/banner/${bannerId}`,
      config
    );

    toast.info("Banner Deleted Successfully", {
      autoClose: 1000,
    });
    dispatch({
      type: BANNER_DELETE_SUCCESS,
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
      type: BANNER_DELETE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

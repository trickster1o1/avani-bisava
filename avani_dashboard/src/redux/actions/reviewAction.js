import axios from "axios";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";
import { baseUrl } from "../../utils/env";
import {
  REVIEW_DELETE_FAIL,
  REVIEW_DELETE_REQUEST,
  REVIEW_DELETE_SUCCESS,
  REVIEW_LIST_FAIL,
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_SUCCESS,
} from "../constants/reviewConstant";

export const getReviews = () => async (dispatch) => {
  try {
    dispatch({ type: REVIEW_LIST_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`${baseUrl}/review`, config);
    dispatch({
      type: REVIEW_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: REVIEW_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteReview = (uuid) => async (dispatch, getState) => {
  try {
    dispatch({ type: REVIEW_DELETE_REQUEST });
    const {
      adminLogin: { adminInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };
    const { data } = await axios.delete(`${baseUrl}/review/${uuid}`, config);
    toast.info("Review Deleted Successfully", {
      autoClose: 700,
    });
    dispatch({
      type: REVIEW_DELETE_SUCCESS,
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
      type: REVIEW_DELETE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

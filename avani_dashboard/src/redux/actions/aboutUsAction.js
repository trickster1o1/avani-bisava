import { baseUrl } from "../../utils/env";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ABOUTUS_LIST_FAIL,
  ABOUTUS_LIST_REQUEST,
  ABOUTUS_LIST_SUCCESS,
  ABOUTUS_UPDATE_FAIL,
  ABOUTUS_UPDATE_REQUEST,
  ABOUTUS_UPDATE_SUCCESS,
} from "../constants/aboutUsConstant";

export const listAboutUs = () => async (dispatch) => {
  try {
    dispatch({ type: ABOUTUS_LIST_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`${baseUrl}/aboutus`, config);

    dispatch({
      type: ABOUTUS_LIST_SUCCESS,
      payload: data[0],
    });
  } catch (err) {
    dispatch({
      type: ABOUTUS_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const updateAboutUs =
  (title, description, image, aboutId) => async (dispatch, getState) => {
    try {
      dispatch({ type: ABOUTUS_UPDATE_REQUEST });
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
        `${baseUrl}/aboutus/${aboutId}`,
        {
          title,
          description,
          image,
        },
        config
      );

      toast.info("About Us Updated Successfully", {
        autoClose: 1000,
      });
      dispatch({
        type: ABOUTUS_UPDATE_SUCCESS,
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
        type: ABOUTUS_UPDATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

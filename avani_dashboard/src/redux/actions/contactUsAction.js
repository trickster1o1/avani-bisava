import { baseUrl } from "../../utils/env";
import axios from "axios";
// import { toast } from "react-toastify";
import {
  CONTACTUS_LIST_FAIL,
  CONTACTUS_LIST_REQUEST,
  CONTACTUS_LIST_SUCCESS,
  CONTACTUS_UPDATE_FAIL,
  CONTACTUS_UPDATE_REQUEST,
  CONTACTUS_UPDATE_SUCCESS,
} from "../constants/contactUsConstant";
import { toast } from "react-toastify";

export const listContactUs = () => async (dispatch) => {
  try {
    dispatch({ type: CONTACTUS_LIST_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`${baseUrl}/contact`, config);

    dispatch({
      type: CONTACTUS_LIST_SUCCESS,
      payload: data[0],
    });
  } catch (err) {
    dispatch({
      type: CONTACTUS_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const updateContactUs =
  (phone, street, address, email, fbLink, instaLink, contactId) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: CONTACTUS_UPDATE_REQUEST });
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
        `${baseUrl}/contact/${contactId}`,
        {
          phone,
          street,
          address,
          email,
          fbLink,
          instaLink,
        },
        config
      );

      toast.info("Contact Us Updated Successfully", {
        autoClose: 1000,
      });
      dispatch({
        type: CONTACTUS_UPDATE_SUCCESS,
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
        type: CONTACTUS_UPDATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

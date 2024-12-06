import { baseUrl } from "../../utils/env";
import axios from "axios";
import {
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
} from "../constants/userConstant";

export const getUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });
    const {
      adminLogin: { adminInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };
    const { data } = await axios.get(`${baseUrl}/user`, config);

    // toast.info("Login Successfully", {
    //   autoClose: 1000,
    // });
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    // toast.error("Invalid Crenditial", {
    //   autoClose: 1000,
    // });
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

import { baseUrl } from "../../utils/env";
import axios from "axios";
import {
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGOUT,
} from "../constants/adminConstant";
import { toast } from "react-toastify";

export const adminLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${baseUrl}/admin/login`,
      { email, password },
      config
    );

    toast.info("Login Successfully", {
      autoClose: 1000,
    });
    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("adminInfo", JSON.stringify(data));
  } catch (err) {
    toast.error("Invalid Crenditial", {
      autoClose: 1000,
    });
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("adminInfo");
  dispatch({ type: ADMIN_LOGOUT });
};

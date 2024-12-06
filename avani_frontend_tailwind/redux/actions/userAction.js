import { API } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../constants/userConstant";
import {
  removeLocalStorage,
  setCookies,
  setLocalStorage,
  removeCookie,
  getCookie,
} from "../utils";

export const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${API}/user/login`,
      { email, password },
      config
    );

    toast.info("Login Successfully", {
      autoClose: 700,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    let userData = {
      id: data.id,
      uuid: data.uuid,
      name: data.name,
      email: data.email,
      phone: data.phone,
    };
    setCookies("token", data.token);
    setLocalStorage("avani_user", userData);
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
      type: USER_LOGIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const userRegister =
  (name, phone, email, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(`${API}/user`, { name, phone, email, password }, config);

      toast.info("Register Successfully", {
        autoClose: 700,
      });
      dispatch({
        type: USER_REGISTER_SUCCESS,
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
        type: USER_REGISTER_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const userUpdate =
  (name, phone, email, password, userId) => async (dispatch) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      };
      await axios.put(
        `${API}/user/${userId}`,
        { name, phone, email, password },
        config
      );

      toast.info("Profile Update Successfully", {
        autoClose: 700,
      });
      dispatch({
        type: USER_UPDATE_SUCCESS,
      });
      removeCookie("token");
      removeLocalStorage("avani_user");
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
        type: USER_UPDATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const logout = () => async (dispatch) => {
  removeCookie("token");
  removeLocalStorage("avani_user");
  dispatch({ type: USER_LOGOUT });
};

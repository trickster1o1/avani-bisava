import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../config";
import {
  ORDER_ADD_FAIL,
  ORDER_ADD_REQUEST,
  ORDER_ADD_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_BY_USERID_FAIL,
  ORDER_LIST_BY_USERID_REQUEST,
  ORDER_LIST_BY_USERID_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_UPDATE_TO_DELIVERED_FAIL,
  ORDER_UPDATE_TO_DELIVERED_REQUEST,
  ORDER_UPDATE_TO_DELIVERED_SUCCESS,
  ORDER_UPDATE_TO_PAY_FAIL,
  ORDER_UPDATE_TO_PAY_REQUEST,
  ORDER_UPDATE_TO_PAY_SUCCESS,
} from "../constants/orderConstant";
import { getCookie } from "../utils";

export const getOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`${API}/order`, config);
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const getOrdersByUserId = (uuid) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_LIST_BY_USERID_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };
    const { data } = await axios.get(`${API}/order/user/${uuid}`, config);
    dispatch({
      type: ORDER_LIST_BY_USERID_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_LIST_BY_USERID_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const getOrder = (uuid) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };
    const { data } = await axios.get(`${API}/order/${uuid}`, config);
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const createOrders = (order) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_ADD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };
    const { data } = await axios.post(`${API}/order`, order, config);
    dispatch({
      type: ORDER_ADD_SUCCESS,
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
      type: ORDER_ADD_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const payOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_UPDATE_TO_PAY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`${API}/order/${orderId}/pay`, {}, config);

    dispatch({
      type: ORDER_UPDATE_TO_PAY_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_UPDATE_TO_PAY_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deliverOrder = (uuid) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_UPDATE_TO_DELIVERED_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`${API}/order/${uuid}/deliver`, {}, config);

    dispatch({
      type: ORDER_UPDATE_TO_DELIVERED_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: ORDER_UPDATE_TO_DELIVERED_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

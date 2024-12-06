import axios from "axios";
import { baseUrl } from "../../utils/env";
import {
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_UPDATE_TO_DELIVERED_FAIL,
  ORDER_UPDATE_TO_DELIVERED_REQUEST,
  ORDER_UPDATE_TO_DELIVERED_SUCCESS,
} from "../constants/orderConstant";

export const getOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const {
      adminLogin: { adminInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };
    const { data } = await axios.get(`${baseUrl}/order`, config);
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

export const getOrder = (uuid) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const {
      adminLogin: { adminInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };
    const { data } = await axios.get(`${baseUrl}/order/${uuid}`, config);
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

export const deliverOrder = (uuid) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_UPDATE_TO_DELIVERED_REQUEST });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    await axios.put(`${baseUrl}/order/${uuid}/deliver`, {}, config);

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

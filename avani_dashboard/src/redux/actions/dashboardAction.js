import axios from "axios";
import { baseUrl } from "../../utils/env";
import {
  DASHBOARD_LIST_FAIL,
  DASHBOARD_LIST_REQUEST,
  DASHBOARD_LIST_SUCCESS,
} from "../constants/dashboardConstant";

export const getDashboard = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DASHBOARD_LIST_REQUEST });
    const {
      adminLogin: { adminInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };
    const { data } = await axios.get(`${baseUrl}/dashboard`, config);
    dispatch({
      type: DASHBOARD_LIST_SUCCESS,
      payload: data[0],
    });
  } catch (err) {
    dispatch({
      type: DASHBOARD_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

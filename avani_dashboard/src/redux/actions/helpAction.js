import { baseUrl } from "../../utils/env";
import axios from "axios";
import {
  HELP_LIST_FAIL,
  HELP_LIST_REQUEST,
  HELP_LIST_SUCCESS,
  HELP_UPDATE_FAIL,
  HELP_UPDATE_REQUEST,
  HELP_UPDATE_SUCCESS,
} from "../constants/helpConstant";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

export const listHelp = (tag) => async (dispatch) => {
  try {
    dispatch({ type: HELP_LIST_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`${baseUrl}/help/${tag}`, config);

    dispatch({
      type: HELP_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: HELP_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const updateHelp =
  (description, helpId) => async (dispatch, getState) => {
    try {
      dispatch({ type: HELP_UPDATE_REQUEST });
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
        `${baseUrl}/help/${helpId}`,
        {
          description,
        },
        config
      );

      toast.info("Policy Updated", {
        autoClose: 700,
      });
      dispatch({
        type: HELP_UPDATE_SUCCESS,
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
        type: HELP_UPDATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

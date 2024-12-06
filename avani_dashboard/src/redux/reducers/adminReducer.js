import {
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_RESET,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGOUT,
} from "../constants/adminConstant";

export const adminLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case ADMIN_LOGIN_SUCCESS:
      return {
        loading: false,
        success: true,
        adminInfo: action.payload,
      };

    case ADMIN_LOGIN_FAIL:
      return {
        loading: true,
        success: false,
        error: action.payload,
      };
    case ADMIN_LOGIN_RESET:
      return {
        loading: false,
        userInfo: null,
      };
    case ADMIN_LOGOUT:
      return {};
    default:
      return state;
  }
};

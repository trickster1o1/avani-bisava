import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_RESET,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstant";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        success: true,
        userInfo: action.payload,
      };

    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
      return {
        loading: true,
        success: false,
        error: action.payload,
      };
    case USER_LOGIN_RESET:
      return {
        loading: false,
        userInfo: null,
      };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case USER_UPDATE_FAIL:
      return {
        loading: true,
        success: false,
        error: action.payload,
      };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

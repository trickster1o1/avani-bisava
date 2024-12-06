import {
  ABOUTUS_LIST_FAIL,
  ABOUTUS_LIST_REQUEST,
  ABOUTUS_LIST_SUCCESS,
  ABOUTUS_UPDATE_FAIL,
  ABOUTUS_UPDATE_REQUEST,
  ABOUTUS_UPDATE_RESET,
  ABOUTUS_UPDATE_SUCCESS,
} from "../constants/aboutUsConstant";

export const listAboutUsReducer = (state = {}, action) => {
  switch (action.type) {
    case ABOUTUS_LIST_REQUEST:
      return {
        loading: true,
      };
    case ABOUTUS_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        about: action.payload,
      };

    case ABOUTUS_LIST_FAIL:
      return {
        loading: true,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const aboutUsEditReducer = (state = {}, action) => {
  switch (action.type) {
    case ABOUTUS_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case ABOUTUS_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ABOUTUS_UPDATE_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    case ABOUTUS_UPDATE_RESET:
      return {
        loading: true,
        success: false,
      };
    default:
      return state;
  }
};

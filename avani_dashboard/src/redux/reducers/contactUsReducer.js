import {
  CONTACTUS_LIST_FAIL,
  CONTACTUS_LIST_REQUEST,
  CONTACTUS_LIST_SUCCESS,
  CONTACTUS_UPDATE_FAIL,
  CONTACTUS_UPDATE_REQUEST,
  CONTACTUS_UPDATE_RESET,
  CONTACTUS_UPDATE_SUCCESS,
} from "../constants/contactUsConstant";

export const listContactUsReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTACTUS_LIST_REQUEST:
      return {
        loading: true,
      };
    case CONTACTUS_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        contact: action.payload,
      };

    case CONTACTUS_LIST_FAIL:
      return {
        loading: true,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const contactUsEditReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTACTUS_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case CONTACTUS_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CONTACTUS_UPDATE_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    case CONTACTUS_UPDATE_RESET:
      return {
        loading: true,
        success: false,
      };
    default:
      return state;
  }
};

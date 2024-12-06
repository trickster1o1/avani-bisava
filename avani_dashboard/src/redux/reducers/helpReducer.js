import {
  HELP_LIST_FAIL,
  HELP_LIST_REQUEST,
  HELP_LIST_SUCCESS,
  HELP_UPDATE_FAIL,
  HELP_UPDATE_REQUEST,
  HELP_UPDATE_RESET,
  HELP_UPDATE_SUCCESS,
} from "../constants/helpConstant";

export const listHelpDescriptionReducer = (state = {}, action) => {
  switch (action.type) {
    case HELP_LIST_REQUEST:
      return {
        loading: true,
      };
    case HELP_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        descriptions: action.payload,
      };

    case HELP_LIST_FAIL:
      return {
        loading: true,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const helpDescriptionEditReducer = (state = {}, action) => {
  switch (action.type) {
    case HELP_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case HELP_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case HELP_UPDATE_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    case HELP_UPDATE_RESET:
      return {
        loading: true,
        success: false,
      };
    default:
      return state;
  }
};

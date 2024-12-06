import {
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
} from "../constants/userConstant";

export const userListReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {
        loading: true,
      };
    case USER_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        users: action.payload,
      };

    case USER_LIST_FAIL:
      return {
        loading: true,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

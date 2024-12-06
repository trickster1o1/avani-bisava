import {
  REVIEW_DELETE_FAIL,
  REVIEW_DELETE_REQUEST,
  REVIEW_DELETE_RESET,
  REVIEW_DELETE_SUCCESS,
  REVIEW_LIST_FAIL,
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_SUCCESS,
} from "../constants/reviewConstant";

export const listReviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_LIST_REQUEST:
      return {
        loading: true,
      };
    case REVIEW_LIST_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };

    case REVIEW_LIST_FAIL:
      return {
        loading: true,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const reviewDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_DELETE_REQUEST:
      return {
        loading: true,
      };
    case REVIEW_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case REVIEW_DELETE_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    case REVIEW_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

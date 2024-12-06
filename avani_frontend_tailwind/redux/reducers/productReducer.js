import {
  CREATE_LOVED_PRODUCT_FAIL,
  CREATE_LOVED_PRODUCT_REQUEST,
  CREATE_LOVED_PRODUCT_SUCCESS,
  CREATE_PRODUCT_REVIEW_FAIL,
  CREATE_PRODUCT_REVIEW_REQUEST,
  CREATE_PRODUCT_REVIEW_RESET,
  CREATE_PRODUCT_REVIEW_SUCCESS,
  GET_LOVED_PRODUCT_FAIL,
  GET_LOVED_PRODUCT_REQUEST,
  GET_LOVED_PRODUCT_SUCCESS,
  PRODUCT_UPDATE_TO_TRENDING_FAIL,
  PRODUCT_UPDATE_TO_TRENDING_REQUEST,
  PRODUCT_UPDATE_TO_TRENDING_SUCCESS,
} from "../constants/productConstant";

export const productTrendingReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_TO_TRENDING_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_UPDATE_TO_TRENDING_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case PRODUCT_UPDATE_TO_TRENDING_FAIL:
      return {
        loading: true,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const createLovedProductReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_LOVED_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case CREATE_LOVED_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case CREATE_LOVED_PRODUCT_FAIL:
      return {
        loading: true,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const getLovedProductByUserIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LOVED_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case GET_LOVED_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
        products: action.payload,
      };

    case GET_LOVED_PRODUCT_FAIL:
      return {
        loading: true,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createProductReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case CREATE_PRODUCT_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case CREATE_PRODUCT_REVIEW_FAIL:
      return {
        loading: true,
        success: false,
        error: action.payload,
      };

    case CREATE_PRODUCT_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

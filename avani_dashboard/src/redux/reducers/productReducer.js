import {
  PRODUCT_ADD_FAIL,
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_RESET,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_FEATURED_LIST_FAIL,
  PRODUCT_FEATURED_LIST_REQUEST,
  PRODUCT_FEATURED_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_TO_FEATURED_FAIL,
  PRODUCT_UPDATE_TO_FEATURED_REQUEST,
  PRODUCT_UPDATE_TO_FEATURED_RESET,
  PRODUCT_UPDATE_TO_FEATURED_SUCCESS,
  PRODUCT_UPDATE_TO_PUBLISHED_FAIL,
  PRODUCT_UPDATE_TO_PUBLISHED_REQUEST,
  PRODUCT_UPDATE_TO_PUBLISHED_RESET,
  PRODUCT_UPDATE_TO_PUBLISHED_SUCCESS,
} from "../constants/productConstant";

export const listProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };

    case PRODUCT_LIST_FAIL:
      return {
        loading: true,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const listFeaturedProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_FEATURED_LIST_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_FEATURED_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        products: action.payload,
      };

    case PRODUCT_FEATURED_LIST_FAIL:
      return {
        loading: true,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const listProductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };

    case PRODUCT_DETAILS_FAIL:
      return {
        loading: true,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const productAddReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_ADD_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_ADD_SUCCESS:
      return {
        loading: false,
        success: true,
        // product: action.payload,
      };
    case PRODUCT_ADD_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    case PRODUCT_ADD_RESET:
      return {
        loading: true,
        success: false,
      };
    default:
      return state;
  }
};
export const productEditReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        // product: action.payload,
      };
    case PRODUCT_UPDATE_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    case PRODUCT_UPDATE_RESET:
      return {
        loading: true,
        success: false,
      };
    default:
      return state;
  }
};
export const productEditToFeaturedReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_TO_FEATURED_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_UPDATE_TO_FEATURED_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PRODUCT_UPDATE_TO_FEATURED_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    case PRODUCT_UPDATE_TO_FEATURED_RESET:
      return {
        loading: true,
        success: false,
      };
    default:
      return state;
  }
};
export const productEditToPublishedReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_TO_PUBLISHED_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_UPDATE_TO_PUBLISHED_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PRODUCT_UPDATE_TO_PUBLISHED_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    case PRODUCT_UPDATE_TO_PUBLISHED_RESET:
      return {
        loading: true,
        success: false,
      };
    default:
      return state;
  }
};
export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PRODUCT_DELETE_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    // case DELETE_PRODUCT_RESET:
    //   return {
    //     loading: true,
    //     success: false,
    //   };
    default:
      return state;
  }
};

import {
  BANNER_ADD_FAIL,
  BANNER_ADD_REQUEST,
  BANNER_ADD_RESET,
  BANNER_ADD_SUCCESS,
  BANNER_DELETE_FAIL,
  BANNER_DELETE_REQUEST,
  BANNER_DELETE_SUCCESS,
  BANNER_DETAIL_FAIL,
  BANNER_DETAIL_REQUEST,
  BANNER_DETAIL_SUCCESS,
  BANNER_LIST_FAIL,
  BANNER_LIST_REQUEST,
  BANNER_LIST_SUCCESS,
  BANNER_UPDATE_FAIL,
  BANNER_UPDATE_REQUEST,
  BANNER_UPDATE_RESET,
  BANNER_UPDATE_SUCCESS,
  BANNER_UPDATE_TO_PUBLISHED_FAIL,
  BANNER_UPDATE_TO_PUBLISHED_REQUEST,
  BANNER_UPDATE_TO_PUBLISHED_RESET,
  BANNER_UPDATE_TO_PUBLISHED_SUCCESS,
} from "../constants/bannerConstant";

export const listBannerReducer = (state = {}, action) => {
  switch (action.type) {
    case BANNER_LIST_REQUEST:
      return {
        loading: true,
      };
    case BANNER_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        banner: action.payload,
      };

    case BANNER_LIST_FAIL:
      return {
        loading: true,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const bannerDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case BANNER_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case BANNER_DETAIL_SUCCESS:
      return {
        loading: false,
        success: true,
        banner: action.payload,
      };

    case BANNER_DETAIL_FAIL:
      return {
        loading: true,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const bannerAddReducer = (state = {}, action) => {
  switch (action.type) {
    case BANNER_ADD_REQUEST:
      return {
        loading: true,
      };
    case BANNER_ADD_SUCCESS:
      return {
        loading: false,
        success: true,
        // product: action.payload,
      };
    case BANNER_ADD_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    case BANNER_ADD_RESET:
      return {
        loading: true,
        success: false,
      };
    default:
      return state;
  }
};
export const bannerEditReducer = (state = {}, action) => {
  switch (action.type) {
    case BANNER_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case BANNER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        // product: action.payload,
      };
    case BANNER_UPDATE_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    case BANNER_UPDATE_RESET:
      return {
        loading: true,
        success: false,
      };
    default:
      return state;
  }
};
export const bannerEditToPublishedReducer = (state = {}, action) => {
  switch (action.type) {
    case BANNER_UPDATE_TO_PUBLISHED_REQUEST:
      return {
        loading: true,
      };
    case BANNER_UPDATE_TO_PUBLISHED_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case BANNER_UPDATE_TO_PUBLISHED_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    case BANNER_UPDATE_TO_PUBLISHED_RESET:
      return {
        loading: true,
        success: false,
      };
    default:
      return state;
  }
};
export const bannerDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BANNER_DELETE_REQUEST:
      return {
        loading: true,
      };
    case BANNER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case BANNER_DELETE_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

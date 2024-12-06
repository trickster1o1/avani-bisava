import {
  BLOG_ADD_FAIL,
  BLOG_ADD_REQUEST,
  BLOG_ADD_RESET,
  BLOG_ADD_SUCCESS,
  BLOG_DELETE_FAIL,
  BLOG_DELETE_REQUEST,
  BLOG_DELETE_RESET,
  BLOG_DELETE_SUCCESS,
  BLOG_DETAILS_FAIL,
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_SUCCESS,
  BLOG_LIST_BY_USERID_FAIL,
  BLOG_LIST_BY_USERID_REQUEST,
  BLOG_LIST_BY_USERID_SUCCESS,
  BLOG_LIST_FAIL,
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  BLOG_UPDATE_FAIL,
  BLOG_UPDATE_REQUEST,
  BLOG_UPDATE_RESET,
  BLOG_UPDATE_SUCCESS,
} from "../constants/blogConstant";

export const listBlogsReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_LIST_REQUEST:
      return {
        loading: true,
      };
    case BLOG_LIST_SUCCESS:
      return {
        loading: false,
        blogs: action.payload,
      };

    case BLOG_LIST_FAIL:
      return {
        loading: true,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const listBlogsByUserIdReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_LIST_BY_USERID_REQUEST:
      return {
        loading: true,
      };
    case BLOG_LIST_BY_USERID_SUCCESS:
      return {
        loading: false,
        blogs: action.payload,
      };

    case BLOG_LIST_BY_USERID_FAIL:
      return {
        loading: true,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const listBlogReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case BLOG_DETAILS_SUCCESS:
      return {
        loading: false,
        blog: action.payload,
      };

    case BLOG_DETAILS_FAIL:
      return {
        loading: true,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const createBlogReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_ADD_REQUEST:
      return {
        loading: true,
      };
    case BLOG_ADD_SUCCESS:
      return {
        loading: false,
        success: true,
        blogs: action.payload,
      };

    case BLOG_ADD_FAIL:
      return {
        loading: true,
        success: false,
        error: action.payload,
      };

    case BLOG_ADD_RESET:
      return {};

    default:
      return state;
  }
};
export const updateBlogReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case BLOG_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case BLOG_UPDATE_FAIL:
      return {
        loading: true,
        success: false,
        error: action.payload,
      };

    case BLOG_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};
export const deleteBlogReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_DELETE_REQUEST:
      return {
        loading: true,
      };
    case BLOG_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case BLOG_DELETE_FAIL:
      return {
        loading: true,
        success: false,
        error: action.payload,
      };

    case BLOG_DELETE_RESET:
      return {};

    default:
      return state;
  }
};

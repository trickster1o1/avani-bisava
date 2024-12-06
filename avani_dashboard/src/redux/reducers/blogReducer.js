import {
  BLOG_LIST_FAIL,
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  BLOG_UPDATE_TO_PUBLISH_FAIL,
  BLOG_UPDATE_TO_PUBLISH_REQUEST,
  BLOG_UPDATE_TO_PUBLISH_RESET,
  BLOG_UPDATE_TO_PUBLISH_SUCCESS,
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
export const updateBlogToPublishedReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_UPDATE_TO_PUBLISH_REQUEST:
      return {
        loading: true,
      };
    case BLOG_UPDATE_TO_PUBLISH_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case BLOG_UPDATE_TO_PUBLISH_FAIL:
      return {
        loading: true,
        error: action.payload,
      };

    case BLOG_UPDATE_TO_PUBLISH_RESET:
      return {};

    default:
      return state;
  }
};

import {
  ADD_CATEGORY,
  ADD_SINGLE_CATEGORY,
  CHILD_CATEGORY_IMAGE_ADD_FAIL,
  CHILD_CATEGORY_IMAGE_ADD_REQUEST,
  CHILD_CATEGORY_IMAGE_ADD_RESET,
  CHILD_CATEGORY_IMAGE_ADD_SUCCESS,
  CHILD_CATEGORY_IMAGE_DELETE_FAIL,
  CHILD_CATEGORY_IMAGE_DELETE_REQUEST,
  CHILD_CATEGORY_IMAGE_DELETE_SUCCESS,
  CHILD_CATEGORY_IMAGE_DETAIL_FAIL,
  CHILD_CATEGORY_IMAGE_DETAIL_REQUEST,
  CHILD_CATEGORY_IMAGE_DETAIL_SUCCESS,
  CHILD_CATEGORY_IMAGE_LIST_FAIL,
  CHILD_CATEGORY_IMAGE_LIST_REQUEST,
  CHILD_CATEGORY_IMAGE_LIST_SUCCESS,
  CHILD_CATEGORY_IMAGE_UPDATE_FAIL,
  CHILD_CATEGORY_IMAGE_UPDATE_REQUEST,
  CHILD_CATEGORY_IMAGE_UPDATE_RESET,
  CHILD_CATEGORY_IMAGE_UPDATE_SUCCESS,
} from "../constants/categoryConstant";

export const listCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        success: true,
        category: action.payload,
      };

    default:
      return state;
  }
};
export const listSingleCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_SINGLE_CATEGORY:
      return {
        success: true,
        category: action.payload,
      };

    default:
      return state;
  }
};

export const listChildCategoryImagesReducer = (state = {}, action) => {
  switch (action.type) {
    case CHILD_CATEGORY_IMAGE_LIST_REQUEST:
      return {
        loading: true,
      };
    case CHILD_CATEGORY_IMAGE_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        categoryImages: action.payload,
      };

    case CHILD_CATEGORY_IMAGE_LIST_FAIL:
      return {
        loading: true,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const listDetailChildCategoryImagesReducer = (state = {}, action) => {
  switch (action.type) {
    case CHILD_CATEGORY_IMAGE_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case CHILD_CATEGORY_IMAGE_DETAIL_SUCCESS:
      return {
        loading: false,
        success: true,
        categoryImage: action.payload,
      };

    case CHILD_CATEGORY_IMAGE_DETAIL_FAIL:
      return {
        loading: true,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const childCategoryImageAddReducer = (state = {}, action) => {
  switch (action.type) {
    case CHILD_CATEGORY_IMAGE_ADD_REQUEST:
      return {
        loading: true,
      };
    case CHILD_CATEGORY_IMAGE_ADD_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CHILD_CATEGORY_IMAGE_ADD_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    case CHILD_CATEGORY_IMAGE_ADD_RESET:
      return {
        loading: true,
        success: false,
      };
    default:
      return state;
  }
};

export const childCategoryImageEditReducer = (state = {}, action) => {
  switch (action.type) {
    case CHILD_CATEGORY_IMAGE_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case CHILD_CATEGORY_IMAGE_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CHILD_CATEGORY_IMAGE_UPDATE_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    case CHILD_CATEGORY_IMAGE_UPDATE_RESET:
      return {
        loading: true,
        success: false,
      };
    default:
      return state;
  }
};

export const childCategoryImageDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CHILD_CATEGORY_IMAGE_DELETE_REQUEST:
      return {
        loading: true,
      };
    case CHILD_CATEGORY_IMAGE_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CHILD_CATEGORY_IMAGE_DELETE_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

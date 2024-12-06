import {
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_UPDATE_TO_DELIVERED_FAIL,
  ORDER_UPDATE_TO_DELIVERED_REQUEST,
  ORDER_UPDATE_TO_DELIVERED_SUCCESS,
} from "../constants/orderConstant";

export const listOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
      };
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case ORDER_LIST_FAIL:
      return {
        loading: true,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const listOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case ORDER_DETAILS_FAIL:
      return {
        loading: true,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_UPDATE_TO_DELIVERED_REQUEST:
      return {
        loading: true,
      };
    case ORDER_UPDATE_TO_DELIVERED_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ORDER_UPDATE_TO_DELIVERED_FAIL:
      return {
        loading: true,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
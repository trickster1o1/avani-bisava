import {
  DASHBOARD_LIST_FAIL,
  DASHBOARD_LIST_REQUEST,
  DASHBOARD_LIST_SUCCESS,
} from "../constants/dashboardConstant";

export const listDashboardReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_LIST_REQUEST:
      return {
        loading: true,
      };
    case DASHBOARD_LIST_SUCCESS:
      return {
        loading: false,
        dashboardData: action.payload,
      };

    case DASHBOARD_LIST_FAIL:
      return {
        loading: true,
        error: action.payload,
      };

    default:
      return state;
  }
};

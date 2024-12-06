import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { useMemo } from "react";

import { userLoginReducer, userUpdateReducer } from "./reducers/userReducer";
import { productAddToCartReducer } from "./reducers/cartReducer";
import {
  listOrdersReducer,
  listOrdersByUserIdReducer,
  listOrderReducer,
  createOrdersReducer,
  orderPayReducer,
} from "./reducers/orderReducer";

import {
  productTrendingReducer,
  createLovedProductReducer,
  getLovedProductByUserIdReducer,
  createProductReviewReducer,
} from "./reducers/productReducer";

import {
  listBlogsReducer,
  listBlogReducer,
  createBlogReducer,
  listBlogsByUserIdReducer,
  deleteBlogReducer,
  updateBlogReducer,
} from "./reducers/blogReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userUpdate: userUpdateReducer,
  productAddToCart: productAddToCartReducer,
  listOrders: listOrdersReducer,
  listOrdersByUserId: listOrdersByUserIdReducer,
  listOrder: listOrderReducer,
  createOrders: createOrdersReducer,
  orderPay: orderPayReducer,
  productTrending: productTrendingReducer,
  createLovedProduct: createLovedProductReducer,
  getLovedProductByUserId: getLovedProductByUserIdReducer,
  listBlogs: listBlogsReducer,
  listBlog: listBlogReducer,
  createBlog: createBlogReducer,
  updateBlog: updateBlogReducer,
  listBlogsByUserId: listBlogsByUserIdReducer,
  deleteBlog: deleteBlogReducer,
  createProductReview: createProductReviewReducer,
});

const adminInfoFromStrorage =
  process.browser && localStorage.getItem("avani_user")
    ? process.browser && JSON.parse(localStorage.getItem("avani_user"))
    : null;
const initialState = {
  userLogin: { userInfo: adminInfoFromStrorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;

// "next": "12.2.2",
// "react": "18.2.0",
// "react-dom": "18.2.0",

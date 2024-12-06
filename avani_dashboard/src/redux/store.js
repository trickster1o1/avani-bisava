import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { adminLoginReducer } from "./reducers/adminReducer";
import {
  listProductsReducer,
  listProductReducer,
  listFeaturedProductsReducer,
  productAddReducer,
  productDeleteReducer,
  productEditReducer,
  productEditToFeaturedReducer,
  productEditToPublishedReducer,
} from "./reducers/productReducer";

import {
  listBannerReducer,
  bannerDetailReducer,
  bannerAddReducer,
  bannerEditReducer,
  bannerEditToPublishedReducer,
  bannerDeleteReducer,
} from "./reducers/bannerReducer";

import {
  listCategoryReducer,
  listSingleCategoryReducer,
  listChildCategoryImagesReducer,
  listDetailChildCategoryImagesReducer,
  childCategoryImageAddReducer,
  childCategoryImageEditReducer,
  childCategoryImageDeleteReducer,
} from "./reducers/categoryReducer";

import {
  listOrdersReducer,
  listOrderReducer,
  orderDeliverReducer,
} from "./reducers/orderReducer";

import { userListReducer } from "./reducers/userReducer";

import {
  listBlogsReducer,
  updateBlogToPublishedReducer,
} from "./reducers/blogReducer";

import {
  listReviewsReducer,
  reviewDeleteReducer,
} from "./reducers/reviewReducer";

import { listDashboardReducer } from "./reducers/dashboardReducer";

import {
  listContactUsReducer,
  contactUsEditReducer,
} from "./reducers/contactUsReducer";

import {
  listHelpDescriptionReducer,
  helpDescriptionEditReducer,
} from "./reducers/helpReducer";

import {
  listAboutUsReducer,
  aboutUsEditReducer,
} from "./reducers/aboutUsReducer";

const reducer = combineReducers({
  adminLogin: adminLoginReducer,
  listProducts: listProductsReducer,
  listProduct: listProductReducer,
  listFeaturedProducts: listFeaturedProductsReducer,
  productAdd: productAddReducer,
  productDelete: productDeleteReducer,
  productEdit: productEditReducer,
  productEditToFeatured: productEditToFeaturedReducer,
  productEditToPublished: productEditToPublishedReducer,
  listCategory: listCategoryReducer,
  listSingleCategory: listSingleCategoryReducer,
  listBanner: listBannerReducer,
  bannerDetail: bannerDetailReducer,
  bannerAdd: bannerAddReducer,
  bannerEdit: bannerEditReducer,
  bannerEditToPublished: bannerEditToPublishedReducer,
  bannerDelete: bannerDeleteReducer,
  listOrders: listOrdersReducer,
  listOrder: listOrderReducer,
  orderDeliver: orderDeliverReducer,
  userList: userListReducer,
  listChildCategoryImages: listChildCategoryImagesReducer,
  listDetailChildCategoryImages: listDetailChildCategoryImagesReducer,
  childCategoryImageAdd: childCategoryImageAddReducer,
  childCategoryImageEdit: childCategoryImageEditReducer,
  childCategoryImageDelete: childCategoryImageDeleteReducer,
  listBlogs: listBlogsReducer,
  updateBlogToPublished: updateBlogToPublishedReducer,
  listReviews: listReviewsReducer,
  reviewDelete: reviewDeleteReducer,
  listDashboard: listDashboardReducer,
  listContactUs: listContactUsReducer,
  contactUsEdit: contactUsEditReducer,
  listHelpDescription: listHelpDescriptionReducer,
  helpDescriptionEdit: helpDescriptionEditReducer,
  listAboutUs: listAboutUsReducer,
  aboutUsEdit: aboutUsEditReducer,
});

const adminInfoFromStrorage = localStorage.getItem("adminInfo")
  ? JSON.parse(localStorage.getItem("adminInfo"))
  : null;
const initialState = {
  adminLogin: { adminInfo: adminInfoFromStrorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;

import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AddProductScreen from "./screens/product/AddProductScreen";
import ListProductScreen from "./screens/product/ListProductScreen";
import LoginScreen from "./screens/LoginScreen";
import ProtectiveRoute from "./components/ProtectiveRoute";
import EditProductScreen from "./screens/product/EditProductScreen";
import ListBannerScreen from "./screens/banner/ListBannerScreen";
import AddBannerScreen from "./screens/banner/AddBannerScreen";
import EditBannerScreen from "./screens/banner/EditBannerScreen";
import ListFeaturedProductScreen from "./screens/product/ListFeaturedProductScreen";
import CategoryScreen from "./screens/category/CategoryScreen";
import ListOrderScreen from "./screens/order/ListOrderScreen";
import DetailOrderScreen from "./screens/order/DetailOrderScreen";
import ListUserScreen from "./screens/ListUserScreen";
import ListChildCategoryImageScreen from "./screens/childCategoryImage/ListChildCategoryImageScreen";
import EditChildCategoryImageScreen from "./screens/childCategoryImage/EditChildCategoryImageScreen";
import AddChildCategoryImageScreen from "./screens/childCategoryImage/AddChildCategoryImageScreen";
import ListBlogScreen from "./screens/ListBlogScreen";
import ListReviewScreen from "./screens/ListReviewScreen";
import ContactUsScreen from "./screens/help/ContactUsScreen";
import PrivacyPolicyScreen from "./screens/help/PrivacyPolicyScreen";
import RefundPolicyScreen from "./screens/help/RefundPolicyScreen";
import ShippingPolicyScreen from "./screens/help/ShippingPolicyScreen";
import TermOfServiceScreen from "./screens/help/TermOfServiceScreen";
import EditContactUsScreen from "./screens/help/EditContactUsScreen";
import EditPrivacyPolicyScreen from "./screens/help/EditPrivacyPolicyScreen";
import EditRefundPolicyScreen from "./screens/help/EditRefundPolicyScreen";
import EditTermOfServiceScreen from "./screens/help/EditTemOfServiceScreen";
import EditShippingPolicyScreen from "./screens/help/EditShippingPolicyScreen";
import AboutUsScreen from "./screens/help/AboutUsScreen";
import EditAboutUsScreen from "./screens/help/EditAboutUsScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route
          path="/home"
          element={
            <ProtectiveRoute redirectTo="/">
              <HomeScreen />
            </ProtectiveRoute>
          }
        />
        <Route
          path="/product/add-product"
          element={
            <ProtectiveRoute redirectTo="/">
              <AddProductScreen />
            </ProtectiveRoute>
          }
        />
        <Route
          path="/product/edit-product/:uuid"
          element={
            <ProtectiveRoute redirectTo="/">
              <EditProductScreen />
            </ProtectiveRoute>
          }
        />
        <Route
          path="/product/list-product"
          element={
            <ProtectiveRoute redirectTo="/">
              <ListProductScreen />
            </ProtectiveRoute>
          }
        />
        <Route
          path="/product/list-featured-product"
          element={
            <ProtectiveRoute redirectTo="/">
              <ListFeaturedProductScreen />
            </ProtectiveRoute>
          }
        />
        <Route
          path="/category"
          element={
            <ProtectiveRoute redirectTo="/">
              <CategoryScreen />
            </ProtectiveRoute>
          }
        />

        <Route
          path="/banner/list-banner"
          element={
            <ProtectiveRoute redirectTo="/">
              <ListBannerScreen />
            </ProtectiveRoute>
          }
        />
        <Route
          path="/banner/add-banner"
          element={
            <ProtectiveRoute redirectTo="/">
              <AddBannerScreen />
            </ProtectiveRoute>
          }
        />
        <Route
          path="/banner/edit-banner/:uuid"
          element={
            <ProtectiveRoute redirectTo="/">
              <EditBannerScreen />
            </ProtectiveRoute>
          }
        />
        <Route
          path="/order/list-orders"
          element={
            <ProtectiveRoute redirectTo="/">
              <ListOrderScreen />
            </ProtectiveRoute>
          }
        />
        <Route
          path="/order/:uuid"
          element={
            <ProtectiveRoute redirectTo="/">
              <DetailOrderScreen />
            </ProtectiveRoute>
          }
        />
        <Route
          path="/user/list-users"
          element={
            <ProtectiveRoute redirectTo="/">
              <ListUserScreen />
            </ProtectiveRoute>
          }
        />
        <Route
          path="/category/list-child-category-image"
          element={
            <ProtectiveRoute redirectTo="/">
              <ListChildCategoryImageScreen />
            </ProtectiveRoute>
          }
        />
        <Route
          path="/category/add-child-category-image"
          element={
            <ProtectiveRoute redirectTo="/">
              <AddChildCategoryImageScreen />
            </ProtectiveRoute>
          }
        />
        <Route
          path="/category/edit-child-category-image/:uuid"
          element={
            <ProtectiveRoute redirectTo="/">
              <EditChildCategoryImageScreen />
            </ProtectiveRoute>
          }
        />
        <Route
          path="/blogs"
          element={
            <ProtectiveRoute redirectTo="/">
              <ListBlogScreen />
            </ProtectiveRoute>
          }
        />
        <Route
          path="/reviews"
          element={
            <ProtectiveRoute redirectTo="/">
              <ListReviewScreen />
            </ProtectiveRoute>
          }
        />
        <Route
          path="/contact-us"
          element={
            <ProtectiveRoute redirectTo="/">
              <ContactUsScreen />
            </ProtectiveRoute>
          }
        />
        <Route
          path="/edit-contactUs/:uuid"
          element={
            <ProtectiveRoute redirectTo="/">
              <EditContactUsScreen />
            </ProtectiveRoute>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <ProtectiveRoute redirectTo="/">
              <PrivacyPolicyScreen />
            </ProtectiveRoute>
          }
        />
        <Route
          path="/edit-privacy/:uuid"
          element={
            <ProtectiveRoute redirectTo="/">
              <EditPrivacyPolicyScreen />
            </ProtectiveRoute>
          }
        />
        <Route
          path="/refund-policy"
          element={
            <ProtectiveRoute redirectTo="/">
              <RefundPolicyScreen />
            </ProtectiveRoute>
          }
        />
        <Route
          path="/edit-refund/:uuid"
          element={
            <ProtectiveRoute redirectTo="/">
              <EditRefundPolicyScreen />
            </ProtectiveRoute>
          }
        />
        <Route
          path="/shipping-policy"
          element={
            <ProtectiveRoute redirectTo="/">
              <ShippingPolicyScreen />
            </ProtectiveRoute>
          }
        />
        <Route
          path="/edit-shipping/:uuid"
          element={
            <ProtectiveRoute redirectTo="/">
              <EditShippingPolicyScreen />
            </ProtectiveRoute>
          }
        />
        <Route
          path="/terms-of-service"
          element={
            <ProtectiveRoute redirectTo="/">
              <TermOfServiceScreen />
            </ProtectiveRoute>
          }
        />
        <Route
          path="/edit-terms/:uuid"
          element={
            <ProtectiveRoute redirectTo="/">
              <EditTermOfServiceScreen />
            </ProtectiveRoute>
          }
        />
        <Route
          path="/about-us"
          element={
            <ProtectiveRoute redirectTo="/">
              <AboutUsScreen />
            </ProtectiveRoute>
          }
        />
        <Route
          path="/edit-about/:uuid"
          element={
            <ProtectiveRoute redirectTo="/">
              <EditAboutUsScreen />
            </ProtectiveRoute>
          }
        />
        {/* <Route path="/" element={<HomeScreen />} />
        <Route path="/add-product" element={<AddProductScreen />} />
        <Route path="/list-product" element={<ListProductScreen />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

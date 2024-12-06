import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div class="vertical-menu">
      <div data-simplebar class="h-100">
        {/* <!--- Sidemenu --> */}
        <div id="sidebar-menu">
          {/* <!-- Left Menu Start --> */}
          <ul class="metismenu list-unstyled" id="side-menu">
            <li>
              <Link to="/" class="waves-effect">
                <i class="ti-home"></i>
                <span class="badge rounded-pill bg-primary float-end">2</span>
                <span>Dashboard</span>
              </Link>
            </li>

            {/* <li>
              <a href="calendar.html" class=" waves-effect">
                <i class="ti-calendar"></i>
                <span>Calendar</span>
              </a>
            </li> */}
            {/* <li>
              <Link to="/product/add-product" class=" waves-effect">
                <i class="far fa-plus-square"></i>
                <span>Add Product</span>
              </Link>
            </li>
            <li>
              <Link to="/product/list-product" class=" waves-effect">
                <i class="fas fa-shopping-bag"></i>
                <span>List Product</span>
              </Link>
            </li> */}

            <li>
              <a
                href="javascript: void(0);"
                class="has-arrow waves-effect"
                aria-expanded="false"
              >
                <i class="fas fa-shopping-bag"></i>
                <span>Product</span>
              </a>
              <ul class="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/product/add-product" class=" waves-effect">
                    <i class="far fa-plus-square"></i>
                    <span>Add Product</span>
                  </Link>
                </li>
                <li>
                  <Link to="/product/list-product" class=" waves-effect">
                    <i class="fas fa-list"></i>
                    <span>List Product</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/product/list-featured-product"
                    class=" waves-effect"
                  >
                    <i class="fas fa-clipboard-list"></i>
                    <span>Featured Product</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/category" class=" waves-effect">
                <i class="fas fa-th"></i>
                <span>Category</span>
              </Link>
            </li>

            {/* <li>
              <a
                href="javascript: void(0);"
                class="has-arrow waves-effect"
                aria-expanded="false"
              >
                <i class="ti-email"></i>
                <span>Category</span>
              </a>
              <ul class="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/category/main-category">Main Category</Link>
                </li>
                <li>
                  <Link to="/category/sub-category">Sub Category</Link>
                </li>
                <li>
                  <Link to="/category/child-category">Child Category</Link>
                </li>
              </ul>
            </li> */}

            <li>
              <Link to="/banner/list-banner" class=" waves-effect">
                <i class="far fa-images"></i>
                <span>Banner</span>
              </Link>
            </li>
            <li>
              <Link to="/order/list-orders" class=" waves-effect">
                <i class="fas fa-book"></i>
                <span>Orders</span>
              </Link>
            </li>
            <li>
              <Link to="/user/list-users" class=" waves-effect">
                <i class="fas fa-users"></i>
                <span>Users</span>
              </Link>
            </li>
            <li>
              <Link
                to="/category/list-child-category-image"
                class=" waves-effect"
              >
                <i class="fas fa-th-large"></i>
                <span>Child Category Images</span>
              </Link>
            </li>
            <li>
              <Link to="/blogs" class=" waves-effect">
                <i class="fab fa-blogger"></i>
                <span>Blogs</span>
              </Link>
            </li>
            <li>
              <Link to="/reviews" class=" waves-effect">
                <i class="fas fa-star-half-alt"></i>
                <span>Reviews</span>
              </Link>
            </li>
            <li>
              <a
                href="javascript: void(0);"
                class="has-arrow waves-effect"
                aria-expanded="false"
              >
                <i class="fas fa-shopping-bag"></i>
                <span>Help</span>
              </a>
              <ul class="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/about-us" class=" waves-effect">
                    <span>About Us</span>
                  </Link>
                </li>
                <li>
                  <Link to="/contact-us" class=" waves-effect">
                    <span>Contact Us</span>
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" class=" waves-effect">
                    <span>Privacy Policy</span>
                  </Link>
                </li>
                <li>
                  <Link to="/refund-policy" class=" waves-effect">
                    <span>Refund Policy</span>
                  </Link>
                </li>
                <li>
                  <Link to="/shipping-policy" class=" waves-effect">
                    <span>Shipping Policy</span>
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-service" class=" waves-effect">
                    <span>Terms Of Service</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        {/* <!-- Sidebar --> */}
      </div>
    </div>
  );
};

export default Sidebar;

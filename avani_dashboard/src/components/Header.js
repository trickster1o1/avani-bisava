import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/adminAction";

const Header = () => {
  const dispatch = useDispatch();
  const toggleSideBar = (e) => {
    let body = document.body;
    if (window.screen.width <= 992) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  };
  return (
    <div>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            {/* <!-- LOGO --> */}
            <div className="navbar-brand-box">
              {/* <a href="index.html" className="logo logo-dark">
                <span className="logo-sm">
                  <img src="assets/images/avani_logo.jpg" alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src="assets/images/avani_logo.jpg" alt="" height="17" />
                </span>
              </a>

              <a href="index.html" className="logo logo-light">
                <span className="logo-sm">
                  <img src="assets/images/avani_logo.jpg" alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src="assets/images/avani_logo.jpg" alt="" height="18" />
                </span>
              </a> */}

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img
                    src="assets/images/avani_logo.jpg"
                    style={{ borderRadius: "100%", marginLeft: "-10px" }}
                    alt=""
                    height="40"
                  />
                </span>
                <span className="logo-lg">
                  <img
                    src="assets/images/avani_logo.jpg"
                    alt=""
                    height="38"
                    style={{ marginRight: "10px", borderRadius: "100%" }}
                  />
                  <h2>AvaniNepal</h2>
                </span>
              </Link>
            </div>

            <button
              type="button"
              className="btn btn-sm px-3 font-size-24 header-item waves-effect"
              id="vertical-menu-btn"
              onClick={toggleSideBar}
            >
              <i className="mdi mdi-menu"></i>
            </button>
          </div>

          <div className="d-flex">
            {/* <!-- App Search--> */}
            {/* <form className="app-search d-none d-lg-block">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
                <span className="fa fa-search"></span>
              </div>
            </form> */}

            <div className="dropdown d-inline-block d-lg-none ms-2">
              <button
                type="button"
                className="btn header-item noti-icon waves-effect"
                id="page-header-search-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="mdi mdi-magnify"></i>
              </button>
              <div
                className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                aria-labelledby="page-header-search-dropdown"
              >
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search ..."
                        aria-label="Recipient's username"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* <div className="dropdown d-inline-block">
              <button
                type="button"
                className="btn header-item noti-icon waves-effect"
                id="page-header-notifications-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="mdi mdi-bell-outline"></i>
                <span className="badge bg-danger rounded-pill">3</span>
              </button>
              <div
                className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                aria-labelledby="page-header-notifications-dropdown"
              >
                <div className="p-3">
                  <div className="row align-items-center">
                    <div className="col">
                      <h5 className="m-0 font-size-16">
                        {" "}
                        Notifications (258){" "}
                      </h5>
                    </div>
                  </div>
                </div>
                <div data-simplebar style={{ maxHeight: " 230px" }}>
                  <a href="" className="text-reset notification-item">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-xs">
                          <span className="avatar-title bg-success rounded-circle font-size-16">
                            <i className="mdi mdi-cart-outline"></i>
                          </span>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">Your order is placed</h6>
                        <div className="font-size-12 text-muted">
                          <p className="mb-1">
                            Dummy text of the printing and typesetting industry.
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>

                  <a href="" className="text-reset notification-item">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-xs">
                          <span className="avatar-title bg-warning rounded-circle font-size-16">
                            <i className="mdi mdi-message-text-outline"></i>
                          </span>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">New Message received</h6>
                        <div className="font-size-12 text-muted">
                          <p className="mb-1">You have 87 unread messages</p>
                        </div>
                      </div>
                    </div>
                  </a>

                  <a href="" className="text-reset notification-item">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-xs">
                          <span className="avatar-title bg-info rounded-circle font-size-16">
                            <i className="mdi mdi-glass-cocktail"></i>
                          </span>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">Your item is shipped</h6>
                        <div className="font-size-12 text-muted">
                          <p className="mb-1">
                            It is a long established fact that a reader will
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>

                  <a href="" className="text-reset notification-item">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-xs">
                          <span className="avatar-title bg-primary rounded-circle font-size-16">
                            <i className="mdi mdi-cart-outline"></i>
                          </span>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">Your order is placed</h6>
                        <div className="font-size-12 text-muted">
                          <p className="mb-1">
                            Dummy text of the printing and typesetting industry.
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>

                  <a href="" className="text-reset notification-item">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-xs">
                          <span className="avatar-title bg-danger rounded-circle font-size-16">
                            <i className="mdi mdi-message-text-outline"></i>
                          </span>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">New Message received</h6>
                        <div className="font-size-12 text-muted">
                          <p className="mb-1">You have 87 unread messages</p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="p-2 border-top">
                  <div className="d-grid">
                    <a
                      className="btn btn-sm btn-link font-size-14 text-center"
                      href="javascript:void(0)"
                    >
                      View all
                    </a>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="dropdown d-inline-block">
              <button
                type="button"
                className="btn header-item waves-effect"
                id="page-header-user-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src="assets/images/avani_logo.jpg"
                  style={{ borderRadius: "100%" }}
                  alt=""
                  height="40"
                />
              </button>
              <div className="dropdown-menu dropdown-menu-end">
                {/* <!-- item--> */}
                <div
                  className="dropdown-item text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => dispatch(logout())}
                >
                  <i className="bx bx-power-off font-size-17 align-middle me-1 text-danger"></i>{" "}
                  Logout
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;

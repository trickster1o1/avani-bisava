import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../redux/actions/orderAction";
import { getDashboard } from "../redux/actions/dashboardAction";
// import { getOrders } from "../../redux/actions/orderAction";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const listDashboardState = useSelector((state) => state.listDashboard);
  const { dashboardData } = listDashboardState;
  useEffect(() => {
    dispatch(getDashboard());
  }, []);
  return (
    <Layout>
      {/* <!-- start page title --> */}
      <div class="page-title-box">
        <div class="row align-items-center">
          <div class="col-md-8">
            <h6 class="page-title">Dashboard</h6>
            <ol class="breadcrumb m-0">
              <li class="breadcrumb-item active">
                Welcome to Avani Nepal Dashboard
              </li>
            </ol>
          </div>
        </div>
      </div>
      {/* <!-- end page title --> */}
      {/* card design */}
      <div className="row">
        <div className="col-xl-3 col-md-6">
          <div className="card mini-stat bg-primary text-white">
            <div className="card-body">
              <div className="mb-4">
                <div className="float-start mini-stat-img me-4">
                  <img src="assets/images/services-icon/01.png" alt="" />
                </div>
                <h5 className="font-size-16 text-uppercase text-white-50">
                  Orders
                </h5>
                <h4 className="fw-medium font-size-24">
                  {dashboardData && dashboardData.orderLength}{" "}
                  <i className="mdi mdi-arrow-up text-success ms-2" />
                </h4>
                <div className="mini-stat-label bg-success">
                  <p className="mb-0">+ 12%</p>
                </div>
              </div>
              <div className="pt-2">
                <div className="float-end">
                  <a href="#" className="text-white-50">
                    <i className="mdi mdi-arrow-right h5" />
                  </a>
                </div>
                <p className="text-white-50 mb-0 mt-1">Since last month</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card mini-stat bg-primary text-white">
            <div className="card-body">
              <div className="mb-4">
                <div className="float-start mini-stat-img me-4">
                  <img src="assets/images/services-icon/02.png" alt="" />
                </div>
                <h5 className="font-size-16 text-uppercase text-white-50">
                  Revenue
                </h5>
                <h4 className="fw-medium font-size-24">
                  {dashboardData && dashboardData.revenue}{" "}
                  <i className="mdi mdi-arrow-down text-danger ms-2" />
                </h4>
                <div className="mini-stat-label bg-danger">
                  <p className="mb-0">- 28%</p>
                </div>
              </div>
              <div className="pt-2">
                <div className="float-end">
                  <a href="#" className="text-white-50">
                    <i className="mdi mdi-arrow-right h5" />
                  </a>
                </div>
                <p className="text-white-50 mb-0 mt-1">Since last month</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card mini-stat bg-primary text-white">
            <div className="card-body">
              <div className="mb-4">
                <div className="float-start mini-stat-img me-4">
                  <img src="assets/images/services-icon/03.png" alt="" />
                </div>
                <h5 className="font-size-16 text-uppercase text-white-50">
                  Total Price
                </h5>
                <h4 className="fw-medium font-size-24">
                  {dashboardData && dashboardData.totalProductPrice}{" "}
                  <i className="mdi mdi-arrow-up text-success ms-2" />
                </h4>
                <div className="mini-stat-label bg-info">
                  <p className="mb-0"> 00%</p>
                </div>
              </div>
              <div className="pt-2">
                <div className="float-end">
                  <a href="#" className="text-white-50">
                    <i className="mdi mdi-arrow-right h5" />
                  </a>
                </div>
                <p className="text-white-50 mb-0 mt-1">Since last month</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card mini-stat bg-primary text-white">
            <div className="card-body">
              <div className="mb-4">
                <div className="float-start mini-stat-img me-4">
                  <img src="assets/images/services-icon/04.png" alt="" />
                </div>
                <h5 className="font-size-16 text-uppercase text-white-50">
                  Product Sold
                </h5>
                <h4 className="fw-medium font-size-24">
                  {dashboardData && dashboardData.productSold}{" "}
                  <i className="mdi mdi-arrow-up text-success ms-2" />
                </h4>
                <div className="mini-stat-label bg-warning">
                  <p className="mb-0">+ 84%</p>
                </div>
              </div>
              <div className="pt-2">
                <div className="float-end">
                  <a href="#" className="text-white-50">
                    <i className="mdi mdi-arrow-right h5" />
                  </a>
                </div>
                <p className="text-white-50 mb-0 mt-1">Since last month</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* card design end */}
    </Layout>
  );
};

export default HomeScreen;

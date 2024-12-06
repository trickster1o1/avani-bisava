import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/actions/orderAction";
import moment from "moment";
import { Link } from "react-router-dom";

const ListOrderScreen = () => {
  const dispatch = useDispatch();
  const listOrders = useSelector((state) => state.listOrders);
  const { orders } = listOrders;
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  return (
    <Layout>
      <PageTitle title="List Orders" />
      <div class="card">
        <div class="card-body">
          <h4 class="card-title mb-3">List of Order</h4>
          {/* <p class="card-title-desc">
            Add <code>.table-bordered</code> for borders on all sides of the
            table and cells.
          </p> */}

          <div class="table-responsive">
            <table class="table table-bordered mb-0">
              <thead style={{ background: "#d3d3d3" }}>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Total Price</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((value) => (
                    <tr>
                      <th scope="row">{value.uuid}</th>
                      <td>{moment(value.createdAt).format("MMMM Do YYYY")}</td>
                      <td style={{ width: "80px" }}>Rs. {value.totalPrice}</td>
                      <td className="text-center">
                        {value.isPaid ? (
                          moment(value.paidAt).format("MMMM Do YYYY")
                        ) : (
                          <i
                            className="fas fa-times-circle fa-lg"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td className="text-center">
                        {value.isDelivered ? (
                          moment(value.deliveredAt).format("MMMM Do YYYY")
                        ) : (
                          <i
                            className="fas fa-times-circle fa-lg"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <Link
                          to={`/order/${value.uuid}`}
                          type="button"
                          class="btn btn-secondary waves-effect"
                        >
                          Details
                        </Link>
                      </td>
                      {/* <td style={{ width: "100px" }}>
                        <Link
                          to={`/product/edit-product/${value.uuid}`}
                          onClick={() => dispatch(detailProduct(value.uuid))}
                          class="btn btn-secondary btn-sm edit me-2"
                          title="Edit"
                        >
                          <i class="fas fa-pencil-alt"></i>
                        </Link>
                        <a
                          class="btn btn-danger btn-sm edit"
                          title="Delete"
                          onClick={() => dispatch(deleteProduct(value.uuid))}
                        >
                          <i class="fas fa-trash-alt"></i>
                        </a>
                      </td> */}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ListOrderScreen;

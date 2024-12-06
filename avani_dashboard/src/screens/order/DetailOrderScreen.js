import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deliverOrder, getOrder } from "../../redux/actions/orderAction";
import moment from "moment";

const DetailOrderScreen = () => {
  const dispatch = useDispatch();
  const { uuid } = useParams();
  const listOrder = useSelector((state) => state.listOrder);
  const { order } = listOrder;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success } = orderDeliver;
  useEffect(() => {
    dispatch(getOrder(uuid));
  }, [success]);
  // get shipping Address
  const shippingValue = order && JSON.parse(order.shippingAddress);
  const email = shippingValue && shippingValue.email;
  const phone = shippingValue && shippingValue.number;
  const address = shippingValue && shippingValue.address;
  const city = shippingValue && shippingValue.city;
  // get shipping Address end
  const orderItems = order && JSON.parse(order.orderItems);

  const handleMarkAsDelivered = () => {
    console.log("object");
    dispatch(deliverOrder(uuid));
  };
  return (
    <Layout>
      <PageTitle title="Orders Details" />
      <div class="card">
        <div class="card-body">
          <div class="row">
            {/* left column */}
            <div class="col-lg-8">
              <div class="ml-5">
                <h1 className="mb-4">Order: {order && order.uuid}</h1>
                <h2>Shipping</h2>
                <div class="py-2">
                  <h3>
                    Email: <span>{email}</span>
                  </h3>
                  <h3>
                    Phone: <span>{phone}</span>
                  </h3>
                  <h3>
                    Address:{" "}
                    <span>
                      {address} ,{city}
                    </span>
                  </h3>
                </div>
                {/*  Delivered */}
                {order && order.isDelivered ? (
                  <div class="alert alert-success" role="alert">
                    <strong>
                      Delivered :{" "}
                      {`${moment(order && order.deliveredAt).format(
                        "MMMM Do YYYY"
                      )}`}
                    </strong>
                  </div>
                ) : (
                  <div class="alert alert-danger mb-0" role="alert">
                    <strong>Not Delivered</strong>
                  </div>
                )}
                {/*  Delivered end */}
              </div>
              <hr />
              <div class="ml-5 my-3">
                <h2>Payment Method</h2>
                <div class="py-2">
                  <h3>
                    Method: <span>{order && order.paymentMethod}</span>
                  </h3>
                </div>
                {/* Paid */}
                {order && order.isPaid ? (
                  <div class="alert alert-success" role="alert">
                    <strong>
                      Paid :{" "}
                      {`${moment(order && order.isPaid).format(
                        "MMMM Do YYYY"
                      )}`}
                    </strong>
                  </div>
                ) : (
                  <div class="alert alert-danger mb-0" role="alert">
                    <strong>Not Paid</strong>
                  </div>
                )}
                {/* Paid end */}
              </div>
              <hr />
              <div class="ml-5 my-3">
                <h2>Order Items</h2>
                <div class="py-1 md:px-4">
                  {/* product items */}
                  {orderItems &&
                    orderItems.map((value) => (
                      <div className="d-flex justify-content-between border-bottom items-center border-b py-3 md:px-3">
                        <div className="d-flex align-items-center gap-4">
                          <img
                            src={`http://localhost:5000/${value.image}`}
                            width={50}
                            height={50}
                          />
                          <h4>{value.name}</h4>
                        </div>
                        {/* price */}
                        <div className="flex flex-col items-end">
                          <h5>
                            {value.qty}*{value.price} ={" "}
                            {value.qty * value.price}
                          </h5>
                          <h5>
                            {value.discount &&
                              `${value.discount}% Discount = ${Math.round(
                                value.price -
                                  (value.price * value.discount) / 100
                              )}`}
                          </h5>
                        </div>
                        {/* price */}
                      </div>
                    ))}
                  {/* product items end */}
                </div>
              </div>
            </div>
            {/* left column end */}
            {/* right column */}

            <div class="col-lg-4">
              <div class="border">
                <div class="bg-secondary text-center text-uppercase">
                  <h3 class="py-2">order Summery</h3>
                </div>
                <div class="px-7">
                  <div class="d-flex justify-content-between py-1 px-4 fs-5">
                    <span>Items</span>
                    <span>Rs. {order && order.itemPrice}</span>
                  </div>
                  <hr />
                  <div class="d-flex justify-content-between py-1 px-4 fs-5">
                    <span>Delivery Charge</span>
                    <span>Rs. {order && order.shippingPrice}</span>
                  </div>
                  <hr />
                  <div class="d-flex justify-content-between py-1 px-4 fs-5">
                    <span>Tax</span>
                    <span>Rs. {order && order.taxPrice}</span>
                  </div>
                  <hr />
                  <div class="d-flex justify-content-between py-1 px-4 fs-5">
                    <span>Total</span>
                    <span>Rs. {order && order.totalPrice}</span>
                  </div>
                  <hr />
                  <div className="px-4">
                    <button
                      type="button"
                      class="btn btn-primary waves-effect waves-light mb-3 py-2"
                      style={{ width: "100%" }}
                      onClick={handleMarkAsDelivered}
                      disabled={order && order.isDelivered ? true : false}
                    >
                      Mark As Delivered
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* right column end */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailOrderScreen;

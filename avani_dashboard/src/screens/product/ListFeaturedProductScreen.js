import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProduct,
  detailProduct,
  listFeaturedProduct,
  listProduct,
  updateProductToFeatured,
  updateProductToPublished,
} from "../../redux/actions/productActon";
import moment from "moment";
import { Link } from "react-router-dom";
import { url } from "../../utils/env";
import PageTitle from "../../components/PageTitle";

const ListFeaturedProductScreen = () => {
  const dispatch = useDispatch();
  const listFeaturedProductState = useSelector(
    (state) => state.listFeaturedProducts
  );
  const { products } = listFeaturedProductState;
  const productDeleteState = useSelector((state) => state.productDelete);
  const { success: deleteProductSuccess } = productDeleteState;

  const productEditToFeaturedState = useSelector(
    (state) => state.productEditToFeatured
  );
  const { success: featuredProductSuccess } = productEditToFeaturedState;

  const productEditToPublishedState = useSelector(
    (state) => state.productEditToPublished
  );
  const { success: publishedProductSuccess } = productEditToPublishedState;

  useEffect(() => {
    dispatch(listProduct());
    dispatch(listFeaturedProduct());
  }, [deleteProductSuccess, featuredProductSuccess, publishedProductSuccess]);
  return (
    <Layout>
      <PageTitle title="List Featured Product" />
      <div class="card mt-4">
        <div class="card-body">
          <h4 class="card-title mb-3">List of Featured Product</h4>

          <div class="table-responsive">
            <table class="table table-bordered mb-0">
              <thead style={{ background: "#d3d3d3" }}>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  {/* <th>Status</th> */}
                  <th>Featured</th>
                  <th>Published</th>
                  <th>Date</th>
                  {/* <th>Action</th> */}
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((value) => (
                    <tr>
                      <th scope="row">{value.uuid}</th>
                      <td
                        className="d-flex"
                        style={{ border: "none", width: "255px" }}
                      >
                        <img
                          src={`${url}/${value.image}`}
                          alt=""
                          style={{
                            width: "30px",
                            height: "30px",
                            border: "2px solid #c3c3c3",
                          }}
                          className="me-2"
                        />
                        <div className="text-wrapper">
                          <b>{value.name}</b>
                        </div>
                      </td>
                      <td>Rs. {value.price}</td>
                      <td className="text-center">
                        {value.isFeatured ? (
                          <i
                            className="fas fa-check-circle fa-lg"
                            style={{ color: "blue", cursor: "pointer" }}
                            onClick={() =>
                              dispatch(
                                updateProductToFeatured(false, value.uuid)
                              )
                            }
                          ></i>
                        ) : (
                          <i
                            className="fas fa-times-circle fa-lg"
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() =>
                              dispatch(
                                updateProductToFeatured(true, value.uuid)
                              )
                            }
                          ></i>
                        )}
                      </td>
                      <td className="text-center">
                        {value.isPublished ? (
                          <i
                            className="fas fa-check-circle fa-lg"
                            style={{ color: "blue", cursor: "pointer" }}
                            onClick={() =>
                              dispatch(
                                updateProductToPublished(false, value.uuid)
                              )
                            }
                          ></i>
                        ) : (
                          <i
                            className="fas fa-times-circle fa-lg"
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() =>
                              dispatch(
                                updateProductToPublished(true, value.uuid)
                              )
                            }
                          ></i>
                        )}
                      </td>

                      <td>{moment(value.createdAt).format("MMMM Do YYYY")}</td>
                      {/* <td style={{ width: "100px" }}>
                        <Link
                          to={`/product/edit-product/${value.uuid}`}
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

export default ListFeaturedProductScreen;

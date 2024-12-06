import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProduct,
  detailProduct,
  listProduct,
  updateProductToFeatured,
  updateProductToPublished,
} from "../../redux/actions/productActon";
import moment from "moment";
import { Link } from "react-router-dom";
import { url } from "../../utils/env";
import PageTitle from "../../components/PageTitle";
import Table from "../../components/Table";
import { useState } from "react";
import Swal from "sweetalert2";

const ListProductScreen = () => {
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  console.log("pageNumber", pageNumber);
  const listProductState = useSelector((state) => state.listProducts);
  const { product } = listProductState;
  console.log("product", product && product);
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
  }, [deleteProductSuccess, featuredProductSuccess, publishedProductSuccess]);

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    dispatch(listProduct("", searchKey));
  };
  const handlePaginateClick = (page) => {
    setPageNumber(page);
    dispatch(listProduct(page, searchKey));
    // console.log("page", page);
  };
  const handleClickNext = () => {
    console.log("pageNumber", pageNumber + 1);
    setPageNumber(pageNumber + 1);

    dispatch(listProduct(pageNumber + 1, searchKey));
  };

  const handleClickPrevious = () => {
    setPageNumber(pageNumber - 1);
    dispatch(listProduct(pageNumber - 1, searchKey));
  };

  const handleClearForm = () => {
    setSearchKey("");
    dispatch(listProduct(pageNumber, ""));
  };
  return (
    <Layout>
      <PageTitle
        title="List Product"
        button="Add Product"
        link="/product/add-product"
      />
      <div class="card mt-4">
        <div class="card-body">
          <h4 class="card-title mb-3">List of Product</h4>
          {/* <p class="card-title-desc">
            Add <code>.table-bordered</code> for borders on all sides of the
            table and cells.
          </p> */}

          <form className="mb-3 d-flex" onSubmit={handleSubmitSearch}>
            <input
              type="text"
              className="form-control"
              style={{ width: "250px", marginRight: "10px" }}
              placeholder="Search..."
              onChange={(e) => setSearchKey(e.target.value)}
              value={searchKey}
            />
            <button
              type="submit"
              className="btn btn-primary waves-effect waves-light"
            >
              Search
            </button>
            <button
              type="button"
              className="btn btn-secondary waves-effect waves-light"
              style={{ marginLeft: "10px" }}
              onClick={handleClearForm}
            >
              Clear Form
            </button>
          </form>
          <div class="table-responsive">
            <table class="table table-bordered mb-0">
              <thead style={{ background: "#d3d3d3" }}>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Offered Price</th>
                  {/* <th>Status</th> */}
                  <th>Featured</th>
                  <th>Published</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {product &&
                  product.products.map((value) => (
                    <tr>
                      <th scope="row">{value.uuid}</th>
                      <td
                        className="d-flex"
                        style={{ border: "none", width: "210px" }}
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
                      <td style={{ width: "80px" }}>Rs. {value.price}</td>
                      <td>
                        {value.price_discount === ""
                          ? "0"
                          : value.price_discount}{" "}
                        %
                      </td>
                      <td style={{ width: "80px" }}>
                        Rs.{" "}
                        {value.price_discount === ""
                          ? value.price
                          : Math.round(
                              value.price -
                                (value.price * value.price_discount) / 100
                            )}
                      </td>
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
                      <td style={{ width: "100px" }}>
                        <Link
                          to={`/product/edit-product/${value.uuid}`}
                          onClick={() => dispatch(detailProduct(value.uuid))}
                          class="btn btn-secondary btn-sm edit me-2"
                          title="Edit"
                        >
                          <i class="fas fa-pencil-alt"></i>
                        </Link>
                        <a
                          onClick={() => {
                            Swal.fire({
                              title: "Are you sure?",
                              text: `You want to delete this product ${value.name}`,
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                dispatch(deleteProduct(value.uuid));
                              }
                            });
                          }}
                          class="btn btn-danger btn-sm edit"
                          title="Delete"
                        >
                          <i class="fas fa-trash-alt"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {product && product.totalPage > 1 && (
            <nav className="mt-3 float-end">
              <ul class="pagination">
                {pageNumber === 1 ? (
                  <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1">
                      Previous
                    </a>
                  </li>
                ) : (
                  <li class="page-item" onClick={handleClickPrevious}>
                    <a class="page-link" href="#" tabindex="-1">
                      Previous
                    </a>
                  </li>
                )}

                {[...Array(product && product.totalPage).keys()].map((x) => (
                  <li
                    class={
                      product && product.currentPage === x + 1
                        ? "page-item active"
                        : "page-item"
                    }
                    style={{ cursor: "pointer" }}
                    onClick={() => handlePaginateClick(x + 1)}
                    key={x + 1}
                  >
                    <a class="page-link">{x + 1}</a>
                  </li>
                ))}
                {product && product.totalPage === pageNumber ? (
                  <li
                    class="page-item disabled"
                    // onClick={handleClickNext}
                  >
                    <a class="page-link" href="#">
                      Next
                    </a>
                  </li>
                ) : (
                  <li class="page-item" onClick={handleClickNext}>
                    <a class="page-link" href="#">
                      Next
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ListProductScreen;

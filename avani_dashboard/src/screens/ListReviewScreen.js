import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview, getReviews } from "../redux/actions/reviewAction";
import moment from "moment";
import Rating from "../components/rating";
import Swal from "sweetalert2";

const ListReviewScreen = () => {
  const dispatch = useDispatch();
  const listReviews = useSelector((state) => state.listReviews);
  const { reviews } = listReviews;
  const reviewDelete = useSelector((state) => state.reviewDelete);
  const { success } = reviewDelete;

  // console.log(object)
  useEffect(() => {
    dispatch(getReviews());
  }, [success]);
  return (
    <Layout>
      <div class="card mt-4">
        <div class="card-body">
          <h4 class="card-title mb-3">List of Reviews</h4>

          <div class="table-responsive">
            <table class="table table-bordered mb-0">
              <thead style={{ background: "#d3d3d3" }}>
                <tr>
                  <th>ID</th>
                  <th>Product</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>User</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reviews &&
                  reviews.map((value) => (
                    <tr key={value.uuid}>
                      <th scope="row">{value.uuid}</th>
                      <td>{value.product}</td>

                      <td>
                        <Rating value={value.rating} />{" "}
                      </td>
                      <td>{value.comment}</td>
                      <td>{value.user}</td>

                      <td>{moment(value.createdAt).format("MMMM Do YYYY")}</td>
                      <td style={{ width: "100px" }}>
                        <a
                          onClick={() => {
                            Swal.fire({
                              title: "Are you sure?",
                              text: `You want to delete this review`,
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                dispatch(deleteReview(value.uuid));
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
        </div>
      </div>
    </Layout>
  );
};

export default ListReviewScreen;

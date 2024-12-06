import React from "react";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteChildCategoryImage,
  detailChildCategoryImage,
  listChildCategoryImage,
} from "../../redux/actions/categoryAction";
import moment from "moment";
import { Link } from "react-router-dom";
import { url } from "../../utils/env";
import Swal from "sweetalert2";

const ListChildCategoryImageScreen = () => {
  const dispatch = useDispatch();
  const listChildCategoryImageState = useSelector(
    (state) => state.listChildCategoryImages
  );
  const { categoryImages } = listChildCategoryImageState;
  const childCategoryImageDeleteState = useSelector(
    (state) => state.childCategoryImageDelete
  );
  const { success: childCategoryDeleteSuccess } = childCategoryImageDeleteState;
  useEffect(() => {
    dispatch(listChildCategoryImage());
  }, [childCategoryDeleteSuccess]);
  return (
    <Layout>
      <PageTitle
        title="List Category Image"
        button="Add Category Image"
        link="/category/add-child-category-image"
      />
      <div class="card mt-4">
        <div class="card-body">
          <h4 class="card-title mb-3">List of Category Images</h4>

          <div class="table-responsive">
            <table class="table table-bordered mb-0">
              <thead style={{ background: "#d3d3d3" }}>
                <tr>
                  <th>ID</th>
                  <th>Main Category</th>
                  <th>Sub Category</th>
                  <th>Child Category</th>
                  <th>Image</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categoryImages &&
                  categoryImages.map((value) => (
                    <tr>
                      <th scope="row">{value.uuid}</th>
                      <td>{value.main_category.replace(/_/g, " ")}</td>
                      <td>{value.sub_category.replace(/_/g, " ")}</td>
                      <td>{value.child_category.replace(/_/g, " ")}</td>
                      <td className="" style={{ border: "none" }}>
                        <img
                          src={`${url}/${value.image}`}
                          alt=""
                          style={{
                            width: "60px",
                            height: "60px",
                            border: "2px solid #c3c3c3",
                          }}
                          className="me-2"
                        />
                      </td>

                      <td>{moment(value.createdAt).format("MMMM Do YYYY")}</td>
                      <td style={{ width: "100px" }}>
                        <Link
                          to={`/category/edit-child-category-image/${value.uuid}`}
                          onClick={() =>
                            dispatch(detailChildCategoryImage(value.uuid))
                          }
                          class="btn btn-secondary btn-sm edit me-2"
                          title="Edit"
                        >
                          <i class="fas fa-pencil-alt"></i>
                        </Link>
                        <a
                          onClick={() => {
                            Swal.fire({
                              title: "Are you sure?",
                              text: `You want to delete this Child category image`,
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                dispatch(deleteChildCategoryImage(value.uuid));
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

export default ListChildCategoryImageScreen;

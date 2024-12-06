import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBanner,
  getBannerDetail,
  listBanner,
  updateBannerToPublished,
} from "../../redux/actions/bannerAction";
import { url } from "../../utils/env";
import moment from "moment";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ListBannerScreen = () => {
  const dispatch = useDispatch();
  const listBannerState = useSelector((state) => state.listBanner);
  const { banner } = listBannerState;
  const deleteBannerState = useSelector((state) => state.bannerDelete);
  const { success: deleteBannerSuccess } = deleteBannerState;
  const bannerEditToPublishedState = useSelector(
    (state) => state.bannerEditToPublished
  );
  const { success: publishedBannerSuccess } = bannerEditToPublishedState;

  useEffect(() => {
    dispatch(listBanner());
  }, [deleteBannerSuccess, publishedBannerSuccess]);
  return (
    <Layout>
      <PageTitle
        title="List Banner"
        button="Add Banner"
        link="/banner/add-banner"
      />
      <div class="card mt-4">
        <div class="card-body">
          <h4 class="card-title mb-3">List of Banner</h4>

          <div class="table-responsive">
            <table class="table table-bordered mb-0">
              <thead style={{ background: "#d3d3d3" }}>
                <tr>
                  <th>ID</th>
                  <th>Banner Name</th>
                  <th>Type</th>
                  <th>Published</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {banner &&
                  banner.map((value) => (
                    <tr>
                      <th scope="row">1654653216465465464</th>
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
                      <td>
                        {value.type == "0"
                          ? "Main Banner"
                          : value.type == "1"
                          ? "First Banner"
                          : value.type == "2"
                          ? "Second Banner"
                          : ""}
                      </td>

                      <td className="text-center">
                        {value.isPublished ? (
                          <i
                            className="fas fa-check-circle fa-lg"
                            style={{ color: "blue", cursor: "pointer" }}
                            onClick={() =>
                              dispatch(
                                updateBannerToPublished(false, value.uuid)
                              )
                            }
                          ></i>
                        ) : (
                          <i
                            className="fas fa-times-circle fa-lg"
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() =>
                              dispatch(
                                updateBannerToPublished(true, value.uuid)
                              )
                            }
                          ></i>
                        )}
                      </td>

                      <td>{moment(value.createdAt).format("MMMM Do YYYY")}</td>
                      <td style={{ width: "100px" }}>
                        <Link
                          to={`/banner/edit-banner/${value.uuid}`}
                          onClick={() => dispatch(getBannerDetail(value.uuid))}
                          class="btn btn-secondary btn-sm edit me-2"
                          title="Edit"
                        >
                          <i class="fas fa-pencil-alt"></i>
                        </Link>
                        <a
                          onClick={() => {
                            Swal.fire({
                              title: "Are you sure?",
                              text: `You want to delete this banner ${value.name}`,
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                dispatch(deleteBanner(value.uuid));
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

export default ListBannerScreen;

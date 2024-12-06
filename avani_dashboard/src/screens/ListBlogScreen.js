import React, { useEffect } from "react";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, updateBlogToPublished } from "../redux/actions/blogAction";
import moment from "moment";
import { url } from "../utils/env";

const ListBlogScreen = () => {
  const dispatch = useDispatch();
  const listBlogs = useSelector((state) => state.listBlogs);
  const { blogs } = listBlogs;
  const updateBlogToPublishedState = useSelector(
    (state) => state.updateBlogToPublished
  );
  const { success: publishedSuccess } = updateBlogToPublishedState;
  useEffect(() => {
    dispatch(getBlogs());
  }, [publishedSuccess]);
  return (
    <div>
      <Layout>
        {/* <PageTitle title="List Users" /> */}
        <div class="card mt-4">
          <div class="card-body">
            <h4 class="card-title mb-3">List of Blogs</h4>

            <div class="table-responsive">
              <table class="table table-bordered mb-0">
                <thead style={{ background: "#d3d3d3" }}>
                  <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>User</th>
                    <th>Created At</th>
                    <th>Published</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs &&
                    blogs.map((value) => (
                      <tr key={value.uuid}>
                        <th scope="row">{value.uuid}</th>
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
                        <td>{value.title}</td>
                        <td style={{ width: "250px" }}>
                          {value.description.length > 50 ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  value.description.substring(0, 50) + "...",
                              }}
                            />
                          ) : (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: value.description,
                              }}
                            />
                          )}
                        </td>
                        <td>{value.userId}</td>

                        <td>
                          {moment(value.createdAt).format("MMMM Do YYYY")}
                        </td>

                        <td className="text-center">
                          {value.isPublished ? (
                            <i
                              className="fas fa-check-circle fa-lg"
                              style={{ color: "blue", cursor: "pointer" }}
                              onClick={() =>
                                dispatch(
                                  updateBlogToPublished(false, value.uuid)
                                )
                              }
                            ></i>
                          ) : (
                            <i
                              className="fas fa-times-circle fa-lg"
                              style={{ color: "red", cursor: "pointer" }}
                              onClick={() =>
                                dispatch(
                                  updateBlogToPublished(true, value.uuid)
                                )
                              }
                            ></i>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ListBlogScreen;

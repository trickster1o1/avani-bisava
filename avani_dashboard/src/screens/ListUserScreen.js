import React from "react";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../redux/actions/userAction";
import moment from "moment";

const ListUserScreen = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  return (
    <Layout>
      <PageTitle title="List Users" />
      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered mb-0">
              <thead style={{ background: "#d3d3d3" }}>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((value) => (
                    <tr>
                      <th scope="row">{value.uuid}</th>
                      <td>{value.name}</td>
                      <td>{value.email}</td>
                      <td>{value.phone}</td>
                      <td>{moment(value.createdAt).format("MMMM Do YYYY")}</td>
                      <td>{moment(value.updatedAt).format("MMMM Do YYYY")}</td>
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

export default ListUserScreen;

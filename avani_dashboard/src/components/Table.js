import React from "react";

const Table = ({ headers, lists }) => {
  return (
    <div>
      {/* {lists.length > 0 && ( */}
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
            <tr>
              <th>jldjfalksdj</th>
              <th>jldjfalksdj</th>
              <th>jldjfalksdj</th>
              <th>jldjfalksdj</th>
              <th>jldjfalksdj</th>
              <th>jldjfalksdj</th>
              <th>jldjfalksdj</th>
              <th>jldjfalksdj</th>
              <th>jldjfalksdj</th>
            </tr>
          </tbody>
        </table>
      </div>
      {/* )} */}
    </div>
  );
};

export default Table;

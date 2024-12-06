import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Sidebar />
      <div class="main-content">
        <div class="page-content">
          <div class="container-fluid">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;

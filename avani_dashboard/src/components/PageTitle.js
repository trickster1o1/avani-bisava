import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const PageTitle = ({ title, description, button, link = "/" }) => {
  return (
    <div class="page-title-box">
      <div class="row align-items-center">
        <div class="col-md-8">
          <h6 class="page-title">{title}</h6>
          {description && (
            <ol class="breadcrumb m-0">
              <li class="breadcrumb-item active">{description}</li>
            </ol>
          )}
        </div>
        {button && (
          <div class="col-md-4">
            <div class="float-end d-none d-md-block">
              <Link to={link} class="btn btn-primary">
                <i className="fas fa-plus me-2"></i>
                {button}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageTitle;

import React from "react";

const Button = ({ name, icon }) => {
  return (
    <button
      class="btn btn-primary  dropdown-toggle"
      type="button"
      id="dropdownMenuButton"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {icon && <i class={`${icon} me-2`}></i>}
      {name}
    </button>
  );
};

export default Button;

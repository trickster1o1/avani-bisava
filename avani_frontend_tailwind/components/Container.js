import React from "react";

const Container = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto px-10 sm:px-6 lg:px-14  border-gray-200 py-2.5 rounded ">
      {children}
    </div>
  );
};

export default Container;

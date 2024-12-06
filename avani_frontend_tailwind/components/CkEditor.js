import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CkEditor = (props) => {
  // const [description, setDescription] = useState({});
  const handleDescription = (e) => {
    // console.log("object", e);
    props.onSubmit(e);
  };
  return (
    <div>
      <ReactQuill defaultValue={props.value} onChange={handleDescription} />
    </div>
  );
};

export default CkEditor;

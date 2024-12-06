import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { listAboutUs, updateAboutUs } from "../../redux/actions/aboutUsAction";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl, url } from "../../utils/env";
import axios from "axios";
import { ABOUTUS_UPDATE_RESET } from "../../redux/constants/aboutUsConstant";

const EditAboutUsScreen = () => {
  const dispatch = useDispatch();
  const { uuid } = useParams();
  const navigate = useNavigate();
  const listAboutUsState = useSelector((state) => state.listAboutUs);
  const { about } = listAboutUsState;
  const aboutUsEdit = useSelector((state) => state.aboutUsEdit);
  const { success } = aboutUsEdit;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [previewSource, setPreviewSource] = useState();

  useEffect(() => {
    dispatch(listAboutUs());
    if (success) {
      navigate("/about-us");
      dispatch({ type: ABOUTUS_UPDATE_RESET });
    }
  }, [success]);

  const handleAboutusForm = (e) => {
    e.preventDefault();
    dispatch(updateAboutUs(title, description, image, about && about.uuid));
  };

  const previewFile = (file) => {
    console.log(file);
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    previewFile(file);
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(`${baseUrl}/upload`, formData, config);

      setImage(data[0].path);
      setUploading(false);
    } catch (err) {
      console.error(err);
      setUploading(false);
    }
  };

  const handleCkEditorChange = (e, editor) => {
    setDescription(editor.getData());
  };
  return (
    <Layout>
      <PageTitle title="Edit About Us Page" />
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleAboutusForm}>
            <div className="row mb-3">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Title
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Title"
                  onChange={(e) => setTitle(e.target.value)}
                  defaultValue={about && about.title}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="example-search-input"
                className="col-sm-2 col-form-label"
              >
                Choose Image
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="file"
                  onChange={uploadFileHandler}
                />
                {previewSource && (
                  <div className="previewImage">
                    <img src={previewSource} alt="profile" />
                  </div>
                )}
                {about && about.image && (
                  <div className="previewImage">
                    <img src={`${url}/${about && about.image}`} alt="profile" />
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Description
              </label>
            </div>
            <div className="row mb-3">
              <CKEditor
                editor={ClassicEditor}
                class="form-control"
                placeholder="Description of Job"
                style={{ width: "100%" }}
                onChange={(e, editor) => {
                  handleCkEditorChange(e, editor);
                }}
                data={about && about.description}
                required
              />
            </div>
            {uploading ? (
              <div className="btn btn-primary">Image Uploading ....</div>
            ) : (
              <button type="submit" className="btn btn-primary">
                Edit AboutUs
              </button>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditAboutUsScreen;

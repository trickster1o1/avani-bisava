import axios from "axios";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import { categoryData } from "../../data/categoryData";
import { baseUrl } from "../../utils/env";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addChildCategoryImage,
  saveCategory,
} from "../../redux/actions/categoryAction";
import { useEffect } from "react";
import { CHILD_CATEGORY_IMAGE_ADD_RESET } from "../../redux/constants/categoryConstant";

const AddChildCategoryImageScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [childCategory, setChildCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [previewSource, setPreviewSource] = useState();
  const [uploading, setUploading] = useState(false);

  const listCategoryState = useSelector((state) => state.listCategory);
  const { category: categoryList } = listCategoryState;
  const childCategoryImageAddState = useSelector(
    (state) => state.childCategoryImageAdd
  );
  const { success: categoryAddSuccess } = childCategoryImageAddState;

  const handleChildCategoryForm = (e) => {
    e.preventDefault();
    dispatch(
      addChildCategoryImage(mainCategory, subCategory, childCategory, image)
    );
  };

  useEffect(() => {
    if (categoryAddSuccess) {
      navigate("/category/list-child-category-image");
      dispatch({ type: CHILD_CATEGORY_IMAGE_ADD_RESET });
    }
  }, [categoryAddSuccess]);

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

  const handleChangeMainCategory = (e) => {
    const category = categoryData.filter(
      (value) => value.categoryName === e.target.value
    )[0];
    setMainCategory(e.target.value);
    dispatch(saveCategory(category));
  };
  return (
    <Layout>
      <PageTitle title="Add Category Images" />
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleChildCategoryForm}>
            <div class=" row mb-3">
              <label class="col-sm-2 col-form-label">Main Category</label>
              <div class="col-sm-10">
                <select
                  class="form-select"
                  onChange={handleChangeMainCategory}
                  required
                >
                  <option value="">---select---</option>
                  {categoryData &&
                    categoryData.map((data) => (
                      <option value={data.categoryName}>
                        {data.categoryName}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div class=" row mb-3">
              <label class="col-sm-2 col-form-label">Sub Category</label>
              <div class="col-sm-10">
                <select
                  class="form-select"
                  onChange={(e) => setSubCategory(e.target.value)}
                  required
                >
                  <option value="">---select---</option>

                  {categoryList &&
                    categoryList.subCategory.map((data) => (
                      <option value={data.value}>{data.subCategoryName}</option>
                    ))}
                </select>
              </div>
            </div>

            <div class=" row mb-3">
              <label class="col-sm-2 col-form-label">Child Category</label>
              <div class="col-sm-10">
                <select
                  class="form-select"
                  onChange={(e) => setChildCategory(e.target.value)}
                >
                  <option value="">---select---</option>

                  {categoryList &&
                    categoryList.subCategory.filter(
                      (data) => data.value === subCategory
                    )[0] &&
                    categoryList.subCategory
                      .filter((data) => data.value === subCategory)[0]
                      .childCategory.map((data) => (
                        <option value={data.value}>
                          {data.childCategoryName}
                        </option>
                      ))}
                </select>
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
              </div>
            </div>

            {uploading ? (
              <div className="btn btn-primary">Image Uploading ....</div>
            ) : (
              <button type="submit" className="btn btn-primary">
                Add Category Image
              </button>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddChildCategoryImageScreen;

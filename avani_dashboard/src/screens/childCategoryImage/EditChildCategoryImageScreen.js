import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { categoryData } from "../../data/categoryData";
import { baseUrl, url } from "../../utils/env";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { saveCategory } from "../../redux/actions/categoryAction";
import axios from "axios";

const EditChildCategoryImageScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listCategoryState = useSelector((state) => state.listCategory);
  const { category: categoryList } = listCategoryState;
  const listDetailChildCategoryImageState = useSelector(
    (state) => state.listDetailChildCategoryImages
  );
  const { categoryImage } = listDetailChildCategoryImageState;
  const [image, setImage] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [childCategory, setChildCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [previewSource, setPreviewSource] = useState();
  const [uploading, setUploading] = useState(false);

  const handleEditCategoryImage = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    // if (productEditSuccess) {
    //   navigate("/product/list-product");
    //   dispatch({ type: PRODUCT_UPDATE_RESET });
    // }
    if (categoryImage) {
      const category = categoryData.filter(
        (value) =>
          categoryImage && categoryImage.main_category === value.categoryName
      )[0];
      console.log("category", category);
      dispatch(saveCategory(category));
    }
  }, [categoryImage]);

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
      <PageTitle title="Edit Product Page" />
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleEditCategoryImage}>
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
                    categoryData.map((value) => (
                      <option
                        value={value.categoryName}
                        selected={
                          categoryImage &&
                          categoryImage.main_category == value.categoryName
                            ? true
                            : false
                        }
                      >
                        {value.categoryName}
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
                      <option
                        value={data.value}
                        selected={
                          categoryImage &&
                          categoryImage.sub_category == data.value
                            ? true
                            : false
                        }
                      >
                        {data.subCategoryName}
                      </option>
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
                      (data) =>
                        categoryImage &&
                        categoryImage.sub_category === data.value
                    )[0] &&
                    categoryList.subCategory
                      .filter(
                        (data) =>
                          categoryImage &&
                          categoryImage.sub_category === data.value
                      )[0]
                      .childCategory.map((data) => (
                        <option
                          value={data.value}
                          selected={
                            categoryImage &&
                            categoryImage.child_category == data.value
                              ? true
                              : false
                          }
                        >
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
                Choose Main Image
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
                {categoryImage && categoryImage.image && (
                  <div className="previewImage">
                    <img
                      src={`${url}/${categoryImage && categoryImage.image}`}
                      alt="profile"
                    />
                  </div>
                )}
              </div>
            </div>
            {uploading ? (
              <div className="btn btn-primary">Image Uploading ....</div>
            ) : (
              <button type="submit" className="btn btn-primary">
                Edit Category Image
              </button>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditChildCategoryImageScreen;

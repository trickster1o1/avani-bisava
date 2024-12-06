import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../redux/actions/productActon";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ADD_RESET } from "../../redux/constants/productConstant";
import { baseUrl, url } from "../../utils/env";
import axios from "axios";
import { categoryData, singleCategoryData } from "../../data/categoryData";
import {
  saveCategory,
  saveSingleCategory,
} from "../../redux/actions/categoryAction";
import slugify from "slugify";

const AddProductScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productAddState = useSelector((state) => state.productAdd);
  const { success: productAddSuccess } = productAddState;
  const listCategoryState = useSelector((state) => state.listCategory);
  const { category: categoryList } = listCategoryState;
  const listSingleCategoryState = useSelector(
    (state) => state.listSingleCategory
  );
  const { category: categorySingleList } = listSingleCategoryState;
  console.log("categoryList", categorySingleList && categorySingleList);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [singleMainCategory, setSingleMainCategory] = useState("");
  const [childCategory, setChildCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState("");
  const [priceDiscount, setPriceDiscount] = useState(0);
  const [otherImages, setOtherImages] = useState([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [previewSource, setPreviewSource] = useState();
  const [imageWidth, setImageWidth] = useState();
  const [imageHeight, setImageHeight] = useState();

  const handleCkEditorChange = (e, editor) => {
    setDescription(editor.getData());
  };

  const handleProductForm = (e) => {
    e.preventDefault();
    dispatch(
      addProduct(
        slugify(name),
        name,
        image,
        JSON.stringify(otherImages),
        mainCategory,
        childCategory,
        subCategory,
        isFeatured,
        isPublished,
        price,
        priceDiscount,
        description
      )
    );
  };

  useEffect(() => {
    if (productAddSuccess) {
      navigate("/product/list-product");
      dispatch({ type: PRODUCT_ADD_RESET });
    }
  }, [productAddSuccess]);

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
    // console.log("file", e);
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = function (e) {
    //   //Initiate the JavaScript Image object.
    //   var image = new Image();

    //   //Set the Base64 string return from FileReader as source.
    //   image.src = e.target.result;

    //   //Validate the File Height and Width.
    //   image.onload = function () {
    //     var height = this.height;
    //     var width = this.width;
    //     if (height > 320 || width > 320) {
    //       setImageWidth(width);
    //       setImageHeight(height);
    //       // console.log(height, width);
    //       alert("Height and Width must not exceed 100px.");
    //       return false;
    //     }
    //     alert("Uploaded image has valid Height and Width.");
    //     return true;
    //   };
    // };

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
  const uploadMultipleFileHandler = async (e) => {
    const file = e.target.files;
    const formData = new FormData();
    file.forEach(async (value) => {
      formData.append("image", value);
    });
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(`${baseUrl}/upload`, formData, config);

      setOtherImages(data);
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
    const singleCategory = singleCategoryData.filter(
      (value) => value.categoryName === e.target.value
    )[0];
    setMainCategory(e.target.value);
    setSingleMainCategory(e.target.value);
    dispatch(saveCategory(category));
    dispatch(saveSingleCategory(singleCategory));
  };
  return (
    <Layout>
      <PageTitle title="Add Product Page" />
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleProductForm}>
            <div className="row mb-3">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Product Title
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Product Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

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
                  {singleCategoryData.map((data) => (
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
                  {/* {!singleCategoryData[0].subCategory[0].subCategoryName && (
                    <option>hello</option>
                  )} */}
                  {categorySingleList &&
                    !categorySingleList.subCategory[0].subCategoryName && (
                      <option value="0">No SubCategory</option>
                    )}
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
                  {categorySingleList &&
                    !categorySingleList.subCategory[0].subCategoryName &&
                    categorySingleList.subCategory[0].childCategory.map(
                      (data) => (
                        <option value={data.value}>
                          {data.childCategoryName}
                        </option>
                      )
                    )}
                  {/* {categorySingleList &&
                    categorySingleList.subCategory.filter(
                      (data) => data.value === 0
                    )[0] &&
                    categorySingleList.subCategory
                      .filter((data) => data.value === 0)[0]
                      .childCategory.map((data) => (
                        <option value={data.value}>
                          {data.childCategoryName}
                        </option>
                      ))} */}
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Product Price
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Product Price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Price Discount (In percentage)
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="number"
                  placeholder="Enter Discount Price in Percentage"
                  onChange={(e) => setPriceDiscount(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Offer Price
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="number"
                  disabled
                  value={
                    priceDiscount
                      ? Math.round(price - (price * priceDiscount) / 100)
                      : price
                  }
                />
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
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="example-search-input"
                className="col-sm-2 col-form-label"
              >
                Choose Other Images
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="file"
                  multiple
                  onChange={uploadMultipleFileHandler}
                />
                <div className="row mb-3">
                  {otherImages.map((value) => (
                    <div class="col-xl-3 col-md-6 mt-2">
                      <div class="project-item">
                        <div class="overlay-container">
                          <img
                            src={`${url}/${value.path}`}
                            alt="img"
                            class="gallery-thumb-img"
                            style={{ height: "250px", objectFit: "cover" }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
              />
            </div>
            {uploading ? (
              <div className="btn btn-primary">Image Uploading ....</div>
            ) : (
              <button type="submit" className="btn btn-primary">
                Add Product
              </button>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddProductScreen;

import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useSelector, useDispatch } from "react-redux";
import {
  addProduct,
  detailProduct,
  updateProduct,
} from "../../redux/actions/productActon";
import { useNavigate, useParams } from "react-router-dom";
import {
  PRODUCT_ADD_RESET,
  PRODUCT_UPDATE_RESET,
} from "../../redux/constants/productConstant";
import { baseUrl, url } from "../../utils/env";
import axios from "axios";
import { categoryData } from "../../data/categoryData";
import { saveCategory } from "../../redux/actions/categoryAction";
import slugify from "slugify";

const EditProductScreen = () => {
  const navigate = useNavigate();
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const productEditState = useSelector((state) => state.productEdit);
  const { success: productEditSuccess } = productEditState;
  const productListState = useSelector((state) => state.listProduct);
  const { product } = productListState;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [childCategory, setChildCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState("");
  const [priceDiscount, setPriceDiscount] = useState(0);
  const [otherImages, setOtherImages] = useState([]);
  const [changeDiscount, setChangeDiscount] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewSource, setPreviewSource] = useState();
  const [previewOldSource, setPreviewOldSource] = useState();

  const [description, setDescription] = useState("");
  const listCategoryState = useSelector((state) => state.listCategory);
  const { category: categoryList } = listCategoryState;

  const handleCkEditorChange = (e, editor) => {
    setDescription(editor.getData());
  };

  const handleProductForm = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct(
        slugify(name),
        name,
        image,
        JSON.stringify(otherImages),
        mainCategory,
        childCategory,
        subCategory,
        price,
        priceDiscount,
        description,
        uuid
      )
    );
  };

  useEffect(() => {
    if (productEditSuccess) {
      navigate("/product/list-product");
      dispatch({ type: PRODUCT_UPDATE_RESET });
    }
    if (product) {
      const category = categoryData.filter(
        (value) => product && product.main_category === value.categoryName
      )[0];
      console.log("category", category);
      dispatch(saveCategory(category));
    }
    console.log("object", product);
    // setTimeout(() => {
    //   if (product === undefined) {
    //     navigate("/product/list-product");
    //   }
    // }, 5000);
  }, [productEditSuccess, product]);

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
    setMainCategory(e.target.value);
    dispatch(saveCategory(category));
  };
  return (
    <Layout>
      <PageTitle title="Edit Product Page" />
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
                  defaultValue={product && product.name}
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
                    categoryData.map((value) => (
                      <option
                        value={value.categoryName}
                        selected={
                          product && product.main_category == value.categoryName
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
                          product && product.sub_category == data.value
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
                      (data) => product && product.sub_category === data.value
                    )[0] &&
                    categoryList.subCategory
                      .filter(
                        (data) => product && product.sub_category === data.value
                      )[0]
                      .childCategory.map((data) => (
                        <option
                          value={data.value}
                          selected={
                            product && product.child_category == data.value
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
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Product Price
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Product Price"
                  onChange={(e) => setPrice(e.target.value)}
                  defaultValue={product && product.price}
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
                  onChange={(e) => (
                    setPriceDiscount(e.target.value), setChangeDiscount(true)
                  )}
                  defaultValue={
                    product && product.price_discount === ""
                      ? "0"
                      : product && product.price_discount
                  }
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Offer Price
              </label>
              <div className="col-sm-10">
                {changeDiscount ? (
                  <input
                    className="form-control"
                    type="text"
                    disabled
                    value={
                      priceDiscount
                        ? Math.round(
                            product &&
                              product.price -
                                (product && product.price * priceDiscount) / 100
                          )
                        : price
                    }
                  />
                ) : (
                  <input
                    className="form-control"
                    type="text"
                    disabled
                    value={
                      product && product.price_discount === ""
                        ? product.price
                        : product &&
                          product.price -
                            (product.price * product.price_discount) / 100
                    }
                  />
                )}
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
                {product && product.image && (
                  <div className="previewImage">
                    <img
                      src={`${url}/${product && product.image}`}
                      alt="profile"
                    />
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

                <div class="row mt-4">
                  {product &&
                    JSON.parse(product.imageArray).map((value) => (
                      <div class="col-xl-3 col-md-6">
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
                data={product && product.description}
                required
              />
            </div>
            {uploading ? (
              <div className="btn btn-primary">Image Uploading ....</div>
            ) : (
              <button type="submit" className="btn btn-primary">
                Edit Product
              </button>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditProductScreen;

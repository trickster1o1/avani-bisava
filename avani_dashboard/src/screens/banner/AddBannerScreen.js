import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import { baseUrl } from "../../utils/env";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { listProduct } from "../../redux/actions/productActon";
import { addBanner } from "../../redux/actions/bannerAction";
import { useNavigate } from "react-router-dom";
import { BANNER_ADD_RESET } from "../../redux/constants/bannerConstant";

const AddBannerScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listProductState = useSelector((state) => state.listProducts);
  const { products } = listProductState;
  const bannderAddState = useSelector((state) => state.bannerAdd);
  const { success: bannerAddSuccess } = bannderAddState;
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const [productId, setProductId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [previewSource, setPreviewSource] = useState();

  const handleBannerForm = (e) => {
    e.preventDefault();
    console.log("object");
    dispatch(addBanner(name, image, type, productId));
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

  useEffect(() => {
    dispatch(listProduct());
    if (bannerAddSuccess) {
      navigate("/banner/list-banner");
      dispatch({ type: BANNER_ADD_RESET });
    }
  }, [bannerAddSuccess]);
  return (
    <Layout>
      <PageTitle title="Add Banner Page" />
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleBannerForm}>
            <div className="row mb-3">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Banner Title
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
            <div class=" row mb-3">
              <label class="col-sm-2 col-form-label">Choose Banner Type</label>
              <div class="col-sm-10">
                <select
                  class="form-select"
                  onChange={(e) => setType(e.target.value)}
                  required
                >
                  <option value="">---select---</option>
                  <option value="0">Main Banner</option>
                  <option value="1">First Banner</option>
                  <option value="2">Second Banner</option>
                  {/* {mainCategoryData &&
                    mainCategoryData.map((value) => (
                      <option value={value.id}>{value.name}</option>
                    ))} */}
                </select>
              </div>
            </div>
            <div class=" row mb-3">
              <label class="col-sm-2 col-form-label">Product</label>
              <div class="col-sm-10">
                <select
                  class="form-select"
                  onChange={(e) => setProductId(e.target.value)}
                  required
                >
                  <option value="">---select---</option>
                  {products &&
                    products.map((value) => (
                      <option value={value.id}>{value.name}</option>
                    ))}
                </select>
              </div>
            </div>

            {uploading ? (
              <div className="btn btn-primary">Image Uploading ....</div>
            ) : (
              <button type="submit" className="btn btn-primary">
                Add Banner
              </button>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddBannerScreen;

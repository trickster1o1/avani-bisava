import React, { useEffect, useState } from "react";
import { baseUrl, url } from "../../utils/env";
import axios from "axios";
import Layout from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { listProduct } from "../../redux/actions/productActon";
import { updateBanner } from "../../redux/actions/bannerAction";
import { BANNER_UPDATE_RESET } from "../../redux/constants/bannerConstant";

const EditBannerScreen = () => {
  const navigate = useNavigate();
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const listProductState = useSelector((state) => state.listProducts);
  const { products } = listProductState;
  const bannerDetailState = useSelector((state) => state.bannerDetail);
  const { banner } = bannerDetailState;
  const bannerEditState = useSelector((state) => state.bannerEdit);
  const { success: editBannerSuccess } = bannerEditState;
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const [productId, setProductId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [previewSource, setPreviewSource] = useState();

  const handleBannerEditForm = (e) => {
    e.preventDefault();
    console.log("object");
    dispatch(updateBanner(name, image, type, productId, uuid));
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
    if (editBannerSuccess) {
      navigate("/banner/list-banner");
      dispatch({ type: BANNER_UPDATE_RESET });
    }
  }, [editBannerSuccess]);
  return (
    <Layout>
      <PageTitle title="Edit Banner Page" />
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleBannerEditForm}>
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
                  defaultValue={banner && banner.name}
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
                {banner && banner.image && (
                  <div className="previewImage">
                    <img
                      src={`${url}${banner && banner.image}`}
                      alt="profile"
                    />
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
                  <option
                    value="0"
                    selected={banner && banner.type == "0" ? true : false}
                  >
                    Main Banner
                  </option>
                  <option
                    value="1"
                    selected={banner && banner.type == "1" ? true : false}
                  >
                    First Banner
                  </option>
                  <option
                    value="2"
                    selected={banner && banner.type == "2" ? true : false}
                  >
                    Second Banner
                  </option>
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
                      <option
                        value={value.id}
                        selected={
                          banner && banner.product_id == value.id ? true : false
                        }
                      >
                        {value.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {uploading ? (
              <div className="btn btn-primary">Image Uploading ....</div>
            ) : (
              <button type="submit" className="btn btn-primary">
                Edit Banner
              </button>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditBannerScreen;

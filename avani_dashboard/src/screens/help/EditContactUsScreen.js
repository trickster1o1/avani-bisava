import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import {
  listContactUs,
  updateContactUs,
} from "../../redux/actions/contactUsAction";
import { CONTACTUS_UPDATE_RESET } from "../../redux/constants/contactUsConstant";

const EditContactUsScreen = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listContactUsState = useSelector((state) => state.listContactUs);
  const { contact } = listContactUsState;
  const contactUsEdit = useSelector((state) => state.contactUsEdit);
  const { success } = contactUsEdit;

  const [street, setStreet] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [fbLink, setFbLink] = useState("");
  const [instaLink, setInstaLink] = useState("");

  useEffect(() => {
    dispatch(listContactUs());
    if (success) {
      navigate("/contact-us");
      dispatch({ type: CONTACTUS_UPDATE_RESET });
    }
  }, [success]);

  const handleContactusForm = (e) => {
    e.preventDefault();
    dispatch(
      updateContactUs(phone, street, address, email, fbLink, instaLink, uuid)
    );
  };
  return (
    <Layout>
      <PageTitle title="Edit Contact Us Page" />
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleContactusForm}>
            <div className="row mb-3">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Street Name
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Street Name"
                  onChange={(e) => setStreet(e.target.value)}
                  defaultValue={contact && contact.street}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Address
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Address Name"
                  onChange={(e) => setAddress(e.target.value)}
                  defaultValue={contact && contact.address}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Phone or Tel Number
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="tel"
                  placeholder="Enter Telephone Number"
                  onChange={(e) => setPhone(e.target.value)}
                  defaultValue={contact && contact.phone}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                  defaultValue={contact && contact.email}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Fb Link
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Copy paste Fb Link"
                  onChange={(e) => setFbLink(e.target.value)}
                  defaultValue={contact && contact.fbLink}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Instagram Link
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Copy paste Fb Link"
                  onChange={(e) => setInstaLink(e.target.value)}
                  defaultValue={contact && contact.instaLink}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Edit ContactUs
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditContactUsScreen;

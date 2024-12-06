import React from "react";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { listContactUs } from "../../redux/actions/contactUsAction";

const ContactUsScreen = () => {
  const dispatch = useDispatch();

  const listContactUsState = useSelector((state) => state.listContactUs);
  const { contact } = listContactUsState;

  useEffect(() => {
    dispatch(listContactUs());
  }, []);
  return (
    <Layout>
      <PageTitle
        title="Contact Us"
        // description="Romonia Description"
        button="Edit"
        link={`/edit-contactUs/${contact && contact.uuid}`}
      />
      <div className="card">
        <div class="card-body">
          <div class="card-title mb-4">
            {/* {descriptions && descriptions.description} */}
            {/* <div
              dangerouslySetInnerHTML={{
                __html: descriptions && descriptions.description,
              }}
            ></div> */}
            <h4>
              Street:{" "}
              <span style={{ fontWeight: "lighter" }}>
                {contact && contact.street}
              </span>{" "}
            </h4>
            <h4>
              Address:{" "}
              <span style={{ fontWeight: "lighter" }}>
                {contact && contact.address}
              </span>{" "}
            </h4>
            <h4>
              Phone:{" "}
              <span style={{ fontWeight: "lighter" }}>
                {contact && contact.phone}
              </span>{" "}
            </h4>
            <h4>
              Email:{" "}
              <span style={{ fontWeight: "lighter" }}>
                {contact && contact.email}
              </span>
            </h4>
            <h4>
              FbLink:{" "}
              <span style={{ fontWeight: "lighter" }}>
                {contact && contact.fbLink}
              </span>{" "}
            </h4>
            <h4>
              Instagram Link:{" "}
              <span style={{ fontWeight: "lighter" }}>
                {contact && contact.instaLink}
              </span>{" "}
            </h4>
          </div>

          {/* <!-- end row --> */}
        </div>
      </div>
    </Layout>
  );
};

export default ContactUsScreen;

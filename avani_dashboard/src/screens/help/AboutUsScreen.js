import React from "react";
import { useEffect } from "react";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { listAboutUs } from "../../redux/actions/aboutUsAction";
import { url } from "../../utils/env";

const AboutUsScreen = () => {
  const dispatch = useDispatch();

  const listAboutUsState = useSelector((state) => state.listAboutUs);
  const { about } = listAboutUsState;
  useEffect(() => {
    dispatch(listAboutUs());
  }, []);
  return (
    <Layout>
      <PageTitle
        title="About Us"
        // description="Romonia Description"
        button="Edit"
        link={`/edit-about/${about && about.uuid}`}
      />
      <div className="card">
        <div class="card-body">
          <div class="card-title mb-4">
            <div style={{ width: "600px", margin: "auto" }}>
              <img
                src={`${url}/${about && about.image}`}
                alt=""
                style={{ textAlign: "center", width: "100%" }}
              />
              <h1
                style={{
                  textAlign: "center",
                  marginTop: "5px",
                  marginBlock: "5px",
                }}
              >
                {about && about.title}
              </h1>
              <div
                style={{ paddingLeft: "60px", paddingRight: "60px" }}
                dangerouslySetInnerHTML={{
                  __html: about && about.description,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUsScreen;

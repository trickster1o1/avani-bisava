import axios from "axios";
import React from "react";
import Container from "../components/Container";
import Layout from "../components/Layout";
import { API } from "../config";

const shippingPolicy = ({ privacyData, aboutUsData }) => {
  return (
    <Layout aboutUsData={aboutUsData}>
      <Container>
        <div className="md:px-20 py-5">
          <h1 className="text-3xl mb-4">Shipping Policy</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: privacyData.description,
            }}
          ></div>
        </div>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const privacyData = await axios.get(`${API}/help/shipping`);
  const aboutUs = await axios.get(`${API}/aboutus`);

  return {
    props: {
      privacyData: privacyData.data,
      aboutUsData: aboutUs.data[0],
    },
  };
}

export default shippingPolicy;

import axios from "axios";
import Image from "next/image";
import React from "react";
import Container from "../components/Container";
import Layout from "../components/Layout";
import { API, baseUrl } from "../config";

const aboutUs = ({ aboutUsData }) => {
  console.log("aboutUsData", aboutUsData);
  return (
    <Layout aboutUsData={aboutUsData}>
      <Container>
        <div className="md:px-40">
          <div className="w-full h-48 md:h-96 overflow-hidden bg-gray-200 relative">
            <Image
              alt="Mountains"
              src={`${baseUrl}/${aboutUsData.image}`}
              priority
              objectFit="cover"
              layout="fill"
            />
          </div>
          <h1 className="text-center text-5xl capitalize my-8">
            {aboutUsData.title}
          </h1>

          <div
            className="md:px-[100px]"
            dangerouslySetInnerHTML={{
              __html: aboutUsData.description,
            }}
          ></div>
        </div>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const aboutUs = await axios.get(`${API}/aboutus`);

  return {
    props: {
      aboutUsData: aboutUs.data[0],
    },
  };
}

export default aboutUs;

import axios from "axios";
import React from "react";
import Container from "../components/Container";
import Layout from "../components/Layout";
import { API } from "../config";

const contactUs = ({ contactUsData, aboutUsData }) => {
  return (
    <Layout aboutUsData={aboutUsData}>
      <Container>
        <div className="">
          <div className="md:grid md:grid-cols-2 gap-6 mt-4">
            <div>
              <h1 className="text-2xl font-semibold mb-4">Contact Us</h1>
              <p className="text-lg font-normal">
                If you have any query, we’re here to help you, you can either
                fill out the feedback form
              </p>
              <br />
              <p className="text-lg font-normal">
                Or give us a call at + 977-1- {contactUsData.phone}. We’re here
                to take your call during normal working hours.
              </p>
              <table className="w-full my-4 contact-table">
                <tbody>
                  <tr>
                    <td className="w-2/4">Sunday</td>
                    <td className="w-2/4">9:30AM - 5:30PM</td>
                  </tr>
                  <tr>
                    <td>Monday</td>
                    <td>9:30AM - 5:30PM</td>
                  </tr>
                  <tr>
                    <td>Tuesday</td>
                    <td>9:30AM - 5:30PM</td>
                  </tr>
                  <tr>
                    <td>Wednesday</td>
                    <td>9:30AM - 5:30PM</td>
                  </tr>
                  <tr>
                    <td>Thursday</td>
                    <td>9:30AM - 5:30PM</td>
                  </tr>
                  <tr>
                    <td>Friday</td>
                    <td>9:30AM - 5:30PM</td>
                  </tr>
                  <tr>
                    <td>Saturday</td>
                    <td>Closed</td>
                  </tr>
                </tbody>
              </table>
              <h2 className="text-xl font-normal">Avani Nepal Private Ltd.</h2>
              <h2 className="text-lg font-normal">{contactUsData.street}</h2>
              <h2 className="text-lg font-normal">{contactUsData.address}</h2>
              <h2 className="text-lg font-normal">
                Phone: +977-1-{contactUsData.phone}
              </h2>
              <h2 className="text-lg font-normal">
                Email: {contactUsData.email}
              </h2>
              <h2 className="text-lg font-normal">Follow us on</h2>
              <h2 className="text-lg font-normal">
                Facebook:{" "}
                <a href={contactUsData.fblink} target="_blank">
                  Open
                </a>
              </h2>
              <h2 className="text-lg font-normal">
                Instagram:{" "}
                <a href={contactUsData.instaLink} target="_blank">
                  Open
                </a>
              </h2>
            </div>
            <div>
              <h2 className="text-center text-xl font-semibold">
                Feedback Form
              </h2>
              <form className="mt-4">
                <div class="mb-6">
                  <label
                    for="email"
                    class="block mb-2 text-lg font-medium text-gray-900"
                  >
                    Your Name (required)
                  </label>
                  <input
                    type="text"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary focus:border-primary block w-full p-2.5 "
                    required
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="email"
                    class="block mb-2 text-lg font-medium text-gray-900"
                  >
                    Your Email (required)
                  </label>
                  <input
                    type="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary focus:border-primary block w-full p-2.5 "
                    required
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="email"
                    class="block mb-2 text-lg font-medium text-gray-900"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary focus:border-primary block w-full p-2.5 "
                    required
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="email"
                    class="block mb-2 text-lg font-medium text-gray-900"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-primary focus:border-primary "
                  ></textarea>
                </div>
                <button
                  type="submit"
                  class="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
          {/* google map */}
          <div className="my-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.204498247359!2d85.30463131453773!3d27.680073733297966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18364753f5ad%3A0xb5c70116345672a8!2sHonorary%20Consulate%20of%20Romania%20-%20Nepal!5e0!3m2!1sen!2snp!4v1654677192111!5m2!1sen!2snp"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          {/* google map end */}
        </div>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const contactUs = await axios.get(`${API}/contact`);
  const aboutUs = await axios.get(`${API}/aboutus`);

  return {
    props: {
      contactUsData: contactUs.data[0],
      aboutUsData: aboutUs.data[0],
    },
  };
}

export default contactUs;

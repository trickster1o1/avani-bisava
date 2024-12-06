import "../styles/globals.css";
import "../styles/product.css";
import "../styles/customSlider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "../redux/store";
import Head from "next/head";
// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <title>Avani Nepal</title>
    </Head>
      <Provider store={store}>
        <Component {...pageProps} />
        <ToastContainer />
      </Provider>
    </>
  );
}

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import pro from "../../public/product1.jpg";
import pro2 from "../../public/product2.webp";
import show1 from "../../public/show1.jpg";
import Slider from "react-slick";
import show3 from "../../public/show3.webp";
import axios from "axios";
import ProductCard from "../../components/ProductCard";
import Container from "../../components/Container";
import { useRouter } from "next/router";
import Link from "next/link";
import { API, baseUrl } from "../../config";
import { addToCart } from "../../redux/actions/cartAction";
import { useSelector, useDispatch } from "react-redux";
import { createProductReview } from "../../redux/actions/productAction";
import moment from "moment";
import Rating from "../../components/Rating";
import { isAuth } from "../../redux/utils";
// import "../../styles/product.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}

const ProductDetail = ({ similarProducts, product, review, aboutUsData }) => {
  console.log("review", review);
  const router = useRouter();
  const dispatch = useDispatch();
  const userLoginState = useSelector((state) => state.userLogin);
  const { userInfo } = userLoginState;
  const createProductReviewState = useSelector(
    (state) => state.createProductReview
  );
  const { success } = createProductReviewState;
  const productAddToCart = useSelector((state) => state.productAddToCart);
  const { cartItems } = productAddToCart;
  const productCart = cartItems.filter(
    (value) => value.uuid === product.uuid
  )[0];
  console.log("cartItems", productCart);
  // console.log("Images", JSON.parse(product.imageArray));

  const [rating, setRating] = useState();
  const [comment, setComment] = useState();

  let imageArrayData = JSON.parse(product.imageArray);
  imageArrayData.unshift({ path: product.image });

  const [qty, setQty] = useState(productCart ? productCart.qty : 1);
  const [isLoading, setLoading] = useState(true);
  function cn(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const discountPrice = Math.round(
    product.price - (product.price * product.price_discount) / 100
  );

  const handleBuyNow = () => {
    if (productCart) {
      router.push("/cart");
    } else {
      dispatch(addToCart(product.uuid, qty));
      router.push("/cart");
    }
  };

  const handleQtyDecrease = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };
  // console.log("similarProducts", similarProducts);
  const detailImageSettings = {
    customPaging: function (i) {
      console.log("i", i);
      return (
        <div>
          <a>
            <img
              src={`${baseUrl}/${imageArrayData && imageArrayData[i].path}`}
            />
          </a>
        </div>
      );
    },
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const otherProductsettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  console.log("productdfasd", product);
  const handleSubmitReview = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(rating, comment, userInfo && userInfo.id, product.id)
    );
  };

  useEffect(() => {
    if (success) {
      // router.reload();
      router.push(
        `/product/${product.slug}?main_category=${product.main_category}`
      );
    }
  }, [success]);
  return (
    <Layout aboutUsData={aboutUsData}>
      <Container>
        {/* Breadcrumb */}
        <nav class="flex overflow-x-auto my-5" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <Link href="/">
                <a class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  <svg
                    class="mr-2 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                  Home
                </a>
              </Link>
            </li>
            <li aria-current="page">
              <div class="flex items-center w-max">
                <svg
                  class="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                  {product.main_category}
                </span>
              </div>
            </li>
            <li aria-current="page">
              <div class="flex items-center w-max">
                <svg
                  class="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                  {product.sub_category.replace(/_/g, " ")}
                </span>
              </div>
            </li>
            <li aria-current="page">
              <div class="flex items-center w-max">
                <svg
                  class="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                  {product.child_category.replace(/_/g, " ")}
                </span>
              </div>
            </li>
            <li aria-current="page">
              <div class="flex items-center w-max">
                <svg
                  class="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                  {product.name}
                </span>
              </div>
            </li>
          </ol>
        </nav>
        {/* breadcrumb end */}
        {/* produc detail   */}
        <div className="md:grid md:grid-cols-12 gap-12 mt-5">
          {/* image field */}
          <div className="md:col-span-7">
            <div className="md:grid grid-cols-12 gap-9">
              <div className="hidden md:block col-span-2">
                {/*  */}
                {imageArrayData.length === 1 && (
                  <div>
                    <ul>
                      <li className="mb-3">
                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 xl:aspect-w-2 xl:aspect-h-2">
                          <Image
                            alt="Mountains"
                            src={`${baseUrl}/${product.image}`}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div className="md:col-span-10">
                {JSON.parse(product.imageArray).length > 0 ? (
                  <Slider {...detailImageSettings} className="detailImageStyle">
                    {imageArrayData.map((value) => (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          position: "relative",
                        }}
                        className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 xl:aspect-w-2 xl:aspect-h-2"
                      >
                        <Image
                          alt="Mountains"
                          src={`${baseUrl}/${value.path}`}
                          layout="fill"
                          objectFit="cover"
                          className={cn(
                            "duration-700 ease-in-out group-hover:opacity-75",
                            isLoading
                              ? "scale-110 blur-2xl grayscale"
                              : "scale-100 blur-0 grayscale-0"
                          )}
                          onLoadingComplete={() => setLoading(false)}
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                    }}
                    className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 xl:aspect-w-2 xl:aspect-h-2"
                  >
                    <Image
                      alt="Mountains"
                      src={`${baseUrl}/${product.image}`}
                      layout="fill"
                      objectFit="cover"
                      className={cn(
                        "duration-700 ease-in-out group-hover:opacity-75",
                        isLoading
                          ? "scale-110 blur-2xl grayscale"
                          : "scale-100 blur-0 grayscale-0"
                      )}
                      onLoadingComplete={() => setLoading(false)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* image field end */}
          <div className="md:col-span-5">
            <div>
              <h1 className="text-3xl">{product.name}</h1>
              <div className="border-t my-2"></div>
              {/* description */}
              <div>
                <p className="text-lg description">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.description,
                    }}
                  />
                </p>
              </div>
              <div className="border-t my-2"></div>
              {/* description end */}
              {/* price */}
              <div>
                <h2>
                  <span className="line-through">MRP: ₹{product.price}</span>
                  <br /> <span>(Inclusive of all Taxes)</span>
                </h2>
              </div>
              <div className="border-t my-2"></div>
              <div>
                <h2>
                  MRP: ₹{discountPrice}
                  .00
                  <span className="ml-4 text-xs text-gray-500">
                    {product.price_discount}% OFF
                  </span>
                  <br /> <span>(Inclusive of all Taxes)</span>
                </h2>
              </div>
              <div className="border-t my-2"></div>
              {/* price end */}
              {/* quentity increament  */}
              <div className=" mt-3">
                <div className="flex">
                  <h2 className="mr-4">Quantity</h2>
                  <div className="border w-max flex items-center px-1">
                    <div
                      className={`px-2 ${qty > 1 && "cursor-pointer"}`}
                      onClick={handleQtyDecrease}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18 12H6"
                        />
                      </svg>
                    </div>
                    <div className="px-2">{qty}</div>
                    <div
                      className="px-2 cursor-pointer"
                      onClick={() => setQty(qty + 1)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <h2 className="mt-3">
                  Grand Total: {qty} Quantity of MRP: ₹{discountPrice * qty}.00
                </h2>
              </div>
              {/* quentity increament end */}
              {/* add to cart and buy button */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <button
                  className="border border-primary text-primary font-medium py-2 rounded-md uppercase"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
                <button
                  className="border border-primary bg-primary text-white font-medium py-2 rounded-md uppercase"
                  onClick={(e) => dispatch(addToCart(product.uuid, qty))}
                >
                  Add To Bag
                </button>
              </div>
              {/* add to cart and buy button end */}
            </div>
          </div>
        </div>
        {/* produc detail  end */}
        {/* you may also like */}
        <div className="mt-10">
          <h1 className="text-2xl mb-3">You May Also Like</h1>
          <div>
            {similarProducts.length > 4 ? (
              <Slider {...otherProductsettings}>
                {similarProducts.map((value) => (
                  <div>
                    <ProductCard value={value} />
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1">
                {similarProducts.map((value) => (
                  <div>
                    <ProductCard value={value} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* you may also like end */}
        {/* reviews */}
        <div className="mt-5">
          <h1 className="uppercase text-3xl">Reviews</h1>
          {review.length > 0 ? (
            review.map((value) => (
              <div className="mt-1 border-b border-primary py-5">
                <Rating value={value.rating} />
                <h1>
                  {value.user} |{" "}
                  {moment(value.postedDate).format("MMMM Do YYYY")}
                </h1>
                <p>{value.comment}</p>
              </div>
            ))
          ) : (
            <div
              class="my-4 p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg"
              role="alert"
            >
              <span class="font-medium">Be the first to review this item</span>
            </div>
          )}
        </div>
        {/* reviews end */}
        {/* Review Form */}
        <div className="mt-5">
          <h1 className="uppercase text-3xl">Write A Custom Review</h1>
          {isAuth() ? (
            <form className="mt-3" onSubmit={handleSubmitReview}>
              <div>
                <label for="star" class="text-xl">
                  Rating
                </label>
                <select
                  id="countries"
                  class="mt-1 focus:ring-gray-300 focus:border-gray-300 block w-full shadow-sm border-gray-300 text-lg"
                  onChange={(e) => setRating(e.target.value)}
                  required
                >
                  <option value="">Select...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
              <div className="mt-3">
                <label htmlFor="" className="text-xl">
                  Comment
                </label>
                <textarea
                  rows={4}
                  type="text"
                  name="title"
                  className="mt-1 focus:ring-gray-300 focus:border-gray-300 block w-full shadow-sm border-gray-300 text-lg"
                  placeholder="Write a custome review"
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </div>
              <input
                type="submit"
                className="mt-3 uppercase cursor-pointer py-2 px-4 border border-transparent text-lg font-medium text-white bg-primary hover:bg-primaryDark"
                value="Submit"
              />
            </form>
          ) : (
            <div className="my-2">
              <Link href="/signin">
                <a className=" text-lg font-medium underline">
                  Please Sign in to write Review
                </a>
              </Link>
            </div>
          )}
        </div>
        {/* Review Form End */}
      </Container>
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
  // console.log("slug", query.slug);
  const productData = await axios.get(`${API}/product/slug/${query.slug}`);
  // ${API}/product/filter/product?main_category=hair
  const similarProducts = await axios.get(
    `${API}/product/filter/product?main_category=${query.main_category}`
  );
  const aboutUs = await axios.get(`${API}/aboutus`);
  return {
    props: {
      product: productData.data.product,
      review: productData.data.review,
      similarProducts: similarProducts.data,
      aboutUsData: aboutUs.data[0],
    },
  };
}

export default ProductDetail;

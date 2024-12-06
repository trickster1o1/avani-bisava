import React, { useEffect } from "react";
import { Button, Card, Carousel } from "flowbite-react";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Layout from "../components/Layout";
import ImageSlider from "../components/ImageSlider";
import CustomSlider from "../components/CustomSlider";
import Slider from "react-slick";
import ProductCard from "../components/ProductCard";
import Image from "next/image";
import show3 from "../public/show3.webp";
import show5 from "../public/show5.webp";
import show6 from "../public/show6.webp";
import Link from "next/link";
import axios from "axios";
import Container from "../components/Container";
// import CategoryCard from "../components/Categorycard";
import BlogCard from "../components/BlogCard";
import { API, baseUrl } from "../config";
import Testimonial from "../components/Testimonial";
import Organic from "../components/Organic";
import Promise from "../components/Promise";
import IgSection from "../components/IgSection";
import YtdSection from "../components/YtdSection";

const index = ({
  banners,
  newLaunches,
  featuredProducts,
  bestSeller,
  discountProduct,
  trendingProduct,
  skinConcern,
  hairConcern,
  blogs,
  aboutUsData,
}) => {
  useEffect(() => {
    console.log('========= hya dekhi ========');
    console.log(bestSeller);
    console.log('========= hya samma ========');
  }, []);
  console.log("featuredProducts", featuredProducts);
  const settings = {
    dots: false,
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
          slidesToShow: 2,
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
  const Blogsettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        Blogsettings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        Blogsettings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        Blogsettings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  // console.log(
  //   "newLaunches",
  //   bestSeller.sort((a, b) => parseInt(b.bestSeller) - parseInt(a.bestSeller))
  // );
  console.log("skinConcern", banners.filter((value) => value.type === 1)[0]);

  const firstBanner = banners.filter((value) => value.type === 1)[0];
  // console.log("firstBanner", firstBanner);
  const secondBanner = banners.filter((value) => value.type === 2)[0];
  return (
    <Layout aboutUsData={aboutUsData}>
      {/* <ImageSlider banners={banners} /> */}
      <CustomSlider />
      {/* <Promise /> */}
      <Container>
        <div className="mt-7">
          <div className="flex md:justify-center items-center relative">
            <h1 className="text-center text-2xl mb-3">New Launches</h1>
            <Link href="/products?search=&sort=&category=">
              <a className="absolute right-0">View More..</a>
            </Link>
          </div>
          <div>
            {/* <h2> Multiple items </h2> */}
            <Slider {...settings}>
              {newLaunches &&
                newLaunches.map((value, index) => (
                  <div key={index}>
                    <ProductCard value={value} />
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </Container>
      {/* first Banner */}

      <div>
        <img src="/banner2.png" alt="..." />
      </div>

      <div></div>
      {firstBanner && (
        <div className="mt-7">
          <div className=" w-full h-48 md:h-96 overflow-hidden bg-gray-200 relative">
            <Link
              href={`/product/${firstBanner.product.slug}?main_category=${firstBanner.product.main_category}`}
              // href="/"
            >
              <a>
                <Image
                  alt="Mountains"
                  src={`${baseUrl}/${firstBanner.image}`}
                  priority
                  objectFit="cover"
                  layout="fill"
                />
              </a>
            </Link>
          </div>
        </div>
      )}

      <Container>
        <div className="mt-7">
          <div className="flex md:justify-center items-center relative">
            <h1 className="text-center text-2xl mb-3">Best Sellers</h1>
            <Link href="/products?search=&sort=bestSeller&category=">
              <a className="absolute right-0">View More..</a>
            </Link>
          </div>
          <div>
            {bestSeller.length > 4 ? (
              <Slider {...settings}>
                {bestSeller.map((value, index) => (
                  <div key={'p'+index}>
                    <ProductCard value={value} />
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="grid grid-cols-4 gap-1">
                {bestSeller.map((value, index) => (
                  <div key={'c'+index}>
                    <ProductCard value={value} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>

      <div>
        <img src="/banner3.png" alt="..." />
      </div>
      {/* Featured Products */}
      <Container>
        <div className="mt-7">
          <div className="flex md:justify-center items-center relative">
            <h1 className="text-center text-2xl mb-3">Featured Products</h1>
            <Link href="/products?search=&sort=bestSeller&category=">
              <a className="absolute right-0">View More..</a>
            </Link>
          </div>
          <div>
            {featuredProducts.length > 4 ? (
              <Slider {...settings}>
                {featuredProducts.map((value, index) => (
                  <div key={'f'+index}>
                    <ProductCard value={value} />
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-1">
                {featuredProducts.map((value,index) => (
                  <div key={'f'+index}>
                    <ProductCard value={value} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
      
      <div className="flex justify-center">
        <img src="/banner4.png" alt="..." />
      </div>
      {/* Featured Products End */}
      {/* <div className="mt-7">
        <div style={{ position: "relative" }}>
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image alt="Mountains" src={show5} objectFit="contain" />
          </div>
          <div
            style={{
              width: "500px",
              position: "absolute",
              bottom: "-45px",
              alignItems: "center",
              left: "30%",
              border: "2px solid #ded7c9",
              padding: "20px",
              background: "#fff",
              textAlign: "center",
            }}
          >
            <h1>Take Our Ayurvedix dosha</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error
              minus libero voluptatem. Voluptatum soluta asperiores adipisci ex
              tenetur atque quos.
            </p>
          </div>
        </div>
      </div> */}
      {secondBanner && (
        <div className="mt-20">
          <div className=" w-full h-48 md:h-96 overflow-hidden bg-gray-200 relative">
            <Link
              href={`/product/${
                secondBanner.product && secondBanner.product.slug
              }?main_category=${
                secondBanner.product && secondBanner.product.main_category
              }`}
            >
              <a>
                <Image
                  alt="Mountains"
                  src={`${baseUrl}/${secondBanner.image}`}
                  priority
                  objectFit="cover"
                  layout="fill"
                />
              </a>
            </Link>
          </div>
          {/* <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image alt="Mountains" src={show3} objectFit="contain" />
          </div> */}
        </div>
      )}
      {/* <Container>
        <div className="mt-7">
          <h1 className="text-center text-2xl mb-3">Shop by Hair Concerns</h1>
          <div className="grid md:grid-cols-5 gap-5">
            {hairConcern.map((value) => (
              <div>
                <CategoryCard value={value} />
              </div>
            ))}
          </div>
        </div>
      </Container> */}
      {/* <div className="mt-7">
        <div
          style={{ position: "relative" }}
          className="grid grid-cols-10 gap-4"
        >
          <div
            style={{ width: "100%", height: "100%", position: "relative" }}
            className="col-span-8"
          >
            <Image alt="Mountains" src={show6} objectFit="contain" />
          </div>
          <div
            className="col-span-4"
            style={{
              width: "500px",
              position: "absolute",
              right: "0px",
              alignItems: "center",
              top: "40%",
              border: "2px solid #ded7c9",
              padding: "20px",
              background: "#fff",
              textAlign: "center",
            }}
          >
            <h1>Take Our Ayurvedix dosha</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error
              minus libero voluptatem. Voluptatum soluta asperiores adipisci ex
              tenetur atque quos.
            </p>
          </div>
        </div>
      </div> */}
      {/* <Container>
        <div className="mt-7">
          <h1 className="text-center text-2xl mb-3">Shop by Skin Concerns</h1>
          <div className="grid md:grid-cols-5 gap-5">
            {skinConcern &&
              skinConcern.map((value) => (
                <div>
                  <CategoryCard value={value} />
                </div>
              ))}
          </div>
        </div>
      </Container> */}
      {/* <div className="mt-7">
        <div
          style={{ position: "relative" }}
          className="grid grid-cols-10 gap-4"
        >
          <div
            style={{ width: "100%", height: "100%", position: "relative" }}
            className="col-span-8"
          >
            <Image alt="Mountains" src={show6} objectFit="contain" />
          </div>
          <div
            className="col-span-4"
            style={{
              width: "500px",
              position: "absolute",
              right: "0px",
              alignItems: "center",
              top: "40%",
              border: "2px solid #ded7c9",
              padding: "20px",
              background: "#fff",
              textAlign: "center",
            }}
          >
            <h1>Take Our Ayurvedix dosha</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error
              minus libero voluptatem. Voluptatum soluta asperiores adipisci ex
              tenetur atque quos.
            </p>
          </div>
        </div>
      </div> */}
      <Container>
        <div className="mt-7">
          <div className="flex md:justify-center items-center relative">
            <h1 className="text-center text-2xl mb-3">Trending Now</h1>
            <Link href="/products?search=&sort=trending&category=">
              <a className="absolute right-0">View More..</a>
            </Link>
          </div>
          <div>
            {/* <h2> Multiple items </h2> */}
            {trendingProduct.length > 4 ? (
              <Slider {...settings}>
                {trendingProduct.map((value, index) => (
                  <div key={'t'+index}>
                    <ProductCard value={value} />
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="grid grid-cols-4 gap-1">
                {trendingProduct.map((value, index) => (
                  <div key={'t'+index}>
                    <ProductCard value={value} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
      {discountProduct.length ? (
        <Container>
          <div className="mt-7">
            <div className="flex md:justify-center items-center relative">
              <h1 className="text-center text-2xl mb-3">Save On Sets</h1>
              <Link href="/products?search=&sort=discount&category=">
                <a className="absolute right-0">View More..</a>
              </Link>
            </div>
            <div>
              {/* <h2> Multiple items </h2> */}
              {discountProduct.length > 4 ? (
                <Slider {...settings}>
                  {discountProduct.map((value, index) => (
                    <div key={'d'+index}>
                      <ProductCard value={value} />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1">
                  {discountProduct.map((value,index) => (
                    <div key={'d'+index}>
                      <ProductCard value={value} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      ) : null}

      {blogs.length ? (
        <Container>
          <div className="mt-7">
            <div className="flex md:justify-center items-center relative">
              <h1 className="text-center text-2xl mb-3">From Our Blog</h1>
              <Link href="/blogs">
                <a className="absolute right-0">View More..</a>
              </Link>
            </div>
            <div>
              {/* <h2> Multiple items </h2> */}
              {blogs.length > 4 ? (
                <Slider {...settings}>
                  {blogs.map((value, index) => (
                    <BlogCard value={value} key={'b'+index} />
                  ))}
                </Slider>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {blogs.map((value, index) => (
                    <BlogCard value={value} key={'b'+index} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      ) : null}

      <Organic />
      <Testimonial />
      <YtdSection />
      <IgSection />
    </Layout>
  );
};

export async function getServerSideProps() {
  const banner = await axios.get(`${API}/banner`);
  const newLaunches = await axios.get(`${API}/product/all`);
  const featuredProducts = await axios.get(`${API}/product/featured`);
  const bestSeller = await axios.get(
    `${API}/product/filter/product?bestSeller=0`
  );
  const discountProduct = await axios.get(
    `${API}/product/filter/product?discount=10`
  );
  const trendingProduct = await axios.get(
    `${API}/product/filter/product?trending=0`
  );
  const skinConcern = await axios.get(
    `${API}/childCategoryImage?main_category=skin&sub_category=shop_by_concerns`
  );
  const hairConcern = await axios.get(
    `${API}/childCategoryImage?main_category=hair&sub_category=shop_by_concerns`
  );
  const blogs = await axios.get(`${API}/blog/published`);
  const aboutUs = await axios.get(`${API}/aboutus`);

  return {
    props: {
      banners: banner.data,
      newLaunches: newLaunches.data,
      featuredProducts: featuredProducts.data,
      bestSeller: bestSeller.data.sort(
        (a, b) => parseInt(b.bestSeller) - parseInt(a.bestSeller)
      ),
      discountProduct: discountProduct.data.sort(
        (a, b) => parseInt(b.price_discount) - parseInt(a.price_discount)
      ),
      trendingProduct: trendingProduct.data.sort(
        (a, b) => parseInt(b.trending) - parseInt(a.trending)
      ),
      skinConcern: skinConcern.data,
      hairConcern: hairConcern.data,
      blogs: blogs.data,
      aboutUsData: aboutUs.data[0],
    },
  };
}

export default index;

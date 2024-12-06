import { Carousel } from "flowbite-react";
import Link from "next/link";
import { banners } from "../data/testi";

export default function CustomSlider() {
  return (
    <div className="slider-cont">
      <Carousel>
        {banners.length
          ? banners.map((b, index) => (
              <div className="w-full h-full" key={index}>
                <div className="c-overlay">
                  <div className="w-1/2 h-full flex flex-col justify-center items-center p-10">
                    <div className="text-lg p-10 text-[white] flex flex-col justify-end">
                      <h1 className="text-4xl mb-5">
                        <div dangerouslySetInnerHTML={{ __html: b.header }} />
                      </h1>
                      {b.desc}
                      <br />
                      <Link href={b.link}>
                        <a className="block w-fit custom-btn pt-[.5em] pb-[.5em] pl-[3em] pr-[3em] text-white hover:text-[rgba(0,0,0,.5)] border border-[white] mt-10 mb-5">
                          {b.btn}
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                <img alt="..." src={b.img} style={b.style ? b.style : null} />
              </div>
            ))
          : null}
      </Carousel>
    </div>
  );
}

import { Carousel } from "flowbite-react";
import { testiData } from "../data/testi";

export default function Testimonial() {
  return (
    <div
      className="w-full h-[415px] flex justify-center items-center testi-cont"
      style={{
        margin: "0",
        position: "relative",
        backgroundImage: 'url("/testiB.jpeg")',
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[rgba(255,255,255,.2)]"></div>
      <Carousel indicators={false} slideInterval={11000}>
        {testiData
          ? testiData.map((t, index) => (
              <div key={index} className="w-5/6 flex justify-center h-5/6 pt-5 overflow-hidden testi-cont">
                <div className="w-2/6 testi-name">
                  <span className="text-2xl block w-full overflow-hidden mb-2 text-[#a37292]">
                    Testimonials
                  </span>
                  <span className="text-5xl text-[#6b8874] block w-full overflow-hidden">
                    <div dangerouslySetInnerHTML={{ __html: t.name }} />
                  </span>
                  {
                    t.designation ? 
                    <span className="text-2xl block w-full overflow-hidden mt-1 text-[#a37292]">
                      {t.designation}
                    </span>: null
                  }
                </div>
                <div
                  className="w-2/6 text-left pl-6 h-fit text-lg text-[#6b8874] font-bold"
                  style={{ borderLeft: "1px solid rgba(0,0,0,.2)" }}
                >
                  <div dangerouslySetInnerHTML={{__html: t.testi}}/>
                </div>
              </div>
            ))
          : null}
      </Carousel>
    </div>
  );
}

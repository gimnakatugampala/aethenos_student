import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { useEffect, useState } from "react";
import { Margin } from "@mui/icons-material";

const testimonial_data = [
  {
    img: "/assets/images/site-ad/Slide1.PNG",
  },
  {
    img: "/assets/images/site-ad/Slide2.PNG",
  },
  {
    img: "/assets/images/site-ad/Slide3.PNG",
  },
  {
    img: "/assets/images/site-ad/Slide4.PNG",
  },
  {
    img: "/assets/images/site-ad/Slide5.PNG",
  },
  {
    img: "/assets/images/site-ad/Slide6.PNG",
  },
  {
    img: "/assets/images/site-ad/Slide7.PNG",
  },
  {
    img: "/assets/images/site-ad/Slide8.PNG",
  },
];

const mainfs = {
  fontSize: "clamp(0.1rem, calc(0.3rem + 0.8vw), 2rem)",
  margin: "0px",
  marginTop: "5px",
};

export default function TestimonialArea() {
  const [loop, setLoop] = useState(false);
  useEffect(() => setLoop(true), []);
  return (
    <div className="testimonial-area-1 section-gap-equal">
      <div className="inner">
        <div className="row g-lg-5 mx-5 d-flex justify-content-center">
          <div className="col-xl-4 col-md-12 d-flex justify-content-center">
            <div className="testimonial-heading-area">
              <div
                className="section-title section-left"
                data-sal-delay="50"
                data-sal="slide-up"
                data-sal-duration="800"
              >
                {/* <span className="pre-title">Testimonials</span> */}
                <h2 className="title">Excel App features: </h2>
                <span className="shape-line">
                  <i className="icon-19"></i>
                </span>
                <ul style={{ lineHeight: "1" }}>
                  <li style={mainfs}>
                    {" "}
                    Fully Integrated to the Excel application{" "}
                  </li>
                  <li style={mainfs}>Streaming video lessons</li>
                  <li style={mainfs}>
                    Load Excel practice files/data directly to Excel{" "}
                  </li>
                  <li style={mainfs}>Downloadable resource files</li>
                  <li style={mainfs}>Quizzes</li>
                  <li style={mainfs}>Practice Tests</li>
                  <li style={mainfs}>Assignments</li>
                  <li style={mainfs}>Coding Exercises (VBA)</li>
                  <li style={mainfs}>+ Much more</li>
                </ul>

                {/* <a href="#" className="edu-btn btn-large">View All<i className="icon-4"></i></a> */}
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-md-12 d-flex align-items-center">
            <Swiper
              slidesPerView={1}
              spaceBetween={0}
              loop={loop}
              className="home-one-testimonial-activator swiper "
              modules={[Autoplay]}
              pagination={false}
              grabCursor={true}
              speed={1500}
              autoplay={{
                delay: 3500,
              }}
              breakpoints={{
                577: {
                  slidesPerView: 1,
                },
              }}
            >
              {testimonial_data.map((testi, i) => (
                <SwiperSlide key={i}>
                  <div className="testimonial-grid p-0 m-0">
                    <div className="">
                      <img
                        src={testi.img}
                        alt="Testimonial"
                        style={{ width: "100%", border: "none" }}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

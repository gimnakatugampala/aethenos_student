import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { useEffect, useState } from "react";

const testimonial_data = [
    {
        img: '/assets/images/testimonial/testimonial-01.png',
        desc: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.',
        ratings: <>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
        </>,
        name: 'Ray Sanchez',
        title: 'Student'
    },
    {
        img: '/assets/images/testimonial/testimonial-02.png',
        desc: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.',
        ratings: <>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
        </>,
        name: 'Thomas Lopez',
        title: 'Designer'
    },
    {
        img: '/assets/images/testimonial/testimonial-03.png',
        desc: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.',
        ratings: <>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
        </>,
        name: 'Amber Page',
        title: 'Developer'
    },
    {
        img: '/assets/images/testimonial/testimonial-04.png',
        desc: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.',
        ratings: <>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
        </>,
        name: 'Robert Tapp',
        title: 'Content Creator'
    }
]

export default function TestimonialArea() {
    const [loop,setLoop] = useState(false);
    useEffect(() => setLoop(true) ,[])
    return (
        <div className="testimonial-area-1 section-gap-equal">
            <div className="container">
                <div className="row g-lg-5">
                    <div className="col-lg-5">
                        <div className="testimonial-heading-area">
                            <div className="section-title section-left" data-sal-delay="50" data-sal="slide-up" data-sal-duration="800">
                                <span className="pre-title">Testimonials</span>
                                <h2 className="title">What Our Students Have To Say</h2>
                                <span className="shape-line"><i className="icon-19"></i></span>
                                <p>Lorem ipsum dolor sit amet consectur adipiscing elit sed eiusmod tempor incididunt labore dolore magna aliquaenim ad minim.</p>
                                <a href="#" className="edu-btn btn-large">View All<i className="icon-4"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7">
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
                                delay: 3500
                            }}
                            breakpoints={{
                                577: {
                                slidesPerView: 2
                                }
                            }}
                        >
                            {testimonial_data.map((testi, i) => (
                                <SwiperSlide key={i}>
                                    <div className="testimonial-grid">
                                        <div className="thumbnail">
                                            <img src={testi.img} alt="Testimonial" />
                                            <span className="qoute-icon"><i className="icon-26"></i></span>
                                        </div>
                                        <div className="content">
                                            <p>{testi.desc}</p>
                                            <div className="rating-icon">
                                                {testi.ratings}
                                            </div>
                                            <h5 className="title">{testi.name}</h5>
                                            <span className="subtitle">{testi.title}</span>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}

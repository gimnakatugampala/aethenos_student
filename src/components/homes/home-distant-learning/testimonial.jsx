import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper";
import Link from 'next/link';

const testimonial_contents = {
    pre_title: 'Testimonials',
    title: 'What Our Students Have To Say',
    text: 'Lorem ipsum dolor sit amet consectur adipiscing elit sed eiusmod tempor incididunt labore dolore magna aliquaenim ad minim.',
    testimonial_data: [
        {
            img: '/assets/images/testimonial/testimonial-01.png',
            desc: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.',
            ratings: [1, 2, 3, 4, 5],
            name: 'Ray Sanchez',
            title: 'Student'
        },
        {
            img: '/assets/images/testimonial/testimonial-02.png',
            desc: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.',
            ratings: [1, 2, 3, 4, 5],
            name: 'Thomas Lopez',
            title: 'Designer'
        },
        {
            img: '/assets/images/testimonial/testimonial-03.png',
            desc: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.',
            ratings: [1, 2, 3, 4, 5],
            name: 'Amber Page',
            title: 'Developer'
        },
        {
            img: '/assets/images/testimonial/testimonial-04.png',
            desc: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.',
            ratings: [1, 2, 3, 4, 5],
            name: 'Robert Tapp',
            title: 'Content Creator'
        }
    ]
}

const { pre_title, testimonial_data, text, title } = testimonial_contents;

const Testimonial = () => {
    const [loop, setLoop] = useState(false);
    useEffect(() => setLoop(true), [])
    return (
        <div className="testimonial-area-5 gap-lg-bottom-equal">
            <div className="container">
                <div className="row g-lg-5">
                    <div className="col-lg-5">
                        <div className="testimonial-heading-area">
                            <div className="section-title section-left" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                                <span className="pre-title">{pre_title}</span>
                                <h2 className="title">{title}</h2>
                                <span className="shape-line"><i className="icon-19"></i></span>
                                <p>{text}</p>
                                <Link href="/about-1">
                                    <a className="edu-btn btn-large">View All<i className="icon-4"></i></a>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <Swiper
                            loop={loop}
                            speed={500}
                            slidesPerView={1}
                            centeredSlides={true}
                            effect="coverflow"
                            grabCursor={true}
                            modules={[Autoplay, EffectCoverflow, Pagination]}
                            className="swiper-testimonial-slider-wrapper swiper testimonial-coverflow"
                            autoplay={{
                                delay: 2500
                            }}
                            breakpoints={{
                                575: {
                                    slidesPerView: 2
                                }
                            }}
                            coverflowEffect={{
                                rotate: 0,
                                slideShadows: false,
                                depth: 180,
                                stretch: 80
                            }}
                            pagination={{
                                el: '.swiper-pagination',
                                type: 'bullets',
                                clickable: true
                            }}
                        >
                            {testimonial_data.map((item, i) => (
                                <SwiperSlide key={i}>
                                    <div className="testimonial-grid">
                                        <div className="thumbnail">
                                            <img src={item.img} alt="Testimonial" />
                                            <span className="qoute-icon"><i className="icon-26"></i></span>
                                        </div>
                                        <div className="content">
                                            <p>{item.desc}</p>
                                            <div className="rating-icon">
                                                {item.ratings.map((r, i) => <i key={i} className="icon-23"></i>)}
                                            </div>
                                            <h5 className="title">{item.name}</h5>
                                            <span className="subtitle">{item.title}</span>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                            <div className="swiper-pagination"></div>
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonial;
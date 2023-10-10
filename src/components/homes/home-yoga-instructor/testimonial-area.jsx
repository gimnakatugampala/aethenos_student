import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../../contexts/mouse-move-context';

const testimonial_contents = {
    pre_title: 'Testimonials',
    title: 'What Our Students Have To Say',
    sm_text: 'Lorem ipsum dolor sit amet consectur adipiscing elit sed eiusmod tempor incididunt labore dolore magna aliquaenim ad minim.',
    testimonials: [
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
            name: 'Amber Page',
            title: 'Designer'
        },
        {
            img: '/assets/images/testimonial/testimonial-03.png',
            desc: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.',
            ratings: [1, 2, 3, 4, 5],
            name: 'Sara Taylor',
            title: 'Developer'
        }
    ]
}

const { pre_title, sm_text, testimonials, title } = testimonial_contents;

const TestimonialArea = () => {
    const [loop, setLoop] = useState(false);
    useEffect(() => setLoop(true), [])
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div className="testimonial-area-4">
            <div className="container">
                <div className="row g-5">
                    <div className="col-lg-5">
                        <div className="testimonial-heading-area">
                            <div className="section-title section-left" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                                <span className="pre-title pre-textsecondary">{pre_title}</span>
                                <h2 className="title">{title}</h2>
                                <span className="shape-line"><i className="icon-19"></i></span>
                                <p>{sm_text}</p>
                                <div className="slick-arrow-nav slick-custom-arrow"></div>
                            </div>
                        </div>
                        <div className="swiper-navigation">
                            <div className="swiper-btn-nxt" style={{cursor:'pointer'}}>
                                <i className="icon-west"></i>
                            </div>
                            <div className="swiper-btn-prv" style={{cursor:'pointer'}}>
                                <i className="icon-east"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <Swiper
                            className="testimonial-activation-3 swiper"
                            slidesPerView={1}
                            spaceBetween={0}
                            loop={loop}
                            grabCursor={true}
                            modules={[Autoplay,Navigation]}
                            speed={1000}
                            autoplay={{
                                delay: 3000
                            }}
                            navigation={{
                                nextEl: ".swiper-btn-nxt",
                                prevEl: ".swiper-btn-prv"
                            }}
                            breakpoints={{
                                577: {
                                    slidesPerView: 2
                                }
                            }}
                        >
                            {testimonials.map((item, i) => {
                                const { desc, img, name, ratings, title } = item;
                                return (
                                    <SwiperSlide key={i}>
                                        <div className="testimonial-grid testimonial-style-3">
                                            <div className="thumbnail">
                                                <img src={img} alt="Testimonial" />
                                            </div>
                                            <div className="content">
                                                <p>{desc}</p>
                                                <div className="rating-icon">
                                                    {ratings.map(r => <i key={r} className="icon-23"></i>)}
                                                </div>
                                                <h5 className="title">{name}</h5>
                                                <span className="subtitle">{title}</span>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
            <ul className="shape-group">
                <motion.li className="shape-1 scene"
                    animate={ {
                        x: mouseReverse(30).x,
                        y: mouseReverse(30).y
                    } }
                >
                    <img src="/assets/images/others/shape-18.png" alt="Shape" />
                </motion.li>
                <li>
                    <img src="/assets/images/others/map-shape-3.png" alt="Shape" />
                </li>
            </ul>
        </div>
    )
}

export default TestimonialArea;
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from 'swiper';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../../contexts/mouse-move-context';

const contents = [
    {
        name: 'Ray Sanchez',
        title: 'Student',
        ratings: [1, 2, 3, 4, 5],
        imgSrc: '/assets/images/testimonial/testimonial-09.png',
        desc: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.'
    },
    {
        name: 'Sara Lopez',
        title: 'Designer',
        ratings: [1, 2, 3, 4, 5],
        imgSrc: '/assets/images/testimonial/testimonial-10.png',
        desc: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.'
    },
    {
        name: 'Amber Page',
        title: 'Developer',
        ratings: [1, 2, 3, 4, 5],
        imgSrc: '/assets/images/testimonial/testimonial-11.jpg',
        desc: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.'
    }
]

const Testimonial = () => {
    const [loop, setLoop] = useState(false);
    useEffect(() => setLoop(true), [])
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div className="testimonial-area-9 section-gap-equal">
            <div className="container edublink-animated-shape">
                <div className="row g-5">
                    <div className="col-lg-3">
                        <div className="testimonial-heading-area">
                            <div className="section-title section-left" data-sal-delay="50" data-sal="slide-up" data-sal-duration="800">
                                <span className="pre-title pre-textsecondary">Testimonials</span>
                                <h2 className="title">What Our Students Have To Say</h2>
                                <span className="shape-line"><i className="icon-19"></i></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 bg-thumbnail edublink-animated-shape">
                        <img className="health-bg-thumbnail" src="/assets/images/bg/bg-image-34.webp" alt="images" />
                        <ul className="shape-group">
                            <motion.li className="shape-3 scene" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                                animate={ {
                                    x: mouseReverse(30).x,
                                    y: mouseReverse(30).y
                                } }
                            >
                                <img src="/assets/images/others/shape-38.png" alt="Shape" />
                            </motion.li>
                            <motion.li className="shape-4 scene" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                                animate={ {
                                    x: mouseDirection(30).x,
                                    y: mouseDirection(30).y
                                } }
                            >
                                <img src="/assets/images/others/shape-37.png" alt="Shape" />
                            </motion.li>
                            <li className="shape-5" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000">
                                <img src="/assets/images/counterup/shape-02.png" alt="Shape" />
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-4">
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={0}
                            loop={loop}
                            pagination={false}
                            grabCursor={true}
                            speed={1000}
                            modules={[Autoplay, Navigation]}
                            className="home-health-testimonial-activator swiper"
                            autoplay={{
                                delay: 3000
                            }}
                            navigation={{
                                nextEl: ".swiper-btn-nxt",
                                prevEl: ".swiper-btn-prv"
                            }}
                        >

                            {contents.map((item, i) => (
                                <SwiperSlide key={i}>
                                    <div className="testimonial-grid">
                                        <div className="thumbnail">
                                            <img src={item.imgSrc} alt="Testimonial" />
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
                            <div className="swiper-navigation">
                                <div className="swiper-slide-controls swiper-btn-prv" role="button">
                                    <img src="/assets/images/svg-icons/icon-left.svg" alt="images left" />
                                </div>
                                <div className="swiper-slide-controls swiper-btn-nxt" role="button">
                                    <img src="/assets/images/svg-icons/icon-right.svg" alt="images right" />
                                </div>
                            </div>
                        </Swiper>
                    </div>
                </div>
                <ul className="shape-group">
                    <motion.li className="shape-1 scene" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                        animate={ {
                            x: mouseDirection(30).x,
                            y: mouseDirection(30).y
                        } }
                    >
                        <img src="/assets/images/others/shape-35.png" alt="Shape" />
                    </motion.li>
                    <li className="shape-2" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000">
                        <img src="/assets/images/others/shape-36.png" alt="Shape" />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Testimonial;
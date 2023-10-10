import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay,Pagination } from "swiper";
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../../contexts/mouse-move-context';

const contents = {
    pre_title: 'Testimonials',
    title: <>What Our Students <br /> Have To Say</>,
    desc: "Lorem ipsum dolor sit amet consectur adipiscing elit sed eiusmod tempor incidid unt labore dolore magna aliquaenim minim.",
    testimonial_items: [
        {
            logo: '/assets/images/testimonial/logo-01.png',
            desc: "Lorem ipsum dolor amet consectur elit adicing elit sed do umod tempor ux incididunt enim ad minim veniam quis nosrud citation laboris nisiste aliquip comodo perspiatix.",
            ratings: [1, 2, 3, 4, 5],
            img: "/assets/images/testimonial/testimonial-01.png",
            name: "Ray Sanchez",
            title: 'Student'
        },
        {
            logo: '/assets/images/testimonial/logo-02.png',
            desc: "Lorem ipsum dolor amet consectur elit adicing elit sed do umod tempor ux incididunt enim ad minim veniam quis nosrud citation laboris nisiste aliquip comodo perspiatix.",
            ratings: [1, 2, 3, 4, 5],
            img: "/assets/images/testimonial/testimonial-02.png",
            name: "Thomas Lopez",
            title: 'Designer'
        },
        {
            logo: '/assets/images/testimonial/logo-03.png',
            desc: "Lorem ipsum dolor amet consectur elit adicing elit sed do umod tempor ux incididunt enim ad minim veniam quis nosrud citation laboris nisiste aliquip comodo perspiatix.",
            ratings: [1, 2, 3, 4, 5],
            img: "/assets/images/testimonial/testimonial-03.png",
            name: "Amber Page",
            title: 'Developer'
        },
        {
            logo: '/assets/images/testimonial/logo-02.png',
            desc: "Lorem ipsum dolor amet consectur elit adicing elit sed do umod tempor ux incididunt enim ad minim veniam quis nosrud citation laboris nisiste aliquip comodo perspiatix.",
            ratings: [1, 2, 3, 4, 5],
            img: "/assets/images/testimonial/testimonial-04.png",
            name: "Robert Tapp",
            title: 'Content Creator'
        }
    ]
}

const { desc, pre_title, testimonial_items, title } = contents;

const Testimonial = ( { about_p_2 } ) => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    const [loop, setLoop] = useState( false );
    useEffect( () => setLoop(true), [])
    return (
        <div className={`testimonial-area-2 ${about_p_2?'edu-section-gap':'section-gap-large'}`}>
            <div className="container edublink-animated-shape">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="section-title section-center" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                            <span className="pre-title">{pre_title}</span>
                            <h2 className="title">{title}</h2>
                            <span className="shape-line"><i className="icon-19"></i></span>
                            <p>{desc}</p>
                        </div>
                    </div>
                </div>
                <Swiper
                    className="testimonial-activation swiper"
                    slidesPerView={1}
                    spaceBetween={0}
                    modules={[Autoplay, Pagination]}
                    loop={loop}
                    grabCursor={true}
                    speed={1000}
                    autoplay={{
                        delay: 3000
                    } }
                    breakpoints={{
                        768: {
                            slidesPerView: 2
                        },
                        992: {
                            slidesPerView: 3
                        }
                    }}
                    pagination={{
                        el: '.swiper-pagination',
                        type: 'bullets',
                        clickable: true
                    } }
                >
                    {testimonial_items.map((item, i) => {
                        const { desc, img, logo, name, ratings, title } = item;
                        return (
                            <SwiperSlide key={i}>
                                <div className="testimonial-slide">
                                    <div className="content">
                                        <div className="logo"><img src={logo} alt="Logo" /></div>
                                        <p>{desc}</p>
                                        <div className="rating-icon">
                                            {ratings.map((r) => <i key={r} className="icon-23"></i>)}
                                        </div>
                                    </div>
                                    <div className="author-info">
                                        <div className="thumb">
                                            <img src={img} alt="Testimonial" />
                                        </div>
                                        <div className="info">
                                            <h5 className="title">{name}</h5>
                                            <span className="subtitle">{title}</span>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                <div className="swiper-pagination"></div>

                <ul className="shape-group">
                    <motion.li className="shape-1 scene" data-sal-delay="200" data-sal="fade" data-sal-duration="1000"
                        animate={ {
                            x: mouseReverse(25).x,
                            y: mouseReverse(25).y
                        } }
                    >
                        <img src="/assets/images/about/shape-30.png" alt="Shape" />
                    </motion.li>
                    <motion.li className="shape-2 scene" data-sal-delay="200" data-sal="fade" data-sal-duration="1000"
                        animate={ {
                            x: mouseDirection(25).x,
                            y: mouseDirection(25).y
                        } }
                    >
                        <img src="/assets/images/about/shape-25.png" alt="Shape" />
                    </motion.li>
                </ul>
            </div>
            <ul className="shape-group">
                <li className="shape-3" data-sal-delay="200" data-sal="fade" data-sal-duration="1000">
                    <img className="d-block-shape-light" src="/assets/images/others/map-shape-3.png" alt="Shape" />
                    <img className="d-none-shape-dark" src="/assets/images/others/dark-map-2-shape-3.png" alt="Shape" />
                </li>
            </ul>
        </div>
    )
}

export default Testimonial;
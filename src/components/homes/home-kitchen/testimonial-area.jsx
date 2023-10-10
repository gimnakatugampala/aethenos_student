import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../../contexts/mouse-move-context';

const testimonial_items = [
    {
        ratings: [1, 2, 3, 4, 5],
        desc: 'Lorem ipsum dolor amet consectur elit adicing elit sed mod tempor incididunt enim minim veniam quis nosrud citation laboris nisiste aliquip comodo perspiatix unde omnis iste natus error sit voluptatem.',
        img: '/assets/images/testimonial/testimonial-01.png',
        name: 'Haley Bennet',
        title: 'Designer'
    },
    {
        ratings: [1, 2, 3, 4, 5],
        desc: 'Lorem ipsum dolor amet consectur elit adicing elit sed mod tempor incididunt enim minim veniam quis nosrud citation laboris nisiste aliquip comodo perspiatix unde omnis iste natus error sit voluptatem.',
        img: '/assets/images/testimonial/testimonial-02.png',
        name: 'Richard Gere',
        title: 'Developer'
    },
    {
        ratings: [1, 2, 3, 4, 5],
        desc: 'Lorem ipsum dolor amet consectur elit adicing elit sed mod tempor incididunt enim minim veniam quis nosrud citation laboris nisiste aliquip comodo perspiatix unde omnis iste natus error sit voluptatem.',
        img: '/assets/images/testimonial/testimonial-03.png',
        name: 'Megan Foxx',
        title: 'Content creator'
    }
];

const TestimonialArea = () => {
    const [loop, setLoop] = useState(false);
    useEffect(() => setLoop(true), [])
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div className="testimonial-area-3">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="section-title section-center" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                            <span className="pre-title">Testimonials</span>
                            <h2 className="title">What Our Students <br /> Have To Say</h2>
                            <span className="shape-line"><i className="icon-19"></i></span>
                        </div>
                    </div>
                </div>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    loop={loop}
                    className="testimonial-activation-2"
                    grabCursor={true}
                    modules={[Autoplay]}
                    speed={1000}
                    autoplay={{
                        delay: 3000
                    }}
                    breakpoints={{
                        768: {
                            slidesPerView: 1
                        },
                        992: {
                            slidesPerView: 2
                        }
                    }}
                >
                    {testimonial_items.map((item, i) => {
                        const { desc, img, name, ratings, title } = item;
                        return (
                            <SwiperSlide key={i}>
                                <div className="testimonial-slide testimonial-style-2">
                                    <div className="content">
                                        <div className="rating-icon">
                                            {ratings.map(r => <i key={r} className="icon-23"></i>)}
                                        </div>
                                        <p>{desc}</p>
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
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>

            <ul className="shape-group">
                <motion.li className="shape-1 scene" data-sal-delay="100" data-sal="fade" data-sal-duration="1000"
                    animate={ {
                        x: mouseReverse(25).x,
                        y: mouseReverse(25).y
                    } }
                >
                    <img src="/assets/images/others/shape-03.png" alt="Shape" />
                </motion.li>
                <motion.li className="shape-2 scene" data-sal-delay="100" data-sal="fade" data-sal-duration="1000"
                    animate={ {
                        x: mouseDirection(25).x,
                        y: mouseDirection(25).y
                    } }
                >
                    <img src="/assets/images/others/shape-04.png" alt="Shape" />
                </motion.li>
                <motion.li className="shape-3 scene" data-sal-delay="100" data-sal="fade" data-sal-duration="1000"
                    animate={ {
                        x: mouseReverse(25).x,
                        y: mouseReverse(25).y
                    } }
                >
                    <img src="/assets/images/others/shape-02.png" alt="Shape" />
                </motion.li>
                <motion.li className="shape-4 scene" data-sal-delay="100" data-sal="fade" data-sal-duration="1000"
                    animate={ {
                        x: mouseDirection(25).x,
                        y: mouseDirection(25).y
                    } }
                >
                    <img src="/assets/images/others/shape-01.png" alt="Shape" />
                </motion.li>
                <li className="shape-5" data-sal-delay="100" data-sal="fade" data-sal-duration="1000">
                    <img className="d-block-shape-light" src="/assets/images/others/map-shape-3.png" alt="Shape" />
                    <img className="d-none-shape-dark" src="/assets/images/others/dark-map-2.png" alt="Shape" />
                </li>
            </ul>
        </div>
    )
}

export default TestimonialArea;
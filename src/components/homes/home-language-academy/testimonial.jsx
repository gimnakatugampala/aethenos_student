
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper";
import Link from 'next/link';

const testimonial_contents = {
    pre_title: 'Testimonials',
    title: 'What Our Students <br/> Have To Say',
    testimonial_data: [
        {
            img: '/assets/images/testimonial/testimonial-11.jpg',
            desc: 'Lorem ipsum dolor amet consectur elit adicing elit sed mod tempor incid idunt enim minim veniam quis nosrud citation laboris nisiste aliquip comodo perspiatix unde omnis iste natus error sit voluptatem. accusantium doloreq laudantum.',
            ratings: [1, 2, 3, 4, 5],
            name: 'Ray Sanchez',
            title: 'Student'
        },
        {
            img: '/assets/images/testimonial/testimonial-09.png',
            desc: 'Lorem ipsum dolor amet consectur elit adicing elit sed mod tempor incid idunt enim minim veniam quis nosrud citation laboris nisiste aliquip comodo perspiatix unde omnis iste natus error sit voluptatem. accusantium doloreq laudantum.',
            ratings: [1, 2, 3, 4, 5],
            name: 'Thomas Lopez',
            title: 'Designer'
        },
        {
            img: '/assets/images/testimonial/testimonial-10.png',
            desc: 'Lorem ipsum dolor amet consectur elit adicing elit sed mod tempor incid idunt enim minim veniam quis nosrud citation laboris nisiste aliquip comodo perspiatix unde omnis iste natus error sit voluptatem. accusantium doloreq laudantum.',
            ratings: [1, 2, 3, 4, 5],
            name: 'Amber Page',
            title: 'Developer'
        },
        {
            img: '/assets/images/testimonial/testimonial-12.jpg',
            desc: 'Lorem ipsum dolor amet consectur elit adicing elit sed mod tempor incid idunt enim minim veniam quis nosrud citation laboris nisiste aliquip comodo perspiatix unde omnis iste natus error sit voluptatem. accusantium doloreq laudantum.',
            ratings: [1, 2, 3, 4, 5],
            name: 'Robert Tapp',
            title: 'Content Creator'
        }
    ]
}

const { pre_title, testimonial_data, text, title } = testimonial_contents;

const Testimonial = () => {
    const [loop, setLoop] = useState(false);
    const [activeThumb, setActiveThumb] = useState();
    useEffect(() => setLoop(true), [])
    return (
        <div className="testimonial-area-10 section-gap-equal edublink-animated-shape">
            <div className="container edublink-animated-shape">
                <div className="testimonial-heading-area">
                    <div className="section-title section-center" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                        <span className="pre-title">{pre_title}</span>
                        <h2 className="title" dangerouslySetInnerHTML={{__html: title}}></h2>
                        <span className="shape-line"><i className="icon-19"></i></span>
                    </div>
                </div>

                <Swiper
                    slidesPerView={1}
                    centeredSlides={true}
                    loop={loop}
                    loopedSlides= {3}
                    speed={1000}
                    modules={[Navigation, Thumbs]}
                    thumbs={{ swiper: activeThumb }}
                    autoplay={{
                        delay: 3000
                    }}
                    className="home-language-testimonial-activator swiper"
                >

                    {testimonial_data.map((item, i) => (
                        <SwiperSlide key={i}>
                            <div className="testimonial-grid">
                                <div className="content">
                                    <div className="rating-icon">
                                        {item.ratings.map((r, i) => <i key={i} className="icon-23"></i>)}
                                    </div>
                                    <p>{item.desc}</p>
                                    <h5 className="title">{item.name}</h5>
                                    <span className="subtitle">{item.title}</span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <Swiper
                    onSwiper={setActiveThumb}
                    slidesPerView={1}
                    spaceBetween= {0}
                    centeredSlides={true}
                    loop={loop}
                    slideToClickedSlide={true}
                    modules={[Navigation, Thumbs]}
                    className="swiper testimonial-thumbs testimonial-thumb-wrap"
                >

                    {testimonial_data.map((item, i) => (
                        <SwiperSlide key={i}>
                            <div className="nav-thumb swiper-slide">
                                <div className="clint-thumb">
                                    <p>{item.title}</p>
                                    <img src={item.img} alt="Testimonial" />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default Testimonial;
import Link from 'next/link';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../../contexts/mouse-move-context';

const slider_data = [
    {
        id: 1,
        src: '/assets/images/bg/bg-image-17.jpg',
        subtitle: 'Welcome to EduBlink',
        title: 'Reclaim Your Body, Your Confidence & Your Life.',
        sm_text: 'Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit.',
        btn_text: 'Find courses'
    },
    {
        id: 2,
        src: '/assets/images/bg/bg-image-28.jpg',
        subtitle: 'Welcome to edublink',
        title: 'Expart & chaged Your Life',
        sm_text: 'Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit.',
        btn_text: 'Find courses'
    },
    {
        id: 3,
        src: '/assets/images/bg/bg-image-26.jpg',
        subtitle: 'Welcome to edublink',
        title: 'We Can Help Your Reignite That Speak',
        sm_text: 'Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit.',
        btn_text: 'Find courses'
    }
];

const Slider = () => {
    const [loop, setLoop] = useState(false);
    useEffect(() => setLoop(true), [])
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div className="hero-banner hero-style-9">
            <div className="slider">
                <div className="container">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={0}
                        loop={loop}
                        pagination={false}
                        grabCursor={true}
                        draggable={true}
                        modules={[Autoplay, EffectFade, Navigation]}
                        effect="fade"
                        className="swiper health-slider-content"
                        speed={1000}
                        autoplay={{
                            delay: 5500
                        }}
                        navigation={{
                            nextEl: ".slide-next",
                            prevEl: ".slide-prev"
                        }}
                        lazy={{
                            loadPrevNext: false,
                            loadPrevNextAmount: 1
                        }}
                    >
                        {slider_data.map((item) => {
                            const { btn_text, id, sm_text, src, subtitle, title } = item;
                            return (
                                <SwiperSlide key={id}>
                                    <div className="inner">
                                        <span className="pre-title color-primary">{subtitle}</span>
                                        <h1 className="title">
                                            {title}
                                        </h1>
                                        <p data-sal-delay="200">{sm_text}</p>
                                        <div className="banner-btn" data-sal-delay="400">
                                            <Link href="/course-style-1">
                                            <a className="edu-btn btn-secondary">{btn_text} <i className="icon-4"></i></a>
                                            </Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default Slider;
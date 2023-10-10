import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import { course_data } from '../../../data';
import CourseTypeTwo from '../../course/course-type-two';

const course_items = course_data.filter(course => course.yoga_course);

const CourseArea = () => {
  const [loop, setLoop] = useState(false);
  useEffect(() => setLoop(true), [])
    return (
        <div className="edu-course-area course-area-6 edu-section-gap bg-lighten01">
            <div className="container">
            <div className="section-title section-center" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                <span className="pre-title pre-textsecondary">Popular Courses</span>
                <h2 className="title">Pick A Course To Get Started</h2>
                <span className="shape-line"><i className="icon-19"></i></span>
            </div>
                <Swiper
                    className="course-activation"
                    slidesPerView={1}
                    modules={[Autoplay, Pagination]}
                    spaceBetween={0}
                    loop={loop}
                    grabCursor={true}
                    speed={1000}
                    autoplay={{
                        delay: 3000
                    }}
                    breakpoints={{
                        768: {
                            slidesPerView: 2
                        },
                        1200: {
                            slidesPerView: 3
                        }
                    }}
                    pagination={{
                        el: '.swiper-pagination',
                        type: 'bullets',
                        clickable: true
                    }}
                >
                    {course_items.slice(0,4).map((course) => {
                        const { id, img, level, title, course_price, lesson, student } = course;
                        return (
                            <SwiperSlide key={id}>
                                <CourseTypeTwo data={course} />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                <div className="swiper-pagination"></div>
            </div>
        </div>
    )
}

export default CourseArea;
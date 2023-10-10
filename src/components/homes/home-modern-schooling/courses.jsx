import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../../contexts/mouse-move-context';
import { course_data } from '../../../data';
import CourseTypeThree from '../../course/course-type-three';

const Courses = () => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div className="home-eight-course edu-course-area course-area-8 gap-tb-text bg-image">
            <div className="container edublink-animated-shape">
                <ul>
                    <li>
                        <div className="section-title section-left" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                            <span className="pre-title">Popular Courses</span>
                            <h2 className="title">Pick A Course To Get Started</h2>
                            <span className="shape-line"><i className="icon-19"></i></span>
                        </div>
                    </li>
                    <li>
                        <div className="course-view-all" data-sal-delay="150" data-sal="slide-up" data-sal-duration="1200">
                            <Link href="/course-style-1">
                                <a className="edu-btn">Browse more courses <i className="icon-4"></i></a>
                            </Link>
                        </div>
                    </li>
                </ul>
                <div className="row g-5">
                    {course_data.slice(2,6).map((course) => {
                        return (
                            <div className="col-xl-6" data-sal-delay="100" data-sal="slide-up" data-sal-duration="800" key={course.id}>
                                <CourseTypeThree data={course} />
                            </div>
                        )
                    })}
                </div>

                <ul className="shape-group">
                    <motion.li className="shape-1 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                        animate={ {
                            x: mouseDirection(30).x,
                            y: mouseDirection(30).y
                        } }
                    >
                        <img src="/assets/images/about/shape-13.png" alt="Shape" />
                    </motion.li>
                    <li className="shape-2">
                        <span></span>
                    </li>
                    <motion.li className="shape-3 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                        animate={ {
                            x: mouseReverse(30).x,
                            y: mouseReverse(30).y
                        } }
                    >
                        <img src="/assets/images/about/shape-13.png" alt="Shape" />
                    </motion.li>
                    <li className="shape-4 sal-animate" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000">
                        <img src="/assets/images/counterup/shape-02.png" alt="Shape" />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Courses;
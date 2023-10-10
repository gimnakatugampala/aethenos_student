import Link from 'next/link';
import React from 'react';
import { course_data } from '../../../data';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../../contexts/mouse-move-context';
import CourseTypeThree from '../../course/course-type-three';

const Courses = () => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div className="home-four-course edu-course-area course-area-4 gap-tb-text bg-image">
            <div className="container edublink-animated-shape">
                <div className="section-title section-center" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                    <span className="pre-title">Popular Courses</span>
                    <h2 className="title">Pick A Course To Get Started</h2>
                    <span className="shape-line"><i className="icon-19"></i></span>
                </div>

                <div className="row g-5">
                    {course_data.slice(0,4).map((course) => {
                        return (
                            <div className="col-xl-6" data-sal-delay="100" data-sal="slide-up" data-sal-duration="800" key={course.id}>
                                <CourseTypeThree data={course} />
                            </div>
                        )
                    })}
                </div>
                
                <div className="course-view-all" data-sal-delay="150" data-sal="slide-up" data-sal-duration="1200">
                    <Link href="/course-style-1">
                        <a className="edu-btn">Browse more courses <i className="icon-4"></i></a>
                    </Link>
                </div>
                <ul className="shape-group">
                    <motion.li className="shape-1 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                        animate={ {
                            x: mouseDirection(25).x,
                            y: mouseDirection(25).y
                        } }
                    >
                        <img src="/assets/images/about/shape-13.png" alt="Shape" />
                    </motion.li>
                    <motion.li className="shape-2 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                        animate={ {
                            x: mouseReverse(35).x,
                            y: mouseReverse(35).y
                        } }
                    >
                        <span></span>
                    </motion.li>
                </ul>
            </div>
        </div>
    )
}

export default Courses;
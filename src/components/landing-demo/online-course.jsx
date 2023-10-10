import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../contexts/mouse-move-context';

const OnlineCourse = () => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div className="pv-course-details-area bg-image">
            <div className="wrapper">
                <div className="container-custom">
                    <div className="row align-items-center">
                        <div className="col-xl-5 col-lg-6">
                            <div className="course-content">
                                <div className="section-title section-left splash-title">
                                    <span className="pre-title" data-sal="slide-up" data-sal-duration="1000">Online Course</span>
                                    <h2 className="title" data-sal-delay="100" data-sal="slide-up" data-sal-duration="1000">Learn Your Online Course Easily With EduBlink</h2>
                                    <p data-sal-delay="100" data-sal="slide-up" data-sal-duration="1000">Users can check up their active courses, update their bio, completed courses, track their progress easily and many more.</p>
                                    <div data-sal-delay="400" data-sal="slide-up" data-sal-duration="1000">
                                        <Link href="/course-details">
                                            <a className="edu-btn" target="_blank">Course Details <i className="icon-4"></i></a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-6">
                            <div className="course-thumbnail">
                                <img src="/assets/images/preview/course-details.png" className="course-details-main" data-sal-delay="200" data-sal="fade" data-sal-duration="800" alt="Course Details" />
                                <img src="/assets/images/preview/instructor.png" className="course-instructor" data-sal-delay="500" data-sal="slide-right" data-sal-duration="1000" alt="Course Instructor" />
                                <ul className="shape-group">
                                    <motion.li className="shape-1 scene" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                                        animate={ {
                                            x: mouseDirection(30).x,
                                            y: mouseDirection(30).y
                                        } }
                                    >
                                        <img src="/assets/images/about/shape-13.png" alt="Shape" />
                                    </motion.li>
                                    <li className="shape-2" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000">
                                        <img className="rotateit" src="/assets/images/counterup/shape-02.png" alt="Shape" />
                                    </li>
                                    <motion.li className="shape-3 scene" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                                        animate={ {
                                            x: mouseReverse(40).x,
                                            y: mouseReverse(40).y
                                        } }
                                    >
                                        <img src="/assets/images/counterup/shape-04.png" alt="Shape" />
                                    </motion.li>
                                    <motion.li className="shape-4 scene" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                                        animate={ {
                                            x: mouseDirection(40).x,
                                            y: mouseDirection(40).y
                                        } }
                                    >
                                        <img src="/assets/images/counterup/shape-05.png" alt="Shape" />
                                    </motion.li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OnlineCourse;
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../../contexts/mouse-move-context';
import { course_data } from '../../../data';

const courses = course_data.filter(course => course.kindergarten_course)

const CoursesArea = () => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div className="edu-course-area course-area-7">
            <div className="container edublink-animated-shape">
                <div className="section-title section-center" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                    <span className="pre-title pre-textsecondary">Popular Courses</span>
                    <h2 className="title">Pick A Course To Get Started</h2>
                    <span className="shape-line"><i className="icon-19"></i></span>
                </div>
                <div className="row g-5">
                    {courses.slice(0,3).map((course) => {
                        const { id, bg_color, img, course_price, level, title, short_desc, lesson, student } = course;
                        return (
                            <div key={id} className="col-12 col-lg-4 col-md-6" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                                <div className={`edu-course course-style-7 ${bg_color}`}>
                                    <div className="inner">
                                        <div className="thumbnail">
                                            <Link href={`/course-details/${id}`}>
                                                <a>
                                                <img src={`/assets/images/course/course-04/${img}`} alt="Course Meta" />
                                                </a>
                                            </Link>
                                            <div className="course-price price-round">${Math.trunc(course_price)}</div>
                                        </div>
                                        <div className="content">
                                            <span className="course-level">{level}</span>
                                            <h5 className="title">
                                                <Link href={`/course-details/${id}`}>
                                                    <a>{title}</a>
                                                </Link>
                                            </h5>
                                            <ul className="course-meta">
                                                <li><i className="icon-24"></i>{lesson} Lessons</li>
                                                <li><i className="icon-25"></i>{student} Students</li>
                                            </ul>
                                            <p>{short_desc}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <ul className="shape-group">
                    <motion.li className="shape-1 scene"
                        animate={ {
                            x: mouseReverse(30).x,
                            y: mouseReverse(30).y
                        } }
                    >
                        <img src="/assets/images/banner/icon-3.png" alt="Shape" />
                    </motion.li>
                    <motion.li className="shape-2 scene"
                        animate={ {
                            x: mouseDirection(30).x,
                            y: mouseDirection(30).y
                        } }
                    >
                        <img src="/assets/images/banner/icon-2.png" alt="Shape" />
                    </motion.li>
                </ul>
            </div>
            <ul className="shape-group">
                <motion.li className="shape-3 scene"
                    animate={ {
                        x: mouseReverse(40).x,
                        y: mouseReverse(40).y
                    } }
                >
                    <img src="/assets/images/banner/icon-4.png" alt="Shape" />
                </motion.li>
            </ul>
        </div>
    )
}

export default CoursesArea;
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../../contexts/mouse-move-context';
import Counter from '../../common/counter';

const HeroArea = () => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div className="hero-banner hero-style-10">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="banner-content">
                            <h1 className="title" data-sal-delay="100" data-sal="slide-up" data-sal-duration="1000">Take Online <br /> <span className="color-secondary">Language</span> Courses<br />With Certificate</h1>
                            <p data-sal-delay="200" data-sal="slide-up" data-sal-duration="1000">Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit.</p>
                            <div className="banner-btn" data-sal-delay="400" data-sal="slide-up" data-sal-duration="1000">
                                <Link href="/course-style-1">
                                    <a className="edu-btn">Find courses <i className="icon-4"></i></a>
                                </Link>
                            </div>
                            <ul className="shape-group">
                                <li className="shape-1" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000">
                                    <span className="d-block"></span>
                                </li>
                                <motion.li className="shape-2 scene" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                                    animate={ {
                                        x: mouseReverse(25).x,
                                        y: mouseReverse(25).y
                                    } }
                                >
                                    <span className="d-block"></span>
                                </motion.li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="banner-thumbnail">
                            <div className="thumbnail" data-sal-delay="500" data-sal="slide-left" data-sal-duration="1000">
                                <img src="/assets/images/banner/flag-boy.webp" alt="flag-boy Image" />
                            </div>
                            <div className="instructor-info" data-sal-delay="800" data-sal="fade-in" data-sal-duration="1000">
                                <div className="inner">
                                    <div className="enrolled-counter">
                                        <div className="counterup-wrapper">
                                            <h2 className="counter-item count-number primary-color">
                                                <span className="odometer">
                                                    <Counter number="9.3" decimal="1" text="K" />
                                                </span>
                                            </h2>
                                            <h6 className="title">Enrolled</h6>
                                        </div>
                                    </div>
                                    <div className="lahguage-counter">
                                        <div className="counterup-wrapper">
                                            <h2 className="counter-item count-number secondary-color">
                                                <span className="odometer">
                                                    <Counter number="20" text="+" />
                                                </span>
                                            </h2>
                                            <h6 className="title">Languages</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <ul className="shape-group">
                                <li className="shape-3" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000">
                                    <img src="/assets/images/about/shape-15.png" alt="Shape" />
                                </li>

                                <motion.li className="shape-4 scene" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                                    animate={ {
                                        x: mouseDirection(30).x,
                                        y: mouseDirection(30).y
                                    } }
                                >
                                    <img src="/assets/images/counterup/shape-05.png" alt="Shape" />
                                </motion.li>

                                <li className="shape-5" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000">
                                    <img src="/assets/images/svg-icons/circle-big.svg" alt="Shape" />
                                </li>

                                <li className="shape-6" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000">
                                    <img src="/assets/images/svg-icons/circle-small.svg" alt="Shape" />
                                </li>
                                
                                <motion.li className="shape-7 scene" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                                    animate={ {
                                        x: mouseReverse(25).x,
                                        y: mouseReverse(25).y
                                    } }
                                >
                                    <img src="/assets/images/about/shape-13.png" alt="Shape" />
                                </motion.li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <ul className="shape-group">
                <li className="shape-8">
                    <img src="/assets/images/about/h-1-shape-01.png" alt="Shape" />
                </li>
            </ul>
        </div>
    )
}

export default HeroArea;
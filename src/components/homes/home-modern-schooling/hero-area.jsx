import React from 'react';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../../contexts/mouse-move-context';

const HeroArea = () => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div className="hero-banner hero-style-8">
            <div className="container edublink-animated-shape">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="banner-content">
                            <h1 className="title" data-sal-delay="100" data-sal="slide-up" data-sal-duration="1000">Find Your Best <br /> Courses to <span className="color-secondary">Develope</span> <br />your skills</h1>
                            <p data-sal-delay="200" data-sal="slide-up" data-sal-duration="1000">Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit.</p>
                            <div className="banner-search" data-sal-delay="400" data-sal="slide-up" data-sal-duration="1000">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="What do you want learn?" />
                                    <button className="search-btn" type="button"><i className="icon-2"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="banner-thumbnail">
                            <div className="thumbnail" data-sal-delay="500" data-sal="slide-left" data-sal-duration="1000">
                                <img src="/assets/images/banner/home8-vactor-bg.webp" alt="vactor Image" />
                            </div>

                            <div className="instructor-info" data-sal-delay="600" data-sal="slide-up" data-sal-duration="1000">
                                <div className="inner">
                                    <h5 className="title">Instrunctor</h5>
                                    <div className="media">
                                        <div className="thumb">
                                            <img src="/assets/images/banner/author-1.png" alt="Images" />
                                        </div>
                                        <div className="content">
                                            <span>200+</span> Instactors
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <ul className="shape-group">
                                <li className="shape-1" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000">
                                    <img src="/assets/images/others/shape-30.png" alt="Shape" />
                                </li>

                                <motion.li className="shape-2 scene" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                                    animate={ {
                                        x: mouseReverse(30).x,
                                        y: mouseReverse(30).y
                                    } }
                                >
                                    <img src="/assets/images/others/shape-31.png" alt="Shape" />
                                </motion.li>

                                <motion.li className="shape-3 scene shape-light" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                                    animate={ {
                                        x: mouseDirection(30).x,
                                        y: mouseDirection(30).y
                                    } }
                                >
                                    <img src="/assets/images/faq/shape-09.png" alt="Shape" />
                                </motion.li>

                                <motion.li className="shape-3 scene shape-dark" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                                    animate={ {
                                        x: mouseDirection(30).x,
                                        y: mouseDirection(30).y
                                    } }
                                >
                                    <img src="/assets/images/faq/dark-shape-09.png" alt="Shape" />
                                </motion.li>

                                <motion.li className="shape-4 scene shape-light" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                                    animate={ {
                                        x: mouseDirection(30).x,
                                        y: mouseDirection(30).y
                                    } }
                                >
                                    <img src="/assets/images/faq/shape-13.png" alt="Shape" />
                                </motion.li>

                                <motion.li className="shape-4 scene shape-dark" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                                    animate={ {
                                        x: mouseDirection(30).x,
                                        y: mouseDirection(30).y
                                    } }
                                >
                                    <img src="/assets/images/faq/dark-shape-13.png" alt="Shape" />
                                </motion.li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <ul className="shape-group">
                    <li className="shape-5">
                        <span></span>
                    </li>
                    <motion.li className="shape-6 scene" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                        animate={ {
                            x: mouseReverse(40).x,
                            y: mouseReverse(40).y
                        } }
                    >
                        <img src="/assets/images/others/shape-32.png" alt="Shape" />
                    </motion.li>
                </ul>
            </div>
        </div>
    )
}

export default HeroArea;
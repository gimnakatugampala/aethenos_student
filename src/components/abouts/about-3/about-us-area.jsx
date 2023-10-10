import React from 'react';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../../contexts/mouse-move-context';

// MissionItem
function MissionItem({ color, icon, title, text }) {
    return (
        <div className="single-item" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
            <div className={`icon color-extra${color}`}><i className={`icon-${icon}`}></i></div>
            <div className="content">
                <h4 className="title">{title}</h4>
                <p>{text}</p>
            </div>
        </div>
    )
}

const AboutUsArea = () => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div className="edu-section-gap edu-about-area about-style-8">
            <div className="container">
                <div className="row g-5">
                    <div className="col-lg-6">
                        <div className="about-content">
                            <div className="section-title section-left" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                                <span className="pre-title">About Us</span>
                                <h2 className="title">We Provide Best <span className="color-secondary">Education</span> Services For You.</h2>
                                <span className="shape-line"><i className="icon-19"></i></span>
                                <p>Magna aliquaenim ad minim veniam quis nostrud exercitation ullamco laborisLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eius tempor incididunt labore.</p>
                            </div>
                            <div className="about-mission">
                                <MissionItem color="02" icon="51" title="Our Mission" text="Magna aliquaenim minim quis nostrud exercitation ulamco labor is Lorem ipsum." />
                                <MissionItem color="06" icon="52" title="Our Vision" text="Magna aliquaenim minim quis nostrud exercitation ulamco labor is Lorem ipsum." />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="about-image-gallery">
                            <div className="row g-5" id="masonry-gallery">
                                <div className="col-6 masonry-item">
                                    <div className="thumbnail thumbnail-1 mb--30" data-sal-delay="50" data-sal="slide-down" data-sal-duration="1000">
                                        <img src="/assets/images/about/about-13.webp" alt="About Images" />
                                    </div>

                                    <div className="thumbnail thumbnail-4" data-sal-delay="50" data-sal="slide-up" data-sal-duration="1000">
                                        <img src="/assets/images/about/about-15.webp" alt="About Images" />
                                    </div>
                                </div>
                                <div className="col-6 masonry-item">
                                    <div className="thumbnail thumbnail-2 mb--30" data-sal-delay="50" data-sal="slide-down" data-sal-duration="1000">
                                        <img src="/assets/images/about/about-14.webp" alt="About Images" />
                                    </div>
                                    <div className="thumbnail thumbnail-3" data-sal-delay="50" data-sal="slide-up" data-sal-duration="1000">
                                        <img src="/assets/images/about/about-16.webp" alt="About Images" />
                                    </div>
                                </div>
                            </div>
                            <ul className="shape-group">
                                <motion.li className="shape-1 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                                    animate={ {
                                        x: mouseReverse(30).x,
                                        y: mouseReverse(30).y
                                    } }
                                >
                                    <img src="/assets/images/about/shape-33.png" alt="Shape Images" />
                                </motion.li>
                                <motion.li className="shape-2 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                                    animate={ {
                                        x: mouseDirection(30).x,
                                        y: mouseDirection(30).y
                                    } }
                                >
                                    <img src="/assets/images/about/shape-25.png" alt="Shape Images" />
                                </motion.li>
                                <motion.li className="shape-3 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                                    animate={ {
                                        x: mouseDirection(30).x,
                                        y: mouseDirection(30).y
                                    } }
                                >
                                    <img src="/assets/images/about/shape-13.png" alt="Shape Images" />
                                </motion.li>
                                <motion.li className="shape-4 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                                    animate={ {
                                        x: mouseReverse(40).x,
                                        y: mouseReverse(40).y
                                    } }
                                >
                                    <span></span>
                                </motion.li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUsArea;
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../../contexts/mouse-move-context';

const AdBanner = () => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div className="modern-schooling-cta-wrapper edu-cta-banner-area-6 bg-image">
            <div className="container">
                <div className="edu-cta-banner">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="thumbnail">
                                <img src="/assets/images/cta/cta-girl-bg.webp" alt="girl image" />
                            </div>
                            <ul className="shape-group">
                                <motion.li className="shape-01 scene"
                                    animate={ {
                                        x: mouseReverse(30).x,
                                        y: mouseReverse(30).y
                                    } }
                                >
                                    <img src="/assets/images/cta/shape-43.png" alt="shape" />
                                </motion.li>
                                <li className="shape-02">
                                    <img src="/assets/images/cta/shape-42.png" alt="shape" />
                                </li>
                                <motion.li className="shape-03 scene"
                                    animate={ {
                                        x: mouseDirection(40).x,
                                        y: mouseDirection(40).y
                                    } }
                                >
                                    <img src="/assets/images/cta/shape-40.png" alt="shape" />
                                </motion.li>
                                <motion.li className="shape-04 scene"
                                    animate={ {
                                        x: mouseReverse(35).x,
                                        y: mouseReverse(35).y
                                    } }
                                >
                                    <img src="/assets/images/cta/shape-38.png" alt="shape" />
                                </motion.li>
                            </ul>
                        </div>
                        <div className="col-lg-6">
                            <div className="section-title section-left" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                                <h2 className="title">Get Your Quality <br /> Skills Certificate Through <br /> EduBlink </h2>
                                <Link href="/contact-us">
                                    <a className="edu-btn btn-secondary">Get started now <i className="icon-4"></i></a>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <ul className="shape-group">
                        <motion.li className="shape-05 scene"
                            animate={ {
                                x: mouseReverse(40).x,
                                y: mouseReverse(40).y
                            } }
                        >
                            <img src="/assets/images/cta/shape-39.png" alt="shape" />
                        </motion.li>
                        <li className="shape-06">
                            <img src="/assets/images/cta/cta-round.svg" alt="shape" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AdBanner;
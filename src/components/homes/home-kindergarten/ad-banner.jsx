import React from 'react';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../../contexts/mouse-move-context';

const AdBanner = () => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div className="edu-cta-banner-area cta-banner-3 bg-image">
            <div className="container edublink-animated-shape">
                <div className="edu-cta-banner">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="section-title section-center" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                                <h2 className="title">Quickly Get Updates About Your Class Event and News!</h2>
                                <div className="newsletter-form">
                                    <div className="input-group">
                                        <input type="email" className="form-control" placeholder="Get started now"/>
                                        <button className="edu-btn btn-curved" type="button">Subscribe <i className="icon-4"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ul className="shape-group">
                    <motion.li className="shape-1 scene"
                        animate={ {
                            x: mouseDirection(30).x,
                            y: mouseDirection(30).y
                        } }
                    >
                        <img src="/assets/images/banner/kid-1.webp" alt="shape"/>
                    </motion.li>

                    <motion.li className="shape-2 scene"
                        animate={ {
                            x: mouseReverse(30).x,
                            y: mouseReverse(30).y
                        } }
                    >
                        <img src="/assets/images/banner/kid-2.webp" alt="shape"/>
                    </motion.li>
                    
                    <li className="shape-3">
                        <img src="/assets/images/banner/icon-1.png" alt="shape"/>
                    </li>
                    <li className="shape-4">
                        <img src="/assets/images/banner/icon-2.png" alt="shape"/>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default AdBanner;
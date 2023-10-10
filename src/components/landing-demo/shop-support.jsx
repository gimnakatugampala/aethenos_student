import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../contexts/mouse-move-context';

const ShopSupport = () => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div className="pv-shop-area bg-image">
            <div className="wrapper">
                <div className="container-custom-1520">
                    <div className="row align-items-center">
                        <div className="col-lg-5 order-lg-2">
                            <div className="shop-content">
                                <div className="section-title section-left splash-title">
                                    <span className="pre-title" data-sal="slide-up" data-sal-duration="1000">Online Store</span>

                                    <h2 className="title" data-sal-delay="100" data-sal="slide-up" data-sal-duration="1000">Sell Like a Pro with <br /> E-commerce</h2>

                                    <p data-sal-delay="100" data-sal="slide-up" data-sal-duration="1000">E-commerce. EduBlink provides all the tools you need to start selling online. Let your customers to experience E-commerce at its absolute-best.</p>

                                    <div data-sal-delay="400" data-sal="slide-up" data-sal-duration="1000">
                                        <Link href="/course-style-1">
                                            <a className="edu-btn" target="_blank">
                                                View Course Buy/Sell <i className="icon-4"></i>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-7 order-lg-1">
                            <div className="shop-thumbnail">
                                <div className="shop-thumbnail-images">
                                    <img className="shop-demo-main" src="/assets/images/preview/shop-demo-main.png" data-sal-delay="200" data-sal="fade" data-sal-duration="800" alt="Shop Images" />

                                    <img className="shop-demo-left" src="/assets/images/preview/shop-demo-left.png" data-sal-delay="500" data-sal="slide-right" data-sal-duration="1000" alt="Shop Images" />

                                    <img className="shop-demo-right" src="/assets/images/preview/shop-demo-right.png" data-sal-delay="500" data-sal="slide-left" data-sal-duration="1000" alt="Shop Images" />

                                    <ul className="shape-group">
                                        <motion.li className="shape-1 scene" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                                            animate={ {
                                                x: mouseReverse(35).x,
                                                y: mouseReverse(35).y
                                            } }
                                        >
                                            <img src="/assets/images/about/shape-13.png" alt="shape" />
                                        </motion.li>

                                        <motion.li className="shape-2 scene" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                                            animate={ {
                                                x: mouseReverse(35).x,
                                                y: mouseReverse(35).y
                                            } }
                                        >
                                            <img src="/assets/images/about/shape-25.png" alt="shape" />
                                        </motion.li>

                                        <motion.li className="shape-3 scene" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                                            animate={ {
                                                x: mouseDirection(35).x,
                                                y: mouseDirection(35).y
                                            } }
                                        >
                                            <span className="d-block"></span>
                                        </motion.li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopSupport;
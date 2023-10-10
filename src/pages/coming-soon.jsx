import React from 'react';
import Time from '../utils/time';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../contexts/mouse-move-context';

const ComingSoon = () => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div id="main-wrapper" className="main-wrapper">
            <section className="coming-soon-page-area ">
                <div className="container">
                    <div className="coming-soon-content">
                        <h1 className="title">Coming Soon</h1>
                        <div className="coming-countdown">
                            <div className="countdown-section">
                                <div>
                                    <div className="countdown-number day">{Time('2023-12-5 00:00:00').days}</div>
                                    <div className="countdown-unit">Days</div>
                                </div>
                            </div>
                            <div className="countdown-section">
                                <div>
                                    <div className="countdown-number hour">{Time('2023-12-5 00:00:00').hours}</div>
                                    <div className="countdown-unit">Hrss</div>
                                </div>
                            </div>
                            <div className="countdown-section">
                                <div>
                                    <div className="countdown-number minute">{Time('2023-12-5 00:00:00').minutes}</div>
                                    <div className="countdown-unit">Mints</div>
                                </div>
                            </div>
                            <div className="countdown-section">
                                <div>
                                    <div className="countdown-number second" suppressHydrationWarning>{Time('2023-12-5 00:00:00').seconds}</div>
                                    <div className="countdown-unit">Sec</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="input-group">
                            <input type="email" className="form-control" placeholder="Enter your email address" />
                            <button className="edu-btn btn-medium" type="button">Subscribe <i className="icon-4"></i></button>
                        </div>
                    </div>
                </div>
                <ul className="shape-group">
                    <motion.li className="shape-1 scene"
                        animate={ {
                            x: mouseReverse(40).x,
                            y: mouseReverse(40).y
                        } }
                    >
                        <img src="/assets/images/others/shape-22.png" alt="Shape" />
                    </motion.li>
                    <motion.li className="shape-2 scene"
                        animate={ {
                            x: mouseDirection(30).x,
                            y: mouseDirection(30).y
                        } }
                    >
                        <img src="/assets/images/others/shape-23.png" alt="Shape" />
                    </motion.li>
                    <li className="shape-3">
                        <img className="rotateit" src="/assets/images/others/shape-24.png" alt="Shape" />
                    </li>
                    <li className="shape-4"></li>
                </ul>
            </section>
        </div>
    )
}

export default ComingSoon;
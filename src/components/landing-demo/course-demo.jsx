import React from 'react';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../contexts/mouse-move-context';

const CourseDemo = () => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div className="pv-courses-demo">
            <div className="container">
                <div className="section-title section-center splash-title">
                    <span className="number">7+</span>
                    <span className="shape-line"><i className="icon-19"></i></span>
                    <h2 className="title" data-sal-delay="100" data-sal="slide-up" data-sal-duration="1000">Responsive Course Layouts</h2>
                    <p className="title" data-sal-delay="100" data-sal="slide-up" data-sal-duration="1000">Multiple choices for getting learners impressed with course grids & layouts</p>
                </div>
            </div>

            <div className="pv-gallery-wrapper">
                <div className="background-marque margque-courses"></div>
            </div>

            <ul className="shape-group">
                <motion.li className="shape-1 scene" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                    animate={ {
                        x: mouseReverse(30).x,
                        y: mouseReverse(30).y
                    } }
                >
                    <img src="/assets/images/about/shape-13.png" alt="Shape" />
                </motion.li>
                <motion.li className="shape-2 scene" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                    animate={ {
                        x: mouseReverse(30).x,
                        y: mouseReverse(30).y
                    } }
                >
                    <img src="/assets/images/about/shape-36.png" alt="Shape" />
                </motion.li>
                <motion.li className="shape-3 scene" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                    animate={ {
                        x: mouseDirection(30).x,
                        y: mouseDirection(30).y
                    } }
                >
                    <img src="/assets/images/counterup/shape-02.png" alt="Shape" />
                </motion.li>
                <li className="shape-4" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000">
                    <img src="/assets/images/about/shape-15.png" alt="Shape" />
                </li>
                <motion.li className="shape-5 scene" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                    animate={ {
                        x: mouseDirection(45).x,
                        y: mouseDirection(45).y
                    } }
                >
                    <span className="d-block"></span>
                </motion.li>
            </ul>
        </div>
    )
}

export default CourseDemo;
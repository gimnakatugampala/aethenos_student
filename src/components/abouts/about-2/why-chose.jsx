import React from 'react';
import ChoseBox from '../about-1/chose-box-item';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMouseMoveUI } from '../../../contexts/mouse-move-context';

const WhyChose = () => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, 1000]);
    return (
        <section className="why-choose-area-3 edu-section-gap">
            <div className="container">
                <div className="row row--45">
                    <div className="section-title-flex section-title" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                        <div className="left-content">
                            <h2 className="title">We Providing The <br /> Best <span className="color-secondary">Quality Online </span> Courses</h2>
                            <span className="shape-line"><i className="icon-19"></i></span>
                        </div>
                        <div className="right-content">
                            <p>Lorem ipsum dolor sit amet cons etur adipisicing elit sed do eiusm aut tempor incididunt labore dolore magna aliqua quis nostrud ex ertation lamcolab oris aliquip.</p>
                        </div>
                    </div>
                </div>

                <div className="row g-5">
                    <ChoseBox color="color-primary-style" icon="45" title="High Quality Courses" subtitle="Lorem ipsum dolor sit amet conset ur elit sed eiusmod ex tempor inc labore dolore magna." />

                    <ChoseBox color="color-secondary-style" icon="46" title="Life Time Access" subtitle="Lorem ipsum dolor sit amet conset ur elit sed eiusmod ex tempor inc labore dolore magna." />

                    <ChoseBox color="color-extra08-style" icon="47" title="Expert Instructors" subtitle="Lorem ipsum dolor sit amet conset ur elit sed eiusmod ex tempor inc labore dolore magna." />
                </div>
            </div>
            <ul className="shape-group">
                <motion.li className="shape-1 scene"
                    animate={ {
                        x: mouseReverse(40).x,
                        y: mouseReverse(40).y
                    } }
                >
                    <span></span>
                </motion.li>
                <motion.li className="shape-2 scene"
                    animate={ {
                        x: mouseDirection(30).x,
                        y: mouseDirection(30).y
                    } }
                >
                    <img src="/assets/images/about/shape-13.png" alt="shape" />
                </motion.li>
                <li className="shape-3">
                    <motion.img style={{ y }} src="/assets/images/faq/shape-12.png" alt="shape" />
                </li>
            </ul>
        </section>
    )
}

export default WhyChose;
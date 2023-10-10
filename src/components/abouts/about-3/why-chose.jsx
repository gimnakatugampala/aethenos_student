import React from 'react';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../../contexts/mouse-move-context';

function FeatureBox({ img, color, title, icon, text }) {
    return (
        <div className="col-lg-4" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
            <div className={`why-choose-box-3 features-box ${color}`}>
                <div className="thumbnail">
                    <img src={`/assets/images/others/why-choose-${img}.jpg`} alt="why choose image" />
                </div>
                <div className="content">
                    <div className="icon">
                        <i className={`icon-${icon}`}></i>
                    </div>
                    <h4 className="title">{title}</h4>
                    <p>{text}</p>
                </div>
            </div>
        </div>
    )
}

const WhyChose = () => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <section className="why-choose-area-4 edu-section-gap">
            <div className="container edublink-animated-shape">
                <div className="section-title section-center" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                    <span className="pre-title">Why choose edublink</span>
                    <h2 className="title">The Best <span className="color-secondary">Beneficial</span> Side <br /> of EduBlink</h2>
                    <span className="shape-line"><i className="icon-19"></i></span>
                </div>
                <div className="row g-5">
                    <FeatureBox color="color-primary-style" img="03" icon="45" title="High Quality Courses"
                    text="Lorem ipsum dolor sit amet conset ur elit sed eiusmod ex tempor inc labore dolore magna." />

                    <FeatureBox color="color-secondary-style" img="04" icon="46" title="Life Time Access"
                    text="Lorem ipsum dolor sit amet conset ur elit sed eiusmod ex tempor inc labore dolore magna." />

                    <FeatureBox color="color-extra08-style" img="05" icon="47" title="Expert Instructors"
                    text="Lorem ipsum dolor sit amet conset ur elit sed eiusmod ex tempor inc labore dolore magna." />
                </div>
                <ul className="shape-group">
                    <li className="shape-1" data-sal-delay="500" data-sal="fade" data-sal-duration="200">
                        <img className="rotateit" src="/assets/images/about/shape-13.png" alt="shape" />
                    </li>
                    <motion.li className="shape-2 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                        animate={ {
                            x: mouseReverse(40).x,
                            y: mouseReverse(40).y
                        } }
                    >
                        <span></span>
                    </motion.li>
                    <li className="shape-3 circle scene sal-animate" data-sal-delay="500" data-sal="fade" data-sal-duration="200">
                        <span className="d-block"></span>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default WhyChose;
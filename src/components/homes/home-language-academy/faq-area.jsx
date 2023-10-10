import React from 'react';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../../contexts/mouse-move-context';

const accordion_items = [
    {
        id: 'collapseOne', 
        show: true, 
        title: 'How can I contact a school directly?',
        desc: 'Lorem ipsum dolor sit amet consectur adipiscing elit sed eius mod ex tempor incididunt labore dolore magna aliquaenim ad minim eniam.'
    },
    {
        id: 'collapseTwo', 
        show: false, 
        title: 'How do I find a school where I want to study?',
        desc: 'Lorem ipsum dolor sit amet consectur adipiscing elit sed eius mod ex tempor incididunt labore dolore magna aliquaenim ad minim eniam.'
    },
    {
        id: 'collapseThree', 
        show: false, 
        title: 'Where should I study abroad?',
        desc: 'Lorem ipsum dolor sit amet consectur adipiscing elit sed eius mod ex tempor incididunt labore dolore magna aliquaenim ad minim eniam.'
    }
];

const FaqArea = () => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div className="edu-faq-area faq-style-6 gap-top-equal">
            <div className="container">
                <div className="row g-5 row--45">
                    <div className="col-lg-6 sal-animate" data-sal-delay="100" data-sal="slide-up" data-sal-duration="800">
                        <div className="edu-faq-content">
                            <div className="section-title section-left">
                                <span className="pre-title">FAQ’s</span>
                                <h2 className="title">Over 10 Years in <span className="color-secondary">Distant <br /> Skill</span> Development</h2>
                                <span className="shape-line"><i className="icon-19"></i></span>
                            </div>
                            <div className="faq-accordion" id="faq-accordion">
                                <div className="accordion">
                                    {accordion_items.map((item, i) => {
                                        const { desc, id, show, title } = item;
                                        return (
                                            <div key={i} className="accordion-item">
                                                <h5 className="accordion-header">
                                                    <button className={`accordion-button ${show ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={`#${id}`} aria-expanded={show ? 'true' : 'false'}>
                                                        {title}
                                                    </button>
                                                </h5>
                                                <div id={id} className={`accordion-collapse collapse ${show ? 'show' : ''}`} data-bs-parent="#faq-accordion">
                                                    <div className="accordion-body">
                                                        <p>{desc}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="edu-faq-gallery">
                            <div className="faq-thumbnail thumbnail-1" data-sal-delay="50" data-sal="slide-left" data-sal-duration="800">
                                <img src="/assets/images/others/faq-6.webp" alt="Faq Images" />
                            </div>
                            <ul className="shape-group">
                                <li className="shape-1 sal-animate" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000">
                                    <span></span>
                                </li>
                                <li className="shape-2 sal-animate" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000">
                                    <span></span>
                                </li>
                                <motion.li className="shape-3 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                                    animate={ {
                                        x: mouseReverse(30).x,
                                        y: mouseReverse(30).y
                                    } }
                                >
                                    <img src="/assets/images/about/shape-13.png" alt="Shape Images" />
                                </motion.li>
                                <li className="shape-4" data-sal-delay="500" data-sal="fade" data-sal-duration="200">
                                    <img className="rotateit" src="/assets/images/faq/shape-04.png" alt="Shape Images" />
                                </li>
                                <li className="shape-5 sal-animate" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000">
                                    <img src="/assets/images/others/shape-39.png" alt="Shape" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FaqArea;
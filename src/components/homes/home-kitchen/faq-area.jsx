import React from 'react';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../../contexts/mouse-move-context';

const contents = {
    pre_title: 'FAq’s',
    title: 'Frequently Asked Questions.',
    faq_img: "/assets/images/faq/faq-07.jpg",
    accordion_items: [
        {
            id: 'collapseOne', show: true, title: 'How can I contact a school directly?',
            desc: 'Lorem ipsum dolor sit amet consectur adipiscing elit sed eius mod ex tempor incididunt labore dolore magna aliquaenim ad minim eniam.'
        },
        {
            id: 'collapseTwo', show: false, title: 'How do I find a school where I want to study?',
            desc: 'Lorem ipsum dolor sit amet consectur adipiscing elit sed eius mod ex tempor incididunt labore dolore magna aliquaenim ad minim eniam.'
        },
        {
            id: 'collapseThree', show: false, title: 'Where should I study abroad?',
            desc: 'Lorem ipsum dolor sit amet consectur adipiscing elit sed eius mod ex tempor incididunt labore dolore magna aliquaenim ad minim eniam.'
        }
    ]
}

const { pre_title, title, accordion_items, faq_img } = contents;

const FaqArea = () => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div className="edu-faq-area faq-style-3 gap-bottom-equal">
            <div className="container">
                <div className="row g-5 row--45">
                    <div className="col-lg-6" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                        <div className="edu-faq-content">
                            <div className="section-title section-left">
                                <span className="pre-title">{pre_title}</span>
                                <h2 className="title">{title}</h2>
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
                                <img src={faq_img} alt="Faq Images" />
                            </div>
                            <ul className="shape-group">
                                <motion.li className="shape-1 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                                    animate={ {
                                        x: mouseReverse(30).x,
                                        y: mouseReverse(30).y
                                    } }
                                >
                                    <img src="/assets/images/faq/shape-12.png" alt="Shape Images" />
                                </motion.li>
                                <motion.li className="shape-2 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                                    animate={ {
                                        x: mouseDirection(30).x,
                                        y: mouseDirection(30).y
                                    } }
                                >
                                    <img src="/assets/images/faq/shape-04.png" alt="Shape Images" />
                                </motion.li>
                                <motion.li className="shape-3 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                                    animate={ {
                                        x: mouseReverse(30).x,
                                        y: mouseReverse(30).y
                                    } }
                                >
                                    <img src="/assets/images/faq/shape-10.png" alt="Shape Images" />
                                </motion.li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FaqArea;
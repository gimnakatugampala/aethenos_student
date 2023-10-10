import React from 'react';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../contexts/mouse-move-context';
import ContactMeForm from '../forms/contact-me-form';

const ContactMeFormArea = () => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <section className="edu-section-gap contact-form-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="contact-form">
                            <div className="section-title section-center">
                                <h3 className="title">Just Drop Me a Line</h3>
                            </div>
                            <ContactMeForm />
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
                    <img src="/assets/images/about/shape-15.png" alt="shape" />
                </motion.li>
                <motion.li className="shape-2 scene"
                    animate={ {
                        x: mouseReverse(30).x,
                        y: mouseReverse(30).y
                    } }
                >
                    <img src="/assets/images/cta/shape-04.png" alt="shape" />
                </motion.li>
                <motion.li className="shape-3 scene"
                    animate={ {
                        x: mouseReverse(45).x,
                        y: mouseReverse(45).y
                    } }
                >
                    <span></span>
                </motion.li>
                <motion.li className="shape-4 scene"
                    animate={ {
                        x: mouseDirection(30).x,
                        y: mouseDirection(30).y
                    } }
                >
                    <img src="/assets/images/about/shape-13.png" alt="shape" />
                </motion.li>
            </ul>
        </section>
    )
}

export default ContactMeFormArea;
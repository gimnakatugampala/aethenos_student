import React from 'react';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../contexts/mouse-move-context';

const BreadcrumbFour = ({title,date,time,city}) => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div className="edu-breadcrumb-area breadcrumb-style-4">
            <div className="container">
                <div className="breadcrumb-inner">
                    <div className="page-title">
                        <span className="pre-title">DEVELOPER</span>
                        <h1 className="title">{title}</h1>
                    </div>
                    <ul className="course-meta">
                        <li><i className="icon-27"></i>{date}</li>
                        <li><i className="icon-33"></i>{time}</li>
                        <li><i className="icon-40"></i>{city}</li>
                    </ul>
                </div>
            </div>

            <ul className="shape-group">
                <li className="shape-1">
                    <span></span>
                </li>
                <motion.li className="shape-2 scene"
                    animate={ {
                        x: mouseReverse(40).x,
                        y: mouseReverse(40).y
                    } }    
                >
                    <img src="/assets/images/about/shape-13.png" alt="shape" /></motion.li>
                <motion.li className="shape-3 scene"
                    animate={ {
                        x: mouseDirection(40).x,
                        y: mouseDirection(40).y
                    } }
                >
                    <img src="/assets/images/about/shape-15.png" alt="shape" /></motion.li>
                <li className="shape-4">
                    <span></span>
                </li>
                <motion.li className="shape-5 scene"
                    animate={ {
                        x: mouseReverse(40).x,
                        y: mouseReverse(40).y
                    } }
                >
                    <img src="/assets/images/about/shape-07.png" alt="shape" />
                </motion.li>
            </ul>
        </div>
    )
}

export default BreadcrumbFour;
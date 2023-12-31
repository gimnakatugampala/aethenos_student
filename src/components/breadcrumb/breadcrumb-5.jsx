import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../contexts/mouse-move-context';

const CourseBreadcrumb = ({ course }) => {
    const { title, instructor, language, rating_count,subtitle } = course || {};
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div className="edu-breadcrumb-area breadcrumb-style-3 ">
            <div className="container">
                <div className="breadcrumb-inner">
                    <ul className="edu-breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="/" >
                                Finance & Accounting
                            </a>
                        </li>
                        <li className="separator"><i className="icon-angle-right"></i></li>
                        <li className="breadcrumb-item">
                            <a href="/course-style-1" >
                            Accounting & Bookkeeping
                            </a>
                        </li>
                        <li className="separator"><i className="icon-angle-right"></i></li>
                        <li className="breadcrumb-item">
                            <a href="/course-style-1" >
                            Accounting 
                            </a>
                        </li>
                        <li className="separator"><i className="icon-angle-right"></i></li>
                        <li className="breadcrumb-item active" aria-current="page">{subtitle}</li>
                    </ul>
                    <div className="page-title  ">
                        <h1 className="title col-12">{title}</h1>
                        <h4 className='fw-light'>Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, MongoDB, Web3 and DApps</h4>
                    </div>
                    <ul className="course-meta">
                        
                        
                        <li className="course-rating">
                        <div className="rating">
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                        </div>
                        <span className="rating-count"><a  href="">({rating_count} Rating)</a></span>
                       <li> <span className="">1,092,422 students</span></li>

                        </li>
                    </ul>
                    <div>
                    <i className="icon-58"></i> Created by <a className='text-decoration-underline' href="/users/34">{instructor}</a>
                    </div>
                    <ul  className="course-meta">
                        <li className="course-rating">
                            <span>Last updated 9/2023</span>
                            <li> <i className="icon-59"></i>{language}</li>
                            <li><span>English [Auto], Arabic [Auto]</span></li>
                        </li>
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
                    <img src="/assets/images/about/shape-13.png" alt="shape" />
                </motion.li>
                <motion.li className="shape-3 scene"
                    animate={ {
                        x: mouseDirection(40).x,
                        y: mouseDirection(40).y
                    } }
                >
                    <img src="/assets/images/about/shape-15.png" alt="shape" />
                </motion.li>
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
    );
}

export default CourseBreadcrumb;
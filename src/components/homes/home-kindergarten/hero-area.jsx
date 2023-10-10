import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../../contexts/mouse-move-context';
import { Certificate, Instructor, OnlineClass } from '../../../svg';

function FeatureBox({ color, icon, content }) {
    return (
        <div className={`features-box ${color} edublink-svg-animate`}>
            <div className="icon">
                {icon}
            </div>
            <div className="content">
                <h5 className="title">{content}</h5>
            </div>
        </div>
    )
}

const HeroArea = () => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div className="hero-banner hero-style-7">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="banner-content">
                            <h1 className="title" data-sal-delay="100" data-sal="slide-up" data-sal-duration="1000">A Brighter Future For Kids</h1>
                            <p data-sal-delay="200" data-sal="slide-up" data-sal-duration="1000">Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit.</p>
                            <div className="banner-btn" data-sal-delay="400" data-sal="slide-up" data-sal-duration="1000">
                                <Link href="/course-style-1">
                                    <a className="edu-btn btn-curved">Find courses <i className="icon-4"></i></a>
                                </Link>
                            </div>
                            <div className="features-list" data-sal-delay="400" data-sal="slide-up" data-sal-duration="1000">
                                <FeatureBox color={'color-extra02-style'} icon={<OnlineClass />} content={<>3,020 <br />Online Courses</>} />
                                <FeatureBox color={'color-secondary-style'} icon={<Instructor />} content={<>Top <br />Instructors</>} />
                                <FeatureBox color={'color-primary-style'} icon={<Certificate />} content={<>Online <br /> Certificates</>} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="banner-gallery">
                <div className="thumbnail thumbnail-1" data-sal-delay="500" data-sal="slide-up" data-sal-duration="1000">
                    <img src="/assets/images/banner/kid-3.webp" alt="Girl Image" />
                </div>
                <div className="thumbnail thumbnail-2" data-sal-delay="500" data-sal="slide-down" data-sal-duration="1000">
                    <img src="/assets/images/banner/kid-4.webp" alt="Girl Image" />
                </div>
            </div>
            <ul className="shape-group">
                <motion.li className="shape-1 scene" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                    animate={ {
                        x: mouseReverse(30).x,
                        y: mouseReverse(30).y
                    } }
                >
                    <img src="/assets/images/banner/icon-3.png" alt="Shape" />
                </motion.li>
                <motion.li className="shape-2 scene" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                    animate={ {
                        x: mouseDirection(30).x,
                        y: mouseDirection(30).y
                    } }
                >
                    <img src="/assets/images/banner/icon-1.png" alt="Shape" />
                </motion.li>
                <motion.li className="shape-3 scene" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                    animate={ {
                        x: mouseReverse(30).x,
                        y: mouseReverse(30).y
                    } }
                >
                    <img src="/assets/images/banner/icon-5.png" alt="Shape" />
                </motion.li>
                <motion.li className="shape-4 scene" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                    animate={ {
                        x: mouseDirection(30).x,
                        y: mouseDirection(30).y
                    } }
                >
                    <img src="/assets/images/banner/icon-2.png" alt="Shape" />
                </motion.li>
                <motion.li className="shape-5 scene" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000"
                    animate={ {
                        x: mouseReverse(30).x,
                        y: mouseReverse(30).y
                    } }
                >
                    <img src="/assets/images/banner/icon-4.png" alt="Shape" />
                </motion.li>
                <li className="shape-6" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000">
                    <img className="rotateit" src="/assets/images/about/shape-25.png" alt="Shape" />
                </li>
                <li className="shape-7" data-sal-delay="1000" data-sal="fade" data-sal-duration="1000">
                    <img className="rotateit" src="/assets/images/about/shape-13.png" alt="Shape" />
                </li>
            </ul>
        </div>
    )
}

export default HeroArea;
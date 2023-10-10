import React from 'react';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../../contexts/mouse-move-context';

const features = [
    {
        icon:'icon-37 watch-icon',
        color:'color-secondary-style',
        title:'Student Life',
        text:'Nostrud exer ciation laboris nis aliqup comodo perspiatix omnis iste natus.'
    },
    {
        icon:'icon-38 art-board-icon',
        color:'color-primary-style',
        title:'Arts & Clubs',
        text:'Omnis iste natus error sit voluptatem accusan tium doloreque laudantum.'
    },
    {
        icon:'icon-39 fitness-icon',
        color:'color-extra05-style',
        title:'Sports &amp; Fitness',
        text:'Tempor incididunt ut labore et dolore magna aliqua enim minim veniam quis.'
    }
]

const CollegeCampus = () => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div className="edu-campus-area gap-lg-top-equal">
            <div className="container edublink-animated-shape">
                <div className="row g-5">
                    <div className="col-xl-7" data-sal-delay="50" data-sal="slide-right" data-sal-duration="800">
                        <div className="campus-image-gallery">
                            <div className="campus-thumbnail">
                                <div className="thumbnail">
                                    <img src="/assets/images/others/campus-01.webp" alt="Campus" />
                                </div>
                            </div>
                            <ul className="shape-group">
                                <motion.li className="shape-1 scene"
                                    animate={ {
                                        x: mouseReverse(30).x,
                                        y: mouseReverse(30).y
                                    } }
                                >
                                    <span></span>
                                </motion.li>
                                <motion.li className="shape-2 scene"
                                    animate={ {
                                        x: mouseReverse(25).x,
                                        y: mouseReverse(25).y
                                    } }
                                >
                                    <img src="/assets/images/about/shape-21.png" alt="Shape" />
                                </motion.li>
                                <motion.li className="shape-3 scene"
                                    animate={ {
                                        x: mouseDirection(25).x,
                                        y: mouseDirection(25).y
                                    } }
                                >
                                    <img src="/assets/images/about/shape-13.png" alt="Shape" />
                                </motion.li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-5" data-sal-delay="50" data-sal="slide-left" data-sal-duration="800">
                        <div className="campus-content">
                            <div className="inner">
                                <div className="section-title section-left">
                                    <span className="pre-title">Campus</span>
                                    <h2 className="title">Campus Life</h2>
                                    <span className="shape-line">
                                        <i className="icon-19"></i>
                                    </span>
                                </div>
                                <div className="features-list"> 
                                    {features.map((item,i) => { 
                                        const {color,icon,text,title} = item; 
                                        return (
                                            <div key={i} className={`features-box ${color}`}>
                                                <div className="icon">
                                                    <i className={icon}></i>
                                                </div>
                                                <div className="content">
                                                    <h5 className="title">{title}</h5>
                                                    <p>{text}</p>
                                                </div>
                                            </div> 
                                        )
                                    })} 
                                </div>
                            </div>
                            <ul className="shape-group">
                                <motion.li className="shape-4 scene"
                                    animate={ {
                                        x: mouseReverse(25).x,
                                        y: mouseReverse(25).y
                                    } }
                                >
                                    <span></span>
                                </motion.li>
                                <motion.li className="shape-5 scene"
                                    animate={ {
                                        x: mouseReverse(30).x,
                                        y: mouseReverse(30).y
                                    } }
                                >
                                    <span></span>
                                </motion.li>
                                <motion.li className="shape-6 scene"
                                    animate={ {
                                        x: mouseDirection(30).x,
                                        y: mouseDirection(30).y
                                    } }
                                >
                                    <img src="/assets/images/about/shape-25.png" alt="Shape" />
                                </motion.li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollegeCampus;
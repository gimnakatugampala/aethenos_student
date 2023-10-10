import React from 'react';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../../contexts/mouse-move-context';
import useModal from '../../../hooks/use-modal';
import VideoModal from '../../common/popup-modal/video-modal';

const VideoArea = ({about_p_2}) => {
    const { isVideoOpen, setIsVideoOpen } = useModal();
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <>
            <div className={`video-area-${about_p_2?'4':'1'}`}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-9">
                            <div className="video-gallery">
                                <div className="thumbnail">
                                    <img src="/assets/images/others/video-01.jpg" alt="Thumb" />
                                    <button onClick={ ()=> setIsVideoOpen(true) } className="video-play-btn video-popup-activation"> 
                                        <i className="icon-18"></i>
                                    </button>
                                </div>
                                <ul className="shape-group">
                                    <li className="shape-1 scene">
                                        <img className="rotateit" src="/assets/images/about/shape-37.png" alt="Shape" />
                                    </li>
                                    <li className="shape-2 scene">
                                        <img src="/assets/images/faq/shape-04.png" alt="Shape" />
                                    </li>
                                    <motion.li className="shape-3 scene shape-light"
                                        animate={ {
                                            x: mouseReverse(25).x,
                                            y: mouseReverse(25).y
                                        } }
                                    >
                                        <img src="/assets/images/faq/shape-14.png" alt="Shape" />
                                    </motion.li>
                                    <motion.li className="shape-3 scene shape-dark"
                                        animate={ {
                                            x: mouseReverse(25).x,
                                            y: mouseReverse(25).y
                                        } }
                                    >
                                        <img src="/assets/images/faq/dark-shape-14.png" alt="Shape" />
                                    </motion.li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* video modal start */}
            <VideoModal isVideoOpen={isVideoOpen} setIsVideoOpen={setIsVideoOpen} videoId={'PICj5tr9hcc'} />
            {/* video modal end */}
        </>
    )
}

export default VideoArea;
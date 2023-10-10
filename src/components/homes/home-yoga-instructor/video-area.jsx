import React from 'react';
import useModal from '../../../hooks/use-modal';
import VideoModal from '../../common/popup-modal/video-modal';

const VideoArea = () => {
    const { isVideoOpen, setIsVideoOpen } = useModal();
    return (
        <>
            <div className="video-area-3">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-9">
                            <div className="video-gallery">
                                <div className="thumbnail">
                                    <img src="/assets/images/others/video-02.jpg" alt="Thumb"/>
                                    <button onClick={() => setIsVideoOpen(true)} className="video-play-btn video-popup-activation">
                                        <i className="icon-18"></i>
                                    </button>
                                </div>
                                <ul className="shape-group">
                                    <li className="shape-1">
                                        <img className="rotateit" src="/assets/images/about/shape-10.png" alt="Shape"/>
                                    </li>
                                    <li className="shape-2">
                                        <img src="/assets/images/about/shape-29.png" alt="Shape"/>
                                    </li>
                                    <li className="shape-3">
                                        <img className="rotateit" src="/assets/images/about/shape-31.png" alt="Shape"/>
                                    </li>
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
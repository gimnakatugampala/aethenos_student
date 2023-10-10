import React from 'react';
import useModal from '../../../hooks/use-modal';
import VideoModal from '../../common/popup-modal/video-modal';

const VideoArea = () => {
    const { isVideoOpen, setIsVideoOpen } = useModal();
    return (
        <>
            <div className="video-area-5 gap-bottom-equal">
                <div className="container">
                    <div className="row g-5 justify-content-center">
                        <div className="col-lg-6">
                            <div className="video-gallery">
                                <div className="thumbnail">
                                    <img src="/assets/images/others/video-5.webp" alt="Thumb" />
                                    <button onClick={ ()=> setIsVideoOpen(true) } className="video-play-btn video-popup-activation"> 
                                        <i className="icon-18"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="video-gallery">
                                <div className="thumbnail thumbnail-2">
                                    <img src="/assets/images/others/video-6.webp" alt="Thumb" />
                                    <button onClick={ ()=> setIsVideoOpen(true) } className="video-play-btn video-popup-activation"> 
                                        <i className="icon-18"></i>
                                    </button>
                                </div>
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
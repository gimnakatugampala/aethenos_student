import React from 'react';
import useModal from '../../../hooks/use-modal';
import VideoModal from '../../common/popup-modal/video-modal';

const VideoArea = () => {
  const { isVideoOpen, setIsVideoOpen } = useModal();
    return (
        <React.Fragment>
            <div className="video-area-2 bg-image--14 bg-image">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-8">
                            <div className="video-banner-content">
                                <div className="video-btn">
                                    <button onClick={() => setIsVideoOpen(true)}
                                        className="video-play-btn video-popup-activation">
                                        <i className="icon-18"></i>
                                    </button>
                                </div>
                                <h2 className="title">Take a Video Tour to Learn Intro of Campus</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* video modal start */}
            <VideoModal isVideoOpen={isVideoOpen} setIsVideoOpen={setIsVideoOpen} videoId={'PICj5tr9hcc'} />
            {/* video modal end */}
        </React.Fragment>
    )
}

export default VideoArea;
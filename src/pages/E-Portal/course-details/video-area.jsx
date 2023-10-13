import React from "react";
import { motion } from "framer-motion";
import { useMouseMoveUI } from "../../../contexts/mouse-move-context";
import useModal from "../../../hooks/use-modal";
import VideoDetails from "./video-details";
// import VideoModal from '../../common/popup-modal/video-modal';

const VideoArea = ({}) => {
  
  return (
    <>
      <div className="container-fluid" style={{ margin: 0}}>
        <video controls width="100%" height="auto">
          <source src='/assets/video/sample Video.mp4' type="video/mp4" />
          {/* Your browser does not support the video tag. */}
        </video>
        <VideoDetails/>
      </div>


    </>
  );
};

export default VideoArea;

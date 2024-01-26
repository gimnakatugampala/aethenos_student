import React from 'react';
import ModalVideo from 'react-modal-video';
import { IMG_HOST } from '../../../api';
import { useEffect } from 'react';


const VideoModal = ({isVideoOpen,setIsVideoOpen,videoId = "9Y7ma241N8k"}) => {

    useEffect(() => {
       
    }, [])
    

    return (
        <ModalVideo 
        channel='custom'
        allowFullScreen={false}

        // url={'https://media.w3.org/2010/05/sintel/trailer_hd.mp4'}
            url={`${IMG_HOST}${videoId}`} 
            autoplay isOpen={isVideoOpen} 
            // videoId={`${IMG_HOST}${videoId}`} 
            onClose={() => setIsVideoOpen(false)} 
        />
    )
}

export default VideoModal;
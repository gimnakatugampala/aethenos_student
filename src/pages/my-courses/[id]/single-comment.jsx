import React from 'react';
import { IMG_HOST } from '../../../api';

const SingleComment = ({review,img}) => {
    return (
        <div className="comment">
            <div className="thumbnail">
                <img src={img == null ? `/images/course/instructor_profile_img.png` : `${IMG_HOST}${img}`} alt="Comment Images" />
            </div>
            <div className="comment-content">
                <div className="rating">
                    <i className="icon-23"></i>
                    <i className="icon-23"></i>
                    <i className="icon-23"></i>
                    <i className="icon-23"></i>
                    <i className="icon-23"></i>
                </div>
                <h5 className="title">{review?.title}</h5>
                <span className="date">{review?.date}</span>
                <p>{review?.desc}</p>
            </div>
        </div>
    )
}

export default SingleComment;
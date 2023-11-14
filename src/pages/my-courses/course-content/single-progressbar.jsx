import React from 'react';

const SingleProgressbar = ({value,rating_value}) => {
    return (
        <div className="single-progress-bar">
            <div className="rating-text">
                5 <i className="icon-23"></i>
            </div>
            <div className="progress">
                <div className="progress-bar" role="progressbar" style={{width:`${value}%`}} aria-valuenow={value} 
                aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <span className="rating-value">{rating_value}</span>
        </div>
    )
}

export default SingleProgressbar;
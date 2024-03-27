import React from 'react';
import { Rating } from 'react-simple-star-rating'

const SingleProgressbar = ({value,rating_value}) => {
    return (
        <div className="row single-progress-bar">
            <div className="col-md-2 rating-text">
             {rating_value}
            </div>
            <div className="col-md-8 progress">
                <div className="progress-bar" role="progressbar" style={{width:`${value}%`}} aria-valuenow={value} 
                aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div className='col-md-2'>

            <Rating size={5} readonly={true} iconsCount={5} initialValue={Number.parseInt(rating_value)} />
            </div>
            {/* <span className="rating-value">{rating_value}</span> */}
        </div>
    )
}

export default SingleProgressbar;
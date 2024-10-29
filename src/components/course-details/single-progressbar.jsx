import React from 'react';
import { Rating } from 'react-simple-star-rating'

const SingleProgressbar = ({value,rating_value}) => {
    return (
        <div className="row align-items-center single-progress-bar ms-3" style={{justifyContent: "center"}}> 
        
        <div className="col-6 col-sm-7 col-md-8 progress d-flex" style={{justifyContent: "center"}}>
            <div className="progress-bar" role="progressbar" style={{width:`${value}%`}} aria-valuenow={value} 
            aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        
        <div className='col-5 col-sm-4  col-md-4 d-flex' style={{justifyContent: "center"}}>
        <Rating size={20} readonly={true} iconsCount={5} initialValue={Number.parseInt(rating_value)} />
        </div>
    </div>
    )
}

export default SingleProgressbar;
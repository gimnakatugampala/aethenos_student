import React from 'react';
import SingleInstagram from '../../common/single-instagram';

const InstagramArea = () => {
    return (
        <div className="edu-instagram-area instagram-area-1">
            <div className="container-fluid">
                <div className="section-title section-center" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                    <span className="pre-title pre-textsecondary">Instructors</span>
                    <h2 className="title">Follow Me On Instagram</h2>
                    <span className="shape-line"><i className="icon-19"></i></span>
                </div>
                <div className="row g-3">
                    <SingleInstagram img={'01'} name={'@EduBlink.Cooking'} />
                    <SingleInstagram img={'02'} name={'@EduBlink.Cooking'} />
                    <SingleInstagram img={'03'} name={'@EduBlink.Cooking'} />
                    <SingleInstagram img={'04'} name={'@EduBlink.Cooking'} />
                    <SingleInstagram img={'05'} name={'@EduBlink.Cooking'} />
                    <SingleInstagram img={'06'} name={'@EduBlink.Cooking'} />
                </div>
            </div>
        </div>
    )
}

export default InstagramArea;
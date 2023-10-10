import React from 'react';

function FeatureBox ({delay,icon,color,title,text}) {
    return (
        <div className="col-lg-4 col-md-6" data-sal-delay={delay} data-sal="slide-up" data-sal-duration="800">
            <div className={`features-box features-style-4 ${color}`}>
                <div className="icon">
                    <i className={`icon-${icon}`}></i>
                </div>
                <div className="content">
                    <h5 className="title">{title}</h5>
                    <p>{text}</p>
                </div>
            </div>
        </div>
    )
}

const CategoryArea = () => {
    return (
        <div className="features-area-4">
            <div className="container">
                <div className="section-title section-center" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                    <span className="pre-title pre-textsecondary">Our Activities</span>
                    <h2 className="title">Will Be Happy With Our Activities</h2>
                    <span className="shape-line"><i className="icon-19"></i></span>
                </div>
                <div className="row">
                    <FeatureBox delay="50" color="color-primary-style" icon="84" title="Summer Camp" 
                    text="Magna aliquaenim minim veniam nostrud exercit ation ullamco laboris." />
                    <FeatureBox delay="100" color="color-secondary-style" icon="85" title="Museum Visit" 
                    text="Magna aliquaenim minim veniam nostrud exercit ation ullamco laboris." />
                    <FeatureBox delay="150" color="color-extra02-style" icon="86" title="Sports Training" 
                    text="Magna aliquaenim minim veniam nostrud exercit ation ullamco laboris." />
                    <FeatureBox delay="50" color="color-extra03-style" icon="87" title="Music Club" 
                    text="Magna aliquaenim minim veniam nostrud exercit ation ullamco laboris." />
                    <FeatureBox delay="100" color="color-extra04-style" icon="88" title="Math Club" 
                    text="Magna aliquaenim minim veniam nostrud exercit ation ullamco laboris." />
                    <FeatureBox delay="150" color="color-extra05-style" icon="89" title="Clear & Cleaning" 
                    text="Magna aliquaenim minim veniam nostrud exercit ation ullamco laboris." />
                </div>
            </div>
        </div>
    )
}

export default CategoryArea;
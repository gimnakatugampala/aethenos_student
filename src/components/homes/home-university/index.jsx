import React from 'react';
import { Footer, HeaderTwo } from '../../../layout';
import CounterArea from '../home-distant-learning/counter-area';
import AboutArea from './about-area';
import AdBanner from './ad-banner';
import BrandArea from './brand-area';
import CategoryArea from './category-area';
import CollegeCampus from './college-champus';
import CoursesArea from './courses-area';
import Cta from './cta';
import EventArea from './event-area';
import HeroSlider from './hero-slider';
import Testimonial from './testimonial';
import VideoArea from './video-area';

const index = () => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <HeaderTwo />
                <HeroSlider/>
                <CategoryArea/>
                <AboutArea/>
                <CounterArea home_3={true} />
                <CoursesArea/>
                <CollegeCampus/>
                <Testimonial/>
                <VideoArea/>
                <Cta/>
                <EventArea/>
                <BrandArea/>
                <AdBanner/>
                <Footer dark_bg={true} />
            </div>
        </div>
    )
}

export default index;
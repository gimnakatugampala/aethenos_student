import React from 'react';
import { Footer, Header } from '../../../layout';
import BlogArea from './blog-area';
import AboutArea from './about-area';
import BrandArea from './brand-area';
import CategoryArea from './category-area';
import CounterArea from './counter-area';
import CoursesArea from './courses-area';
import FaqArea from './faq-area';
import HeroArea from './hero-area';
import Testimonial from './testimonial';
import VideoArea from './video-area';

const index = () => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <Header no_top_bar={true}/>
                <HeroArea/>
                <CategoryArea/>
                <AboutArea/>
                <CoursesArea/>
                <VideoArea/>
                <CounterArea/>
                <Testimonial/>
                <BrandArea/>
                <FaqArea/>
                <BlogArea style_2={'blog-area-2 svg-image--2 bg-image gap-bottom-equal'} />
                <Footer style_2={'footer-dark bg-image footer-style-2'} />
            </div>
        </div>
    )
}

export default index;
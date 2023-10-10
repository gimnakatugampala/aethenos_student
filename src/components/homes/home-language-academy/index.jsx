import React from 'react';
import { Footer, Header } from '../../../layout';
import HeroArea from './hero-area';
import Features from './features';
import AboutArea from './about-area';
import FaqArea from './faq-area';
import VideoArea from './video-area';
import Testimonial from './testimonial';
import CounterArea from './counter-area';
import BlogArea from '../home/blog-area';

const index = () => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <Header no_top_bar={true} header_style='7' disable_full_width disable_category />
                <HeroArea />
                <Features />
                <AboutArea />
                <FaqArea />
                <Testimonial />
                <VideoArea />
                <CounterArea />
                <BlogArea />
                <Footer />
            </div>
        </div>
    )
}

export default index;
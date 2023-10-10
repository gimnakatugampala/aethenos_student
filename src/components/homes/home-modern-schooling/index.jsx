import React from 'react';
import { Footer, Header } from '../../../layout';
import CounterArea from '../home-online-academy/counter-area';
import AdBanner from './ad-banner';
import BlogArea from './blog-area';
import BrandArea from './brand-area';
import Courses from './courses';
import FaqArea from './faq-area';
import HeroArea from './hero-area';
import TestimonialArea from './testimonial-area';
import TopCategories from './top-categories';

const index = () => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <Header no_top_bar={true}/>
                <HeroArea/>
                <BrandArea/>
                <TopCategories/>
                <Courses/>
                <FaqArea/>
                <CounterArea home_8={true}/>
                <TestimonialArea/>
                <AdBanner/>
                <BlogArea/>
                <Footer/>
            </div>
        </div>
    )
}

export default index;
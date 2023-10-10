import React from 'react';
import { Footer, HeaderTwo } from '../../../layout';
import Categories from './categories';
import Courses from './courses';
import HeroArea from './hero-area';
import BrandArea from '../home/brand-area';
import TeamArea from './team-area';
import CounterArea from './counter-area';
import FaqArea from './faq-area';
import EventArea from '../home-university/event-area';
import CtaArea from './cta-area';
import BlogArea from './blog-area';
import AdBanner from '../home-university/ad-banner';

const index = () => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <HeaderTwo style_3={true} />
                <HeroArea/>
                <Categories/>
                <Courses/>
                <BrandArea/>
                <TeamArea/>
                <CounterArea/>
                <FaqArea/>
                <EventArea event_2={true} />
                <CtaArea/>
                <BlogArea/>
                <AdBanner home_4={true} />
                <Footer dark_bg={true} home_4={true} />
            </div>
        </div>
    )
}

export default index;
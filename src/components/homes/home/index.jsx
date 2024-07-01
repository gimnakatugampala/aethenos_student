import React from 'react';
import { Footer, Header } from '../../../layout';
import AboutArea from './about-area';
import AdBanner from './ad-banner';
import BlogArea from './blog-area';
import BrandArea from './brand-area';
import CategoryArea from './category-area';
import CounterUpArea from './counter-up-area';
import CourseArea from './course-area';
import CtaArea from './cta-area';
import HeroArea from './hero-area';
import TeamArea from './team-area';
import TestimonialArea from './testimonial-area';
import TopCategories from './top-categories';
import CourseArea1 from './course-area-homepage';
import Topics from './Topics'
import BecomeInstructor from './become-instrctor';
import CourseRange from './course-range';

const index = () => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <Header/>
                <HeroArea/>
                <CategoryArea/>
                <CourseRange />
                {/* <TopCategories/> */}
                {/* <AboutArea/> */}

                {/* <CourseArea/>
                <Topics /> */}
                
                {/* <CounterUpArea/> */}
                {/* <TestimonialArea/> */}
                {/* <CtaArea/> */}
                {/* <TeamArea/> */}

                {/* <CourseArea1/> */}
                {/* <AdBanner/> */}
                {/* <BecomeInstructor/> */}
                {/* <BlogArea/> */}
                <Footer/>
            </div>
        </div>
    )
}

export default index;
import React from 'react';
import { Footer, Header } from '../../layout';
import HeroArea from './hero-area';
import CategoryArea from './category-area';
import CounterArea from './counter-area';
import Testimonial from './testimonial';
import TeamArea from './team-area';
import AdBanner from './ad-banner';
import AboutArea from '../homes/home/about-area';

const InstructorLogin = () => {
  return (
    <div className='sticky-header'>
    <div id="main-wrapper" className="main-wrapper">
        <Header/>
        <HeroArea/>
        <CategoryArea/>
        {/* <CounterArea/> */}
        {/* <Testimonial/> */}
        {/* <TeamArea/> */}
        <AboutArea/>
        <AdBanner/>
        <Footer/>
    </div>
</div>
  )
}

export default InstructorLogin
import React from 'react';
import { Footer, Header } from '../../../layout';
import Slider from './slider';
import Service from './service';
import About from './about';
import Features from './features';
import Course from './course';
import Testimonial from './testimonial';
import CounterUp from './counter-area';
import Event from './event-area';
import CTA from './cta';

const index = () => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <Header no_top_bar={true}/>
                {/* <Slider /> */}
                <Service />
                <About />
                <Features />
                <Course />
                <Testimonial />
                <CounterUp />
                <Event />
                <CTA />
                <Footer />
            </div>
        </div>
    )
}

export default index;
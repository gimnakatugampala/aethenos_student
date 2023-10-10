import React from 'react';
import { Footer, HeaderTwo } from '../../../layout';
import BreadcrumbTwo from '../../breadcrumb/breadcrumb-2';
import CtaArea from '../../homes/home-online-academy/cta-area';
import TeamArea from './team-area';
import CounterArea from './counter-area';
import AboutUsArea from './about-us-area';
import TestimonialArea from './testimonial-area';
import WhyChose from './why-chose';

const index = () => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <HeaderTwo style_3={true} no_topBar={true} />
                <BreadcrumbTwo subtitle="About Us 03" />
                <AboutUsArea/>
                <CounterArea about_p_3={true} />
                <WhyChose/>
                <CtaArea/>
                <TeamArea about_p_3={true}/>
                <TestimonialArea/>
                <Footer style_2={'footer-dark bg-image footer-style-2'} />
            </div>
        </div>
    )
}

export default index;
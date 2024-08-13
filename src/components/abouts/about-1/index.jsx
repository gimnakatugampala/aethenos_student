import React from 'react';
import { Footer, Header } from '../../../layout';
import Breadcrumb from '../../breadcrumb/breadcrumb';
import Testimonial from '../../homes/home-distant-learning/testimonial';
import TeamArea from '../../homes/home-online-academy/team-area';
import AboutArea from './about-area';
import BrandArea from './brand-area';
import CounterArea from './counter-area';
import WhyChose from './why-chose';


const index = () => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <Header no_top_bar={true} />
                <Breadcrumb title={'A Large Range of Course Learning Paths'} current_page="About Us 1" />
                <AboutArea/>
                <BrandArea/>
                <WhyChose/>
                <Testimonial/>
                <CounterArea/>
                <TeamArea about_p={true} />
                <Footer style_2={'footer-dark bg-image footer-style-2'} />
            </div>
        </div>
    )
}

export default index;
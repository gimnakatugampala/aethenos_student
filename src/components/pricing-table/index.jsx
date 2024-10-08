import React from 'react';
import { Footer, Header } from '../../layout';
import BreadcrumbThree from '../breadcrumb/breadcrumb-3';
import PricingArea from './pricing-area';

const index = () => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <Header no_top_bar={true} />
                <BreadcrumbThree title="Membership Plans" subtitle="Pricing" />
                <PricingArea/>
             <Footer />
            </div>
        </div>
    )
}

export default index;
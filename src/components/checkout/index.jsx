import React from 'react';
import { Footer, Header } from '../../layout';
import BreadcrumbThree from '../breadcrumb/breadcrumb-3';
import CheckoutArea from './checkout-area';

const index = () => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <Header no_top_bar={true} />
                {/* <BreadcrumbThree title="Checkout Page" subtitle="Checkout" /> */}
                <CheckoutArea/>
             <Footer />
            </div>
        </div>
    )
}

export default index;
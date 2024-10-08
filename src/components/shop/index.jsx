import React from 'react';
import { Footer, Header } from '../../layout';
import BreadcrumbThree from '../breadcrumb/breadcrumb-3';
import ShopArea from './shop-area';

const index = () => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <Header no_top_bar={true} />
                <BreadcrumbThree title="Shop Page" subtitle="Shop" />
                <ShopArea/>
             <Footer />
            </div>
        </div>
    )
}

export default index;
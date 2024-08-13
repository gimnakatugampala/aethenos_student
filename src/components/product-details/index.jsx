import React from 'react';
import { Footer, Header } from '../../layout';
import BreadcrumbThree from '../breadcrumb/breadcrumb-3';
import ProductDescription from './product-description';
import ProductDetailsArea from './product-details-area';

const index = ({item}) => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <Header no_top_bar={true} />
                <BreadcrumbThree title="Product Page" subtitle={item?.title} />
                <ProductDetailsArea item={item} />
                <ProductDescription item={item}/>
                <Footer style_2={'footer-dark bg-image footer-style-2'} />
            </div>
        </div>
    )
}

export default index;
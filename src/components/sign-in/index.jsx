import React from 'react';
import { Footer, Header } from '../../layout';
import BreadcrumbThree from '../breadcrumb/breadcrumb-3';
import SignInArea from './sign-in-area';

const index = () => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <Header no_top_bar={true} />
                {/* <BreadcrumbThree title="My Account" subtitle="Account" /> */}
                <SignInArea />
             <Footer />
            </div>
        </div>
    )
}

export default index;
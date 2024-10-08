import React from 'react';
import { Footer, Header } from '../../layout';
import BreadcrumbThree from '../breadcrumb/breadcrumb-3';
import CourseTwoArea from './course-2-area';

const index = () => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <Header no_top_bar={true} />
                <BreadcrumbThree title="Course Style 2" subtitle="Course Style 2" />
                <CourseTwoArea/>
             <Footer />
            </div>
        </div>
    )
}

export default index;
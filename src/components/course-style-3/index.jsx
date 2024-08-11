import React from 'react';
import { Footer, Header } from '../../layout';
import BreadcrumbThree from '../breadcrumb/breadcrumb-3';
import CourseThreeArea from './course-3-area';

const index = () => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <Header no_top_bar={true} />
                <BreadcrumbThree title="Course Style 3" subtitle="Course Style 3" />
                <CourseThreeArea/>
             <Footer />
            </div>
        </div>
    )
}

export default index;
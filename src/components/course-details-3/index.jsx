import React from 'react';
import { Footer, Header } from '../../layout';
import BreadcrumbSix from '../breadcrumb/breadcrumb-6';
import CourseDetailsThree from './course-details-three';

const index = () => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <Header no_top_bar={true} />
                <BreadcrumbSix title="Course Details" page="Course Details 3" />
                <CourseDetailsThree/>
                <Footer style_2={'footer-dark bg-image footer-style-2'} />
            </div>
        </div>
    )
}

export default index;
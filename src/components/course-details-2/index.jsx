import React from 'react';
import { Footer, Header } from '../../layout';
import CourseBreadcrumb from '../breadcrumb/breadcrumb-5';
import CourseDetailsTwo from './course-details-two';

const index = ({course}) => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <Header no_top_bar={true} />
                <CourseBreadcrumb course={course} subtitle="Course Details" />
                <CourseDetailsTwo course={course} />
             <Footer />
            </div>
        </div>
    )
}

export default index;
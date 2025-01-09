import React, { useEffect, useRef } from 'react';
import { Footer, Header } from '../../layout';
import CourseBreadcrumb from '../breadcrumb/breadcrumb-5'; 
import CourseDetailsArea from './course-details-area';

const index = ({course}) => {
   
    console.log(course)

    const reviewTabRef = useRef(null); // Ref for the "Reviews" tab

    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <Header no_top_bar={true} />
                <CourseBreadcrumb reviewTabRef={reviewTabRef} course={course} subtitle="Course Details"  />
                <CourseDetailsArea reviewTabRef={reviewTabRef} course={course} />
             <Footer />
            </div>
        </div>
    )
}

export default index;
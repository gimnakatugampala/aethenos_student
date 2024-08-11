import React, { useEffect } from 'react';
import { Footer, Header } from '../../layout';
import CourseBreadcrumb from '../breadcrumb/breadcrumb-5';
import CourseDetailsArea from './course-details-area';

const index = ({course}) => {

    useEffect(() => {
        console.log(course)
    }, [course])
    

    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <Header no_top_bar={true} />
                <CourseBreadcrumb course={course} subtitle="Course Details"  />
                <CourseDetailsArea course={course} />
             <Footer />
            </div>
        </div>
    )
}

export default index;
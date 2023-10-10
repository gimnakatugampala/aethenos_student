import React from 'react';
import SEO from '../../components/seo';
import { Wrapper } from '../../layout';
import CourseDetailsMain from '../../components/course-details';
import { course_data } from '../../data';

const course = course_data[0];

const CourseDetails = () => {
    return (
        <Wrapper>
            <SEO pageTitle={'Course Details'} />
            <CourseDetailsMain course={course} />
        </Wrapper>
    )
}

export default CourseDetails;
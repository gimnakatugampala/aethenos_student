import React from 'react';
import { useRouter } from 'next/router';
import SEO from '../../../components/seo';
import { Wrapper } from '../../../layout';
import CourseDetailsMain from '../../../components/course-details';
import CourseDetailsTwoMain from '../../../components/course-details-2'
import { course_data } from '../../../data';
import { useEffect } from 'react';
import { GetCourseDetails } from '../../../api';
import { useState } from 'react';

import LargeLoading from '../../../functions/Loading/LargeLoading';

// const course = course_data[0];

const CourseDetails = () => {

  const router = useRouter();
  const { code } = router.query;
  const [course, setcourse] = useState(null)

  useEffect(() => {

    if(code != null){
      GetCourseDetails(code,setcourse)
    }
   
  }, [code])
  

    return (
        <Wrapper>
           {course != null ? (
            <SEO pageTitle={`${course.title}`} />
           ) : <SEO pageTitle={`Loading...`} />
           }

            {course != null ? (
            <CourseDetailsMain course={course} />
            ) : <LargeLoading />}
        </Wrapper>
    )
}

export default CourseDetails;
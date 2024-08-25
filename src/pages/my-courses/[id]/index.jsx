import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Footer, Header } from '../../../layout';
import CourseDetails from './course-details';
import { Wrapper } from '../../../layout';
import SEO from '../../../components/seo';
import { GetMyCoursesDetails } from '../../../api';
import LargeLoading from '../../../functions/Loading/LargeLoading';
import HeaderMyCourse from '../../../layout/headers/HeaderMyCourse';




const index = () => {

    const router = useRouter();
    const { id } = router.query;
    const [course, setcourse] = useState(null)
    
    
     // Get Course Details
  useEffect(() => {
    if(id != null){
        GetMyCoursesDetails(id,setcourse)
    }
  }, [id])

    return (
        <Wrapper>

            {course != null ? (
                <SEO pageTitle={course.title} />
                ) : (
                <SEO pageTitle={'Loading..'} />
            )}

        {course != null ? (
            <>
                <HeaderMyCourse id={id} course={course} />
                <CourseDetails setcourse={setcourse} id={id} course={course} />
            </>
        ) : (
            <LargeLoading />
        )}
        {/* <Footer/> */}

         </Wrapper>
    )
}

export default index;
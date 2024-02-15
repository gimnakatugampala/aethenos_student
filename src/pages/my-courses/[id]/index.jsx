import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Footer, Header } from '../../../layout';
import CourseDetails from './course-details';
import { Wrapper } from '../../../layout';
import SEO from '../../../components/seo';
import { GetMyCoursesDetails } from '../../../api';
import LargeLoading from '../../../functions/Loading/LargeLoading';


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
            <SEO pageTitle={'Introduction to Web Development'} />
                <Header no_top_bar={true} />
                {course != null ? (
                    <CourseDetails course={course} />
                ) : (
                    <LargeLoading />
                )}
                <Footer/>
         </Wrapper>
    )
}

export default index;
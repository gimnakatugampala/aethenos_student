import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Wrapper } from '../../../layout';
import CourseDetails from './course-details';
import SEO from '../../../components/seo';
import { GetMyCoursesDetails, GetMyCoursesDetailsWithPlugin, LoginWithTokenForItemCode } from '../../../api';
import LargeLoading from '../../../functions/Loading/LargeLoading';
import HeaderMyCourse from '../../../layout/headers/HeaderMyCourse';
import Cookies from 'js-cookie'; // Make sure to import Cookies

const index = () => {
    const router = useRouter();
    const { id, loginToken } = router.query;
    const [course, setcourse] = useState(null);

    // Get Course Details
    useEffect(() => {
        const fetchCourseDetails = async () => {
            // ---------------- LOGIN TOKEN IS FOR EXCEL PLUGIN PURPOSE ONLY ----------------------
            // Check if the login token is there
            if (loginToken) {
                console.log(loginToken);

                const isAuthenticated = await LoginWithTokenForItemCode(loginToken);

                if (isAuthenticated) {
                    const { pathname, query } = router;
                    delete query.loginToken;  // Remove loginToken from query
                    router.replace({ pathname, query }, undefined, { shallow: true });

                    // If authenticated, fetch course details
                    if (id != null) {
                        await GetMyCoursesDetailsWithPlugin(id, setcourse);
                        return;
                    }
                }
            } else {
                // If the login token is not there, execute this
                if (id != null) {
                    await GetMyCoursesDetails(id, setcourse);
                }
            }
            // ---------------- LOGIN TOKEN IS FOR EXCEL PLUGIN PURPOSE ONLY ----------------------
        };

        fetchCourseDetails();
    }, [id, loginToken]);

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
    );
};

export default index;

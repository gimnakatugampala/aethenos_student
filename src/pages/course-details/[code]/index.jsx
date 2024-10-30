import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SEO from '../../../components/seo';
import { Wrapper } from '../../../layout';
import CourseDetailsMain from '../../../components/course-details';
import LargeLoading from '../../../functions/Loading/LargeLoading';
import { GetCourseDetails, IMG_HOST, ValidateCouponOnCartFromCourseDetails } from '../../../api';
import FormatHTMLRemove from '../../../functions/FormatHTMLRemove';

const CourseDetails = () => {
  const router = useRouter();
  const { code, couponCode } = router.query;
  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (!router.isReady || !code) return; // Ensure the router is ready and code is available

    // Fetch course details
    GetCourseDetails(code, setCourse);

    // Validate coupon if available
    if (couponCode) {
      ValidateCouponOnCartFromCourseDetails(couponCode, router, code);
    }
  }, [router.isReady, code, couponCode]);

  return (
    <Wrapper>
      <SEO imageUrl={course ? `${IMG_HOST}${course.img}` : 'Loading...'} description={course ? `${FormatHTMLRemove(course.course_main_desc)}` : 'Loading...'} pageTitle={course ? course.title : 'Loading...'} />
      {course ? (
        <CourseDetailsMain course={course} />
      ) : (
        <LargeLoading />
      )}
    </Wrapper>
  );
};

export default CourseDetails;

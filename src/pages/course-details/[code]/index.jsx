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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady || !code) return; // Ensure the router is ready and code is available

    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const courseData = await GetCourseDetails(code,setCourse);
        setCourse(courseData);
      } catch (err) {
        setError('Failed to load course details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();

    // Validate coupon if available
    if (couponCode) {
      ValidateCouponOnCartFromCourseDetails(couponCode, router, code).catch((err) =>
        console.error('Coupon validation failed:', err)
      );
    }
  }, [router.isReady, code, couponCode]);


  if (loading) {
    return (
      <Wrapper>
        <SEO
          imageUrl="/default-placeholder.png"
          description="Loading course details..."
          pageTitle="Loading Course..."
        />
        <LargeLoading />
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <SEO
          imageUrl="/default-error.png"
          description="An error occurred while loading course details."
          pageTitle="Error - Course Details"
        />
        <div className="error-message">
          <h2>{error}</h2>
          <p>Please refresh the page or try again later.</p>
        </div>
      </Wrapper>
    );
  }

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

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SEO from '../../../components/seo';
import { Wrapper } from '../../../layout';
import CourseDetailsMain from '../../../components/course-details';
import LargeLoading from '../../../functions/Loading/LargeLoading';
import { GetCourseDetails, GetCourseDetailsSEO, IMG_HOST, ValidateCouponOnCartFromCourseDetails } from '../../../api';
import FormatHTMLRemove from '../../../functions/FormatHTMLRemove';
import HeadSEOFormatHTML from '../../../functions/HeadSEOFormatHTML';


export async function getServerSideProps({ query }) {
  try {
    const { code } = query;

    if (!code) {
      return {
        props: {
          cCode: null,
          title: "Course Not Found",
          description: "This course does not exist.",
        },
      };
    }

    const courseData = await GetCourseDetailsSEO(code);
    // console.log(courseData)

    if (!courseData) {
      return {
        props: {
          cCode: null,
          title: "Course Not Found",
          description: "This course does not exist.",
        },
      };
    }

    return {
      props: {
        cCode: courseData.course_code,
        title: courseData.title,
        imgURL : courseData.img,
        rawDescription : courseData.course_main_desc,
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      props: {
        title: "Error Loading Course",
        rawDescription : "There was an issue loading course details.",
      },
    };
  }
}


const CourseDetails = ({title, rawDescription, imgURL }) => {
  const router = useRouter();
  const { code, couponCode } = router.query;
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const description = HeadSEOFormatHTML(rawDescription); // Now cleaned on the client-side

  useEffect(() => {
    if (!router.isReady || !code) return; // Ensure the router is ready and code is available

    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const courseData = await GetCourseDetails(code,setCourse);
        console.log(courseData)
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


  // if (loading) {
  //   return (
  //     <Wrapper>
  //       <SEO
  //         imageUrl="/default-placeholder.png"
  //         description="Loading course details..."
  //         pageTitle="Loading Course..."
  //       />
  //       <LargeLoading />
  //     </Wrapper>
  //   );
  // }

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
      <SEO imageUrl={`${IMG_HOST}${imgURL}`} description={description} pageTitle={title} />
      {course ? (
        <CourseDetailsMain course={course} />
      ) : (
        <LargeLoading />
      )}
    </Wrapper>
  );
};

export default CourseDetails;


// **Generate metadata dynamically for SEO**
export async function generateMetadata({ params }) {
  if (!params?.code) {
    return {
      title: "Course Not Found",
      description: "This course does not exist.",
    };
  }

  try {

    const courseData = await GetCourseDetailsSEO(params.code);
    
    if (!courseData) {
      return {
        title: "Course Not Found",
        description: "This course does not exist.",
      };
    }

    return {
      title: courseData.title,
      description: FormatHTMLRemove(courseData.course_main_desc),
      openGraph: {
        title: courseData.title,
        description: FormatHTMLRemove(courseData.course_main_desc),
        url: `https://aethenos.com/course-details/${params.code}`,
        type: "website",
        images: [
          {
            url: `${IMG_HOST}${courseData.img}`,
            width: 1200,
            height: 630,
            alt: courseData.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: courseData.title,
        description: FormatHTMLRemove(courseData.course_main_desc),
        images: [`${IMG_HOST}${courseData.img}`],
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Error Loading Course",
      description: "There was an issue loading course details.",
    };
  }
}

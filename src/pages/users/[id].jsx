import React from 'react'
import { Header , Footer } from '../../layout'
import SEO from '../../components/seo'
import CourseFiveArea from "./course-5-area";
import { GetInstructorDetailsSEO } from '../../api';


export async function getServerSideProps({ query }) {
  try {
    const { id } = query;

    if (!id) {
      return {
        props: {
          cCode: null,
          title: "Instructor Not Found",
          description: "This instructor does not exist.",
        },
      };
    }

    const instructorData = await GetInstructorDetailsSEO(id);
    // console.log(instructorData)

    if (!instructorData) {
      return {
        props: {
          instructorName: "Instructor Not Found",
          rawDescription: "This instructor does not exist.",
        },
      };
    }

    return {
      props: {
        instructorName: instructorData.name,
        headline: instructorData.headline,
        profileImage : instructorData.profileImage,
        rawDescription : instructorData.about,
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      props: {
        instructorName: "Error Loading Instructor details",
        rawDescription : "There was an issue loading instructor details.",
      },
    };
  }
}



const SingleInstructor = () => {
  return (
        <div className='sticky-header'>
        <div id="main-wrapper" className="main-wrapper">
            <SEO imageUrl={`${IMG_HOST}${profileImage}`} description={rawDescription} pageTitle={`${instructorName} ⭐ ${headline}`} />
            <Header />
            <CourseFiveArea />
            <Footer />
       
        </div>
        </div>
  )
}

export default SingleInstructor;


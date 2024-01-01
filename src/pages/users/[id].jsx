import React from 'react'
import { Header , Footer } from '../../layout'
import SEO from '../../components/seo'
import CourseFiveArea from "./course-5-area";


const SingleInstructor = () => {
  return (
        <div className='sticky-header'>
        <div id="main-wrapper" className="main-wrapper">
            <SEO pageTitle={'Instructor Details'} />
            <Header />
            <CourseFiveArea />
            <Footer />
       
        </div>
        </div>
  )
}

export default SingleInstructor;


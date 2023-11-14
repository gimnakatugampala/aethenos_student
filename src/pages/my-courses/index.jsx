import React from 'react';
import CourseTypeFour from './components/courses-available';
import { Footer, Header } from '../../layout';
import SEO from '../../components/seo';



const index = () => {
    return (
        <div id='portal-container' className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
            <SEO pageTitle={'My Courses'}  />
            <Header/>
            <CourseTypeFour/>
            <Footer/>
            </div>
        </div>
    )
}

export default index;
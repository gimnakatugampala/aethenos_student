import React from 'react';
import CourseTypeFour from '../../pages/E-Portal/Courses-Available';
import { Footer, Header } from '../../layout';



const index = () => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
            <Header/>
            <CourseTypeFour/>
            <Footer/>
            </div>
        </div>
    )
}

export default index;
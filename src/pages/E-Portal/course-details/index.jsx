import React from 'react';
import { Footer, Header } from '../../../layout';
import CourseDetails from './course-details';



const index = () => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <Header no_top_bar={true} />
                <CourseDetails/>
                <Footer/>
            </div>
        </div>
    )
}

export default index;
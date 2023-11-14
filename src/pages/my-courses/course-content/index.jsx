import React from 'react';
import { Footer, Header } from '../../../layout';
import CourseDetails from './course-details';
import { Wrapper } from '../../../layout';
import SEO from '../../../components/seo';


const index = () => {
    return (
        <Wrapper>
            <SEO pageTitle={'Introduction to Web Development'} />
        {/* <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper"> */}
                <Header no_top_bar={true} />
                <CourseDetails/>
                <Footer/>
            {/* </div>
        </div> */}
         </Wrapper>
    )
}

export default index;
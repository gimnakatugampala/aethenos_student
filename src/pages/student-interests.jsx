import React from 'react';
import { Footer, Header } from '../layout';
import SEO from '../components/seo';
import Surveyform from '../components/survey';



const index = () => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
            <Header/>
            <SEO pageTitle={'Registration'} />
            <Surveyform/>
            <Footer/>   
            </div>
        </div>
    )
}

export default index;
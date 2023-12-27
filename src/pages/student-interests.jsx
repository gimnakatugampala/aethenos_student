import React, { useEffect } from 'react';
import { Footer, Header } from '../layout';
import SEO from '../components/seo';
import { useRouter } from "next/router";
import Surveyform from '../components/survey';
import { USERTOKEN } from '../api';


const index = () => {

    var router = useRouter();
    var TOKEN = router.query["token"];

    useEffect(() => {

        if(TOKEN == null){
            window.location.href = "/"
        }else if(USERTOKEN == null){
            window.location.href = "/"
        }
      
    }, [])
    

    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
            <Header/>
            <SEO pageTitle={'Student Interest'} />
            <Surveyform/>
            <Footer/>   
            </div>
        </div>
    )
}

export default index;
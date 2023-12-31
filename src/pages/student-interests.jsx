import React, { useEffect } from 'react';
import { Footer, Header } from '../layout';
import SEO from '../components/seo';
import { useRouter } from "next/router";
import Surveyform from '../components/survey';
import { USERTOKEN } from '../api';


const index = () => {

    const { query } = useRouter();
    const router = useRouter();

    useEffect(() => {

        if(query.token != null){
            if(USERTOKEN == null){
                router.push("/")
            }
        }

        if(router.asPath == "/student-interests"){
            router.push("/")
        }

    })
    

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
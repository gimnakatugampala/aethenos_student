import React from 'react';
import Searchresults from './searchResults';
import { Footer, Header } from '../../layout';
import SEO from '../../components/seo';



const index = () => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
            <Header/>
            <SEO pageTitle={'Search'} />
            <Searchresults/>
            <Footer/>
            </div>
        </div>
    )
}

export default index;
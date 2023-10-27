import React from 'react';
import Searchresults from './searchResults';
import { Footer, Header } from '../../layout';



const index = () => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
            <Header/>
            <Searchresults/>
            <Footer/>
            </div>
        </div>
    )
}

export default index;
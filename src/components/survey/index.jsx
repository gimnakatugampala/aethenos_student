import React from 'react';
import { Footer, Header } from '../../layout';
import SurveyArea from './survey-area';
// import Breadcrumb from '../../breadcrumb/breadcrumb';
// import TeamArea from './team-area';

const index = () => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
            <SurveyArea/>
            </div>
        </div>
    )
}

export default index;
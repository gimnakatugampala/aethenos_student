import React from 'react';
import { Footer, Header } from '../../layout';
import BreadcrumbThree from '../breadcrumb/breadcrumb-3';
import EventListArea from './event-list-area';


const index = () => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <Header no_top_bar={true} />
                <BreadcrumbThree title="Event Page" subtitle="Event 2" />
                <EventListArea/>
             <Footer />
            </div>
        </div>
    )
}

export default index;
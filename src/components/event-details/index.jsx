import React from 'react';
import { Footer, Header } from '../../layout';
import BreadcrumbFour from '../breadcrumb/breadcrumb-4';
import EventDetailsArea from './event-details-area';

const index = ({event}) => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <Header no_top_bar={true} />
                <BreadcrumbFour title={event?.title} date={event?.date} time={event?.time} city={event?.event_meta} />
                <EventDetailsArea event={event}/>
                <Footer style_2={'footer-dark bg-image footer-style-2'} />
            </div>
        </div>
    )
}

export default index;
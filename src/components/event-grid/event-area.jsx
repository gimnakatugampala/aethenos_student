import React from 'react';
import { event_data } from '../../data';
import AllEvents from './all-events';

const event_items = event_data.filter(event => event.event_grid);

const EventArea = () => {
    return (
        <div className="edu-event-area event-area-1 section-gap-equal">
            <div className="container">
                <div data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                    <div className="row g-5">
                        <AllEvents itemsPerPage={6} items={event_items} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventArea;
import Link from 'next/link';
import React from 'react';

const EventListItem = ({ item }) => {
    const { id, img, date, time, title, sm_desc, event_meta } = item || {};
    return (
        <div className="inner">
            <div className="thumbnail">
                <Link href={`/event-details/${id}`}>

                    <img src={img} alt="Event Images" />

                </Link>
            </div>
            <div className="content">
                <ul className="event-meta">
                    <li><i className="icon-27"></i>{date}</li>
                    <li><i className="icon-33"></i>{time}</li>
                </ul>
                <h4 className="title">
                    <Link href={`/event-details/${id}`}>
                        {title}
                    </Link>
                </h4>
                <span className="event-location"><i className="icon-40"></i>{event_meta}</span>
                <p>{sm_desc}</p>
                <div className="read-more-btn">
                    <Link href={`/event-details/${id}`} className="edu-btn btn-medium btn-border">
                        Learn More<i className="icon-4"></i>

                    </Link>
                </div>
            </div>
        </div>
    );
}

export default EventListItem;
import Link from 'next/link';
import React from 'react';

const EventItem = ({ item }) => {
    const { id, date, event_meta, img, sm_desc, time, title } = item || {};
    return (
        <div className="inner">
            <div className="thumbnail">
                <Link href={`/event-details/${id}`}>
                    <a>
                        <img src={img} alt="Blog Images" />
                    </a>
                </Link>
                <div className="event-time">
                    <span><i className="icon-33"></i>{time}</span>
                </div>
            </div>
            <div className="content">
                <div className="event-date">
                    <span className="day">{date?.split(' ')[1]}</span>
                    <span className="month">{date?.split(' ')[0]}</span>
                </div>
                <h5 className="title">
                    <Link href={`/event-details/${id}`}>
                        <a>{title}</a>
                    </Link>
                </h5>
                <p>{sm_desc}</p>
                <ul className="event-meta">
                    <li><i className="icon-40"></i>{event_meta}</li>
                </ul>
                <div className="read-more-btn">
                    <Link href={`/event-details/${id}`}>
                        <a className="edu-btn btn-small btn-secondary">
                            Learn More <i className="icon-4"></i>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default EventItem;
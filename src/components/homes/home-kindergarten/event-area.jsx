import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../../contexts/mouse-move-context';
import { event_data } from '../../../data';

const events = event_data.filter(item => item.home_7)

const EventArea = () => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div className="edu-event-area event-area-3 bg-image">
            <div className="container edublink-animated-shape">
                <div className="section-title section-center" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                    <span className="pre-title pre-textsecondary">Discover Event</span>
                    <h2 className="title">Join Our Upcoming Event</h2>
                    <span className="shape-line"><i className="icon-19"></i></span>
                </div>

                <div className="row g-5">
                    {events.map((event) => {
                        const { id, date, event_meta, img, sm_desc, bg_style, title } = event;
                        return (
                            <div key={id} className="col-lg-6 col-12" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                                <div className={`edu-event-list event-list-3 ${bg_style}`}>
                                    <div className="inner">
                                        <div className="thumbnail">
                                            <Link href={`/event-details/${id}`}>
                                                <a>
                                                    <img src={img} alt="Event Images" />
                                                </a>
                                            </Link>
                                        </div>
                                        <div className="content">
                                            <ul className="event-meta">
                                                <li><i className="icon-27"></i>{date}</li>
                                            </ul>
                                            <h4 className="title">
                                                <Link href={`/event-details/${id}`}>
                                                    <a>{title}</a>
                                                </Link>
                                            </h4>
                                            <span className="event-location"><i className="icon-40"></i>{event_meta}</span>
                                            <p>{sm_desc}</p>
                                            <div className="read-more-btn">
                                                <Link href={`/event-details/${id}`}>
                                                    <a className="edu-btn btn-medium curved-medium">Attend <i className="icon-4"></i></a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <ul className="shape-group">
                    <motion.li className="shape-1 scene"
                        animate={ {
                            x: mouseReverse(30).x,
                            y: mouseReverse(30).y
                        } }
                    >
                        <img src="/assets/images/banner/icon-2.png" alt="Shape" />
                    </motion.li>
                    <motion.li className="shape-2 scene"
                        animate={ {
                            x: mouseDirection(30).x,
                            y: mouseDirection(30).y
                        } }
                    >
                        <img src="/assets/images/banner/icon-1.png" alt="Shape" />
                    </motion.li>
                </ul>
            </div>
        </div>
    )
}

export default EventArea;
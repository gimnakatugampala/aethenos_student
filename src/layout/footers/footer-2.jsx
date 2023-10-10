import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../contexts/mouse-move-context';
import FooterSocial from './component/footer-social';

const footer_contents = {
    desc: 'Lorem ipsum dolor amet consecto adi pisicing elit sed eiusm tempor incidid unt labore dolore.',
    add: '70-80 Upper St Norwich NR2',
    call: '+01 123 5641 231',
    email: 'info@edublink.com',
    widgets: [
        {
            col: '3',
            class: 'explore-widget',
            widget_title: 'Online Platform',
            footer_links: [
                { link: 'about-1', title: 'About' },
                { link: 'course-style-1', title: 'Courses' },
                { link: 'team-1', title: 'Instructor' },
                { link: 'event-grid', title: 'Events' },
                { link: 'team-details', title: 'Instructor Profile' },
                { link: 'purchase-guide', title: 'Purchase Guide' }
            ]
        },
        {
            col: '2',
            class: 'quick-link-widget',
            widget_title: 'Links',
            footer_links: [
                { link: 'contact-us', title: 'Contact Us' },
                { link: 'gallery-grid', title: 'Gallery' },
                { link: 'blog-standard', title: 'News & Articles' },
                { link: 'faq', title: "FAQ's" },
                { link: 'sign-in', title: 'Sign In/Registration' },
                { link: 'coming-soon', title: 'Coming Soon' }
            ]
        }
    ]
}

const { add, call, desc, email, widgets } = footer_contents;

const FooterTwo = () => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <footer className="edu-footer footer-light footer-for-kitchen footer-style-4">
            <div className="footer-top">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-3 col-md-6">
                            <div className="edu-footer-widget">
                                <h4 className="widget-title">Address</h4>
                                <div className="inner">
                                    <p className="description">{desc}</p>
                                    <div className="widget-information">
                                        <ul className="information-list">
                                            <li><span>Add:</span>{add}</li>
                                            <li><span>Call:</span><a href="tel:+011235641231">{call}</a></li>
                                            <li><span>Email:</span><a href="mailto:info@edublink.com"
                                            target="_blank" rel="noreferrer">{email}</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {widgets.map((w, i) => (
                            <div key={i} className={`col-lg-${w.col} col-sm-6`}>
                                <div className={`edu-footer-widget ${w.class}`}>
                                    <h4 className="widget-title">{w.widget_title}</h4>
                                    <div className="inner">
                                        <ul className="footer-link link-hover">
                                            {w.footer_links.map((l, i) => <li key={i}>
                                            <Link href={`/${l.link}`}><a>{l.title}</a></Link>
                                            </li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="col-lg-4 col-md-6">
                            <div className="edu-footer-widget">
                                <h4 className="widget-title">Contacts</h4>
                                <div className="inner">
                                    <p className="description">Enter your email address to register to our newsletter subscription</p>
                                    <div className="input-group footer-subscription-form">
                                        <input type="email" className="form-control" placeholder="Your email" />
                                        <button className="edu-btn btn-medium" type="button">Subscribe <i className="icon-4"></i></button>
                                    </div>
                                    <ul className="social-share icon-transparent">
                                        <FooterSocial />
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ul className="shape-group">
                    <motion.li className="shape-1 scene" data-sal-delay="100" data-sal="fade" data-sal-duration="1000"
                        animate={ {
                            x: mouseDirection(30).x,
                            y: mouseDirection(30).y
                        } }
                    >
                        <img src="/assets/images/others/shape-01-01.png" alt="shape" />
                    </motion.li>
                    <motion.li className="shape-2 scene" data-sal-delay="100" data-sal="fade" data-sal-duration="1000"
                        animate={ {
                            x: mouseReverse(30).x,
                            y: mouseReverse(30).y
                        } }
                    >
                        <img src="/assets/images/others/shape-02-01.png" alt="shape" />
                    </motion.li>
                    <li className="shape-3" data-sal-delay="100" data-sal="fade" data-sal-duration="1000">
                        <img src="/assets/images/others/shape-03-01.png" alt="shape" />
                    </li>
                    <motion.li className="shape-4 scene" data-sal-delay="100" data-sal="fade" data-sal-duration="1000"
                        animate={ {
                            x: mouseDirection(30).x,
                            y: mouseDirection(30).y
                        } }
                    >
                        <img src="/assets/images/others/shape-04-01.png" alt="shape" />
                    </motion.li>
                    <motion.li className="shape-5 scene" data-sal-delay="100" data-sal="fade" data-sal-duration="1000"
                        animate={ {
                            x: mouseReverse(30).x,
                            y: mouseReverse(30).y
                        } }
                    >
                        <img src="/assets/images/others/shape-05-01.png" alt="shape" />
                    </motion.li>
                </ul>
            </div>
            <div className="copyright-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="inner text-center">
                                <p>Copyright {new Date().getFullYear()} <a href="https://1.envato.market/AoJezj" rel="noreferrer" target="_blank">EduBlink</a> Designed By <a href="https://1.envato.market/YgGJbj" target="_blank" rel="noreferrer">DevsBlink</a>. All Rights Reserved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default FooterTwo;
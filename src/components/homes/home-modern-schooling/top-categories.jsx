import Link from 'next/link';
import React from 'react';

function Category({ delay, color, icon, icon_class, title, course }) {
    return (
        <div className="col-lg-4 col-md-6" data-sal-delay={delay} data-sal="slide-up" data-sal-duration="800">
            <div className={`categorie-grid categorie-style-4 ${color} edublink-svg-animate`}>
                <div className="icon">
                    <i className={`${icon} ${icon_class ? icon_class : ''}`}></i>
                </div>
                <div className="content">
                    <Link href="/course-style-1">
                        <a>
                            <h5 className="title">{title}</h5>
                        </a>
                    </Link>
                    <span className="course-count">{course} Courses</span>
                </div>
            </div>
        </div>
    )
}

const TopCategories = () => {
    return (
        <div className="edu-categorie-area categorie-area-4 edu-section-gap">
            <div className="container">
                <div className="section-title section-center" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                    <h2 className="title">Top Categories</h2>
                    <span className="shape-line"><i className="icon-19"></i></span>
                    <p>Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore</p>
                </div>

                <div className="row g-5">
                    <Category delay="50" color="color-primary-style" icon="icon-9" title="Business Management" course="38" />

                    <Category delay="100" color="color-secondary-style" icon="icon-9" icon_class="art-design"
                    title="Arts & Design" course="40" />

                    <Category delay="150" color="color-extra01-style" icon="icon-11" icon_class="personal-development"
                    title="Personal Development" course="42" />

                    <Category delay="50" color="color-tertiary-style" icon="icon-12" icon_class="health-fitness"
                    title="Health & Fitness" course="36" />

                    <Category delay="100" color="color-extra02-style" icon="icon-13" icon_class="data-science"
                    title="Data Science" course="35" />

                    <Category delay="150" color="color-extra03-style" icon="icon-14" title="Marketing" course="28" />

                    <Category delay="50" color="color-extra04-style" icon="icon-15" title="Business & Finance" course="25" />

                    <Category delay="100" color="color-extra05-style" icon="icon-16" icon_class="computer-science" title="Computer Science" course="26" />

                    <Category delay="150" color="color-extra06-style" icon="icon-17" icon_class="video-photography" title="Video & Photography" course="22" />
                </div>
            </div>
        </div>
    )
}

export default TopCategories;
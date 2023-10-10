import React from 'react';

const SidebarOne = () => {
    return (
        <div className="edu-blog-sidebar">
            <div className="edu-blog-widget widget-search">
                <div className="inner">
                    <h4 className="widget-title">Search</h4>
                    <div className="content">
                        <form className="blog-search" action="#">
                            <button className="search-button"><i className="icon-2"></i></button>
                            <input type="text" placeholder="Search" />
                        </form>
                    </div>
                </div>
            </div>

            <div className="edu-blog-widget widget-tags">
                <div className="inner">
                    <h4 className="widget-title">Tags</h4>
                    <div className="content">
                        <div className="tag-list">
                            <a href="#">Language</a>
                            <a href="#">eLearn</a>
                            <a href="#">Tips</a>
                            <a href="#">Course</a>
                            <a href="#">Motivation</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="edu-blog-widget widget-categories">
                <div className="inner">
                    <h4 className="widget-title">Categories</h4>
                    <div className="content">
                        <ul className="category-list">
                            <li><a href="#">Business Studies <span>(3)</span></a></li>
                            <li><a href="#">Computer Engineering <span>(7)</span></a></li>
                            <li><a href="#">Medical &amp; Health<span>(2)</span></a></li>
                            <li><a href="#">Software <span>(1)</span></a></li>
                            <li><a href="#">Web Development <span>(3)</span></a></li>
                            <li><a href="#">Uncategorized <span>(9)</span></a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="edu-blog-widget widget-action">
                <div className="inner">
                    <h4 className="title">Get Online Courses From <span>EduBlink</span></h4>
                    <span className="shape-line"><i className="icon-19"></i></span>
                    <p>Nostrud exer ciation laboris aliqup</p>
                    <a href="#" className="edu-btn btn-medium">Start Now <i className="icon-4"></i></a>
                </div>
            </div>
        </div>
    )
}

export default SidebarOne;
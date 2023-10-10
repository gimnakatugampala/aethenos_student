import Link from 'next/link';
import React from 'react';
import { blog_data } from '../../../data';

const blog_items = blog_data.filter(blog => blog.home_4);
const large_blog = blog_items.find(blog => blog.large);
const sm_blogs = blog_items.filter(blog => !blog.large)

const BlogArea = () => {
    return (
        <div className="edu-blog-area blog-area-3 edu-section-gap">
            <div className="container">
                <div className="section-title section-center" data-sal-delay="50" data-sal="slide-up" data-sal-duration="800">
                    <span className="pre-title">Latest Articles</span>
                    <h2 className="title">Get News with EduBlink</h2>
                    <span className="shape-line"><i className="icon-19"></i></span>
                </div>
                <div className="row g-5 row--45">
                    <div className="col-lg-6 col-12" data-sal-delay="50" data-sal="slide-up" data-sal-duration="800">
                        <div className="edu-blog blog-style-2 first-large-blog">
                            <div className="inner">
                                <div className="thumbnail">
                                    <Link href={`/blog-details/${large_blog.id}`}>
                                        <a>
                                            <img src={large_blog.img} alt="Blog Images" />
                                        </a>
                                    </Link>
                                </div>
                                <div className="content">
                                    <div className="blog-date">
                                        <span className="day">{large_blog.date.split(' ')[1]}</span>
                                        <span className="month">{large_blog.date.split(' ')[0]}</span>
                                    </div>
                                    <div className="category-wrap">
                                        <Link href={`/blog-details/${large_blog.id}`}>
                                            <a className="blog-category">{large_blog.category}</a>
                                        </Link>
                                    </div>
                                    <h4 className="title">
                                        <Link href={`/blog-details/${large_blog.id}`}>
                                            <a>{large_blog.title}</a>
                                        </Link>
                                    </h4>
                                    <p>Lorem ipsum dolor sit amet consec tetur adipisicing sed eiusmod tempor incid idunt labore.</p>
                                    <ul className="blog-meta">
                                        <li><i className="icon-25"></i>By <a href="#">{large_blog.author}</a></li>
                                        <li><i className="icon-28"></i>Com {large_blog.comment}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-6" data-sal-delay="100" data-sal="slide-up" data-sal-duration="800">
                        {sm_blogs.map((blog) => {
                            const { id, img, date, category, title, author, comment } = blog;
                            return (
                                <div key={id} className="edu-blog blog-style-2">
                                    <div className="inner">
                                        <div className="thumbnail">
                                            <Link href={`/blog-details/${id}`}>
                                                <a>
                                                <img src={img} alt="Blog Images" />
                                                </a>
                                            </Link>
                                            <div className="blog-date">
                                                <span className="day">{date.split(' ')[1]}</span>
                                                <span className="month">{date.split(' ')[0]}</span>
                                            </div>
                                        </div>
                                        <div className="content">
                                            <div className="category-wrap">
                                                <Link href={`/blog-details/${id}`}>
                                                <a className="blog-category">{category}</a>
                                                </Link>
                                            </div>
                                            <h5 className="title">
                                                <Link href={`/blog-details/${id}`}>
                                                <a>{title}</a>
                                                </Link>
                                            </h5>
                                            <ul className="blog-meta">
                                                <li><i className="icon-25"></i>By <a href="#">{author}</a></li>
                                                <li><i className="icon-28"></i>Com {comment}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogArea;
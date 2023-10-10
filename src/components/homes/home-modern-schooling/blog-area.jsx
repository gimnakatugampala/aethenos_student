import Link from 'next/link';
import React from 'react';
import { blog_data } from '../../../data';

const blog_items = blog_data.filter(blog => blog.modern_schooling_blog);

const BlogArea = () => {
    return (
        <div className="edu-blog-area blog-area-6 bg-image section-gap-equal">
            <div className="container">
                <div className="section-title section-center" data-sal-delay="100" data-sal="slide-up" data-sal-duration="800">
                    <span className="pre-title">Latest Articles</span>
                    <h2 className="title">Get News with EduBlink</h2>
                    <span className="shape-line"><i className="icon-19"></i></span>
                </div>
                <div className="row g-5">
                    {blog_items.map((blog, i) => {
                        const { id, img, delay, date, sm_desc, title, category } = blog;
                        return (
                            <div key={i} className="col-lg-3 col-md-6 col-12" data-sal-delay={delay} data-sal="slide-up" data-sal-duration="800">
                                <div className="edu-blog blog-style-6">
                                    <div className="inner">
                                        <div className="thumbnail">
                                            <Link href={`/blog-details/${id}`}>
                                                <a>
                                                    <img src={img} alt="Blog Images" />
                                                </a>
                                            </Link>
                                            <span className="date">{date}</span>
                                        </div>
                                        <div className="content position-top">
                                            <div className="read-more-btn">
                                                <Link href={`/blog-details/${id}`}>
                                                    <a className="btn-icon-round"><i className="icon-4"></i></a>
                                                </Link>
                                            </div>
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
                                            <p>{sm_desc}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default BlogArea;
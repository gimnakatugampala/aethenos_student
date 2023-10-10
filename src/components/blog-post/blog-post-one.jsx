import React from 'react';
import Link from 'next/link';

const BlogPostOne = ({ param }) => {
    return (
        <div className="edu-blog blog-style-1">
            <div className="inner">
                <div className="thumbnail">
                    <Link href={`/blog-details/${param.id}`}>
                        <a>
                            <img src={param.img} alt="Blog Images" />
                        </a>
                    </Link>
                </div>
                <div className="content position-top">
                    <div className="read-more-btn">
                        <Link href={`/blog-details/${param.id}`}>
                            <a className="btn-icon-round">
                                <i className="icon-4"></i>
                            </a>
                        </Link>
                    </div>
                    <div className="category-wrap">
                        <a href="#" className="blog-category">{param.category}</a>
                    </div>
                    <h5 className="title">
                        <Link href={`/blog-details/${param.id}`}>
                            <a>{param.title}</a>
                        </Link>
                    </h5>
                    <ul className="blog-meta">
                        <li>
                            <i className="icon-27"></i>{param.date}
                        </li>
                        <li>
                            <i className="icon-28"></i>Com {param.comment}
                        </li>
                    </ul>
                    <p>{param.sm_desc}</p>
                </div>
            </div>
        </div>
    )
}

export default BlogPostOne;
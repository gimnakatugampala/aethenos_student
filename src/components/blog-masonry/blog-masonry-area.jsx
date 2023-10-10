import Link from 'next/link';
import React from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { blog_data } from '../../data';
import PaginationTwo from '../../ui/paginatio-2';

const blog_items = blog_data.filter(blog => blog.blog_masonry);

const BlogMasonryArea = () => {
  return (
        <section className="section-gap-equal">
            <div className="container">
                <div className="g-5" id="masonry-gallery" data-sal-delay="100" data-sal="slide-up" data-sal-duration="800">
                    <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 750: 2, 992: 3 }}>
                        <Masonry gutter="30px">
                            {blog_items.map((blog) => {
                                const { id, img, desc, title, date, category, comment } = blog;
                                return (
                                    <div key={id}>
                                        <div className="edu-blog blog-style-5">
                                            <div className="inner">
                                                <div className="thumbnail">
                                                    <Link href={`/blog-details/${id}`}>
                                                        <a>
                                                            <img src={img} alt="Blog Images" />
                                                        </a>
                                                    </Link>
                                                </div>

                                                <div className="content position-top">
                                                    <div className="read-more-btn">
                                                        <Link href={`/blog-details/${id}`}>
                                                            <a className="btn-icon-round"><i className="icon-4"></i></a>
                                                        </Link>
                                                    </div>
                                                    <div className="category-wrap">
                                                        <a href="#" className="blog-category">{category}</a>
                                                    </div>
                                                    <h5 className="title">
                                                        <Link href={`/blog-details/${id}`}>
                                                        <a>{title}...</a>
                                                        </Link>
                                                    </h5>
                                                    <ul className="blog-meta">
                                                        <li><i className="icon-27"></i>{date}</li>
                                                        <li><i className="icon-28"></i>Com {comment}</li>
                                                    </ul>
                                                    <p>{desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </Masonry>
                    </ResponsiveMasonry>
                </div>
                <ul className="edu-pagination top-space-30">
                    {/* pagination start */}
                    <PaginationTwo />
                    {/* pagination end */}
                </ul>
            </div>
        </section>
    )
}

export default BlogMasonryArea;
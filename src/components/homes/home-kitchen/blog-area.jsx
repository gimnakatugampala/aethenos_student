import Link from 'next/link';
import { blog_data } from '../../../data';

const BlogArea = () => {
    const blog_items = blog_data.filter(blog => blog.kitchen);
    return (
        <div className="edu-blog-area blog-area-1 edu-section-gap 3333">
            <div className="container">
                <div className="section-title section-center" data-sal-delay="100" data-sal="slide-up" data-sal-duration="800">
                    <span className="pre-title">Latest Articles</span>
                    <h2 className="title">Get News with EduBlink</h2>
                    <span className="shape-line">
                        <i className="icon-19"></i>
                    </span>
                </div>

                <div className="row g-5"> 
                    {blog_items.map((blog, i) => { 
                        const { id, img, comment, category, date, sm_desc, title } = blog; 
                        return (
                            <div key={id} className="col-lg-4 col-md-6 col-12" data-sal-delay={`${i + 1}00`} data-sal="slide-up" data-sal-duration="800">
                                <div className="edu-blog blog-style-1">
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
                                                <a className="btn-icon-round">
                                                    <i className="icon-4"></i>
                                                </a>
                                                </Link>
                                            </div>
                                            <div className="category-wrap">
                                                <Link href={`/blog-details/${id}`}>
                                                <a className="blog-category">{category}</a>
                                                </Link>
                                            </div>
                                            <h5 className="title">
                                                <Link href={`/blog-details/${id}`}>
                                                <a>{title}...</a>
                                                </Link>
                                            </h5>
                                            <ul className="blog-meta">
                                                <li>
                                                    <i className="icon-27"></i>{date}
                                                </li>
                                                <li>
                                                    <i className="icon-28"></i>Com {comment}
                                                </li>
                                            </ul>
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
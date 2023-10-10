import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';

import { blog_data } from '../../data';
import BlogSidebar from './blog-sidebar';
import VideoModal from '../common/popup-modal/video-modal';
import useModal from '../../hooks/use-modal';
import PaginationTwo from '../../ui/paginatio-2';
import Link from 'next/link';

const blog_items = blog_data.filter(blog => blog.blog_standard)

const BlogArea = () => {
    const [loop, setLoop] = useState(false);
    useEffect(() => setLoop(true), []);
    const { isVideoOpen, setIsVideoOpen } = useModal();
    return (
        <>
            <section className="section-gap-equal">
                <div className="container">
                    <div className="row row--30">
                        <div className="col-lg-8">
                            {blog_items.map((blog, i) => {
                                const { category, comment, date, id, title, images, img, video, slider, desc } = blog;
                                return ( 
                                    <div key={id} className={`edu-blog blog-style-4 ${video ? 'post-video' : 'post-gallery'}`} data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                                        <div className="inner">
                                            <div className="thumbnail">
                                                {!slider && 
                                                    <Link href={`/blog-details/${id}`}>
                                                        <a>
                                                            <img src={img} alt="Blog Images" />
                                                        </a>
                                                    </Link>
                                                }

                                                {video && <button onClick={() => setIsVideoOpen(true)} style={{ border: 'none' }} className="video-play-btn video-popup-activation">
                                                    <i className="icon-18"></i>
                                                </button>}

                                                {slider &&
                                                    <Swiper
                                                        className='blog-gallery-activation swiper'
                                                        slidesPerView={1}
                                                        spaceBetween={0}
                                                        modules={[Navigation, Autoplay]}
                                                        loop={loop}
                                                        grabCursor={true}
                                                        speed={1000}
                                                        autoplay={{
                                                            delay: 3000
                                                        }}
                                                        navigation={{
                                                            nextEl: ".swiper-btn-nxt",
                                                            prevEl: ".swiper-btn-prv"
                                                        }}
                                                    >
                                                        {images.map((img, i) => (
                                                            <SwiperSlide key={i}>
                                                                <Link href={`/blog-details/${id}`}>
                                                                    <a>
                                                                        <img src={img} alt="Blog Images" />
                                                                    </a>
                                                                </Link>
                                                            </SwiperSlide>
                                                        ))}

                                                        <div className="swiper-navigation">
                                                            <div className="swiper-btn-nxt" style={{ cursor: 'pointer' }}>
                                                                <i className="icon-west"></i>
                                                            </div>
                                                            <div className="swiper-btn-prv" style={{ cursor: 'pointer' }}>
                                                                <i className="icon-east"></i>
                                                            </div>
                                                        </div>
                                                    </Swiper>
                                                }
                                            </div>

                                            <div className="content">
                                                <div className="category-wrap">
                                                    <a href="#" className="blog-category">{category}</a>
                                                </div>
                                                <h3 className="title">
                                                    <Link href={`/blog-details/${id}`}>
                                                        <a>{title}</a>
                                                    </Link>
                                                </h3>
                                                <ul className="blog-meta">
                                                    <li><i className="icon-27"></i>{date}</li>
                                                    <li><i className="icon-28"></i>Com {comment}</li>
                                                </ul>
                                                <p>{desc}</p>
                                                <div className="read-more-btn">
                                                    <Link href={`/blog-details/${id}`}>
                                                        <a className="edu-btn btn-border btn-medium">Learn More <i className="icon-4"></i></a>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            <ul className="edu-pagination justify-content-start pt-0">
                                {/* pagination start */}
                                <PaginationTwo />
                                {/* pagination end */}
                            </ul>
                        </div>

                        <div className="col-lg-4">
                            {/* sidebar start */}
                            <BlogSidebar />
                            {/* sidebar end */}
                        </div>
                    </div>
                </div>
            </section>

            {/* video modal start */}
            <VideoModal isVideoOpen={isVideoOpen} setIsVideoOpen={setIsVideoOpen} videoId={'PICj5tr9hcc'} />
            {/* video modal end */}
        </>
    )
}

export default BlogArea;
import Link from 'next/link';
import React from 'react';

function Category({ delay, color, icon, icon_name, title }) {
    return (
        <div className="col" data-sal-delay={delay} data-sal="slide-up" data-sal-duration="800">
            <div className={`categorie-grid categorie-style-3 ${color}`}>
                <div className={`icon ${icon_name ? icon_name : ''}`}>
                    <i className={icon}></i>
                </div>
                <div className="content">
                    <Link href="/course-style-1">
                        <a>
                            <h5 className="title">{title}</h5>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

const Categories = () => {
    return (
        <div className="edu-categorie-area categorie-area-3 edu-section-gap bg-image" id="categories">
            <div className="container">
                <div className="section-title section-center" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                    <span className="pre-title pre-textsecondary">Categories</span>
                    <h2 className="title">Online <span className="color-primary">Classes</span> For Remote Learning.</h2>
                    <span className="shape-line"><i className="icon-19"></i></span>
                    <p>Consectetur adipiscing elit sed do eiusmod tempor.</p>
                </div>
                <div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 g-4">
                    <Category delay={'100'} color={'color-primary-style'} icon="icon-9" title={'Management'} />
                    <Category delay={'150'} color={'color-secondary-style'} icon="icon-10" title={'Arts & Design'} />
                    <Category delay={'200'} color={'color-extra04-style'} icon="icon-11" title={'Development'} />
                    <Category delay={'250'} color={'color-tertiary-style'} icon="icon-12" title={'Health & Fitness'} />
                    <Category delay={'300'} color={'color-extra02-style'} icon="icon-13" title={'Data Science'} />
                    <Category delay={'100'} color={'color-extra07-style'} icon="icon-42" icon_name={'design-pencil-icon'}
                    title={'Data Science'} />
                    <Category delay={'150'} color={'color-extra06-style'} icon="icon-14" title={'Marketing'} />
                    <Category delay={'200'} color={'color-extra03-style'} icon="icon-16" icon_name={'laptop-icon'}
                    title={'Computer Science'} />
                    <Category delay={'250'} color={'color-extra01-style'} icon="icon-17" title={'Photography'} />
                    <Category delay={'300'} color={'color-extra05-style'} icon="icon-43" title={'Music Class'} />
                </div>
            </div>
        </div>
    )
}

export default Categories;
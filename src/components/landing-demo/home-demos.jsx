import React from 'react';
import Link from 'next/link';

const demos = [
    {
        title:'EduBlink Education',
        link:'/',
        imgSrc: 'home-01.jpg'
    },
    {
        title:'Distant Learning',
        link:'/home-distant-learning',
        imgSrc: 'home-02.jpg'
    },
    {
        title:'University',
        link:'/home-university',
        imgSrc: 'home-03.jpg'
    },
    {
        title:'Online Academy',
        link:'/home-online-academy',
        imgSrc: 'home-04.jpg'
    },
    {
        title:'Modern Schooling',
        link:'/home-modern-schooling',
        imgSrc: 'home-modern-schooling.jpg',
        new: true
    },
    {
        title:'Kitchen Coach',
        link:'/home-kitchen',
        imgSrc: 'home-05.jpg'
    },
    {
        title:'Yoga Instructor',
        link:'/home-yoga-instructor',
        imgSrc: 'home-06.jpg'
    },
    {
        title:'Kindergarten',
        link:'/home-kindergarten',
        imgSrc: 'home-07.jpg'
    }
];

const comingSoon = [
    {
        title: 'Health Coach'
    },
    {
        title: 'Remote Training'
    },
    {
        title: 'Language Academy'
    },
    {
        title: 'Photography'
    }
];

const HomeDemos = () => {
    return (
        <div className="pv-demo-area" id="demos">
            <div className="container-custom">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title section-center splash-title">
                            <span className="pre-title" data-sal="slide-up" data-sal-duration="1000">Unique Demos</span>
                            <h2 className="title" data-sal-delay="100" data-sal="slide-up" data-sal-duration="1000">8+ Pre-Made Creative Online Course <br /> Education Homepage</h2>
                        </div>
                    </div>
                </div>


                <div className="row row--30">
                    {demos.map((demo, i) => {
                        return (
                            <div key={i} className="col-lg-4 col-md-6 col-sm-6 col-12" data-sal-delay="100" data-sal="slide-up" data-sal-duration="800">
                                <div className="single-demo">
                                    { demo.new && <span className="new-wrapper">New</span> }
                                    <div className="inner">
                                        <div className="thumbnail">
                                            <Link href={demo.link}>
                                                <a className="thumbnail-link" target="_blank">
                                                    <img
                                                        src={`/assets/images/preview/${demo.imgSrc}`}
                                                        alt="Preview Images"
                                                    />
                                                </a>
                                            </Link>
                                            <div className="hover-action">
                                                <Link href={demo.link}>
                                                    <a className="edu-btn btn-large" target="_blank">View Demo <i className="icon-4"></i></a>
                                                </Link>
                                            </div>
                                        </div>
                                        <h5 className="title">
                                            <Link href={demo.link}>
                                                <a target="_blank">{demo.title}</a>
                                            </Link>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    {comingSoon.map((demo, i) => {
                        return (
                            <div key={i+9} className="col-lg-4 col-md-6 col-sm-6 col-12" data-sal-delay="100" data-sal="slide-up" data-sal-duration="800">
                                <div className="single-demo coming-soon">
                                    <div className="inner">
                                        <div className="thumbnail">
                                            <a className="thumbnail-link" href="#">
                                                <img src="/assets/images/preview/coming-soon.png" alt="Preview Images" />
                                            </a>
                                        </div>
                                        <h5 className="title"><a href="#">{demo.title}</a></h5>
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

export default HomeDemos;
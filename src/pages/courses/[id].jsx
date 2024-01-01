import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import { Footer, Header, Wrapper } from "../../layout";

import SEO from "../../components/seo";
import { GetCourseCategoryTitle } from '../../api';

import CourseTypeOne from '../../components/course/course-type-one';


import CourseFourArea from '../../components/course-category/landscape-courses/course-4-area'


import { course_data } from '../../data';
import { useState } from 'react';

import Carousel from 'react-material-ui-carousel'
import CardContainer from '../../contexts/CardContainer';
import StarIcon from "@mui/icons-material/Star";

var items = [{
    topics: [
        {
        name: "Web Development",
        link: "/topics/web"
        },
        {
        name: "Deep Learning",
        link: "/topics/deep-learning"
        },
        {
        name: "SQL",
        link: "/topics/sql"
        },
        {
        name: "NodeJS",
        link: "/topics/node-js"
        },
        {
        name: "Angular",
        link: "/topics/angular-js"
        },
        {
        name: "Machine Learning",
        link: "/topics/machine-learning"
        },
        {
        name: "JAVA",
        link: "/topics/java"
        },
        {
        name: "React JS",
        link: "/topics/react-js"
        },
    ],
    },
    {
    topics: [
        {
        name: "Google Flutter",
        link: "/topics/google-flutter"
        },
        {
        name: "Docker",
        link: "/topics/docker"
        },
        {
        name: "Unity",
        link: "/topics/unity"
        },
        {
        name: "Typescript",
        link: "/topics/typescript"
        },
        {
        name: "Python",
        link: "/topics/python"
        },
        {
        name: "C# Programming",
        link: "/topics/c-sharp-programming"
        },
        {
        name: "Data Science",
        link: "/topics/data-science"
        },
        {
        name: "Next JS",
        link: "/topics/next-js"
        },
    ],
    },
  ];

  const instructors = [
    {
        single:[
            {
                title: "John Doe",
                link: "web-development-link-here",
                description: "ReactJS,NodeJS",
                rating: 4.5,
                students: 1000,
                courses: 10,
                image: "https://img-c.udemycdn.com/user/200_H/11614232_b0fc.jpg",
            },
            {
            title: "John Doe",
            link: "web-development-link-here",
            description: "ReactJS,NodeJS",
            rating: 4.5,
            students: 1000,
            courses: 10,
            image: "https://img-c.udemycdn.com/user/200_H/11614232_b0fc.jpg",
            },
            {
                title: "John Doe",
                link: "web-development-link-here",
                description: "ReactJS,NodeJS",
                rating: 4.5,
                students: 1000,
                courses: 10,
                image: "https://img-c.udemycdn.com/user/200_H/11614232_b0fc.jpg",
            },
            {
                title: "John Doe",
                link: "web-development-link-here",
                description: "ReactJS,NodeJS",
                rating: 4.5,
                students: 1000,
                courses: 10,
                image: "https://img-c.udemycdn.com/user/200_H/11614232_b0fc.jpg",
                }
        ]
    },
    {
        single:[
            {
                title: "Jeff",
                link: "web-development-link-here",
                description: "ReactJS,NodeJS",
                rating: 4.5,
                students: 1000,
                courses: 10,
                image: "https://img-c.udemycdn.com/user/200_H/11614232_b0fc.jpg",
            },
            {
            title: "Smith",
            link: "web-development-link-here",
            description: "ReactJS,Angular",
            rating: 4.5,
            students: 1000,
            courses: 10,
            image: "https://img-c.udemycdn.com/user/200_H/11614232_b0fc.jpg",
            }
        ]
    }
  ];

const GetCourseByCategory = () => {

    const router = useRouter();
    const { id } = router.query;
    const coursePerView = 8;
    const [next, setNext] = useState(coursePerView);
    const [most_popular_courses, setmost_popular_courses] = useState(course_data)
    const [new_courses, setnew_courses] = useState(course_data)
    const [trending_courses, settrending_courses] = useState(course_data)
    // handleLoadData
    const handleLoadData = () => {
      setNext((value) => value + 4);
    };

    useEffect(() => {
        console.log(items)
        GetCourseCategoryTitle()
    }, [])
    
    

  return (
    <Wrapper>
        <SEO pageTitle={"Marketing"} />
        <Header/>


        <section className="edu-section-gap course-details-area">
            <div className="container">
                    <div className="row">
                    <h2>Development Courses</h2>
                    <h4>Courses to get you started</h4>

                    <div className="col-lg-5">
                        <div className="course-details-content">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">

                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="most-popular-tab" data-bs-toggle="tab" data-bs-target="#most-popular"
                                    type="button" role="tab" aria-controls="most-popular" aria-selected="true">Most Popular</button>
                                </li>

                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="new-tab" data-bs-toggle="tab" data-bs-target="#new"
                                    type="button" role="tab" aria-controls="new" aria-selected="false">New</button>
                                </li>

                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="trending-tab" data-bs-toggle="tab" data-bs-target="#trending"
                                    type="button" role="tab" aria-controls="trending" aria-selected="false">Trending</button>
                                </li>
                           
                            
                            </ul>
                          
                        </div>
                    </div>

                    <div className="col-lg-12 p-3">
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="most-popular" role="tabpanel" aria-labelledby="most-popular-tab">
                            <div className="course-tab-content">
                                <div className="course-overview">

                                <div className="row g-3 mb-5">
                                {most_popular_courses.slice(0, next)?.map((course) => {
                                    return (
                                    <div key={course.id} className="col-md-6 col-xl-3">
                                        <CourseTypeOne data={course} classes="course-box-shadow" />
                                    </div>
                                    );
                                })}
                                </div>

                                {next < most_popular_courses.length && (
                                    <div
                                        onClick={handleLoadData}
                                        className="load-more-btn"
                                        data-sal-delay="100"
                                        data-sal="slide-up"
                                        data-sal-duration="1200"
                                    >
                                        <a className="edu-btn mb-5" style={{ cursor: "pointer" }}>
                                        Load More <i className="icon-56"></i>
                                        </a>
                                    </div>
                                    )}
                                 
                                    
                                </div>
                            </div>
                        </div>

                        
                        <div className="tab-pane fade" id="new" role="tabpanel" aria-labelledby="new-tab">
                            <div className="course-tab-content">
                            <div className="course-overview">
                                <div className="row g-3 mb-5">
                                {new_courses.slice(0, next)?.map((course) => {
                                    return (
                                    <div key={course.id} className="col-md-6 col-xl-3">
                                        <CourseTypeOne data={course} classes="course-box-shadow" />
                                    </div>
                                    );
                                })}
                                </div>

                                {next < new_courses.length && (
                                    <div
                                        onClick={handleLoadData}
                                        className="load-more-btn"
                                        data-sal-delay="100"
                                        data-sal="slide-up"
                                        data-sal-duration="1200"
                                    >
                                        <a className="edu-btn mb-5" style={{ cursor: "pointer" }}>
                                        Load More <i className="icon-56"></i>
                                        </a>
                                    </div>
                                    )}
                                    
                                </div>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="trending" role="tabpanel" aria-labelledby="trending-tab">
                            <div className="course-tab-content">
                            <div className="course-overview">
                                <div className="row g-3 mb-5">
                                {trending_courses.slice(0, next)?.map((course) => {
                                    return (
                                    <div key={course.id} className="col-md-6 col-xl-3">
                                        <CourseTypeOne data={course} classes="course-box-shadow" />
                                    </div>
                                    );
                                })}
                                </div>

                                {next < trending_courses.length && (
                                    <div
                                        onClick={handleLoadData}
                                        className="load-more-btn"
                                        data-sal-delay="100"
                                        data-sal="slide-up"
                                        data-sal-duration="1200"
                                    >
                                        <a className="edu-btn mb-5" style={{ cursor: "pointer" }}>
                                        Load More <i className="icon-56"></i>
                                        </a>
                                    </div>
                                    )}
                                    
                                </div>
                            </div>
                        </div>

                    </div>
                    </div>

                    <div className='col-lg-12 mb-5'>
                    <h4 className='p-2'>Popular Topics</h4>
                    <Carousel autoPlay={false} duration={500} animation='slide' navButtonsAlwaysVisible={true} indicators={false}>
                        {items.map((item, i) => (
                            <div className='row'>
                                {item.topics.map((topic,index) => (
                                    <div key={index} className='col-md-3 text-center'>
                                    <CardContainer>
                                        <a href={topic.link}>{topic.name}</a>
                                    </CardContainer>
                                    </div>  
                                ))}
                            </div>
                            ))}
                    </Carousel>
                    </div>

                
                    <div className='col-lg-12 mb-5'>
                    <h4 className='p-2'>Popular Instructors</h4>
                    <Carousel autoPlay={false} duration={500} animation='slide' navButtonsAlwaysVisible={true} indicators={false}>
                        {instructors.map((page, index) => (
                            <div className="row">
                                  {page.single.map((item, itemIndex) => (
                                    <CardContainer key={itemIndex} className="col-md-4 mb-3">
                                    <a href="/instructors/123">
                                    <div
                                        className="row"
                                        style={{
                                        borderRadius: "0",
                                        transition: "background-color 0.3s",
                                        backgroundColor: "transparent",
                                        color: "inherit",
                                        textAlign: "left",
                                        }}
                                    >
                                        <div className="col-md-3">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            style={{borderRadius:'50%'}}
                                        />
                                        </div>
                                        <div className="col-md-9">
                                        <h3 className='m-0' style={{ fontWeight: "bold", fontSize: "16px" }}>
                                            {item.title.length > 12 ?  item.title.slice(0, 17) + "..." : item.title}
                                        </h3>
                                        <div>
                                        <p className="m-0" style={{fontSize:'13px'}}>{item.description.length > 10 ?  item.description.slice(0, 50) + "...": item.description}</p>
                                        </div>

                                        <div className="d-flex align-items-center">

                                        <span>
                                            <span
                                            style={{
                                                fontWeight: "bold",
                                                fontSize: "18px",
                                                color: "#B4690E",
                                            }}
                                            >
                                            {item.rating}
                                            </span>
                                            <StarIcon
                                            style={{
                                                fontSize: "20px",
                                                color: "#B4690E",
                                            }}
                                            />
                                            </span>

                                            <p
                                            className="m-0 p-0 align-self-center mt-1 ml-1"
                                            style={{
                                                fontSize: "12px",
                                                color: "#B4690E",
                                            }}
                                            >
                                            Instructor Rating
                                            </p>

                                        </div>
                                            
                                    
                                        

                                        <div>

                                        

                                        <div className="d-flex align-items-center">
                                            <p
                                            className="mx-1 mb-0 mt-0"
                                            style={{
                                                fontWeight: "bold",
                                                fontSize: "15px",
                                                // color: "black",
                                            }}
                                            >
                                            {item.students}
                                            </p>
                                            <p
                                            className="mx-1 mb-0 mt-0"
                                            style={{
                                                // fontWeight: "bold",
                                                fontSize: "13px",
                                                // color: "black",
                                            }}
                                            >
                                            {" "}
                                            students
                                            </p>

                                        </div>
                                
                                        <div className="d-flex align-items-center">
                                            <p
                                            className="mx-1 mb-0 mt-0"
                                            style={{
                                                fontWeight: "bold",
                                                fontSize: "15px",
                                                // color: "black",
                                            }}
                                            >
                                            {item.courses}
                                            </p>
                                                <p
                                                className="mx-1 mb-0 mt-0"
                                                style={{
                                                    marginLeft: "5px",
                                                    fontSize: "13px",
                                                    // color: "black",
                                                }}
                                                >
                                                courses
                                                </p>  
                                        </div>

                                        </div>

                                        </div>
                                    </div>
                                    </a>
                                    </CardContainer>
                                ))}
                            </div>
                        ))}
                    </Carousel>
                    </div>
                                
                    <div className='col-lg-12 mb-5'>

                    <h4 className='p-2'>All Development courses</h4>
                        <CourseFourArea />                            
                    </div>

                </div>
            </div>
        </section>

        <Footer />
    </Wrapper>
  )
}

export default GetCourseByCategory
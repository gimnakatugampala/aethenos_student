import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import { Footer, Header, Wrapper } from "../../../layout";
import SEO from "../../../components/seo";
import { GetAllCoursesByCategory, GetBeginnerCoursesByTopicName, GetCourseCategoryTitle, GetCoursesByCategoryInstructor, GetCoursesByCategoryMostPopular, GetCoursesByCategoryNew, GetCoursesByCategoryTopics, GetCoursesByCategoryTrending, GetMostPopularCoursesByTopicName, GetNewCoursesByTopicName, GetSubCategoriesByCategoryLinkName, GetTopCoursesByTopicName, GetTopicNameByLinkName } from '../../../api';
import CourseTypeOne from '../../../components/course/course-type-one';
import CourseFourArea from '../../../components/course-category/landscape-courses/course-4-area'
import { course_data } from '../../../data';
import { useState } from 'react';
import Carousel from 'react-material-ui-carousel'
import CardContainer from '../../../contexts/CardContainer';
import StarIcon from "@mui/icons-material/Star";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import OneLineSkeleton from '../../../functions/Skeletons/OneLineSkeleton';
import CoursesPotraitSkeleton from '../../../functions/Skeletons/CoursesPotraitSkeleton';
import TopicsListSkeleton from '../../../functions/Skeletons/TopicsListSkeleton';
import InstructorsListSkeleton from '../../../functions/Skeletons/InstructorsListSkeleton';
import LandscapeListSkeleton from '../../../functions/Skeletons/LandscapeListSkeleton';



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

  
const options = [
    'Software Testing',
    'Software Engineering',
    'Software Development Tools',
    'Non-Code Development'
  ];

const GetCourseByCategory = () => {

    const router = useRouter();
    const { id } = router.query;
    const coursePerView = 8;
    const [next, setNext] = useState(coursePerView);




    const [most_popular_courses, setmost_popular_courses] = useState(course_data)
    const [new_courses, setnew_courses] = useState([])
    const [popular_topics, setpopular_topics] = useState([])

    const [allcourses, setallcourses] = useState([])

    const [instructors, setinstructors] = useState([])
    const [beginners_favs, setbeginners_favs] = useState(course_data)
 
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [top_course_sub_cat_Name, settop_course_sub_cat_Name] = useState("")
    const [top_course_sub_cat_link, settop_course_sub_cat_link] = useState("")
    const [top_course_courses, settop_course_courses] = useState([])
    const [loading_top_courses, setloading_top_courses] = useState(true)

   
    const [loading_top_title, setloading_top_title] = useState(true)
    const [loading_most_popular_courses, setloading_most_popular_courses] = useState(true)
    const [loading_new_courses, setloading_new_courses] = useState(true)
    const [loading_beginner_favs, setloading_beginner_favs] = useState(true)
    const [loading_topics_list, setloading_topics_list] = useState(true)
    const [loading_instructors_list, setloading_instructors_list] = useState(true)
    const [loading_all_courses_list, setloading_all_courses_list] = useState(true)

    const [TopicName, setTopicName] = useState("")
    const [CategoryName, setCategoryName] = useState("")
    const [CategoryLinkName, setCategoryLinkName] = useState("")
    const [SubCategoryName, setSubCategoryName] = useState("")
    const [SubCategoryLinkName, setSubCategoryLinkName] = useState("")

    // handleLoadData
    const handleLoadData = () => {
      setNext((value) => value + 4);
    };

    useEffect(() => {

        if(id != null){

            GetTopCoursesByTopicName(id,settop_course_courses,settop_course_sub_cat_Name,settop_course_sub_cat_link,setloading_top_courses)
            GetNewCoursesByTopicName(id,setnew_courses,setloading_new_courses)
            GetBeginnerCoursesByTopicName(id,setbeginners_favs,setloading_beginner_favs)
            GetMostPopularCoursesByTopicName(id,setmost_popular_courses,setloading_most_popular_courses)
            GetTopicNameByLinkName(id,setTopicName,setCategoryName,setCategoryLinkName,setSubCategoryName,setSubCategoryLinkName,setloading_top_title)
            console.log(id)
        }
        
       

        setTimeout(() => {
            // setloading_sub_categories(false)
            // setloading_most_popular_courses(false)
            setloading_topics_list(false)
            setloading_instructors_list(false)
            setloading_all_courses_list(false)
            // setloading_new_courses(false)
            // setloading_beginner_favs(false)
            // setloading_top_title(false)
        }, 2000);

    }, [CategoryName,loading_top_title,id])

    
    

    const ITEM_HEIGHT = 48;


  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

    
    

  return (
    <Wrapper>
        <SEO pageTitle={TopicName == "" ? "Loading ..." : TopicName} />
        <Header/>

        
        <section className="edu-section-gap course-details-area">
            <div className="container">

                    <div className="row">

                    {loading_top_title ? (
                        <>
                        <OneLineSkeleton height={20} />
                        <OneLineSkeleton height={20} />
                        </>
                    ) : (
                        <div className='mb-4'>
                        <h2 className='m-0 p-0'>{TopicName} Courses</h2>
                        <h5 className='m-0 p-0'>{TopicName} relates to <a className='text-danger' href={`/courses/${CategoryLinkName}`}><b>{CategoryName}</b></a>, <a className='text-danger' href={`/courses/${CategoryLinkName}/${SubCategoryLinkName}`}><b>{SubCategoryName}</b></a></h5>
                        </div>
                    )}
                    
                   
                    

                    <div className="col-lg-6">
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
                                    type="button" role="tab" aria-controls="trending" aria-selected="false">Beginner Favorites</button>
                                </li>
                           
                            
                            </ul>
                          
                        </div>
                    </div>

                    <div className="col-lg-12 p-3">
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="most-popular" role="tabpanel" aria-labelledby="most-popular-tab">
                            <div className="course-tab-content">
                                <div className="course-overview">

                                {loading_most_popular_courses ? (
                                    <div className='row'>
                                    <CoursesPotraitSkeleton />
                                    <CoursesPotraitSkeleton />
                                    <CoursesPotraitSkeleton />
                                    <CoursesPotraitSkeleton />
                                    <CoursesPotraitSkeleton />
                                    <CoursesPotraitSkeleton />
                                    <CoursesPotraitSkeleton />
                                    <CoursesPotraitSkeleton />
                                    </div>
                                ) : (
                                    <div className="row g-3 mb-5">
                                    {most_popular_courses.length > 0 && most_popular_courses != null  ? most_popular_courses.slice(0, next)?.map((course) => {
                                        return (
                                        <div key={course.id} className="col-md-6 col-xl-3">
                                            <CourseTypeOne data={course} classes="course-box-shadow" />
                                        </div>
                                        );
                                    }) : <h4>No Most Popular Courses Available</h4>}
                                    </div>
                                )}


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

                              {loading_new_courses ? (
                                  <div className='row'>
                                  <CoursesPotraitSkeleton />
                                  <CoursesPotraitSkeleton />
                                  <CoursesPotraitSkeleton />
                                  <CoursesPotraitSkeleton />
                                  <CoursesPotraitSkeleton />
                                  <CoursesPotraitSkeleton />
                                  <CoursesPotraitSkeleton />
                                  <CoursesPotraitSkeleton />
                                  </div>
                              ) : (
                                <div className="row g-3 mb-5">
                                {new_courses.length > 0 || new_courses != null ? new_courses.slice(0, next)?.map((course) => {
                                    return (
                                    <div key={course.id} className="col-md-6 col-xl-3">
                                        <CourseTypeOne data={course} classes="course-box-shadow" />
                                    </div>
                                    );
                                }) : <h4 >No New Courses Available</h4>}
                                </div>
                              )}


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

                              {loading_beginner_favs ? (
                                   <div className='row'>
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   </div>
                              ) : (
                                <div className="row g-3 mb-5">
                                {beginners_favs.length > 0 && beginners_favs != null ? beginners_favs.slice(0, next)?.map((course) => {
                                    return (
                                    <div key={course.id} className="col-md-6 col-xl-3">
                                        <CourseTypeOne data={course} classes="course-box-shadow" />
                                    </div>
                                    );
                                }) : <h4 >No Beginner Favorites Courses Available</h4>}
                                </div>
                              )}

                                {next < beginners_favs.length && (
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
                    <h4 className='p-2'>Top courses in {TopicName} and <a className='text-danger text-decoration-underline' href={`/courses/${CategoryLinkName}/${top_course_sub_cat_link}`}>{top_course_sub_cat_Name}</a></h4>
       

                    {loading_top_courses ? (
                                   <div className='row'>
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   </div>
                              ) : (
                                <div className="row g-3 mb-5">
                                {top_course_courses.length > 0 && top_course_courses != null ? top_course_courses.slice(0, next)?.map((course) => {
                                    return (
                                    <div key={course.id} className="col-md-6 col-xl-3">
                                        <CourseTypeOne data={course} classes="course-box-shadow" />
                                    </div>
                                    );
                                }) : <h4 >No Top Courses Available</h4>}
                                </div>
                              )}

                                {next < top_course_courses.length && (
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

                
                    <div className='col-lg-12 mb-5'>
                    <h4 className='p-2'>Popular Topics</h4>

                    {loading_topics_list ? (
                         <div className='row'>
                         <TopicsListSkeleton />
                         <TopicsListSkeleton />
                         <TopicsListSkeleton />
                         <TopicsListSkeleton />
                         </div>
                    ) : (

                    <Carousel autoPlay={false} duration={500} animation='slide' navButtonsAlwaysVisible={true} indicators={false}>
                    {popular_topics != null || popular_topics.length > 0 ? popular_topics.map((item, i) => (
                        <div key={i} className='row'>
                            {item.topics.map((topic,index) => (
                                <div key={index} className='col-md-3 text-center'>
                                <CardContainer>
                                    <a href={`/topic/${topic.topicLinkName}`}>{topic.topic}</a>
                                </CardContainer>
                                </div>  
                            ))}
                        </div>
                        )) : <h4>No Topics Available</h4>}
                    </Carousel>
                    )}

                    </div>
                                
                    <div className='col-lg-12 mb-5'>
                   
                        {loading_top_title ? (
                            <OneLineSkeleton height={20} />
                        ) :(
                            <h4 className='p-2'>All {CategoryName} courses</h4>
                        )}
                        

                        {loading_all_courses_list ? (
                            <LandscapeListSkeleton />
                        ) :(
                            <CourseFourArea />                            
                        )}
                    </div>

                </div>
            </div>
        </section>

        <Footer />
    </Wrapper>
  )
}

export default GetCourseByCategory
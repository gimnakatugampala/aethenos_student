
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CourseRangeList from './course-range-list';
import CardContainer from '../../../contexts/CardContainer';

const CourseRange = () => {
  

    return (
        <div className="edu-brand-area brand-area-1 p-5 bg-lighten01">
            <div className="container-fluid">
                <div className="row">

                <div className='mb-4'>
                <h3 className="title m-0">A broad selection of courses</h3>
                <p className="m-0">Choose from over 210,000 online video courses with new additions published every month</p>
                </div>

                <div className="col-md-12">
                <div className="course-details-content">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">

                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="business-tab" data-bs-toggle="tab" data-bs-target="#business"
                            type="button" role="tab" aria-controls="business" aria-selected="true">Business</button>
                        </li>

                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="design-tab" data-bs-toggle="tab" data-bs-target="#design"
                            type="button" role="tab" aria-controls="design" aria-selected="false">Design</button>
                        </li>

                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="photography-video-tab" data-bs-toggle="tab" data-bs-target="#photography-video"
                            type="button" role="tab" aria-controls="photography-video" aria-selected="false">Photography & Video</button>
                        </li>

                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="development-tab" data-bs-toggle="tab" data-bs-target="#development"
                            type="button" role="tab" aria-controls="development" aria-selected="false">Development</button>
                        </li>

                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="marketing-tab" data-bs-toggle="tab" data-bs-target="#marketing"
                            type="button" role="tab" aria-controls="marketing" aria-selected="false">Marketing</button>
                        </li>

                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="it-software-tab" data-bs-toggle="tab" data-bs-target="#it-software"
                            type="button" role="tab" aria-controls="it-software" aria-selected="false">IT & Software</button>
                        </li>

                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="personal-development-tab" data-bs-toggle="tab" data-bs-target="#personal-development"
                            type="button" role="tab" aria-controls="personal-development" aria-selected="false">Personal Development</button>
                        </li>
                    
                    
                    </ul>
                    
                </div>

                {/* <Tabs
                    defaultActiveKey="python"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    >

                    <Tab eventKey="python" title="Python">
                    <CardContainer>
                        <h4>Expand your career opportunities with Python</h4>
                        <p>Take one of Udemy’s range of Python courses and learn how to code using this incredibly useful language. Its simple syntax and readability makes Python perfect for Flask, Django, data science, and machine learning. You’ll learn how to build everything from games to sites to apps. Choose from a range of courses that will appeal to both beginners and advanced developers alike.</p>
                        <a href='/courses/it-software/hardware' className="edu-btn btn-small">
                            Explore Python
                        </a>
                        <CourseRangeList />
                    </CardContainer>
                    </Tab>

                    <Tab eventKey="excel" title="Excel">
                    <CardContainer>
                        <h4>Analyze and visualize data with Excel</h4>
                        <p>Take a Microsoft Excel course from Udemy, and learn how to use this industry-standard software. Real-world experts will show you the basics like how to organize data into sheets, rows and columns, and advanced techniques like creating complex dynamic formulas. Both small businesses and large companies use Excel to turn their raw data into actionable insights.</p>
                        <a href='/courses/it-software/hardware' className="edu-btn btn-small">
                            Explore Excel
                        </a>
                        <CourseRangeList />
                    </CardContainer>
                    </Tab>

                    <Tab eventKey="wev-dev" title="Web Development">
                    <CardContainer>
                        <h4>Build websites and applications with Web Development</h4>
                        <p>The world of web development is as wide as the internet itself. Much of our social and vocational lives play out on the internet, which prompts new industries aimed at creating, managing, and debugging the websites and applications that we increasingly rely on.</p>
                        <a href='/courses/it-software/hardware' className="edu-btn btn-small">
                            Explore with Web Development
                        </a>
                        <CourseRangeList />
                    </CardContainer>
                    </Tab>

                    <Tab eventKey="js" title="Javascript">
                    <CardContainer>
                        <h4>Grow your software development skills with JavaScript</h4>
                        <p>JavaScript is a text-based computer programming language used to make dynamic web pages. A must-learn for aspiring web developers or programmers, JavaScript can be used for features like image carousels, displaying countdowns and timers, and playing media on a webpage. With JavaScript online classes, you can learn to build interactive web applications, choose the best framework, and work with other programming languages like HTML and CSS.</p>
                        <a href='/courses/it-software/hardware' className="edu-btn btn-small">
                            Explore with JavaScript
                        </a>
                        <CourseRangeList />
                    </CardContainer>
                    </Tab>

                    <Tab eventKey="data-science" title="Data Science">
                    <CardContainer>
                        <h4>Lead data-driven decisions with Data Science</h4>
                        <p>Data science application is an in-demand skill in many industries worldwide — including finance, transportation, education, manufacturing, human resources, and banking. Explore data science courses with Python, statistics, machine learning, and more to grow your knowledge. Get data science training if you’re into research, statistics, and analytics.</p>
                        <a href='/courses/it-software/hardware' className="edu-btn btn-small">
                            Explore with Data Science
                        </a>
                        <CourseRangeList />
                    </CardContainer>
                    </Tab>

                    <Tab eventKey="aws" title="Amazon AWS">
                    <CardContainer>
                        <h4>Become an expert in cloud computing with AWS Certification</h4>
                        <p>Amazon Web Services (AWS) is a cloud computing platform with more than 200 featured services. Whether or not you aim for certification, an AWS course offers the theory and practical skills you need to land a job in cloud development, sales, engineering, networking, and more. The better you become at cloud computing, the more you can earn. Anyone can learn AWS skills, and with AWS online training, you can move at your own pace.</p>
                        <a href='/courses/it-software/hardware' className="edu-btn btn-small">
                            Explore with Amazon AWS
                        </a>
                        <CourseRangeList />
                    </CardContainer>
                    </Tab>
                    
                </Tabs> */}

                </div>

                <div className="col-lg-12 p-3">
                    <div className="tab-content" id="myTabContent">

                        <div className="tab-pane fade show active" id="business" role="tabpanel" aria-labelledby="business-tab">
                            <div className="course-tab-content">
                                <div className="course-overview">

                                    <CourseRangeList />

                                {/* {loading_most_popular_courses ? (
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
                                    {most_popular_courses.length > 0 || most_popular_courses != null  ? most_popular_courses.slice(0, next)?.map((course) => {
                                        return (
                                        <div key={course.id} className="col-md-6 col-xl-3">
                                            <CourseTypeOne data={course} classes="course-box-shadow" />
                                        </div>
                                        );
                                    }) : <h4>No Most Popular Courses Available</h4>}
                                    </div>
                                )} */}


                                {/* {next < most_popular_courses.length && (
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
                                    )} */}
                                 
                                    
                                </div>
                            </div>
                        </div>

                        
                        <div className="tab-pane fade" id="design" role="tabpanel" aria-labelledby="design-tab">
                            <div className="course-tab-content">
                            <div className="course-overview">

                            <CourseRangeList />

                              {/* {loading_new_courses ? (
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
                                     */}
                                </div>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="photography-video" role="tabpanel" aria-labelledby="photography-video-tab">
                            <div className="course-tab-content">
                            <div className="course-overview">

                            <CourseRangeList />

                              {/* {loading_trending_courses ? (
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
                                {trending_courses.length > 0 || trending_courses != null ? trending_courses.slice(0, next)?.map((course) => {
                                    return (
                                    <div key={course.id} className="col-md-6 col-xl-3">
                                        <CourseTypeOne data={course} classes="course-box-shadow" />
                                    </div>
                                    );
                                }) : <h4 >No Trending Courses Available</h4>}
                                </div>
                              )}

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
                                    )} */}
                                    
                                </div>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="development" role="tabpanel" aria-labelledby="development-tab">
                            <div className="course-tab-content">
                            <div className="course-overview">

                            <CourseRangeList />

                              {/* {loading_trending_courses ? (
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
                                {trending_courses.length > 0 || trending_courses != null ? trending_courses.slice(0, next)?.map((course) => {
                                    return (
                                    <div key={course.id} className="col-md-6 col-xl-3">
                                        <CourseTypeOne data={course} classes="course-box-shadow" />
                                    </div>
                                    );
                                }) : <h4 >No Trending Courses Available</h4>}
                                </div>
                              )}

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
                                    )} */}
                                    
                                </div>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="marketing" role="tabpanel" aria-labelledby="marketing-tab">
                            <div className="course-tab-content">
                            <div className="course-overview">

                            <CourseRangeList />

                              {/* {loading_trending_courses ? (
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
                                {trending_courses.length > 0 || trending_courses != null ? trending_courses.slice(0, next)?.map((course) => {
                                    return (
                                    <div key={course.id} className="col-md-6 col-xl-3">
                                        <CourseTypeOne data={course} classes="course-box-shadow" />
                                    </div>
                                    );
                                }) : <h4 >No Trending Courses Available</h4>}
                                </div>
                              )}

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
                                    )} */}
                                    
                                </div>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="it-software" role="tabpanel" aria-labelledby="it-software-tab">
                            <div className="course-tab-content">
                            <div className="course-overview">

                            <CourseRangeList />

                              {/* {loading_trending_courses ? (
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
                                {trending_courses.length > 0 || trending_courses != null ? trending_courses.slice(0, next)?.map((course) => {
                                    return (
                                    <div key={course.id} className="col-md-6 col-xl-3">
                                        <CourseTypeOne data={course} classes="course-box-shadow" />
                                    </div>
                                    );
                                }) : <h4 >No Trending Courses Available</h4>}
                                </div>
                              )}

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
                                    )} */}
                                    
                                </div>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="personal-development" role="tabpanel" aria-labelledby="personal-development-tab">
                            <div className="course-tab-content">
                            <div className="course-overview">

                            <CourseRangeList />
                                  
                              {/* {loading_trending_courses ? (
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
                                {trending_courses.length > 0 || trending_courses != null ? trending_courses.slice(0, next)?.map((course) => {
                                    return (
                                    <div key={course.id} className="col-md-6 col-xl-3">
                                        <CourseTypeOne data={course} classes="course-box-shadow" />
                                    </div>
                                    );
                                }) : <h4 >No Trending Courses Available</h4>}
                                </div>
                              )}

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
                                    )} */}
                                    
                                </div>
                            </div>
                        </div>

                    </div>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default CourseRange;
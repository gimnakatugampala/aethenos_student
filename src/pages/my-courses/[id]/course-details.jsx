import React, { useState } from "react";
import Link from "next/link";
import { Player } from 'video-react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Card from 'react-bootstrap/Card';
// import Accordion from 'react-bootstrap/Accordion';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Typography from '@mui/material/Typography';
import { Rating } from 'react-simple-star-rating'
import CardContainer from "../../../contexts/CardContainer";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SearchIcon from '@mui/icons-material/Search';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MessageIcon from '@mui/icons-material/Message';
import Modal from 'react-bootstrap/Modal';
import PersonIcon from '@mui/icons-material/Person';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { course_data } from '../../../data';
import SingleProgressbar from "./single-progressbar";
import SingleComment from "./single-comment";
import CommentFormCourse from '../../../components/forms/comment-form-course';
import Accordian from '../../../components/course-content/accordian'
import { useEffect } from "react";
import { GetMyCoursesDetails } from "../../../api";

// const course = course_data[0];

const CourseDetailsArea1 = ({id, course}) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // What will who Learn
    const chunkArray = (array, chunkSize) => {
      const chunkedArray = [];
      for (let i = 0; i < array.length; i += chunkSize) {
          chunkedArray.push(array.slice(i, i + chunkSize));
      }
      return chunkedArray;
  };

  // Chunk the intended_learners array into groups of 3
  const chunkedLearners = chunkArray(course.intended_learners, 3);
  

  // Ask a new Question
  const [showNewQuestion, setShowNewQuestion] = useState(false);

  const handleCloseNewQuestion = () => setShowNewQuestion(false);
  const handleShowNewQuestion = () => setShowNewQuestion(true);

  const { course_desc, course_desc_2, learn_list, course_desc_3, curriculum_desc, course_lessons, instructor_img, instructor_title, instructor_desc, social_links, reviews, instructor, rating, rating_count } = course || {};

  return (
    <section
    className="container my-5 course-details-3"
      style={{ textAlign: "left", backgroundColor: "transparent" }}>
        
        <div className="row">
            <div className="col-md-8">
            <Player>
                <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
              </Player>

            {/* New Tab */}
                <div className="row">
                <div className="col-md-12">
                <div className="course-details-content">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">

                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview"
                            type="button" role="tab" aria-controls="overview" aria-selected="true">Overview</button>
                        </li>

                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="qa-tab" data-bs-toggle="tab" data-bs-target="#qa"
                            type="button" role="tab" aria-controls="qa" aria-selected="false">Q&A</button>
                        </li>

                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="announcement-tab" data-bs-toggle="tab" data-bs-target="#announcement"
                            type="button" role="tab" aria-controls="announcement" aria-selected="false">Announcement</button>
                        </li>

                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews"
                            type="button" role="tab" aria-controls="reviews" aria-selected="false">Reviews</button>
                        </li>

                    
                    </ul>
                    
                </div>
                </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                      <div className="tab-content" id="myTabContent">

                    {/* Overview */}
                      <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                            <div className="course-tab-content">
                                <div className="course-overview">

                                <div className="mt-5">
                                  <Typography variant="h4" gutterBottom>
                                   {course.title}
                                  </Typography>

                                  <div className="row mt-5">

                                      <div className="col-md-2">
                                        <div className="d-flex align-items-center">
                                          <h6 className="m-0 p-0">{Number.parseFloat(course.rating).toFixed(1)}</h6>
                                          <Rating  size={20} iconsCount={course.rating} initialValue={1} />
                                        </div>
                                          <span>{course.rating_count} ratings</span>
                                      </div>

                                      <div className="col-md-2">
                                        <div className="d-flex align-items-center">
                                          <h6 className="m-0 p-0">{course.enrolled_count}</h6>
                                        </div>
                                          <span>{course.enrolled_count == 1 ? "Student" : "Students"}</span>
                                      </div>

                                      <div className="col-md-2">
                                        <div className="d-flex align-items-center">
                                          <h6 className="m-0 p-0">{course.no_of_videos}</h6>
                                        </div>
                                          <span>No of Videos</span>
                                      </div>


                                  </div>


                                
                                  <div className="course-tab-content mt-5">
                                      <div className="course-overview">
                                          <h5 className="title m-0 p-0">What You’ll Learn?</h5>
                                          <div className="row">
                                          {chunkedLearners.map((chunk, index) => (
                                          <ul key={index} className="col-md-6">
                                              {chunk.map((learner, idx) => (
                                                learner.intended_learner_type == " students learn" &&
                                                  <li key={idx}>{learner.intended_learner}</li>
                                              ))}
                                          </ul>
                                      ))}
                                          </div>
                                      </div>
                                  </div>

                                  <h3 className="heading-title">Course Description</h3>
                                  <p>{course.course_main_desc}</p>


                                  <h3 className="heading-title">Instructor</h3>
                                  <a href={`/users/${course.instructor_code}`}>{course.instructor}</a>
                                  <p>{course.instructor_title}</p>

                                  <p>{course.instructor_desc}</p>


                                  <h3 className="heading-title">Featured Review</h3>

                                <div className="my-4">
                                <CardContainer className="p-2">
                                    <h6 className="m-0 p-0">John Doe</h6>
                                    <p className="m-0 p-0">101 courses</p>
                                    <p className="m-0 p-0 mb-2">7 reviews</p>
                                    <Rating  size={20} iconsCount={5} initialValue={5} /> <span className="mt-2">3 years</span>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, necessitatibus. Corporis, autem! Quaerat, excepturi? Quasi obcaecati quis culpa ad veniam delectus. Voluptate quam minima quos dolor ipsa reprehenderit atque assumenda nihil iure sint. Blanditiis rem modi reiciendis itaque hic perspiciatis.</p>
                                  </CardContainer>
                                  <CardContainer className="p-2">
                                    <h6 className="m-0 p-0">John Doe</h6>
                                    <p className="m-0 p-0">101 courses</p>
                                    <p className="m-0 p-0 mb-2">7 reviews</p>
                                    <Rating  size={20} iconsCount={5} initialValue={5} /> <span className="mt-2">3 years</span>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, necessitatibus. Corporis, autem! Quaerat, excepturi? Quasi obcaecati quis culpa ad veniam delectus. Voluptate quam minima quos dolor ipsa reprehenderit atque assumenda nihil iure sint. Blanditiis rem modi reiciendis itaque hic perspiciatis.</p>
                                  </CardContainer>

                                  <a className="m-0 p-2" href="#">3,566 Reviews <KeyboardArrowDownIcon /></a>

                                </div>
                        
                                  
                                  
                                  <h3 className="heading-title">Requirements</h3>
                                  <div className="row">
                                          <ul className="col-md-12">
                                            {course.intended_learners.map((req,index) => (
                                              req.intended_learner_type == "requirements" &&
                                              <li key={index}>{req.intended_learner}</li>
                                            ))}
                                          </ul>

                                          </div>
                                

                                </div>
                                          
                                    
                                </div>
                            </div>
                        </div>

                        {/* Q&A */}
                        <div className="tab-pane fade" id="qa" role="tabpanel" aria-labelledby="qa-tab">
                            <div className="course-tab-content">
                            <div className="course-overview">

                        <div className="row mt-5">
                          <div className="col-md-12">
                          <InputGroup className="mb-3">
                              <Form.Control
                                placeholder="Search all courses questions"
                                aria-label="Search all courses questions"
                                aria-describedby="basic-addon2"
                              />
                              <InputGroup.Text id="basic-addon2"><SearchIcon /></InputGroup.Text>
                            </InputGroup>

                            <div className="row">

                              <div className="col-md-4">
                                 <Form.Label><b>Filters:</b></Form.Label>
                                <Form.Select aria-label="Default select example">
                                <option>All lectures</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                              </Form.Select>
                              </div>

                              <div className="col-md-4">
                              <Form.Label><b>Sort by:</b></Form.Label>
                                <Form.Select aria-label="Default select example">
                                <option>Sort by recommended</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                              </Form.Select>
                              </div>

                                <div className="col-md-4">
                              <Form.Label><b>Type:</b></Form.Label>

                                <Form.Select aria-label="Default select example">
                                <option>Filter Questions</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                              </Form.Select>
                                </div>

                            </div>
                         

                          </div>

                          
                             </div>

                          <div className="row my-3">
                            <div className="col-md-12">
                                <span className="d-flex"><h5 className="m-0 p-0">All questions in this courses</h5><span>(653)</span></span>
                            </div>
                          </div>

                          <div className="row my-1">
                          <div className="col-md-12">
                          <CardContainer>
                          <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                  primary="Brunch this weekend?"
                                  secondary={
                                    <React.Fragment>
                                      {" I'll be in your neighborhood doing errands this…"}
                                    </React.Fragment>
                                  }
                                />

                                  <Button onClick={handleShow} variant="contained" size="medium"><MessageIcon /></Button>

                              </ListItem>
                              
                      
                                <span className="mx-5 mt-2 d-flex">
                                <Typography variant="body2">Sam Cane •</Typography>
                                  
                                  <Typography className="mx-1" variant="body2">Lecture 229</Typography>
                                  <Typography className="mx-1" variant="body2">1 Year ago</Typography>
                                </span>
                              

                        

                          </CardContainer>
                          </div>
                          </div>

                          <Button onClick={handleShowNewQuestion} className="my-3" variant="contained">Ask a new question</Button>


                                </div>
                            </div>
                        </div>

                         {/* Annoucements */}
                         <div className="tab-pane fade" id="announcement" role="tabpanel" aria-labelledby="announcement-tab">
                            <div className="course-tab-content">
                            <div className="course-overview">

                                <CardContainer className="mt-5">
                                <ListItem>
                                  <ListItemAvatar>
                                    <Avatar>
                                      <PersonIcon />
                                    </Avatar>
                                  </ListItemAvatar>
                                  <ListItemText primary="Gimna Katugampala" secondary="Post an annoucement • 28 days ago" />
                                </ListItem>
                                <div className="m-3">
                                <h4 className="heading-title">[Great News]</h4>
                                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium aperiam excepturi, eaque adipisci itaque enim doloribus ratione voluptas asperiores error harum nemo quo nesciunt necessitatibus, repellat dolorem natus, iusto repudiandae!</p>
                                </div>
                                </CardContainer>
                                </div>
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                            <div className="course-tab-content">
                            <div className="course-overview">

                            <div className="course-review mt-5">
                          <h3 className="heading-title">Course Rating</h3>
                          <p>{rating} average rating based on {rating_count} rating</p>
                          <div className="row g-0 align-items-center">
                              <div className="col-sm-4">
                                  <div className="rating-box">
                                      <div className="rating-number">{rating}</div>
                                      <div className="rating">
                                          <i className="icon-23"></i>
                                          <i className="icon-23"></i>
                                          <i className="icon-23"></i>
                                          <i className="icon-23"></i>
                                          <i className="icon-23"></i>
                                      </div>
                                      <span>({rating_count} Review)</span>
                                  </div>
                              </div>
                              <div className="col-sm-8">
                                  <div className="review-wrapper">
                                      <SingleProgressbar value={'100'} rating_value={rating_count} />
                                      <SingleProgressbar value={'0'} rating_value={'0'} />
                                      <SingleProgressbar value={'0'} rating_value={'0'} />
                                      <SingleProgressbar value={'0'} rating_value={'0'} />
                                      <SingleProgressbar value={'0'} rating_value={'0'} />
                                  </div>
                              </div>
                          </div>

                          {/* <div className="comment-area">
                              <h3 className="heading-title">Reviews</h3>
                              <div className="comment-list-wrapper">
                                  {reviews?.map((review, i) => (
                                      <SingleComment img={course.instructor_img} key={i} review={review} />
                                  ))}
                              </div>
                          </div> */}

                          <div className="comment-form-area login-form-box">
                              <h3 className="heading-title">Write a Review</h3>
                              <CommentFormCourse id={id} />
                          </div>
                      </div>
                                   
                                </div>
                            </div>
                        </div>


                            </div>
                      </div>
                  </div>



            </div>



            <div className="col-md-4">
              <Card style={{backgroundColor:'transparent'}}>
                  <Card.Header><h6 className="m-2">Course Content</h6></Card.Header>
                  <Card.Body>
                  <div className="faq-accordion">
                      <div className="accordion">

                    <Accordian />
                    <Accordian />

                    </div>
                    </div>


                    
                  {/* <Accordion defaultActiveKey="0">

                      <Accordion.Item eventKey="0">
                        <Accordion.Header >
                          <span style={{fontSize:'14px'}}>
                           <b> Section 1 : Introduction to Figma </b><br />
                           <div className="d-flex ">
                            <span style={{fontSize:'11px'}} className="py-1">0/9 | 5min</span>
                           </div>
                          </span>
                          
                          </Accordion.Header>

                        <Accordion.Body>
                        <ul className="list-group">

                            <li className="list-group-item py-2 my-2">
                              <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                              <label style={{fontSize:'13px'}} className="form-check-label" for="firstCheckbox">1. What Spacing Should I Use for Web & app qa In Figma</label>
                              <div style={{fontSize:'11px'}}  className="px-5 my-2"><OndemandVideoIcon className="mx-2" /> 5min</div>
                            </li>

                            <li className="list-group-item py-2 my-2">
                              <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                              <label style={{fontSize:'13px'}} className="form-check-label" for="firstCheckbox">2. Class Project 1 - Responsive Lower Navigation</label>
                              <div style={{fontSize:'11px'}}  className="px-5 my-2"><OndemandVideoIcon className="mx-2" /> 15min</div>
                            </li>


                            <li className="list-group-item py-2 my-2">
                              <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                              <label style={{fontSize:'13px'}} className="form-check-label" for="firstCheckbox">3. Assesment 1 - Responsive Lower Navigation</label>
                              <div style={{fontSize:'11px'}}  className="px-5 my-2"><OndemandVideoIcon className="mx-2" /> 15min</div>
                            </li>


                          </ul>
                        </Accordion.Body>
                      </Accordion.Item>


                      <Accordion.Item eventKey="1">
                        <Accordion.Header >
                          <span style={{fontSize:'14px'}}>
                           <b style={{marginBottom:'15px'}}> Section 2 : Simple App Brand </b><br />
                            <span style={{fontSize:'11px',marginTop:'50px'}} className="my-2 py-3">0/9 | 5min</span>
                          </span>
                          
                          </Accordion.Header>

                        <Accordion.Body>
                        <ul className="list-group">

                            <li className="list-group-item py-2 my-2">
                              <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                              <label style={{fontSize:'13px'}} className="form-check-label" for="firstCheckbox">1. What Spacing Should I Use for Web & app design In Figma</label>
                              <div style={{fontSize:'11px'}}  className="px-5 my-2"><OndemandVideoIcon className="mx-2" /> 5min</div>
                            </li>

                            <li className="list-group-item py-2 my-2">
                              <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                              <label style={{fontSize:'13px'}} className="form-check-label" for="firstCheckbox">2. Class Project 1 - Responsive Lower Navigation</label>
                              <div style={{fontSize:'11px'}}  className="px-5 my-2"><OndemandVideoIcon className="mx-2" /> 15min</div>
                            </li>


                            <li className="list-group-item py-2 my-2">
                              <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                              <label style={{fontSize:'13px'}} className="form-check-label" for="firstCheckbox">3. Assesment 1 - Responsive Lower Navigation</label>
                              <div style={{fontSize:'11px'}}  className="px-5 my-2"><OndemandVideoIcon className="mx-2" /> 15min</div>
                            </li>


                          </ul>
                        </Accordion.Body>
                      </Accordion.Item>

                       <Accordion.Item eventKey="2">
                        <Accordion.Header >
                          <span style={{fontSize:'14px'}}>
                           <b style={{marginBottom:'15px'}}> Section 3 : Grid </b><br />
                            <span style={{fontSize:'11px',marginTop:'50px'}} className="my-2 py-3">0/9 | 5min</span>
                          </span>
                          
                          </Accordion.Header>

                        <Accordion.Body>
                        <ul className="list-group">

                            <li className="list-group-item py-2 my-2">
                              <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                              <label style={{fontSize:'13px'}} className="form-check-label" for="firstCheckbox">1. What Spacing Should I Use for Web & app design In Figma</label>
                              <div style={{fontSize:'11px'}}  className="px-5 my-2"><OndemandVideoIcon className="mx-2" /> 5min</div>
                            </li>

                            <li className="list-group-item py-2 my-2">
                              <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                              <label style={{fontSize:'13px'}} className="form-check-label" for="firstCheckbox">2. Class Project 1 - Responsive Lower Navigation</label>
                              <div style={{fontSize:'11px'}}  className="px-5 my-2"><OndemandVideoIcon className="mx-2" /> 15min</div>
                            </li>


                            <li className="list-group-item py-2 my-2">
                              <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                              <label style={{fontSize:'13px'}} className="form-check-label" for="firstCheckbox">3. Assesment 1 - Responsive Lower Navigation</label>
                              <div style={{fontSize:'11px'}}  className="px-5 my-2"><OndemandVideoIcon className="mx-2" /> 15min</div>
                            </li>


                          </ul>
                        </Accordion.Body>
                      </Accordion.Item>


                      <Accordion.Item eventKey="3">
                        <Accordion.Header >
                          <span style={{fontSize:'14px'}}>
                           <b style={{marginBottom:'15px'}}> Section 4 : Animation Level 1 </b><br />
                            <span style={{fontSize:'11px',marginTop:'50px'}} className="my-2 py-3">0/9 | 5min</span>
                          </span>
                          
                          </Accordion.Header>

                        <Accordion.Body>
                        <ul className="list-group">

                            <li className="list-group-item py-2 my-2">
                              <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                              <label style={{fontSize:'13px'}} className="form-check-label" for="firstCheckbox">1. What Spacing Should I Use for Web & app design In Figma</label>
                              <div style={{fontSize:'11px'}}  className="px-5 my-2"><OndemandVideoIcon className="mx-2" /> 5min</div>
                            </li>

                            <li className="list-group-item py-2 my-2">
                              <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                              <label style={{fontSize:'13px'}} className="form-check-label" for="firstCheckbox">2. Class Project 1 - Responsive Lower Navigation</label>
                              <div style={{fontSize:'11px'}}  className="px-5 my-2"><OndemandVideoIcon className="mx-2" /> 15min</div>
                            </li>


                            <li className="list-group-item py-2 my-2">
                              <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                              <label style={{fontSize:'13px'}} className="form-check-label" for="firstCheckbox">3. Assesment 1 - Responsive Lower Navigation</label>
                              <div style={{fontSize:'11px'}}  className="px-5 my-2"><OndemandVideoIcon className="mx-2" /> 15min</div>
                            </li>


                          </ul>
                        </Accordion.Body>
                      </Accordion.Item>

             

                    </Accordion> */}

                  </Card.Body>
                </Card>

            </div>
        </div>

        
        {/* Ask a Question Inside QA */}
      <Modal show={show} onHide={handleClose}>
        <CardContainer className="p-0 m-0">
        <Modal.Header closeButton>
          <Modal.Title>Answers</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <div className="row my-1">
            <div className="col-md-12">
            <CardContainer>
            <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Brunch this weekend?"
                    secondary={
                      <React.Fragment>
                        {" I'll be in your neighborhood doing errands this…"}
                      </React.Fragment>
                    }
                  />

                </ListItem>
                
        
                  <span className="mx-5 mt-2 d-flex">
                  <Typography variant="body2">Sam Cane •</Typography>
                    
                    <Typography className="mx-1" variant="body2">Lecture 229</Typography>
                    <Typography className="mx-1" variant="body2">1 Year ago</Typography>
                  </span>
              
            </CardContainer>
            </div>
          </div>

        </Modal.Body>

        </CardContainer>
      </Modal>


      {/* Ask a New Question */}
      <Modal show={showNewQuestion} onHide={handleCloseNewQuestion}>
      <CardContainer className="p-0 m-0">
        <Modal.Header closeButton>
          <Modal.Title>New Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Question</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>

      <Button className="my-2" variant="contained">Save</Button>
        </Modal.Body>
        </CardContainer>
      </Modal>

    </section>
  );
};

export default CourseDetailsArea1;

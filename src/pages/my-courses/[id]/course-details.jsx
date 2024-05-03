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
import { AddQuestion, GetAllAnnoucement, GetAllQuestion, GetMyCoursesDetails, GetReviews } from "../../../api";
import moment from "moment";
import ErrorAlert from "../../../functions/Alert/ErrorAlert";
import Commentbox from "../../../components/comment-box/Commentbox";
import QuizContainer from "../components/quiz/QuizContainer";
import parse from 'html-react-parser';
import AssignmentContainer from "../components/assignment/AssignmentContainer";
import PraticeTestContainer from "../components/pratice-test/PraticeTestContainer";
import CodingExerciseContainer from "../components/coding-exercise/CodingExerciseContainer";

// const course = course_data[0];

const CourseDetailsArea1 = ({id, course , setcourse}) => {

  const [featured_reviews, setfeatured_reviews] = useState(null)

  const [main_Video_player_url, setmain_Video_player_url] = useState('https://aethenosinstructor.exon.lk:2053/aethenos-assert/1706080568678_6da9594b-6a36-4773-85ad-a2d7ceda2727.mp4')
  const [showVideoPlayer, setshowVideoPlayer] = useState(true)
  const [article, setarticle] = useState("")
  const [showquiz, setshowquiz] = useState(false)

  const [answer, setanswer] = useState(null)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (code,answer) => {
    setShow(true)
    setanswer(answer)
  };

  // ========= QUIZ ====================
  const [Startquiz, setStartquiz] = useState(false)
  const [selectedQuiz, setselectedQuiz] = useState(null)


  // ============= ASSIGNMENT =======================
  const [showAssignment, setshowAssignment] = useState(false)
  const [selectedAssignment, setselectedAssignment] = useState(null)


  // ============= PRACTICE TEST =========================
  const [showPracticeTest, setshowPracticeTest] = useState(false)
  const [selectedPracticeTest, setselectedPracticeTest] = useState(null)

  // ============ CODING EXERCISE =====================
  const [showCodingExercise, setshowCodingExercise] = useState(false)
  const [selectedCodingExercise, setselectedCodingExercise] = useState(null)

  const [courseCode, setcourseCode] = useState(course && course.course_code)
  const [itemCode, setitemCode] = useState(course && course.item_code)




  // ======= QUESTIONS
  const [questions, setquestions] = useState([])


  //  ----------------------- Annoucements -------------------------------
  const [annoucements, setannoucements] = useState([])

  //  ----------------------- Annoucements -------------------------------


  // --------------------------- What will who Learn -----------------------
    const chunkArray = (array, chunkSize) => {
      const chunkedArray = [];
      for (let i = 0; i < array.length; i += chunkSize) {
          chunkedArray.push(array.slice(i, i + chunkSize));
      }
      return chunkedArray;
  };


  
  useEffect(() => {
    GetAllAnnoucement(courseCode,setannoucements)
    GetAllQuestion(itemCode,setquestions)
  }, [itemCode])
  


  // get the Reviews
  useEffect(() => {
    GetReviews(id,setfeatured_reviews)
  }, [featured_reviews])
  
  

  // Ask a new Question
  const [showNewQuestion, setShowNewQuestion] = useState(false);

  const handleCloseNewQuestion = () => setShowNewQuestion(false);
  const handleShowNewQuestion = () => setShowNewQuestion(true);

  const { course_desc, course_desc_2, learn_list, course_desc_3, curriculum_desc, course_lessons, instructor_img, instructor_title, instructor_desc, social_links, reviews, instructor, rating, rating_count } = course || {};


  // ---------------- Ask Question -------------
  const [question, setquestion] = useState("")

  const handleSubmitAskQuestion = () =>{
      console.log(question)

      if(question == ""){
        ErrorAlert("Error","Please Enter a Question")
        return
      }

      AddQuestion(itemCode,question,setShowNewQuestion,setquestion)
  }

  return (

    <section
    className="container-fluid my-5 course-details-3"
      style={{ textAlign: "left", backgroundColor: "transparent" }}>
        <div className="row">
            <div className="col-md-8">
        
            {showVideoPlayer ? (
                <Player autoPlay={true}>
                    <source id="videoPlayer" src={main_Video_player_url} />
                </Player>
              ) : article == "" ? (
                <>
                {/* // Show Quiz */}
                {showquiz && (
                  <QuizContainer Startquiz={Startquiz} setStartquiz={setStartquiz} selectedQuiz={selectedQuiz} />
                )}

                {/* // Show Assignment */}
                {showAssignment && (
                  <AssignmentContainer selectedAssignment={selectedAssignment} />
                )}

                {/* Show Practice test */}
                {showPracticeTest && (
                  <PraticeTestContainer selectedPracticeTest={selectedPracticeTest} />
                )}

                {/* Show Coding Exercise */}
                {showCodingExercise && (
                  <CodingExerciseContainer selectedCodingExercise={selectedCodingExercise} />
                )}
                </>
              ) : (
                  <div style={{ maxHeight: '500px', overflowY: 'scroll' }}>
                      {parse(article)}
                  </div>
              )}


            {/* New Tab */}
            <div className="container mx-2">
                <div className="row">
                <div className="col-md-12">
                <div className="course-details-content">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">

                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview"
                            type="button" role="tab" aria-controls="overview" aria-selected="true">Overview</button>
                        </li>

                        {course && course.isPaid == true && (
                           <li className="nav-item" role="presentation">
                           <button className="nav-link" id="qa-tab" data-bs-toggle="tab" data-bs-target="#qa"
                           type="button" role="tab" aria-controls="qa" aria-selected="false">Q&A</button>
                       </li>
                        )}



                        {course && course.isPaid == true && (
                        <li className="nav-item" role="presentation">
                        <button className="nav-link" id="announcement-tab" data-bs-toggle="tab" data-bs-target="#announcement"
                        type="button" role="tab" aria-controls="announcement" aria-selected="false">Announcement</button>
                        </li>
                        )}

                       

                       

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
                                   {course && course.title}
                                  </Typography>

                                  <div className="row mt-5">

                                      <div className="col-md-3">
                                        <div className="d-flex align-items-center">
                                         {course && <h6 className="m-0 p-0">{Number.parseFloat(course.rating).toFixed(1)}</h6>} 
                                          {course && <Rating  size={20} readonly={true} iconsCount={5} initialValue={Number.parseInt(course.rating)} />}
                                        </div>
                                          <span>{course != null && course && course.rating_count} ratings</span>
                                      </div>

                                      <div className="col-md-2">
                                        <div className="d-flex align-items-center">
                                          <h6 className="m-0 p-0">{course && course.enrolled_count}</h6>
                                        </div>
                                          <span>{course && course.enrolled_count == 1 ? "Student" : "Students"}</span>
                                      </div>

                                      <div className="col-md-2">
                                        <div className="d-flex align-items-center">
                                          <h6 className="m-0 p-0">{course && course.no_of_videos}</h6>
                                        </div>
                                          <span>No of Videos</span>
                                      </div>


                                  </div>


                                
                                  <div className="course-tab-content mt-5">
                                      <div className="course-overview">
                                          <h5 className="title m-0 p-0">What You’ll Learn?</h5>
                                          <div className="row">
                                          {course && chunkArray(course.intended_learners, 3) != null && chunkArray(course.intended_learners, course.intended_learners.length).map((chunk, index) => (
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

                                  <h3 className="heading-title m-0">Course Description</h3>
                                  <p>{course && course.course_main_desc}</p>


                                  <h3 className="heading-title">Instructor</h3>
                                  <div className="d-flex align-items-center">
                                    {course && <Avatar alt={`${course.instructor}`} src="/static/images/avatar/1.jpg" /> }
                                    <a className="m-1" href={`/users/${course && course.instructor_code}`}>{course && course.instructor}</a>
                                  </div>
                                  
                                  <p>{course && course.instructor_title}</p>

                                  <p>{course && course.instructor_desc}</p>


                                  <h3 className="heading-title p-0 m-0">Requirements</h3>
                                  <div className="row">
                                          <ul className="col-md-12">
                                            {course != null && course.intended_learners.map((req,index) => (
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
                        {course && course.isPaid == true && (
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

                            {/* <div className="row">

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

                            </div> */}
                         

                          </div>

                          
                             </div>

                          <div className="row my-3">
                            <div className="col-md-12">
                                <span className="d-flex"><h5 className="m-0 p-0">All questions in this courses</h5><span>({questions.length > 0 ? questions.length : questions.length})</span></span>
                            </div>
                          </div>

                          <div className="row my-1">
                            {questions.length > 0 && questions.map((question,index) => (

                          <div key={index} className="col-md-12">
                          <CardContainer>
                          <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                  <Avatar alt={question.userName} src={question.profileImg == null ? "/static/images/avatar/1.jpg" : question.profileImg} />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={question.userName}
                                  secondary={
                                    <React.Fragment>
                                      {question.question}
                                    </React.Fragment>
                                  }
                                />

                                  <Button onClick={() => handleShow(question.questionCode,question.answer)} variant="contained" size="medium"><MessageIcon /></Button>

                              </ListItem>
                              
                            <span className="mx-5 mt-2 d-flex">
                              <Typography className="mx-1" variant="body2">{question.date}</Typography>
                            </span>
                          </CardContainer>
                          </div>
                            ))}
                          </div>

                          <Button onClick={handleShowNewQuestion} className="my-3" variant="contained">Ask a new question</Button>


                                </div>
                            </div>
                        </div>
                        )}

                         {/* Annoucements */}
                         {course && course.isPaid == true && (
                         <div className="tab-pane fade" id="announcement" role="tabpanel" aria-labelledby="announcement-tab">
                            <div className="course-tab-content">
                            <div className="course-overview">

                            {annoucements.length > 0 && (

                            annoucements.map((announcement,index) => (

                                <CardContainer key={index} className="mt-5">
                                <ListItem>
                                  <ListItemAvatar>
                                    <Avatar>
                                      <PersonIcon />
                                    </Avatar>
                                  </ListItemAvatar>
                                  <ListItemText primary={course.instructor} secondary={`Post an annoucement • ${moment(announcement.createdDate).startOf('hour').fromNow()}`} />
                                </ListItem>
                                <div className="m-3">
                                <h4 className="heading-title">{announcement.tittle}</h4>
                                  <p>{announcement.content}</p>
                                </div>
                                </CardContainer>
                                ))
                            )}

                                </div>
                            </div>
                        </div>
                         )}

                        {/* Reviews */}
                        <div className="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                            <div className="course-tab-content">
                            <div className="course-overview">

                            <div className="course-review mt-5">
                          <h3 className="heading-title mb-4">Student Feedback</h3>
                          {/* <p>{course && (course.rating).toFixed(1)} average rating based on {course && course.rating_count} rating</p> */}
                          <div className="row align-items-center">
                              <div className="col-sm-3">
                                  <div className="rating-box">
                                      <div className="rating-number">{course && (course.rating).toFixed(1)}</div>
                                      {course && <Rating  size={20} readonly={true} iconsCount={5} initialValue={Number.parseInt(course.rating)} />}
                                      <span>({course != null && course && Number.parseInt(course.rating_count)} {course !=null && Number.parseInt(course.rating_count) == 1 ? "Review" : "Reviews"})</span>
                                  </div>
                              </div>
                              <div className="col-md-9">
                                  <div className="review-wrapper ">
                                    {course != null && (
                                      <>
                                       <SingleProgressbar value={course.ratingDetails.fiveRatingCount} rating_value={'5'} />
                                      <SingleProgressbar value={course.ratingDetails.fourRatingCount} rating_value={'4'} />
                                      <SingleProgressbar value={course.ratingDetails.threeRatingCount} rating_value={'3'} />
                                      <SingleProgressbar value={course.ratingDetails.twoRatingCount} rating_value={'2'} />
                                      <SingleProgressbar value={course.ratingDetails.oneRatingCount} rating_value={'1'} /> 
                                      </>
                                    )}
                                     
                                  </div>
                              </div>
                          </div>

                        
                          <div className="mb-1">
                            <h3>Reviews</h3>
                                  {featured_reviews != null && (
                                    featured_reviews.length > 0 ? (
                                    featured_reviews.map((reviews,index) => (

                                    <CardContainer key={index} className="p-1">
                                      <div className="d-flex align-items-center">
                                        <Avatar alt={`${reviews.fullName}`} src="/static/images/avatar/1.jpg" /> 
                                        <h6 className="m-2 p-0">{reviews.fullName}</h6>
                                      </div>
                                      <Rating  size={20} readonly={true} iconsCount={5} initialValue={Number.parseInt(reviews.rating)} />
                                      <span style={{fontSize:'12px'}} className="mt-2">{moment(reviews.date).startOf('day').fromNow()}</span>
                                      <p style={{color:'#000'}} >{reviews.comment}</p>
                                    </CardContainer>
                                    ))

                                  ) : "No Reviews Found"
                               
                                  )}

                                </div>
                        </div>
                                   
                                </div>
                            </div>
                        </div>
                            </div>
                      </div>
                  </div>
              </div>


            </div>


        {/* Course Content */}
            <div className="col-md-4">
              <Card style={{backgroundColor:'transparent'}}>
                  <Card.Header><h6 className="m-2">Course Content</h6></Card.Header>
                  <Card.Body>
                  <div className="faq-accordion">
                      <div className="accordion">

                        {course !=null && course.course_content.map((content,index) => (
                           <Accordian 
                           setshowquiz={setshowquiz} 
                           setarticle={setarticle} 
                           setshowVideoPlayer={setshowVideoPlayer} 
                           itemCode={itemCode} 
                           setmain_Video_player_url={setmain_Video_player_url}
                           id={index + 1}
                           content={content}
                           setselectedQuiz={setselectedQuiz} 
                           setshowAssignment={setshowAssignment} 
                           setselectedAssignment={setselectedAssignment}
                          setshowPracticeTest={setshowPracticeTest}
                          setselectedPracticeTest={setselectedPracticeTest}
                          setshowCodingExercise={setshowCodingExercise}
                          setselectedCodingExercise={setselectedCodingExercise}
                          key={index} 
                          courseItemCode={id}
                          setcourse={setcourse}
                          />
                        ))}

                    </div>
                    </div>

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
              {answer == null ? "Instructor Not Answered Yet" : (

            <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={course.instructor} src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={course.instructor}
                    secondary={
                      <React.Fragment>
                        {answer}
                      </React.Fragment>
                    }
                  />

                </ListItem>
              )}
                
            </div>
          </div>

        </Modal.Body>

        </CardContainer>
      </Modal>


      {/* Ask a New Question */}
      <Modal show={showNewQuestion} onHide={handleCloseNewQuestion}>
      {/* <CardContainer className="p-0 m-0"> */}
        <Modal.Header closeButton>
          <Modal.Title>New Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Question</Form.Label>
        <Form.Control onChange={(e) => setquestion(e.target.value)} as="textarea" rows={3} />
      </Form.Group>

      <Button onClick={handleSubmitAskQuestion} className="my-2" variant="contained">Save</Button>
        </Modal.Body>
        {/* </CardContainer> */}
      </Modal>


      

    </section>
  );
};

export default CourseDetailsArea1;

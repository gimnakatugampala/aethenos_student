import React, { useRef, useState } from "react";
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
import { AddQuestion, GetAllAnnoucement, GetAllQuestion, GetLastMarkedCurriculum, GetMyCoursesDetails, GetReviews, IMG_HOST, StoreLastMarkedCurriculum, UpdateCourseCurriculumProgress } from "../../../api";
import moment from "moment";
import ErrorAlert from "../../../functions/Alert/ErrorAlert";
import Commentbox from "../../../components/comment-box/Commentbox";
import QuizContainer from "../components/quiz/QuizContainer";
import parse from 'html-react-parser';
import AssignmentContainer from "../components/assignment/AssignmentContainer";
import PraticeTestContainer from "../components/pratice-test/PraticeTestContainer";
import CodingExerciseContainer from "../components/coding-exercise/CodingExerciseContainer";


import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/audio.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import { MediaPlayer, MediaProvider, Gesture ,useVideoQualityOptions , Menu  , SeekButton , Captions   } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';


const CourseDetailsArea1 = ({id, course , setcourse}) => {

  const [featured_reviews, setfeatured_reviews] = useState(null)

  const [main_Video_player_url, setmain_Video_player_url] = useState('')
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
  const [answerAlertDisplay, setanswerAlertDisplay] = useState(null)
  const [selectAnswer, setselectAnswer] = useState(0)
  


  // ============= ASSIGNMENT =======================
  const [showAssignment, setshowAssignment] = useState(false)
  const [selectedAssignment, setselectedAssignment] = useState(null)
  const [activeAssignmentStep, setAssignmentActiveStep] = React.useState(0);


  // ============= PRACTICE TEST =========================
  const [showPracticeTest, setshowPracticeTest] = useState(false)
  const [selectedPracticeTest, setselectedPracticeTest] = useState(null)
  const [PraticeTestactiveStep, setPraticeTestActiveStep] = React.useState(0);

  // ============ CODING EXERCISE =====================
  const [showCodingExercise, setshowCodingExercise] = useState(false)
  const [selectedCodingExercise, setselectedCodingExercise] = useState(null)
  const [activeStepCodingExercise, setCodingExerciseActiveStep] = React.useState(0);

  const [courseCode, setcourseCode] = useState(course && course.course_code)
  const [itemCode, setitemCode] = useState(course && course.item_code)

  // ========== COMMON ========================
  const [seletedCurriculumItem, setseletedCurriculumItem] = useState(null)
  const [selectedCurriculumItemDataLastPosition, setselectedCurriculumItemDataLastPosition] = useState(null)
  const [loadCurriculum, setloadCurriculum] = useState(false)
  const [isDataFetched, setIsDataFetched] = useState(false);  // New state to track data fetch status

  const [LoadVideo, setLoadVideo] = useState(false)
  const [TitleVideo, setTitleVideo] = useState("")


  // ======= QUESTIONS
  const [questions, setquestions] = useState([])


  //  ----------------------- Annoucements -------------------------------
  const [annoucements, setannoucements] = useState([])

  //  ----------------------- Annoucements -------------------------------


  // --------------------------- What will who Learn -----------------------
    const chunkArray = (array, chunkSize) => {
      const chunkedArray = [];
      if(array != null ){
        for (let i = 0; i < array.length; i += chunkSize) {
            chunkedArray.push(array.slice(i, i + chunkSize));
        }
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


  

  
  

  useEffect(() => {
    const fetchData = async () => {
      await GetLastMarkedCurriculum(id, setseletedCurriculumItem, setselectedCurriculumItemDataLastPosition);
      setIsDataFetched(true);  // Set data fetched flag to true
    };

    fetchData();
  }, []); 

  useEffect(() => {
    if (!isDataFetched) return;

    const selectedSectionId = selectedCurriculumItemDataLastPosition?.sectionId;
    const selectedCurriculumItemId = selectedCurriculumItemDataLastPosition?.previousSectionCurriculumItemId;

    // console.log("Section ID" + selectedSectionId);
    // console.log("curriculum " + selectedCurriculumItemId);

    let curriculumItem = null;
    if (selectedSectionId && selectedCurriculumItemId) {
      curriculumItem = course?.course_content
        .find((s) => s.section_id == selectedSectionId)
        ?.section_curriculum_item
        .find((c) => c.curriculumItemId == selectedCurriculumItemId);
    }

    if (!curriculumItem) {
      curriculumItem = course?.course_content?.[0]?.section_curriculum_item?.[0];
    }

    console.log(curriculumItem);

    if (curriculumItem) {
      switch (curriculumItem.curriculum_item_type) {
        case "Quiz":
          console.log("Quiz");

          setselectedQuiz(null);
          setStartquiz(false);
          setanswerAlertDisplay(null);
          setselectAnswer(0);
          setarticle("");
          setshowVideoPlayer(false);
          setshowAssignment(false);
          setshowquiz(true);
          setshowPracticeTest(false);
          setshowCodingExercise(false);
          setseletedCurriculumItem(curriculumItem.curriculumItemId);

          setselectedQuiz(curriculumItem);

          //  --------------------- CALCULATE THE MARK --------------------
          UpdateCourseCurriculumProgress(itemCode, curriculumItem.curriculumItemId, setcourse);
          //  --------------------- CALCULATE THE MARK --------------------

          // ---------------- STORE AS LAST POSITION -------
          StoreLastMarkedCurriculum(itemCode, curriculumItem.curriculumItemId);
          // ---------------- STORE AS LAST POSITION -------

          console.log(curriculumItem);
          break;

        case "Practice Test":
          console.log("Practice Test");

          setPraticeTestActiveStep(0);
          setselectedPracticeTest(null);
          setarticle("");
          setshowVideoPlayer(false);
          setshowAssignment(false);
          setshowquiz(false);
          setshowPracticeTest(true);
          setshowCodingExercise(false);
          setseletedCurriculumItem(curriculumItem.curriculumItemId);

          setselectedPracticeTest(curriculumItem);

          //  --------------------- CALCULATE THE MARK --------------------
          UpdateCourseCurriculumProgress(itemCode, curriculumItem.curriculumItemId, setcourse);
          //  --------------------- CALCULATE THE MARK --------------------

          // ---------------- STORE AS LAST POSITION -------
          StoreLastMarkedCurriculum(itemCode, curriculumItem.curriculumItemId);
          // ---------------- STORE AS LAST POSITION -------

          console.log(curriculumItem);
          break;

        case "Coding Exercise":
          console.log("Coding Exercise");

          setCodingExerciseActiveStep(0);
          setarticle("");
          setshowVideoPlayer(false);
          setshowAssignment(false);
          setshowquiz(false);
          setshowPracticeTest(false);
          setshowCodingExercise(true);
          setseletedCurriculumItem(curriculumItem.curriculumItemId);

          setselectedCodingExercise(curriculumItem);

          //  --------------------- CALCULATE THE MARK --------------------
          UpdateCourseCurriculumProgress(itemCode, curriculumItem.curriculumItemId, setcourse);
          //  --------------------- CALCULATE THE MARK --------------------

          // ---------------- STORE AS LAST POSITION -------
          StoreLastMarkedCurriculum(itemCode, curriculumItem.curriculumItemId);
          // ---------------- STORE AS LAST POSITION -------

          console.log(curriculumItem);
          break;

        case "Assignment":
          console.log("Assignment");

          setAssignmentActiveStep(0);
          setarticle("");
          setshowVideoPlayer(false);
          setshowAssignment(true);
          setshowquiz(false);
          setshowPracticeTest(false);
          setshowCodingExercise(false);

          setselectedAssignment(curriculumItem);
          setseletedCurriculumItem(curriculumItem.curriculumItemId);

          //  --------------------- CALCULATE THE MARK --------------------
          UpdateCourseCurriculumProgress(itemCode, curriculumItem.curriculumItemId, setcourse);
          //  --------------------- CALCULATE THE MARK --------------------

          // ---------------- STORE AS LAST POSITION -------
          StoreLastMarkedCurriculum(itemCode, curriculumItem.curriculumItemId);
          // ---------------- STORE AS LAST POSITION -------

          console.log(curriculumItem);
          break;

        case "Lecture":
          if (curriculumItem.article == "N/A") {
            console.log("Video");

            setarticle("");
            setshowVideoPlayer(true);
            setshowAssignment(false);
            setshowquiz(false);
            setshowPracticeTest(false);
            setshowCodingExercise(false);
            setTitleVideo(curriculumItem.title);
            setseletedCurriculumItem(curriculumItem.curriculumItemId);

            curriculumItem.get_CurriculumItem_File.forEach((type) => {
              if (type.curriculum_item_file_type == "Video") {
                setmain_Video_player_url(`${IMG_HOST}${type.url}`);

                var videoPlayer = document.querySelector(".video-react-video");
                var videoSource = document.getElementById("videoPlayer");
                if (videoSource) {
                  videoSource.src = `${IMG_HOST}${type.url}`;
                  videoPlayer.load();
                }

                const delay = (2 / 3) * type.videoLength * 1000;
                setTimeout(() => {
                  UpdateCourseCurriculumProgress(itemCode, curriculumItem.curriculumItemId, setcourse);
                }, delay);
              }
            });
          } else {
            console.log("Article");

            setarticle(curriculumItem.article);
            setshowVideoPlayer(false);
            setshowAssignment(false);
            setshowquiz(false);
            setshowPracticeTest(false);
            setshowCodingExercise(false);
            setseletedCurriculumItem(curriculumItem.curriculumItemId);

            //  --------------------- CALCULATE THE MARK --------------------
            UpdateCourseCurriculumProgress(itemCode, curriculumItem.curriculumItemId, setcourse);
            //  --------------------- CALCULATE THE MARK --------------------

            // ---------------- STORE AS LAST POSITION -------
            StoreLastMarkedCurriculum(itemCode, curriculumItem.curriculumItemId);
            // ---------------- STORE AS LAST POSITION -------
          }
          break;

        default:
          console.log("Unknown curriculum item type");
          break;
      }
    } else {
      console.error("Curriculum item not found");
      setloadCurriculum(true);
    }
  }, [isDataFetched, selectedCurriculumItemDataLastPosition]);




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


  // ===============

  const [storedVideoPlayerTimestamp, setstoredVideoPlayerTimestamp] = useState(0)
  const playerRef = useRef(null);


  const handleEnded = () => {

    setstoredVideoPlayerTimestamp(parseInt(playerRef.current?.currentTime))
      const currentTime = parseInt(playerRef.current?.currentTime);
      
      if(currentTime > storedVideoPlayerTimestamp){
        setstoredVideoPlayerTimestamp(currentTime)
      }
      
  };


  return (

    <section
    className="container-fluid my-2 course-details-3"
      style={{ textAlign: "left", backgroundColor: "transparent" }}>
        <div className="row">
            <div className="col-md-8">
        
            {showVideoPlayer ? (
                <MediaPlayer ref={playerRef}   onTimeUpdate={handleEnded} autoPlay={true} title={TitleVideo} src={main_Video_player_url} >
                <MediaProvider  />
                {/* https://files.vidstack.io/sprite-fight/thumbnails.vtt */}
                <DefaultVideoLayout  thumbnails={main_Video_player_url} icons={defaultLayoutIcons} >
                </DefaultVideoLayout>
              </MediaPlayer>

              

              //  ==================
          
              ) : article == "" ? (
                <>
                {/* // Show Quiz */}
                {showquiz && (
                  <div className="container border p-4" style={{ maxHeight: '500px', overflowY: 'scroll' }}>
                    <QuizContainer  
                    setselectAnswer={setselectAnswer} 
                    selectAnswer={selectAnswer} 
                    answerAlertDisplay={answerAlertDisplay} 
                    setanswerAlertDisplay={setanswerAlertDisplay} 
                    Startquiz={Startquiz} 
                    setStartquiz={setStartquiz} 
                    selectedQuiz={selectedQuiz} />
                  </div>
                )}

                {/* // Show Assignment */}
                {showAssignment && (
                  <div className="container border p-4" style={{ maxHeight: '500px', overflowY: 'scroll' }}>
                  <AssignmentContainer activeStep={activeAssignmentStep} setActiveStep={setAssignmentActiveStep} selectedAssignment={selectedAssignment} />
                  </div>
                )}

                {/* Show Practice test */}
                {showPracticeTest && (
                  <div className="container border p-4" style={{ maxHeight: '500px', overflowY: 'scroll' }}>
                  <PraticeTestContainer PraticeTestactiveStep={PraticeTestactiveStep} setPraticeTestActiveStep={setPraticeTestActiveStep} selectedPracticeTest={selectedPracticeTest} />
                  </div>
                )}

                {/* Show Coding Exercise */}
                {showCodingExercise && (
                  <div className="container border p-4" style={{ maxHeight: '500px', overflowY: 'scroll' }}>
                    <CodingExerciseContainer setCodingExerciseActiveStep={setCodingExerciseActiveStep} activeStepCodingExercise={activeStepCodingExercise} selectedCodingExercise={selectedCodingExercise} />
                  </div>
                )}
                </>
              ) : (
                <div className="container border p-4" style={{ maxHeight: '500px', overflowY: 'scroll' }}>
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
                                      {course && course.intended_learners && chunkArray(course.intended_learners, 3).map((chunk, index) => (
                                        <ul key={index} className="col-md-6">
                                          {chunk.map((learner, idx) => (
                                            learner.intended_learner_type === "students learn" && (
                                              <li key={idx}>{learner.intended_learner}</li>
                                            )
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
    {course && course.intended_learners && course.intended_learners.map((req, index) => (
      req.intended_learner_type === "requirements" && (
        <li key={index}>{req.intended_learner}</li>
      )
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
              <Card  style={{backgroundColor:'transparent'}}>
                  <Card.Header><h6 className="m-2">Course Content</h6></Card.Header>
                  <Card.Body style={{ height: '550px', overflowY: 'scroll' }}>
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
                          setseletedCurriculumItem={setseletedCurriculumItem}
                          seletedCurriculumItem={seletedCurriculumItem}
                          setStartquiz={setStartquiz}
                          setanswerAlertDisplay={setanswerAlertDisplay}
                          setselectAnswer={setselectAnswer}
                          activeStep={activeAssignmentStep} 
                          setActiveStep={setAssignmentActiveStep}
                          setPraticeTestActiveStep={setPraticeTestActiveStep}
                          setCodingExerciseActiveStep={setCodingExerciseActiveStep}
                          setTitleVideo={setTitleVideo}
                          
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
              {answer == null ? <h5 className="text-center"><b>Instructor Not Answered Yet</b></h5> : (

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

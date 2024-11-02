import React, { useRef, useState } from "react";
import Link from "next/link";
import { Player } from "video-react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Card from "react-bootstrap/Card";
// import Accordion from 'react-bootstrap/Accordion';
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Typography from "@mui/material/Typography";
import { Rating } from "react-simple-star-rating";
import CardContainer from "../../../contexts/CardContainer";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import SearchIcon from "@mui/icons-material/Search";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MessageIcon from "@mui/icons-material/Message";
import Modal from "react-bootstrap/Modal";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { course_data } from "../../../data";
import SingleProgressbar from "../../../components/course-details/single-progressbar";
import SingleComment from "./single-comment";
import CommentFormCourse from "../../../components/forms/comment-form-course";
import Accordian from "../../../components/course-content/accordian";
import CalculateTimeAgo from "../../../functions/calculateTimeAgo";
import { throttle } from "lodash"; // Use lodash's throttle function
import { useRouter } from "next/router";

import { useEffect } from "react";
import {
  AddQuestion,
  GetAllAnnoucement,
  GetAllQuestion,
  GetLastMarkedCurriculum,
  GetMyCoursesDetails,
  GetReviews,
  IMG_HOST,
  LoginWithToken,
  LoginWithTokenForItemCode,
  StoreLastMarkedCurriculum,
  UpdateCourseCurriculumProgress,
  VideoStreaming,
} from "../../../api";
import moment from "moment";
import ErrorAlert from "../../../functions/Alert/ErrorAlert";
import Commentbox from "../../../components/comment-box/Commentbox";
import QuizContainer from "../components/quiz/QuizContainer";
import parse from "html-react-parser";
import AssignmentContainer from "../components/assignment/AssignmentContainer";
import PraticeTestContainer from "../components/pratice-test/PraticeTestContainer";
import CodingExerciseContainer from "../components/coding-exercise/CodingExerciseContainer";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/audio.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

import {
  MediaPlayer,
  MediaProvider,
  Gesture,
  useVideoQualityOptions,
  Menu,
  SeekButton,
  Captions,
} from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import MediumLoading from "../../../functions/Loading/MediumLoading";
import { Footer } from "../../../layout";
import { ConvertToHTML, StripeHTML } from "../../../functions/ConvertToHTML";
import { FormatVideoTimeLength } from "../../../functions/FormatVideoTimeLength";
import FormatToHTML from "../../../functions/FormatToHTML";

const mainfs = {
  fontSize: "clamp(0.8rem, 0.8rem + 0.6vw, 1.5rem)",
};

const titlefs = {
  fontSize: "calc(0.2rem + 0.8vw)",
};

const CourseDetailsArea1 = ({ id, course, setcourse }) => {
  const router = useRouter();

  const [featured_reviews, setfeatured_reviews] = useState(null);

  const [main_Video_player_url, setmain_Video_player_url] = useState("");
  const [showVideoPlayer, setshowVideoPlayer] = useState(true);
  const [article, setarticle] = useState("");
  const [showquiz, setshowquiz] = useState(false);

  const [answer, setanswer] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (code, answer) => {
    setShow(true);
    setanswer(answer);
  };

  // ========= QUIZ ====================
  const [Startquiz, setStartquiz] = useState(false);
  const [selectedQuiz, setselectedQuiz] = useState(null);
  const [answerAlertDisplay, setanswerAlertDisplay] = useState(null);
  const [selectAnswer, setselectAnswer] = useState(0);

  // ============= ASSIGNMENT =======================
  const [showAssignment, setshowAssignment] = useState(false);
  const [selectedAssignment, setselectedAssignment] = useState(null);
  const [activeAssignmentStep, setAssignmentActiveStep] = React.useState(0);

  // ============= PRACTICE TEST =========================
  const [showPracticeTest, setshowPracticeTest] = useState(false);
  const [selectedPracticeTest, setselectedPracticeTest] = useState(null);
  const [PraticeTestactiveStep, setPraticeTestActiveStep] = React.useState(0);

  // ============ CODING EXERCISE =====================
  const [showCodingExercise, setshowCodingExercise] = useState(false);
  const [selectedCodingExercise, setselectedCodingExercise] = useState(null);
  const [activeStepCodingExercise, setCodingExerciseActiveStep] =
    React.useState(0);

  const [courseCode, setcourseCode] = useState(course && course.course_code);
  const [itemCode, setitemCode] = useState(course && course.item_code);

  // ========== COMMON ========================
  const [seletedCurriculumItem, setseletedCurriculumItem] = useState(null);
  const [
    selectedCurriculumItemDataLastPosition,
    setselectedCurriculumItemDataLastPosition,
  ] = useState(null);
  const [TitleVideo, setTitleVideo] = useState("");
  const [isDataFetched, setisDataFetched] = useState(false);
  const [isLoadingContent, setisLoadingContent] = useState(false);

  // ======= QUESTIONS
  const [questions, setquestions] = useState([]);

  //  ----------------------- Annoucements -------------------------------
  const [annoucements, setannoucements] = useState([]);

  //  ----------------------- Annoucements -------------------------------

  // --------------------------- What will who Learn -----------------------
  const chunkArray = (array, chunkSize) => {
    const chunkedArray = [];
    if (array != null) {
      for (let i = 0; i < array.length; i += chunkSize) {
        chunkedArray.push(array.slice(i, i + chunkSize));
      }
    }
    return chunkedArray;
  };

  const [windowWidth, setWindowWidth] = useState(0); // Default value for SSR

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if window is available
      setWindowWidth(window.innerWidth);

      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const positionStyle = {
    position: windowWidth < 768 ? "" : "fixed",
    right: windowWidth < 768 ? "" : "0",
    height: windowWidth < 768 ? "40vh" : "100vh",
    top: 0,
  };

  useEffect(() => {
    GetAllAnnoucement(courseCode, setannoucements);
    GetAllQuestion(itemCode, setquestions);
  }, [itemCode]);

  // get the Reviews
  useEffect(() => {
    GetReviews(id, setfeatured_reviews);
  }, [featured_reviews]);

  useEffect(() => {
    const fetchData = async () => {
      await GetLastMarkedCurriculum(
        id,
        setseletedCurriculumItem,
        setselectedCurriculumItemDataLastPosition
      );
      setisDataFetched(true); // Set data fetched flag to true
    };

    fetchData();
  }, []);

  useEffect(() => {
    // ------------- From Excel Plugin API -----------
    // Extract the query parameters
    const { sectionID, curriclumID, SyllabusType } = router.query;

    // Only execute if sectionID, curriclumID, and type are not null or undefined
    if (sectionID && curriclumID && SyllabusType) {
      let curriculumItem = null;

      // Find the curriculum item based on sectionID and curriclumID
      curriculumItem = course?.course_content
        .find((s) => s.section_id == sectionID)
        ?.section_curriculum_item.find(
          (c) => c.curriculumItemId == curriclumID
        );

      if (curriculumItem) {
        // If curriculum item is found, handle it
        handleCheckCurriculum(curriculumItem);
      } else {
        console.error("Curriculum item not found");
      }

      // ------------- From Excel Plugin API -----------
    } else {
      // Normal way
      if (!isDataFetched) return;

      const selectedSectionId =
        selectedCurriculumItemDataLastPosition?.sectionId;
      const selectedCurriculumItemId =
        selectedCurriculumItemDataLastPosition?.previousSectionCurriculumItemId;
      const curriculumItemType =
        selectedCurriculumItemDataLastPosition?.curriculumItemType;

      // console.log("Section ID " + selectedSectionId);
      // console.log("Curriculum Item ID " + selectedCurriculumItemId);

      let curriculumItem = null;

      // Check if all required fields are empty strings
      if (
        selectedSectionId == "" &&
        selectedCurriculumItemId == "" &&
        curriculumItemType == ""
      ) {
        // Default to the first object in the array if all are empty
        curriculumItem =
          course?.course_content?.[0]?.section_curriculum_item?.[0];
        setisLoadingContent(false);
      } else if (selectedSectionId && selectedCurriculumItemId) {
        curriculumItem = course?.course_content
          .find((s) => s.section_id == selectedSectionId)
          ?.section_curriculum_item.find(
            (c) => c.curriculumItemId == selectedCurriculumItemId
          );
        setisLoadingContent(false);
      } else {
        setisLoadingContent(true);
      }

      if (curriculumItem) {
        handleCheckCurriculum(curriculumItem);
      } else {
        console.error("Curriculum item not found");
      }
    }
  }, [isDataFetched, selectedCurriculumItemDataLastPosition]);

  const handleCheckCurriculum = (curriculumItem) => {
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
        UpdateCourseCurriculumProgress(
          itemCode,
          curriculumItem.curriculumItemId,
          setcourse
        );
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
        UpdateCourseCurriculumProgress(
          itemCode,
          curriculumItem.curriculumItemId,
          setcourse
        );
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
        UpdateCourseCurriculumProgress(
          itemCode,
          curriculumItem.curriculumItemId,
          setcourse
        );
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
        UpdateCourseCurriculumProgress(
          itemCode,
          curriculumItem.curriculumItemId,
          setcourse
        );
        //  --------------------- CALCULATE THE MARK --------------------

        // ---------------- STORE AS LAST POSITION -------
        StoreLastMarkedCurriculum(itemCode, curriculumItem.curriculumItemId);
        // ---------------- STORE AS LAST POSITION -------

        console.log(curriculumItem);
        break;

      case "Lecture":
        if (curriculumItem.article === "N/A") {
          console.log("Video");

          setarticle("");
          setshowVideoPlayer(true);
          setshowAssignment(false);
          setshowquiz(false);
          setshowPracticeTest(false);
          setshowCodingExercise(false);
          setTitleVideo(curriculumItem.title);
          setseletedCurriculumItem(curriculumItem.curriculumItemId);

          curriculumItem.get_CurriculumItem_File.forEach(async (type) => {
            if (type.curriculum_item_file_type === "Video") {
              const videoSourceUrl = await VideoStreaming(type.url);

              setmain_Video_player_url(`${videoSourceUrl}`);

              const videoPlayer = document.querySelector(".video-react-video");
              const videoSource = document.getElementById("videoPlayer");
              if (videoSource) {
                videoSource.src = `${videoSourceUrl}`;
                videoPlayer.load();
              }

              const delay = (2 / 3) * type.videoLength * 1000;
              setTimeout(() => {
                UpdateCourseCurriculumProgress(
                  itemCode,
                  curriculumItem.curriculumItemId,
                  setcourse
                );
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
          UpdateCourseCurriculumProgress(
            itemCode,
            curriculumItem.curriculumItemId,
            setcourse
          );
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
  };

  // ------------- From Excel Plugin API -----------
  useEffect(() => {
    // Log the extracted values (for debugging)
    // console.log('Section ID:', sectionID);
    // console.log('Curriculum ID:', curriclumID);
    // console.log('Type:', type);
    // Replace the URL without the query parameters and without refreshing the page
  }, [router.query]);

  // ------------- From Excel Plugin API -----------

  // Ask a new Question
  const [showNewQuestion, setShowNewQuestion] = useState(false);

  const handleCloseNewQuestion = () => setShowNewQuestion(false);
  const handleShowNewQuestion = () => setShowNewQuestion(true);

  const {
    course_desc,
    course_desc_2,
    learn_list,
    course_desc_3,
    curriculum_desc,
    course_lessons,
    instructor_img,
    instructor_title,
    instructor_desc,
    social_links,
    reviews,
    instructor,
    rating,
    rating_count,
  } = course || {};

  // ---------------- Ask Question -------------
  const [question, setquestion] = useState("");

  const handleSubmitAskQuestion = () => {
    console.log(question);

    if (question == "") {
      ErrorAlert("Error", "Please Enter a Question");
      return;
    }

    AddQuestion(
      itemCode,
      question,
      setShowNewQuestion,
      setquestion,
      setquestions
    );
  };

  // ===============

  const playerRef = useRef(null);

  const handleVideoPosition = () => {
    const currentTime = playerRef.current?.currentTime;

    // Retrieve the array from localStorage
    let videoArray =
      JSON.parse(localStorage.getItem("videoPlayerTimestampArray")) || [];

    // Find the index of the existing object
    const index = videoArray.findIndex(
      (item) =>
        item.itemC == itemCode && item.curriItem == seletedCurriculumItem
    );

    if (index !== -1) {
      // Update the existing object
      videoArray[index].videoStamp = currentTime;
    } else {
      let videoObject = {
        itemC: itemCode,
        curriItem: seletedCurriculumItem,
        videoStamp: currentTime,
      };

      // Add the new object
      videoArray.push(videoObject);
    }

    // Save the updated array back to localStorage
    localStorage.setItem(
      "videoPlayerTimestampArray",
      JSON.stringify(videoArray)
    );
  };

  useEffect(() => {
    const setVideoCurrentTime = () => {
      // Retrieve the array from localStorage
      const videoArray =
        JSON.parse(localStorage.getItem("videoPlayerTimestampArray")) || [];

      // Find the current object based on itemCode and seletedCurriculumItem
      const currentObject = videoArray.find(
        (item) =>
          item.itemC == itemCode && item.curriItem == seletedCurriculumItem
      );

      // If the object is found, set the player's currentTime to the saved videoStamp
      if (currentObject && playerRef.current) {
        playerRef.current.currentTime = currentObject.videoStamp;
      }
    };

    // Set video current time when playerRef is available
    if (playerRef.current) {
      setVideoCurrentTime();
    }

    // Add event listener to ensure currentTime is set when player is ready
    playerRef.current?.addEventListener("loadedmetadata", setVideoCurrentTime);

    // Clean up event listener on unmount
    return () => {
      playerRef.current?.removeEventListener(
        "loadedmetadata",
        setVideoCurrentTime
      );
    };
  }, [itemCode, seletedCurriculumItem]);

  const [elementHeightPx, setElementHeightPx] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const calculateElementHeight = () => {
      if (elementRef.current) {
        setElementHeightPx(elementRef.current.clientHeight);
      }
    };

    // Initial calculation
    calculateElementHeight();

    // Recalculate on window resize
    window.addEventListener("resize", calculateElementHeight);

    // Cleanup
    return () => window.removeEventListener("resize", calculateElementHeight);
  }, []);

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset; // or document.documentElement.scrollTop
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // useEffect(() => {
  //   console.log(scrollPosition)
  // }, [scrollPosition])

  const [expandAll, setExpandAll] = useState(false);

  const handleToggleAll = () => {
    setExpandAll(!expandAll);
  };

  const [isFullScreen, setIsFullScreen] = useState(false);
  const articleRef = useRef(null); // Reference to the article container

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (articleRef.current) {
        articleRef.current.requestFullscreen(); // Request full screen for the article container
      }
    } else {
      document.exitFullscreen(); // Exit full screen
    }
    setIsFullScreen(!isFullScreen);
  };


  return (
    <section
      ref={elementRef}
      className="container-fluid my-2 course-details-3"
      style={{
        textAlign: "left",
        backgroundColor: "transparent",
        position: "relative",
      }}
    >
      <div className="row">
        <div
          style={{ maxHeight: `calc(150vh + (${elementHeightPx}vh))` }}
          className="col-md-8"
        >
          <div>
            {isLoadingContent && <MediumLoading />}

            {showVideoPlayer ? (
              <MediaPlayer
                ref={playerRef}
                onTransitionEnd={handleVideoPosition}
                autoPlay={true}
                title={TitleVideo}
                src={main_Video_player_url}
              >
                <MediaProvider />
                {/* https://files.vidstack.io/sprite-fight/thumbnails.vtt */}
                <DefaultVideoLayout
                  thumbnails={main_Video_player_url}
                  icons={defaultLayoutIcons}
                ></DefaultVideoLayout>
              </MediaPlayer>
            ) : //  ==================

            article == "" ? (
              <>
                {/* // Show Quiz */}
                {showquiz && (
                  <div
                    className=" border p-4"
                    style={{ maxHeight: "620px", overflowY: "scroll" }}
                  >
                    <QuizContainer
                      setselectAnswer={setselectAnswer}
                      selectAnswer={selectAnswer}
                      answerAlertDisplay={answerAlertDisplay}
                      setanswerAlertDisplay={setanswerAlertDisplay}
                      Startquiz={Startquiz}
                      setStartquiz={setStartquiz}
                      selectedQuiz={selectedQuiz}
                    />
                  </div>
                )}

                {/* // Show Assignment */}
                {showAssignment && (
                  <div
                    className="container border border-dark p-4"
                    // style={{ maxHeight: "500px", overflowY: "scroll" }}
                  >
                    <AssignmentContainer
                      activeStep={activeAssignmentStep}
                      setActiveStep={setAssignmentActiveStep}
                      selectedAssignment={selectedAssignment}
                    />
                  </div>
                )}

                {/* Show Practice test */}
                {showPracticeTest && (
                  <div
                    className="container border border-dark p-4"
                    // style={{ maxHeight: "500px", overflowY: "scroll" }}
                  >
                    <PraticeTestContainer
                      PraticeTestactiveStep={PraticeTestactiveStep}
                      setPraticeTestActiveStep={setPraticeTestActiveStep}
                      selectedPracticeTest={selectedPracticeTest}
                    />
                  </div>
                )}

                {/* Show Coding Exercise */}
                {showCodingExercise && (
                  <div
                    className="container border border border-dark p-4"
                    // style={{ maxHeight: "500px", overflowY: "scroll" }}
                  >
                    <CodingExerciseContainer
                      setCodingExerciseActiveStep={setCodingExerciseActiveStep}
                      activeStepCodingExercise={activeStepCodingExercise}
                      selectedCodingExercise={selectedCodingExercise}
                    />
                  </div>
                )}
              </>
            ) : (
              <>
              <div
                onClick={toggleFullScreen}
                style={{
                  background: "#f0f0f0",
                  padding: "10px",
                  cursor: "pointer",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Click to View Full Screen
              </div>
              
              <div
                className="border p-4"
                style={{ maxHeight: "500px", overflowY: "scroll" }}
              >
                {parse(article)}
              </div>
        
              <div
                ref={articleRef}
                className={`full-screen-overlay ${isFullScreen ? 'fullscreen' : ''}`}
                style={{
                  position: isFullScreen ? "fixed" : "static",
                  top: 0,
                  left: 0,
                  width: isFullScreen ? "100vw" : "auto",
                  height: isFullScreen ? "100vh" : "auto",
                  backgroundColor: isFullScreen ? "#ffffff" : "rgba(0, 0, 0, 0.8)", // White background in full screen
                  color: isFullScreen ? "#000" : "#fff", // Black text in full screen
                  zIndex: 1000,
                  padding: "5px",
                  overflowY: isFullScreen ? "auto" : "hidden",
                }}
              >
                {isFullScreen && (
                  <button
                    onClick={toggleFullScreen}
                    style={{
                      position: "fixed",
                      top: "20px",
                      right: "20px",
                      fontSize: "1.5em",
                      color: "#000", // Change close button color to black for visibility on white
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    ✕
                  </button>
                )}
                {parse(article)}
              </div>
            </>
            )}

            {/* Course Content */}
            <div
              style={{
                ...positionStyle,
                top: scrollPosition == 0 ? "85px" : "0",              
              }}
              className="col-12 col-md-4"
            >
              <Card
                style={{
                  backgroundColor: "transparent",
                  height: "100%",
                }}
              >
                <div
                      className="p-2 d-flex justify-content-between align-items-center"

                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    borderBottom: "1px solid rgba(0, 0, 0, 0.175)",
                    backgroundColor: "transparent", // Ensure sticky header doesn't blend with the content
                  }}
                >
                    <h6 className="m-2" style={mainfs}>
                    Course Content
                  </h6>
                  <span
                    onClick={handleToggleAll} // Add click handler for toggling
                    style={{ cursor: "pointer"}}
                    className="text-danger"
                  >
                    {expandAll ? "Collapse All" : "Expand All"}
                  </span>
                </div>
                <Card.Body
                  style={{ height: "calc(100vh - 85px)", overflowY: "auto" }}
                >
                  <div className="faq-accordion">
                    <div className="accordion">
                      {course != null &&
                        course.course_content.map((content, index) => (
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
                            setselectedCodingExercise={
                              setselectedCodingExercise
                            }
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
                            setCodingExerciseActiveStep={
                              setCodingExerciseActiveStep
                            }
                            setTitleVideo={setTitleVideo}
                            show={expandAll}
                          />
                        ))}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>

            {/* New Tab */}
            <div className="mx-2 mx-sm-3 mx-md-4 mx-lg-5">
              <div className="row">
                <div className="col-md-12">
                  <div className="course-details-content ">
                    <ul
                      className="nav nav-tabs float-start"
                      id="myTab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="overview-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#overview"
                          type="button"
                          role="tab"
                          aria-controls="overview"
                          aria-selected="true"
                          style={mainfs}
                        >
                          Overview
                        </button>
                      </li>

                      {course && course.isPaid == true && (
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="qa-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#qa"
                            type="button"
                            role="tab"
                            aria-controls="qa"
                            aria-selected="false"
                            style={mainfs}
                          >
                            Q&A
                          </button>
                        </li>
                      )}

                      {course && course.isPaid == true && (
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="announcement-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#announcement"
                            type="button"
                            role="tab"
                            aria-controls="announcement"
                            aria-selected="false"
                            style={mainfs}
                          >
                            Announcement
                          </button>
                        </li>
                      )}

                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="reviews-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#reviews"
                          type="button"
                          role="tab"
                          aria-controls="reviews"
                          aria-selected="false"
                          style={mainfs}
                        >
                          Reviews
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="tab-content" id="myTabContent">
                    {/* Overview */}
                    <div
                      className="tab-pane fade show active"
                      id="overview"
                      role="tabpanel"
                      aria-labelledby="overview-tab"
                    >
                      <div className="course-tab-content">
                        <div className="course-overview">
                          <div className="mt-5 mx-3">
                            <Typography variant="h5" gutterBottom>
                              {course && course.title}
                            </Typography>

                            <div className="row mt-5">
                              <div className="col-md-3">
                                <div className="align-items-center">
                                  {course && (
                                    <h6 className="m-0 p-0 me-2" style={mainfs}>
                                      {Number.parseFloat(course.rating).toFixed(
                                        1
                                      )}
                                    </h6>
                                  )}
                                  {course && (
                                    <Rating
                                      size={20}
                                      readonly={true}
                                      iconsCount={5}
                                      initialValue={Number.parseInt(
                                        course.rating
                                      )}
                                    />
                                  )}
                                </div>
                                <span style={mainfs}>
                                  {course != null &&
                                    course &&
                                    course.rating_count}{" "}
                                  ratings
                                </span>
                              </div>

                              <div className="col-md-2">
                                <div className="d-flex align-items-center">
                                  <h6 className="m-0 p-0" style={mainfs}>
                                    {course && course.enrolled_count}
                                  </h6>
                                </div>
                                <span style={mainfs}>
                                  {course && course.enrolled_count == 1
                                    ? "Student"
                                    : "Students"}
                                </span>
                              </div>

                              <div className="col-md-4">
                                <div className="d-flex align-items-center">
                                  <h6 className="m-0 p-0" style={mainfs}>
                                    {course &&
                                      FormatVideoTimeLength(
                                        course.totalVideoLength
                                      )}
                                  </h6>
                                </div>
                                <span style={mainfs}>Total Video Length</span>
                              </div>
                            </div>

                            <div className="course-tab-content mt-5">
                              <div className="course-overview">
                                <h5 className="title m-0 p-0" style={mainfs}>
                                  What You’ll Learn?
                                </h5>
                                <div className="row">
                                  {course &&
                                    course.intended_learners &&
                                    chunkArray(course.intended_learners, 3).map(
                                      (chunk, index) => (
                                        <ul key={index} className="col-md-6">
                                          {chunk.map(
                                            (learner, idx) =>
                                              learner.intended_learner_type ==
                                                " students learn" && (
                                                <li key={idx} style={mainfs}>
                                                  {learner.intended_learner}
                                                </li>
                                              )
                                          )}
                                        </ul>
                                      )
                                    )}
                                </div>
                              </div>
                            </div>

                            <h3 className="heading-title m-0">
                              Course Description
                            </h3>
                            {course && (
                          <p
                              style={mainfs}
                              dangerouslySetInnerHTML={FormatToHTML(
                                course.course_main_desc
                              )}
                            />
                          )}

                            <h3 className="heading-title">Instructor</h3>
                            <div
                              className="d-flex align-items-center"
                              style={mainfs}
                            >
                              {course && (
                                <Avatar
                                  alt={`${course.instructor}`}
                                  src="/static/images/avatar/1.jpg"
                                />
                              )}
                              <a
                                className="mx-2"
                                href={`/users/${
                                  course && course.instructor_code
                                }`}
                              >
                                {course && course.instructor}
                              </a>
                            </div>

                            <p style={mainfs} className="my-2">
                              {course && course.instructor_title}
                            </p>

                            <p style={mainfs}>
                              {course && course.instructor_desc}
                            </p>

                            <h3 className="heading-title p-0 m-0">
                              Requirements
                            </h3>
                            <div className="row">
                              <ul className="col-md-12">
                                {course &&
                                  course.intended_learners &&
                                  course.intended_learners.map(
                                    (req, index) =>
                                      req.intended_learner_type ===
                                        "requirements" && (
                                        <li style={mainfs} key={index}>
                                          {req.intended_learner}
                                        </li>
                                      )
                                  )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Q&A */}
                    {course && course.isPaid == true && (
                      <div
                        className="tab-pane fade mx-3"
                        id="qa"
                        role="tabpanel"
                        aria-labelledby="qa-tab"
                      >
                        <div className="course-tab-content">
                          <div className="course-overview">
                            <div className="row mt-5">
                              <div className="col-md-12">
                                <InputGroup className="mb-3">
                                  <Form.Control
                                    placeholder="Search all courses questions"
                                    aria-label="Search all courses questions"
                                    aria-describedby="basic-addon2"
                                    style={mainfs}
                                  />
                                  <InputGroup.Text id="basic-addon2">
                                    <SearchIcon />
                                  </InputGroup.Text>
                                </InputGroup>
                              </div>
                            </div>

                            <div className="row my-3">
                              <div className="col-md-12">
                                <span className="d-flex">
                                  <h5 className="m-0 p-0" style={mainfs}>
                                    All questions in this courses
                                  </h5>
                                  <span>
                                    (
                                    {questions.length > 0
                                      ? questions.length
                                      : questions.length}
                                    )
                                  </span>
                                </span>
                              </div>
                            </div>

                            <div className="row my-1">
                              {questions.length > 0 &&
                                questions.map((question, index) => (
                                  <div key={index} className="col-md-12">
                                    <CardContainer>
                                      <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                          <Avatar
                                            alt={question.userName}
                                            src={
                                              question.profileImg == null
                                                ? "/static/images/avatar/1.jpg"
                                                : question.profileImg
                                            }
                                          />
                                        </ListItemAvatar>
                                        <ListItemText
                                          primary={question.userName}
                                          secondary={
                                            <React.Fragment>
                                              {question.question}
                                            </React.Fragment>
                                          }
                                        />

                                        <Button
                                          onClick={() =>
                                            handleShow(
                                              question.questionCode,
                                              question.answer
                                            )
                                          }
                                          variant="contained"
                                          size="medium"
                                          className="edu-btn btn-small"
                                        >
                                          <MessageIcon />
                                        </Button>
                                      </ListItem>

                                      <span className="mx-5 mt-2 d-flex">
                                        <Typography
                                          className="mx-1"
                                          variant="body2"
                                        >
                                          {question.date}
                                        </Typography>
                                      </span>
                                    </CardContainer>
                                  </div>
                                ))}
                            </div>

                            <Button
                              onClick={handleShowNewQuestion}
                              className="my-3 edu-btn btn-small"
                              variant="contained"
                            >
                              Ask a new question
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Annoucements */}
                    {course && course.isPaid == true && (
                      <div
                        className="tab-pane fade mx-3"
                        id="announcement"
                        role="tabpanel"
                        aria-labelledby="announcement-tab"
                      >
                        <div className="course-tab-content">
                          <div className="course-overview">
                            {annoucements.length > 0 ? (
                              annoucements.map((announcement, index) => (
                                <CardContainer key={index} className="mt-5">
                                  <ListItem>
                                    <ListItemAvatar>
                                      <Avatar>
                                        <PersonIcon />
                                      </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                      primary={course.instructor}
                                      secondary={`Post an annoucement • ${CalculateTimeAgo(
                                        announcement.createdDate
                                      )}`}
                                    />
                                  </ListItem>
                                  <div className="m-3">
                                    <h4 className="heading-title ">
                                      {announcement.tittle}
                                    </h4>
                                    <p>
                                      {" "}
                                      <div
                                        style={mainfs}
                                        dangerouslySetInnerHTML={{
                                          __html: announcement.content,
                                        }}
                                      />
                                    </p>
                                  </div>
                                </CardContainer>
                              ))
                            ) : (
                              <div className="text-center mt-5">
                                <p style={mainfs}>No announcements available</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Reviews */}
                    <div
                      className="tab-pane fade mx-3"
                      id="reviews"
                      role="tabpanel"
                      aria-labelledby="reviews-tab"
                    >
                      <div className="course-tab-content">
                        <div className="course-overview">
                          <div className="course-review mt-5 mb-5">
                            <h3 className="heading-title mb-4">
                              Student Feedback
                            </h3>
                            {/* <p>{course && (course.rating).toFixed(1)} average rating based on {course && course.rating_count} rating</p> */}
                            <div className="row align-items-center">
                              <div className="col-sm-3">
                                <div className="rating-box">
                                  <div className="rating-number">
                                    {course && course.rating.toFixed(1)}
                                  </div>
                                  {course && (
                                    <Rating
                                      size={20}
                                      readonly={true}
                                      iconsCount={5}
                                      initialValue={Number.parseInt(
                                        course.rating
                                      )}
                                    />
                                  )}
                                  <span>
                                    (
                                    {course != null &&
                                      course &&
                                      Number.parseInt(course.rating_count)}{" "}
                                    {course != null &&
                                    Number.parseInt(course.rating_count) == 1
                                      ? "Review"
                                      : "Reviews"}
                                    )
                                  </span>
                                </div>
                              </div>
                              <div className="col-md-9">
                                <div className="review-wrapper ">
                                  {course != null && (
                                    <>
                                      <SingleProgressbar
                                        value={
                                          course.ratingDetails.fiveRatingCount
                                        }
                                        rating_value={"5"}
                                      />
                                      <SingleProgressbar
                                        value={
                                          course.ratingDetails.fourRatingCount
                                        }
                                        rating_value={"4"}
                                      />
                                      <SingleProgressbar
                                        value={
                                          course.ratingDetails.threeRatingCount
                                        }
                                        rating_value={"3"}
                                      />
                                      <SingleProgressbar
                                        value={
                                          course.ratingDetails.twoRatingCount
                                        }
                                        rating_value={"2"}
                                      />
                                      <SingleProgressbar
                                        value={
                                          course.ratingDetails.oneRatingCount
                                        }
                                        rating_value={"1"}
                                      />
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="mb-1 mt-3">
                              <h3>Reviews</h3>

                              {featured_reviews != null &&
                                (featured_reviews.length > 0 ? (
                                  featured_reviews.map((reviews, index) => (
                                    <div key={index} className="p-1 px-3">
                                      <div className="d-flex align-items-center">
                                        <Avatar
                                          alt={`${reviews.fullName}`}
                                          src="/static/images/avatar/1.jpg"
                                        />
                                        <h6 className="m-2 p-0">
                                          {reviews.fullName}
                                        </h6>
                                      </div>
                                      <Rating
                                        size={20}
                                        readonly={true}
                                        iconsCount={5}
                                        initialValue={Number.parseInt(
                                          reviews.rating
                                        )}
                                      />
                                      <span
                                        style={mainfs}
                                        className="mx-2 mt-2"
                                      >
                                        {CalculateTimeAgo(reviews.date)}
                                      </span>
                                      <p style={mainfs}>{reviews.comment}</p>
                                    </div>
                                  ))
                                ) : (
                                  <p style={mainfs}>No Reviews Found</p>
                                ))}
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
                {answer == null ? (
                  <h5 className="text-center">
                    <b>Instructor Not Answered Yet</b>
                  </h5>
                ) : (
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt={course.instructor}
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={course.instructor}
                      secondary={<React.Fragment>{answer}</React.Fragment>}
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
            <Form.Control
              onChange={(e) => setquestion(e.target.value)}
              as="textarea"
              rows={3}
            />
          </Form.Group>

          <Button
            onClick={handleSubmitAskQuestion}
            className="my-2"
            variant="contained"
          >
            Save
          </Button>
        </Modal.Body>
        {/* </CardContainer> */}
      </Modal>
    </section>
  );
};

export default CourseDetailsArea1;

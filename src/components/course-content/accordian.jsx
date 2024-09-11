import React, { useEffect } from "react";
import CardContainer from "../../pages/my-courses/[id]/CardContainer";
import Dropdown from "react-bootstrap/Dropdown";
import QuizIcon from "@mui/icons-material/Quiz";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CodeIcon from "@mui/icons-material/Code";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import {
  GetMyCoursesDetails,
  IMG_HOST,
  StoreLastMarkedCurriculum,
  UpdateCourseCurriculumProgress,
  UpdateCourseProgress,
  VideoStreaming,
} from "../../api";
import { CheckBox } from "@mui/icons-material";
import Form from "react-bootstrap/Form";
import CardMainContainer from "../../pages/my-courses/[id]/CardMainContainer";
import { saveAs } from "file-saver";
import { useRouter } from "next/router";

const mainfs = {
  fontSize: "calc(0.4rem + 0.6vw)!important",
};
const secfs = {
  fontSize: "calc(1rem + 0.6vw)!important",
};

const Accordian = ({
  show = false,
  content,
  id,
  setmain_Video_player_url,
  itemCode,
  setshowVideoPlayer,
  setarticle,
  setshowquiz,
  setselectedQuiz,
  setshowAssignment,
  setselectedAssignment,
  setshowPracticeTest,
  setselectedPracticeTest,
  setshowCodingExercise,
  setselectedCodingExercise,
  setcourse,
  courseItemCode,
  setseletedCurriculumItem,
  seletedCurriculumItem,
  setStartquiz,
  setanswerAlertDisplay,
  setselectAnswer,
  activeStep,
  setActiveStep,
  setPraticeTestActiveStep,
  setCodingExerciseActiveStep,
  setTitleVideo,
}) => {
  const bgcolor = "#808080";

  const router = useRouter();
  // Extract the query parameters
  const { sectionID, curriclumID, SyllabusType } = router.query;

  const handleDownload = async (url, title) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      saveAs(blob, title);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div className="accordion-item mb-2">
      <style>
        {`
          .custom-color {
            background-color: #808080;
          }
         
        `}
      </style>
      <p className="accordion-header">
        <button
          style={mainfs}
          className={`accordion-button d-flex justify-content-between ${
            show ? "" : "collapsed"
          }`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#question-${id}`}
          aria-expanded={show ? "true" : "false"}
        >
          Section {id} : {content.section_name}
        </button>
      </p>
      <div
        id={`question-${id}`}
        className={`accordion-collapse collapse ${show ? "show" : ""}`}
        data-bs-parent="#faq-accordion"
      >
        <div className="accordion-body p-1">
          <ol style={{ cursor: "pointer" }} className="p-0">
            {content.section_curriculum_item.map((list, index) => (
              <React.Fragment key={index}>
                {/* Video */}
                {list.curriculum_item_type == "Lecture" &&
                  list.article == "N/A" &&
                  list.get_CurriculumItem_File.map(
                    (type, idx) =>
                      type.curriculum_item_file_type === "Video" && (
                        <span
                          key={idx}
                          onClick={async () => {
                            setarticle("");
                            setshowVideoPlayer(true);
                            setshowAssignment(false);
                            setshowquiz(false);
                            setshowPracticeTest(false);
                            setshowCodingExercise(false);

                            const videoSourceUrl = await VideoStreaming(
                              type.url
                            );

                            setmain_Video_player_url(`${videoSourceUrl}`);

                            var videoPlayer =
                              document.querySelector(".video-react-video");
                            var videoSource =
                              document.getElementById("videoPlayer");
                            if (videoSource) {
                              videoSource.src = `${videoSourceUrl}`;
                              videoPlayer.load();
                            }

                            setTitleVideo(list.title);

                            //  --------------------- CALCULATE THE MARK --------------------
                            let delay = (2 / 3) * type.videoLength * 1000;

                            setTimeout(() => {
                              UpdateCourseCurriculumProgress(
                                itemCode,
                                list.curriculumItemId,
                                setcourse
                              );
                            }, delay);

                            //  --------------------- CALCULATE THE MARK --------------------

                            // ---------------- STORE AS LAST POSITION -------
                            StoreLastMarkedCurriculum(
                              itemCode,
                              list.curriculumItemId
                            );
                            // ---------------- STORE AS LAST POSITION -------

                            setseletedCurriculumItem(list.curriculumItemId);

                            // Only execute if sectionID, curriclumID, and type are not null or undefined
                            if (sectionID && curriclumID && SyllabusType) {
                              router.replace(
                                `/my-courses/${itemCode}`,
                                undefined,
                                { shallow: true }
                              );
                            }

                       

                            GetMyCoursesDetails(courseItemCode, setcourse);
                          }}
                        >
                          <CardMainContainer
                            className={
                              seletedCurriculumItem == list.curriculumItemId &&
                              `custom-color`
                            }
                          >
                            <CardContainer
                              className={`m-1 p-0 ${
                                seletedCurriculumItem ==
                                  list.curriculumItemId &&
                                `custom-color text-light`
                              }`}
                            >
                              <Form.Check
                                className="d-flex p-0"
                                checked={list.read}
                                type={"checkbox"}
                                id={`default-${index}`}
                                label={""}
                                onClick={() => {
                                  UpdateCourseCurriculumProgress(
                                    itemCode,
                                    list.curriculumItemId,
                                    setcourse
                                  );
                                }}
                              />
                              <li className="d-flex">
                                <p
                                  className={
                                    seletedCurriculumItem ==
                                    list.curriculumItemId
                                      ? "text-light"
                                      : ""
                                  }
                                  style={mainfs}
                                >
                                  {index + 1}. <PlayCircleIcon /> Video Lecture
                                  : {list.title}
                                  {type.videoLength !== 0 && (
                                    <span>
                                      <b>
                                        <i>
                                          <i className="fas fa-tv mx-2"></i>
                                          {(type.videoLength / 60).toFixed(2)}
                                          mins
                                        </i>
                                      </b>
                                    </span>
                                  )}
                                  <p
                                    className={`m-1 p-0 ${
                                      seletedCurriculumItem ===
                                      list.curriculumItemId
                                        ? "text-light"
                                        : ""
                                    }`}
                                  >
                                    {list.description.replace(
                                      /<\/?[^>]+(>|$)/g,
                                      ""
                                    )}
                                  </p>
                                </p>
                              </li>
                            </CardContainer>
                            <div className="d-flex justify-content-around">
                              {/* Resources */}
                              {list.get_CurriculumItem_File.some(
                                (type) =>
                                  type.curriculum_item_file_type ===
                                    "Downloadable Items" ||
                                  type.curriculum_item_file_type ===
                                    "Source Code"
                              ) && (
                                <Dropdown>
                                  <Dropdown.Toggle size="sm" variant="danger">
                                    <i className="fas fa-folder-open"></i>{" "}
                                    Resources
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    {list.get_CurriculumItem_File.map(
                                      (item, idx) =>
                                        (item.curriculum_item_file_type ==
                                          "Downloadable Items" ||
                                          item.curriculum_item_file_type ==
                                            "Source Code") && (
                                          <Dropdown.Item
                                            key={idx}
                                            onClick={() =>
                                              handleDownload(
                                                `${IMG_HOST}${item.url}`,
                                                item.title
                                              )
                                            }
                                          >
                                            {item.title}
                                          </Dropdown.Item>
                                        )
                                    )}
                                  </Dropdown.Menu>
                                </Dropdown>
                              )}
                              {/* Links */}
                              {list.get_CurriculumItem_File.some(
                                (type) =>
                                  type.curriculum_item_file_type ===
                                  "External Resourses"
                              ) && (
                                <Dropdown>
                                  <Dropdown.Toggle size="sm" variant="danger">
                                    <i className="fas fa-link"></i> Links
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    {list.get_CurriculumItem_File.map(
                                      (item, idx) =>
                                        item.curriculum_item_file_type ===
                                          "External Resourses" && (
                                          <Dropdown.Item
                                            target="_blank"
                                            key={idx}
                                            href={`${item.url}`}
                                          >
                                            {item.title}
                                          </Dropdown.Item>
                                        )
                                    )}
                                  </Dropdown.Menu>
                                </Dropdown>
                              )}
                            </div>
                          </CardMainContainer>
                        </span>
                      )
                  )}

                {/* Article  */}
                {list.curriculum_item_type == "Lecture" &&
                  list.article != "N/A" && (
                    <span
                      onClick={() => {
                        setarticle(list.article);
                        setshowVideoPlayer(false);
                        setshowAssignment(false);
                        setshowquiz(false);
                        setshowPracticeTest(false);
                        setshowCodingExercise(false);

                        setseletedCurriculumItem(list.curriculumItemId);

                        //  --------------------- CALCULATE THE MARK --------------------
                        UpdateCourseCurriculumProgress(
                          itemCode,
                          list.curriculumItemId,
                          setcourse
                        );
                        //  --------------------- CALCULATE THE MARK --------------------

                        // ---------------- STORE AS LAST POSITION -------
                        StoreLastMarkedCurriculum(
                          itemCode,
                          list.curriculumItemId
                        );
                        // ---------------- STORE AS LAST POSITION -------

                        // Only execute if sectionID, curriclumID, and type are not null or undefined
                        if (sectionID && curriclumID && SyllabusType) {
                          router.replace(`/my-courses/${itemCode}`, undefined, {
                            shallow: true,
                          });
                        }

                        GetMyCoursesDetails(courseItemCode, setcourse);
                      }}
                      key={index}
                    >
                      <CardMainContainer
                        className={
                          seletedCurriculumItem == list.curriculumItemId &&
                          `custom-color`
                        }
                      >
                        <CardContainer
                          className={`m-1 p-0 ${
                            seletedCurriculumItem == list.curriculumItemId &&
                            `custom-color text-light`
                          }`}
                        >
                          <Form.Check
                            className="d-flex p-0"
                            checked={list.read}
                            type={"checkbox"}
                            id={`default-${index}`}
                            label={""}
                          />

                          <li className="d-flex">
                            <p
                              className={
                                seletedCurriculumItem == list.curriculumItemId
                                  ? "text-light"
                                  : ""
                              }
                              style={mainfs}
                            >
                              {index + 1}. <FileCopyIcon /> Text-Based Lecture :{" "}
                              {list.title}
                              <p
                                className={`m-1 p-0 ${
                                  seletedCurriculumItem ===
                                  list.curriculumItemId
                                    ? "text-light"
                                    : ""
                                }`}
                              >
                                {list.description.replace(
                                  /<\/?[^>]+(>|$)/g,
                                  ""
                                )}
                              </p>
                            </p>
                          </li>
                        </CardContainer>

                        <div className="d-flex justify-content-around">
                          {/* Resources */}
                          {list.get_CurriculumItem_File.some(
                            (type) =>
                              type.curriculum_item_file_type ===
                                "Downloadable Items" ||
                              type.curriculum_item_file_type === "Source Code"
                          ) && (
                            <Dropdown>
                              <Dropdown.Toggle size="sm" variant="danger">
                                <i className="fas fa-folder-open"></i> Resources
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                {list.get_CurriculumItem_File.map(
                                  (item, idx) =>
                                    (item.curriculum_item_file_type ==
                                      "Downloadable Items" ||
                                      item.curriculum_item_file_type ==
                                        "Source Code") && (
                                      <Dropdown.Item
                                        key={idx}
                                        onClick={() =>
                                          handleDownload(
                                            `${IMG_HOST}${item.url}`,
                                            item.title
                                          )
                                        }
                                      >
                                        {item.title}
                                      </Dropdown.Item>
                                    )
                                )}
                              </Dropdown.Menu>
                            </Dropdown>
                          )}

                          {/* Links */}
                          {list.get_CurriculumItem_File.some(
                            (type) =>
                              type.curriculum_item_file_type ===
                              "External Resourses"
                          ) && (
                            <Dropdown>
                              <Dropdown.Toggle size="sm" variant="danger">
                                <i className="fas fa-link"></i> Links
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                {list.get_CurriculumItem_File.map(
                                  (item, idx) =>
                                    item.curriculum_item_file_type ===
                                      "External Resourses" && (
                                      <Dropdown.Item
                                        target="_blank"
                                        key={idx}
                                        href={`${item.url}`}
                                      >
                                        {item.title}
                                      </Dropdown.Item>
                                    )
                                )}
                              </Dropdown.Menu>
                            </Dropdown>
                          )}
                        </div>
                      </CardMainContainer>
                    </span>
                  )}

                {/* Quiz */}
                {list.curriculum_item_type == "Quiz" && (
                  <span
                    onClick={() => {
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

                      //  --------------------- CALCULATE THE MARK --------------------
                      UpdateCourseCurriculumProgress(
                        itemCode,
                        list.curriculumItemId,
                        setcourse
                      );
                      //  --------------------- CALCULATE THE MARK --------------------

                      // ---------------- STORE AS LAST POSITION -------
                      StoreLastMarkedCurriculum(
                        itemCode,
                        list.curriculumItemId
                      );
                      // ---------------- STORE AS LAST POSITION -------

                      setselectedQuiz(list);

                      setseletedCurriculumItem(list.curriculumItemId);

                      // Only execute if sectionID, curriclumID, and type are not null or undefined
                      if (sectionID && curriclumID && SyllabusType) {
                        router.replace(`/my-courses/${itemCode}`, undefined, {
                          shallow: true,
                        });
                      }

                      GetMyCoursesDetails(courseItemCode, setcourse);

                 
                    }}
                    key={index}
                  >
                    <CardMainContainer
                      className={
                        seletedCurriculumItem == list.curriculumItemId &&
                        `custom-color`
                      }
                    >
                      <CardContainer
                        className={`m-1 p-0 ${
                          seletedCurriculumItem == list.curriculumItemId &&
                          `custom-color text-white`
                        }`}
                      >
                        <Form.Check
                          className="d-flex p-0"
                          checked={list.read}
                          type={"checkbox"}
                          id={`default-${index}`}
                          label={""}
                        />
                        <li className="d-flex">
                          <p
                            className={
                              seletedCurriculumItem == list.curriculumItemId
                                ? "text-light"
                                : ""
                            }
                            style={mainfs}
                          >
                            {index + 1}. <QuizIcon /> Quiz : {list.title}
                            <p
                              className={`m-1 p-0 ${
                                seletedCurriculumItem === list.curriculumItemId
                                  ? "text-light"
                                  : ""
                              }`}
                            >
                              {list.description.replace(/<\/?[^>]+(>|$)/g, "")}
                            </p>
                          </p>
                        </li>
                      </CardContainer>
                    </CardMainContainer>
                  </span>
                )}

                {/* Assignment */}
                {list.curriculum_item_type == "Assignment" && (
                  <span
                    onClick={() => {
                      setActiveStep(0);
                      setarticle("");
                      setshowVideoPlayer(false);
                      setshowAssignment(true);
                      setshowquiz(false);
                      setshowPracticeTest(false);
                      setshowCodingExercise(false);

                      setseletedCurriculumItem(list.curriculumItemId);

                      //  --------------------- CALCULATE THE MARK --------------------
                      UpdateCourseCurriculumProgress(
                        itemCode,
                        list.curriculumItemId,
                        setcourse
                      );
                      //  --------------------- CALCULATE THE MARK --------------------

                      // ---------------- STORE AS LAST POSITION -------
                      StoreLastMarkedCurriculum(
                        itemCode,
                        list.curriculumItemId
                      );
                      // ---------------- STORE AS LAST POSITION -------

                      // Only execute if sectionID, curriclumID, and type are not null or undefined
                      if (sectionID && curriclumID && SyllabusType) {
                        router.replace(`/my-courses/${itemCode}`, undefined, {
                          shallow: true,
                        });
                      }

                      GetMyCoursesDetails(courseItemCode, setcourse);

                      setselectedAssignment(list);

                
                    }}
                    key={index}
                  >
                    <CardMainContainer
                      className={
                        seletedCurriculumItem == list.curriculumItemId &&
                        `custom-color`
                      }
                    >
                      <CardContainer
                        className={`m-1 p-0 ${
                          seletedCurriculumItem == list.curriculumItemId &&
                          `custom-color text-light`
                        }`}
                      >
                        <Form.Check
                          className="d-flex p-0"
                          checked={list.read}
                          type={"checkbox"}
                          id={`default-${index}`}
                          label={""}
                        />
                        <li className="d-flex">
                          <p
                            className={
                              seletedCurriculumItem == list.curriculumItemId
                                ? "text-light"
                                : ""
                            }
                            style={mainfs}
                          >
                            {index + 1}. <AssignmentIcon /> Assignment :{" "}
                            {list.title}
                            <p
                              className={`m-1 p-0 ${
                                seletedCurriculumItem === list.curriculumItemId
                                  ? "text-light"
                                  : ""
                              }`}
                            >
                              {list.description.replace(/<\/?[^>]+(>|$)/g, "")}
                            </p>
                          </p>
                        </li>
                      </CardContainer>
                    </CardMainContainer>
                  </span>
                )}

                {/* Practice Test */}
                {list.curriculum_item_type == "Practice Test" && (
                  <span
                    onClick={() => {
                      setPraticeTestActiveStep(0);
                      setselectedPracticeTest(null);
                      setarticle("");
                      setshowVideoPlayer(false);
                      setshowAssignment(false);
                      setshowquiz(false);
                      setshowPracticeTest(true);
                      setshowCodingExercise(false);

                      //  --------------------- CALCULATE THE MARK --------------------
                      UpdateCourseCurriculumProgress(
                        itemCode,
                        list.curriculumItemId,
                        setcourse
                      );
                      //  --------------------- CALCULATE THE MARK --------------------

                      // ---------------- STORE AS LAST POSITION -------
                      StoreLastMarkedCurriculum(
                        itemCode,
                        list.curriculumItemId
                      );
                      // ---------------- STORE AS LAST POSITION -------

                      setselectedPracticeTest(list);
                  

                      setseletedCurriculumItem(list.curriculumItemId);

                      // Only execute if sectionID, curriclumID, and type are not null or undefined
                      if (sectionID && curriclumID && SyllabusType) {
                        router.replace(`/my-courses/${itemCode}`, undefined, {
                          shallow: true,
                        });
                      }

                      GetMyCoursesDetails(courseItemCode, setcourse);
                    }}
                    key={index}
                  >
                    <CardMainContainer
                      className={
                        seletedCurriculumItem == list.curriculumItemId &&
                        `custom-color`
                      }
                    >
                      <CardContainer
                        className={`m-1 p-0 ${
                          seletedCurriculumItem == list.curriculumItemId &&
                          `custom-color text-light`
                        }`}
                      >
                        <Form.Check
                          className="d-flex p-0"
                          checked={list.read}
                          type={"checkbox"}
                          id={`default-${index}`}
                          label={""}
                        />
                        <li className="d-flex">
                          <p
                            className={
                              seletedCurriculumItem == list.curriculumItemId
                                ? "text-light"
                                : ""
                            }
                            style={mainfs}
                          >
                            {index + 1}. <ListAltIcon /> Practice Test :{" "}
                            {list.title}
                            <p
                              className={`m-1 p-0 ${
                                seletedCurriculumItem === list.curriculumItemId
                                  ? "text-light"
                                  : ""
                              }`}
                            >
                              {list.description.replace(/<\/?[^>]+(>|$)/g, "")}
                            </p>
                          </p>
                        </li>
                      </CardContainer>
                    </CardMainContainer>
                  </span>
                )}

                {/* Coding Exercise */}
                {list.curriculum_item_type == "Coding Exercise" && (
                  <span
                    onClick={() => {
                      setCodingExerciseActiveStep(0);
                      setarticle("");
                      setshowVideoPlayer(false);
                      setshowAssignment(false);
                      setshowquiz(false);
                      setshowPracticeTest(false);
                      setshowCodingExercise(true);

                      //  --------------------- CALCULATE THE MARK --------------------
                      UpdateCourseCurriculumProgress(
                        itemCode,
                        list.curriculumItemId,
                        setcourse
                      );
                      //  --------------------- CALCULATE THE MARK --------------------

                      // ---------------- STORE AS LAST POSITION -------
                      StoreLastMarkedCurriculum(
                        itemCode,
                        list.curriculumItemId
                      );
                      // ---------------- STORE AS LAST POSITION -------

                      setselectedCodingExercise(list);
                      setseletedCurriculumItem(list.curriculumItemId);
                  

                      // Only execute if sectionID, curriclumID, and type are not null or undefined
                      if (sectionID && curriclumID && SyllabusType) {
                        router.replace(`/my-courses/${itemCode}`, undefined, {
                          shallow: true,
                        });
                      }

                      GetMyCoursesDetails(courseItemCode, setcourse);
                    }}
                    key={index}
                  >
                    <CardMainContainer
                      className={
                        seletedCurriculumItem == list.curriculumItemId &&
                        `custom-color`
                      }
                    >
                      <CardContainer
                        className={`m-1 p-0 ${
                          seletedCurriculumItem == list.curriculumItemId &&
                          `custom-color text-light`
                        }`}
                      >
                        <Form.Check
                          className="mb-4 p-0"
                          checked={list.read}
                          type={"checkbox"}
                          id={`default-${index}`}
                          label={""}
                        />
                        <li className="d-flex">
                          <p
                            className={
                              seletedCurriculumItem == list.curriculumItemId
                                ? "text-light"
                                : ""
                            }
                            style={mainfs}
                          >
                            {index + 1}. <CodeIcon /> Coding Exercise :{" "}
                            {list.title}
                            <p
                              className={`m-1 p-0 ${
                                seletedCurriculumItem === list.curriculumItemId
                                  ? "text-light"
                                  : ""
                              }`}
                            >
                              {list.description.replace(/<\/?[^>]+(>|$)/g, "")}
                            </p>
                          </p>
                        </li>
                      </CardContainer>
                    </CardMainContainer>
                  </span>
                )}
              </React.Fragment>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Accordian;

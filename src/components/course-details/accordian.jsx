import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";

import ReactDOM from "react-dom";
import ModalVideo from "react-modal-video";
import { IMG_HOST, VideoStreaming } from "../../api";

import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const mainfs = {
  fontSize: "clamp(0.8rem, 0.6rem + 0.6vw, 1.5rem)",
};

const Accordian = ({ show = false, id, title, lectures, lists, no_quiz }) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedURL, setselectedURL] = useState("");

  const isContentAvailable =
    lectures > 0 || (lists && lists.length > 0) || no_quiz > 0;

  const assignmentCount =
    lists && lists.length > 0
      ? lists.filter((item) => item.curriculum_item_type === "Assignment")
          .length
      : 0;

  const codingExerciseCount =
    lists && lists.length > 0
      ? lists.filter((item) => item.curriculum_item_type === "Coding Exercise")
          .length
      : 0;

  const practiceTestCount =
    lists && lists.length > 0
      ? lists.filter((item) => item.curriculum_item_type === "Practice Test")
          .length
      : 0;

  const handleVideoModal = async (url) => {
    // Call VideoStreaming function to get the video URL
    const streamingURL = await VideoStreaming(url);

    // Use SweetAlert to display the video in a custom modal
    Swal.fire({
      html: `<video width="100%" controls autoplay>
              <source src="${streamingURL}" type="video/mp4">
              Your browser does not support the video tag.
             </video>`,
      showCloseButton: true,
      showConfirmButton: false, // Hide the confirm button
      width: "80%", // Adjust the width as needed
      padding: "1rem",
    });
  };

  return (
    <>
      {isContentAvailable && (
        <div className="accordion-item mb-2">
          <p className="accordion-header">
            <button
              className={`px-3 px-sm-3 px-md-4 px-lg-5 accordion-button d-flex justify-content-between ${
                show ? "" : "collapsed"
              }`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#question-${id}`}
              aria-expanded={show ? "true" : "false"}
            >
              <h2 className="title m-0 p-0" style={mainfs}>
                {title.length > 30 ? `${title.slice(0, 30)}...` : title}
              </h2>
              <span className="m-0 p-0 pe-5" style={mainfs}>
                {lectures > 0 && (
                  <>
                    {" "}
                    • {lectures} {lectures === 1 ? "Lecture" : "Lectures"}
                  </>
                )}
                {no_quiz > 0 && (
                  <>
                    {" "}
                    • {no_quiz} {no_quiz === 1 ? "Quiz" : "Quizzes"}
                  </>
                )}
                {assignmentCount > 0 && (
                  <>
                    {" "}
                    • {assignmentCount}{" "}
                    {assignmentCount === 1 ? "Assignment" : "Assignments"}
                  </>
                )}
                {codingExerciseCount > 0 && (
                  <>
                    {" "}
                    • {codingExerciseCount}{" "}
                    {codingExerciseCount === 1
                      ? "Coding exercise"
                      : "Coding exercises"}
                  </>
                )}
                {practiceTestCount > 0 && (
                  <>
                    {" "}
                    • {practiceTestCount}{" "}
                    {practiceTestCount === 1
                      ? "Practice Test"
                      : "Practice Tests"}
                  </>
                )}
              </span>
            </button>
          </p>
          <div
            id={`question-${id}`}
            className={`accordion-collapse collapse ${show ? "show" : ""}`}
            data-bs-parent="#faq-accordion"
          >
            <div className="accordion-body">
              <ul className="list-unstyled">
                {lists
                  .sort((a, b) => {
                    if (a.arrangeNo === null) return 1; 
                    if (b.arrangeNo === null) return -1; 
                    return a.arrangeNo - b.arrangeNo;
                  }).map((list, index) => (
                  <>
                    {/* Lecture */}
                    {list.curriculum_item_type === "Lecture" && (
                      <li
                        style={mainfs}
                        key={index}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span>
                          {list.article !== "N/A" ? (
                            <>
                              <i className="fa-solid fa-file mx-2"></i>{" "}
                              {list.title}
                            </>
                          ) : (
                            <>
                              {list &&
                                list.get_CurriculumItem_File &&
                                list.get_CurriculumItem_File.some(
                                  (link) =>
                                    link.curriculum_item_file_type === "Video"
                                ) && (
                                  <>
                                    <>
                                      {list.get_CurriculumItem_File
                                        .filter(
                                          (link) =>
                                            link.curriculum_item_file_type ===
                                            "Video"
                                        )
                                        .map((link, index) => (
                                          <span key={index}>
                                            {link.previewVideo ? (
                                              // Enable text decoration for preview videos
                                              <a
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                  handleVideoModal(link.url)
                                                }
                                                className="text-danger text-decoration-underline"
                                              >
                                                <i className="fa-solid fa-circle-play mx-2"></i>{" "}
                                                {list.title}
                                              </a>
                                            ) : (
                                              // Normal link for other videos
                                              <>
                                                <i className="fa-solid fa-circle-play mx-2"></i>{" "}
                                                {list.title}
                                              </>
                                            )}
                                          </span>
                                        ))}
                                    </>
                                  </>
                                )}
                            </>
                          )}
                        </span>
                      </li>
                    )}

                    {/* Quiz */}
                    {list.curriculum_item_type == "Quiz" && (
                      <li
                        style={mainfs}
                        key={index}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span>
                          <i className="fa-solid fa-circle-question mx-2"></i>{" "}
                          {list.title}
                        </span>
                      </li>
                    )}

                    {/* Assignment */}
                    {list.curriculum_item_type == "Assignment" && (
                      <li
                        style={mainfs}
                        key={index}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span>
                          <i className="fa-solid fa-list-check mx-2"></i>{" "}
                          {list.title}
                        </span>
                      </li>
                    )}

                    {/* Coding Exercise */}
                    {list.curriculum_item_type == "Coding Exercise" && (
                      <li
                        style={mainfs}
                        key={index}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span>
                          <i className="fa-solid fa-code mx-2"></i> {list.title}
                        </span>
                      </li>
                    )}

                    {/* Practical Exercise */}
                    {list.curriculum_item_type == "Practice Test" && (
                      <li
                        style={mainfs}
                        key={index}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span>
                          <i className="fa-solid fa-book mx-2"></i> {list.title}
                        </span>
                      </li>
                    )}
                  </>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <React.Fragment>
        <ModalVideo
          channel="custom"
          //   controls="0"
          isOpen={isOpen}
          url={`${selectedURL}`}
          onClose={() => setOpen(false)}
        />
      </React.Fragment>
    </>
  );
};

export default Accordian;

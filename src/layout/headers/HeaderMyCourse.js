import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import CommentFormCourse from "../../components/forms/comment-form-course";
import { DownloadCertificate } from "../../api";

const HeaderMyCourse = ({ id, course }) => {
  // ------------- REVIEW ----------------------
  const [showReviewModal, setshowReviewModal] = useState(false);

  const handleCloseReview = () => setshowReviewModal(false);
  const handleShowReview = () => setshowReviewModal(true);

  // ------------- REVIEW ----------------------



  // -------------------- DOWNLOAD CERTIFICATE -----------
  const handleDownloadCertificate = () => {
    console.log(id)

    DownloadCertificate(id)

  }

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container className="justify-content-center mx-5">
          <Navbar.Brand href="/">
            <img
              width={150}
              height={60}
              className="logo-light"
              src="/assets/images/logo/Header_Athenos_logo.png"
              alt="logo"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="text-white">{course.title}</Nav.Link>
            </Nav>

            <Nav className="d-flex align-items-center float-end">
              <Nav.Link
                style={{ fontSize: "12px" }}
                onClick={handleShowReview}
                className="text-white"
              >
                <i className="far fa-star"></i> Leave a rating
              </Nav.Link>

              <Nav.Link className="text-white">
                <div style={{ width: 40 }}>
                  <CircularProgressbar
                    value={Number.parseInt(course.progressValue)}
                    text={`${Number.parseInt(course.progressValue)}%`}
                    styles={{
                      path: {
                        stroke: course.progressValue == 100 ? "#66FF66" : "",
                        strokeWidth: 10,
                        transition: "stroke-dashoffset 0.5s ease 0s",
                      },
                      text: {
                        fill: course.progressValue == 100 ? "#66FF66" : "",
                        fontWeight: "bold", 
                        fontSize: "24px",
                        strokeWidth: 10,
                      },
                    }}
                  />
                </div>
              </Nav.Link>

              <NavDropdown
                className="d-flex align-items-center p-2 mx-5"
                title="Your progress"
                id="collapsible-nav-dropdown"
              >
                {course.completedItemCount != course.allItemsCount ? (
                  <NavDropdown.Item>
                    <b>
                      {course.completedItemCount} of {course.allItemsCount}
                      {" "} Complete
                    </b>{" "}
                    <br /> Finish course to get the certificate
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item>
                    <b>
                      {course.completedItemCount} of {course.allItemsCount}
                      {" "}Complete
                    </b>{" "}
                    <br /> We have Emailed You The Certificate
                  </NavDropdown.Item>
                )}
              </NavDropdown>

              {course.completedItemCount == course.allItemsCount && (

              <Nav.Link>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="small"
                  startIcon={
                    <i
                      className="fa-solid fa-trophy"
                      style={{ fontSize: "11px"}}
                    ></i>
                  }
                  sx={{
                    display: "inline-flex", // Ensures the button is inline
                    fontSize: "9px",
                    color: "white",
                    borderColor: "white",
                    padding: "9px 10px", // Adjusts padding to ensure the text is inline
                    textTransform: "none", // Keeps the text as is (no uppercase transformation)
                    minWidth: "auto", // Prevents the button from having a minimum width
                    alignItems: "center", // Aligns icon and text vertically
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderColor: "white",
                    },
                  }}
                  onClick={handleDownloadCertificate}
                >
                  Get Certificate
                </Button>
              </Nav.Link>
              )}



            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Add Review */}
      <Modal show={showReviewModal} onHide={handleCloseReview}>
        <Modal.Header closeButton>Leave a Rating</Modal.Header>
        <Modal.Body>
          <CommentFormCourse course={course} id={id} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HeaderMyCourse;

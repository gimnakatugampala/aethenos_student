import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import CommentFormCourse from "../../components/forms/comment-form-course";
import { DownloadCertificate } from "../../api";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const mainfs = {
  fontSize: "calc(0.5rem + 0.6vw)",
};


const HeaderMyCourse = ({ setcourse, id, course }) => {
  // ------------- REVIEW ----------------------
  const [showReviewDialog, setShowReviewDialog] = useState(false);

  const handleCloseReview = () => setShowReviewDialog(false);
  const handleShowReview = () => setShowReviewDialog(true);

  // ------------- REVIEW ----------------------

  // -------------------- DOWNLOAD CERTIFICATE -----------
  const handleDownloadCertificate = () => {
    console.log(id);
    DownloadCertificate(id);
  };

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
              width={200}
              height={60}
              className="logo-light"
              src="/assets/images/logo/Header_Athenos_logo.png"
              alt="logo"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="text-white"  style={mainfs}>{course.title}</Nav.Link>
            </Nav>

            <Nav className="d-flex align-items-center float-end">
              <Nav.Link        
                onClick={handleShowReview}
                className="text-white"
                style={mainfs}
              >
                <i className="far fa-star"></i> Leave a rating
              </Nav.Link>

              <Nav.Link className="text-white">
                <div style={{ width: 50 }}>
                  <CircularProgressbar
                    value={Number.parseInt(course.progressValue)}
                    text={`${Number.parseInt(course.progressValue)}%`}
                    styles={{
                      path: {
                        stroke: course.progressValue === 100 ? "#66FF66" : "",
                        strokeWidth: 10,
                        transition: "stroke-dashoffset 0.5s ease 0s",
                      },
                      text: {
                        fill: course.progressValue === 100 ? "#66FF66" : "",
                        fontWeight: "bold",
                        fontSize: "24px",
                        strokeWidth: 10,
                      },
                    }}
                  />
                </div>
              </Nav.Link>

              <NavDropdown
                className="d-flex align-items-center p-2"
                title="Your progress"
                id="collapsible-nav-dropdown"
                style={mainfs}
              >
                {course.completedItemCount !== course.allItemsCount ? (
                  <NavDropdown.Item style={mainfs}>
                    <b  >
                      {course.completedItemCount} of {course.allItemsCount}
                      {" "} Complete
                    </b>{" "}
                    <br /> Finish course to get the certificate
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item style={mainfs}> 
                    <b  >
                      {course.completedItemCount} of {course.allItemsCount}
                      {" "}Complete
                    </b>{" "}
                    <br /> We have Emailed You The Certificate
                  </NavDropdown.Item>
                )}
              </NavDropdown>

              {course.completedItemCount === course.allItemsCount && (
                <Nav.Link>
                  <Button
                    variant="outlined"
                    color="inherit"
                    size="small"
                    startIcon={
                      <i
                        className="fa-solid fa-trophy"
                        style={{ fontSize: "11px" }}
                      ></i>
                    }
                    sx={{
                      display: "inline-flex",
                      fontSize: "9px",
                      color: "white",
                      borderColor: "white",
                      padding: "9px 10px",
                      textTransform: "none",
                      minWidth: "auto",
                      alignItems: "center",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderColor: "white",
                      },
                    }}
                    onClick={handleDownloadCertificate}
                    style={mainfs}
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
      <Dialog
        open={showReviewDialog}
        onClose={handleCloseReview}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            overflow: 'hidden', // Prevents overflow inside the dialog
          },
        }}
      >
        <DialogTitle>
          Leave a Rating
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseReview}
            aria-label="close"
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            overflowX: 'hidden', // Prevents horizontal overflow
          }}
        >
          <CommentFormCourse setcourse={setcourse} course={course} id={id} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HeaderMyCourse;

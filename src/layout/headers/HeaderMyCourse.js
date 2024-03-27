import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from "react";
import Button from '@mui/material/Button';
import CommentFormCourse from '../../components/forms/comment-form-course';


const HeaderMyCourse = ({id,course}) => {

      // ------------- REVIEW ----------------------
  const [showReviewModal, setshowReviewModal] = useState(false)

  const handleCloseReview = () => setshowReviewModal(false);
  const handleShowReview = () => setshowReviewModal(true);


  // ------------- REVIEW ----------------------

  return (
    <>
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                    <Container>

                        <Navbar.Brand href="#home"><img className="logo-light" src='/assets/images/logo/Header_Athenos_logo.png' alt="logo" /></Navbar.Brand>

                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">

                        <Nav className="me-auto">
                            <Nav.Link className='text-white'>{course.title}</Nav.Link>
                        </Nav>

                        <Nav className='d-flex align-items-center'>

                        <Nav.Link onClick={handleShowReview} className='text-white'><i className="far fa-star"></i> Leave a rating</Nav.Link>

                        <Nav.Link className='text-white'>
                            <div style={{ width: 40}}>    
                            <CircularProgressbar value={100} text={`100%`} />
                            </div>
                        </Nav.Link>

                            <NavDropdown className='d-flex align-items-center' title="Your progress" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                        </Navbar.Collapse>
                    </Container>
                    </Navbar>

        {/* Add Review */}
      <Modal show={showReviewModal} onHide={handleCloseReview}>
      <Modal.Header closeButton>Leave a Rating</Modal.Header>

      <Modal.Body>
      <CommentFormCourse id={id} />
      </Modal.Body>
    </Modal>
    </>
  )
}

export default HeaderMyCourse
import React, { useState } from "react";
import Link from "next/link";
import { Player } from 'video-react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
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


const CourseDetailsArea1 = ({ course }) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Ask a new Question
  const [showNewQuestion, setShowNewQuestion] = useState(false);

  const handleCloseNewQuestion = () => setShowNewQuestion(false);
  const handleShowNewQuestion = () => setShowNewQuestion(true);

  return (
    <section
      className="container my-5"
      style={{ textAlign: "left", backgroundColor: "transparent" }}>
        
        <div className="row">
            <div className="col-md-8">
            <Player>
                <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
              </Player>

              {/*  Tabs */}

              <div className="row">
                <div className="col-md-12">
                <Tabs
                defaultActiveKey="overview"
                id="uncontrolled-tab-example"
                className="my-3">

                    <Tab eventKey="overview" title="Overview">

                    <div className="mt-5">
                        <Typography variant="h4" gutterBottom>
                          Become a Figma Pro with our in depth Advanced Figma tutorial course.
                        </Typography>

                        <div className="row mt-5">

                            <div className="col-md-2">
                              <div className="d-flex align-items-center">
                                <h6 className="m-0 p-0">4.7</h6>
                                <Rating  size={20} iconsCount={1} initialValue={1} />
                              </div>
                                <span>559 ratings</span>
                            </div>

                            <div className="col-md-2">
                              <div className="d-flex align-items-center">
                                <h6 className="m-0 p-0">4,987</h6>
                              </div>
                                <span>Students</span>
                            </div>

                            <div className="col-md-2">
                              <div className="d-flex align-items-center">
                                <h6 className="m-0 p-0">16 hours</h6>
                              </div>
                                <span>Total</span>
                            </div>


                        </div>


                       
                        <div className="course-tab-content mt-5">
                            <div className="course-overview">
                                <h5 className="title m-0 p-0">What You’ll Learn?</h5>
                                <div className="row">
                                <ul className="col-md-6">
                                    <li >Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, officiis. Corrupti fuga minus, corporis cupiditate et nostrum neque in voluptatibus?</li>
                                    <li >Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, officiis. Corrupti fuga minus, corporis cupiditate et nostrum neque in voluptatibus?</li>
                                    <li >Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, officiis. Corrupti fuga minus, corporis cupiditate et nostrum neque in voluptatibus?</li>
                                </ul>
                                <ul className="col-md-6">
                                    <li >Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, officiis. Corrupti fuga minus, corporis cupiditate et nostrum neque in voluptatibus?</li>
                                    <li >Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, officiis. Corrupti fuga minus, corporis cupiditate et nostrum neque in voluptatibus?</li>
                                    <li >Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, officiis. Corrupti fuga minus, corporis cupiditate et nostrum neque in voluptatibus?</li>
                                </ul>
                                </div>
                            </div>
                        </div>

                        <h3 className="heading-title">Course Description</h3>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium aperiam excepturi, eaque adipisci itaque enim doloribus ratione voluptas asperiores error harum nemo quo nesciunt necessitatibus, repellat dolorem natus, iusto repudiandae!</p>


                        <h3 className="heading-title">Instructor</h3>
                        <a href="/instructor/gimnakatugampala">Gimna Katugampala</a>
                        <p>Adobe Certified Instructor & Adobe Certified Expert</p>

                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi beatae, eaque itaque aspernatur temporibus labore deleniti dolorem. Neque eos quisquam possimus reprehenderit, dolore non, maxime minus laboriosam atque doloribus sapiente similique, repudiandae sed quas eius aliquid! In nostrum exercitationem, harum molestiae delectus ad laboriosam perferendis veniam sunt, maxime labore? Nesciunt.</p>


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
                                    <li >Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, officiis. Corrupti fuga minus, corporis cupiditate et nostrum neque in voluptatibus?</li>
                                    <li >Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, officiis. Corrupti fuga minus, corporis cupiditate et nostrum neque in voluptatibus?</li>
                                    <li >Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, officiis. Corrupti fuga minus, corporis cupiditate et nostrum neque in voluptatibus?</li>
                                </ul>

                                </div>
                      

                      </div>

                    </Tab>

                    <Tab eventKey="qa" title="Q&A">
                      
                      <div className="row">
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

                      
                    </Tab>

                    <Tab eventKey="notes" title="Notes">
                      Tab content for Notes
                    </Tab>

                    <Tab eventKey="annoucements" title="Announcements">
                      Tab content for Announcements
                    </Tab>

                    <Tab eventKey="reviews" title="Reviews">
                      Tab content for Reviews
                    </Tab>

              </Tabs>
                </div>
              </div>


            </div>



            <div className="col-md-4">
              <Card style={{backgroundColor:'transparent'}}>
                  <Card.Header><h6 className="m-2">Course Content</h6></Card.Header>
                  <Card.Body>
                    
                  <Accordion defaultActiveKey="0">

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

             

                    </Accordion>

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

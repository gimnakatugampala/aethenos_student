import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import InputGroup from 'react-bootstrap/InputGroup';
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Footer, Header } from "../../../layout";

const profile = () => {
  const [key, setKey] = useState("editprofile");
  const inputRef = useRef(null);
  const [image, setImage] = useState("");

  return (
    <>
      <Header no_top_bar={true} />
      <div className="container">
        <div className="section1">
          <div className="profileimg">
            <img src="/assets/images/user.png" alt="user" />
            <div className="profile-name">
              <div className='user-name'>
              <h6 >Isuru Fernando</h6>
              </div>
              <div className="user-name2">
              <h6>isurufernando000@gmail.com</h6>
              </div>
              
            </div>
          </div>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
          >

            <Tab eventKey="editprofile" title="Edit Profile">
            <Form>
                <Row className="edit-profile">
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Frist Name</Form.Label>
                      <Form.Control type="text" placeholder="Isuru" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" placeholder="Fernando" />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Web Site</Form.Label>
                      <Form.Control type="url" placeholder="www.google.com" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Headdline</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Instructor at aethenos"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Label htmlFor="basic-url">Twitter</Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon3">
                        https://twitter.com/?lang=en
                      </InputGroup.Text>
                      <Form.Control
                        id="basic-url"
                        placeholder="UserName"
                        aria-describedby="basic-addon3"
                      />
                    </InputGroup>
                  </Col>
                  <Col>
                    <Form.Label htmlFor="basic-url">Facebook</Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon3">
                        https://www.facebook.com/
                      </InputGroup.Text>
                      <Form.Control
                        id="basic-url"
                        placeholder="UserName"
                        aria-describedby="basic-addon3"
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label htmlFor="basic-url">Linkedin</Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon3">
                        https://lk.linkedin.com/
                      </InputGroup.Text>
                      <Form.Control
                        id="basic-url"
                        placeholder="UserName"
                        aria-describedby="basic-addon3"
                      />
                    </InputGroup>
                  </Col>
                  <Col>
                    <Form.Label htmlFor="basic-url">Youtube</Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon3">
                        https://www.youtube.com/
                      </InputGroup.Text>
                      <Form.Control
                        id="basic-url"
                        placeholder="UserName"
                        aria-describedby="basic-addon3"
                        disabled
                      />
                    </InputGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Biography</Form.Label>
                      <Form.Control as="textarea" rows={8} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Label>Language</Form.Label>
                    <Form.Select>
                      <option>English (US)</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Form>

              <div className="button-group">
                <Button className="button1" variant="primary" size="lg">
                  Save
                </Button>{" "}
                <Button className="button2" variant="danger" size="lg">
                  Cancel
                </Button>{" "}
              </div>
            </Tab>
            <Tab eventKey="photo" title="Photo">
              <div style={{ marginTop: 20 }}>Image Preview</div>
              <div className="parent-div">
                <div className="child-div">
                  {image ? (
                    <img src={URL.createObjectURL(image)} alt="" />
                  ) : (
                    <img src="/assets/images/user.png" alt="" />
                  )}
                </div>
                <Form.Group controlId="formFileDisabled" className="mb-3">
                  <Form.Label
                    onClick={({ target }) => {
                      if (target.files) {
                        const file = target.files[0];
                        setImage(file);
                      }
                    }}
                  >
                    Add/ Change image
                  </Form.Label>
                  <Form.Control
                    type="file"
                    onChange={({ target }) => {
                      if (target.files) {
                        const file = target.files[0];
                        setImage(file);
                      }
                    }}
                  />
                </Form.Group>
                <Button className="button1" variant="primary" size="lg">
                  Save
                </Button>
              </div>
            </Tab>
            <Tab eventKey="account" title="Account">
              <div>
                <div className="acount-section">
                  <Col xs={4} md={1}>
                    <Image
                      src="/assets/images/user.png"
                      width={60}
                      height={60}
                      roundedCircle
                    />
                  </Col>
                  <p>
                    lI f in Fm a licensed therapist that specializes in family
                    and marriage counseling. I enjoy taking classes so I can
                    relate to more of my clients and understand them better.
                  </p>
                </div>
                <div className="social-icon">
                  <a href="#">
                    <img src="/assets/images/icons/twitter.png" />
                  </a>
                  <a href="#">
                    <img src="/assets/images/icons/facebook.png" />
                  </a>
                  <a href="#">
                    <img src="/assets/images/icons/linkedin.png" />
                  </a>
                </div>
                <div className="paragraf-section">
                  <h2>Editing Your Privacy Settings</h2>
                  <p>
                    You can access your privacy settings, and set whether you
                    wish to have your profile visible to logged in students and
                    instructors on the <a href="#">Privacy</a> page. In
                    addition, you can also set whether you wish to share what
                    courses you’re enrolled in on this page.
                    <br />
                    Only students and instructors who are logged into their
                    Udemy accounts can view another student’s account profile.
                    Profiles of instructors with published courses can be viewed
                    by students and instructors when they are logged in and
                    logged out.
                    <br />
                    Your privacy settings can be accessed by clicking on Privacy
                    on the left-hand side of your Profile page. To make your
                    profile or enrolled courses private, simply click on the
                    checkmark beside each option and click Save.
                  </p>
                  <h2>Related Support Articles</h2>
                  <div className="link-text">
                    <a href="#">Unsubscribe From Udemy Notifications</a>
                    <a href="#">Change Your Email Login</a>
                    <a href="#">Adding and Deleting Cards in Your Account</a>
                  </div>
                  <div className="article-helpful">
                    <h6>Was this article helpful?</h6>
                    <div className="icon-btn">
                      <a href="#">
                        <img src="/assets/images/icons/like.png" />
                      </a>
                      <a href="#">
                        <img
                          className="dislike"
                          src="/assets/images/icons/dislike.png"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="section-last">
                    <h6>Related Support Articles</h6>
                    <div className="link-text">
                      <a href="#">Unsubscribe From Udemy Notifications</a>
                      <a href="#">Change Your Email Login</a>
                      <a href="#">Adding and Deleting Cards in Your Account</a>
                    </div>
                  </div>
                  <Button className="button3" variant="outline-dark">
                    Contact Us
                  </Button>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default profile;

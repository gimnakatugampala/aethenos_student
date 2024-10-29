import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "@mui/material/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { Footer, Header } from "../../../layout";
import InputGroup from "react-bootstrap/InputGroup";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  GetStudentProfileDetails,
  IMG_HOST,
  PasswordReset,
  UpdateProfileDetails,
} from "../../../api";
import ErrorAlert from "../../../functions/Alert/ErrorAlert";
import PasswordChecklist from "react-password-checklist";

const ViewProfile = () => {
  const [first_Name, setfirst_Name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [headline, setheadline] = useState("");
  const [biography, setbiography] = useState("");
  const [website, setwebsite] = useState("");
  const [twitter, settwitter] = useState("");
  const [facebook, setfacebook] = useState("");
  const [linkedin, setlinkedin] = useState("");
  const [youtube, setyoutube] = useState("");
  const [profile_img, setprofile_img] = useState("");
  const [uploadImage, setuploadImage] = useState("");

  const [btn_loading, setbtn_loading] = useState(false);

  useEffect(() => {
    GetStudentProfileDetails(
      setfirst_Name,
      setlast_name,
      setheadline,
      setbiography,
      setwebsite,
      settwitter,
      setfacebook,
      setlinkedin,
      setyoutube,
      setprofile_img
    );
  }, []);

  // Save Profile Data
  const handleProfileData = () => {
    console.log(typeof uploadImage);
    console.log(first_Name);
    console.log(last_name);
    console.log(headline);
    console.log(biography);
    console.log(website);
    console.log(twitter);
    console.log(facebook);
    console.log(linkedin);
    console.log(youtube);

    if (first_Name == "") {
      ErrorAlert("Error", "Please Enter First Name");
      return;
    } else if (last_name == "") {
      ErrorAlert("Error", "Please Enter Last Name");
      return;
    }

    UpdateProfileDetails(
      uploadImage,
      first_Name,
      last_name,
      headline,
      biography,
      website,
      twitter,
      facebook,
      linkedin,
      youtube,
      setbtn_loading
    );
  };

  // Image Upload
  const handleImageUpload = (event) => {
    const input = event.target;
    setuploadImage(input.files[0]);

    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        console.log(e.target.result);
        setprofile_img(e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  };

  // Password Reset

  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isValidPassword, setisValidPassword] = useState(false);

  const [currentPassword, setcurrentPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const toggleCurrentPasswordVisibility = () => {
    setCurrentPasswordVisible(!currentPasswordVisible);
  };

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newPassword);
    console.log(confirmPassword);

    if (currentPassword == "") {
      ErrorAlert("Empty field", "Please enter the current password");
      return;
    }

    if (newPassword == "") {
      ErrorAlert("Empty field", "Please enter new password");
      return;
    }

    if (confirmPassword == "") {
      ErrorAlert("Empty field", "Please enter confirm password");
      return;
    }

    if (newPassword != confirmPassword) {
      ErrorAlert("Password mismatch", "The new passwords do not match");
      return;
    }

    if (isValidPassword == false) {
      ErrorAlert(
        "Password Error",
        "Your password is must be in the given criteria"
      );
      return;
    }

    PasswordReset(confirmPassword, currentPassword);
  };

  return (
    <>
      <Header no_top_bar={true} />

      <div className="mx-2 mx-xs-2 mx-sm-5 mt-5 mb-5  ">
        <h3>Profile & settings</h3>

        <Tabs
          defaultActiveKey="up"
          id="uncontrolled-tab-example"
          className="my-3"
        >
          <Tab  eventKey="up" title="Aethenos Profile">
            <div className="row mx-2">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    value={first_Name}
                    onChange={(e) => setfirst_Name(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    value={last_name}
                    onChange={(e) => setlast_name(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                  />
                </div>

                <label className="form-label">Headline</label>
                <div className="input-group mb-3">
                  <input
                    maxLength={60}
                    value={headline}
                    onChange={(e) => setheadline(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Instructor at Aethenos"
                  />
                  <span className="input-group-text">{60 - headline.length}</span>
                </div>

                <div className="mb-3">
                  <label className="form-label">Biography</label>
                  <textarea
                    value={biography}
                    onChange={(e) => setbiography(e.target.value)}
                    className="form-control"
                    rows="3"
                  ></textarea>
                </div>
              </div>

              <div className="col-md-6">
                {/* <div className="mb-3">
                  <label className="form-label">Website</label>
                  <input
                    value={website}
                    onChange={(e) => setwebsite(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="URL"
                  />
                </div> */}

                <label className="form-label">Twitter</label>
                <div className="input-group mb-3">
                  <span className="input-group-text">http://www.twitter.com/</span>
                  <input
                    value={twitter}
                    onChange={(e) => settwitter(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>

                <label className="form-label">Facebook</label>
                <div className="input-group mb-3">
                  <span className="input-group-text">http://www.facebook.com/</span>
                  <input
                    value={facebook}
                    onChange={(e) => setfacebook(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>

                <label className="form-label">LinkedIn</label>
                <div className="input-group mb-3">
                  <span className="input-group-text">http://www.linkedin.com/</span>
                  <input
                    value={linkedin}
                    onChange={(e) => setlinkedin(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>

                <label className="form-label">Youtube</label>
                <div className="input-group mb-3">
                  <span className="input-group-text">http://www.youtube.com/</span>
                  <input
                    value={youtube}
                    onChange={(e) => setyoutube(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end">
                {btn_loading ? (
                  <Button variant="">
                    <Spinner size="sm" animation="border" variant="light" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleProfileData}
                    variant=""
                    className="edu-btn btn-small float-end mx-3 mt-1"
                  >
                    Save
                  </Button>
                )}
              </div>
            </div>
          </Tab>

          <Tab eventKey="profile" title="Profile Picture">
            <div className="row mx-2 mx-xs-2 mx-sm-5 mb-5">
              <div className="col-md-6">
                <p className="m-0 p-0">
                  <b>Image preview</b>
                </p>
                <label>Minimum 200x200 pixels, Maximum 6000x6000 pixels</label>

                <div className="my-4 bg-light border p-3 text-center col-md-12">
                  {profile_img == "" && uploadImage == "" ? (
                    <img src="https://img-c.udemycdn.com/user/200_H/anonymous_3.png" />
                  ) : uploadImage != "" ? (
                    <img
                      style={{ height: "300px" }}
                      id="previewImage"
                      src={`${profile_img}`}
                    />
                  ) : (
                    <img
                      style={{ height: "300px" }}
                      id="previewImage"
                      src={`${IMG_HOST}${profile_img}`}
                    />
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">
                    Upload Image
                  </label>
                  <input
                    onChange={(e) => handleImageUpload(e)}
                    accept="image/*"
                    className="form-control"
                    type="file"
                    id="formFile"
                  />
                </div>

                <div className="d-flex justify-content-end">
                  {btn_loading ? (
                    <Button variant="">
                      <Spinner size="sm" animation="border" variant="light" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleProfileData}
                      variant=""
                      className="edu-btn btn-small float-end mx-3  mt-1"
                    >
                      Save
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Tab>


          <Tab eventKey="password-reset" title="Password Reset">
            <div className="row mt-5 mx-auto text-center" style={{justifyContent: "center"}}>
              <div className="col-md-8 text-center">
                <Form onSubmit={handleSubmit}>
                  <InputGroup className="mb-3">
                    <Form.Control
                      value={currentPassword}
                      type={currentPasswordVisible ? "text" : "password"}
                      placeholder="Current Password"
                      aria-label="Current Password"
                      aria-describedby="current-password-addon"
                      onChange={(e) => setcurrentPassword(e.target.value)}
                    />
                    <InputGroup.Text
                      id="current-password-addon"
                      onClick={toggleCurrentPasswordVisibility}
                    >
                      {currentPasswordVisible ? (
                        <VisibilityOffIcon />
                      ) : (
                        <RemoveRedEyeIcon />
                      )}
                    </InputGroup.Text>
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <Form.Control
                      value={newPassword}
                      type={newPasswordVisible ? "text" : "password"}
                      placeholder="New Password"
                      aria-label="New Password"
                      aria-describedby="new-password-addon"
                      onChange={(e) => setnewPassword(e.target.value)}
                    />
                    <InputGroup.Text
                      id="new-password-addon"
                      onClick={toggleNewPasswordVisibility}
                    >
                      {newPasswordVisible ? (
                        <VisibilityOffIcon />
                      ) : (
                        <RemoveRedEyeIcon />
                      )}
                    </InputGroup.Text>
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <Form.Control
                      value={confirmPassword}
                      type={confirmPasswordVisible ? "text" : "password"}
                      placeholder="Confirm Password"
                      aria-label="Confirm Password"
                      aria-describedby="confirm-password-addon"
                      onChange={(e) => setconfirmPassword(e.target.value)}
                    />
                    <InputGroup.Text
                      id="confirm-password-addon"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {confirmPasswordVisible ? (
                        <VisibilityOffIcon />
                      ) : (
                        <RemoveRedEyeIcon />
                      )}
                    </InputGroup.Text>
                  </InputGroup>

                  <PasswordChecklist
                    rules={[
                      "minLength",
                      "specialChar",
                      "number",
                      "capital",
                      "match",
                    ]}
                    minLength={5}
                    value={newPassword}
                    valueAgain={confirmPassword}
                    onChange={(isValid) => {
                      console.log(isValid);
                      setisValidPassword(isValid);
                    }}
                  />

                  <div className="col-md-5 mt-2" style={{display: "inline-block"}}>
                    <Button type="submit" variant="contained" className="edu-btn btn-small">
                      Change Password
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </Tab>

        </Tabs>
      </div>

      <Footer />
    </>
  );
};

export default ViewProfile;
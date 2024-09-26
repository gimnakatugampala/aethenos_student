import React from "react";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMouseMoveUI } from "../../contexts/mouse-move-context";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { InstructorSignUp } from "../../api";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import validateEmail from "../../functions/emailValid";
import { useRouter } from "next/router";

const HeroArea = () => {
  const { mouseDirection, mouseReverse } = useMouseMoveUI();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showPass, setshowPass] = useState(false);
  const [showConfirmPass, setshowConfirmPass] = useState(false);

  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [conpassword, setconpassword] = useState("");
  const [termsconditions, settermsconditions] = useState(false);

  const router = useRouter();

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (firstname == "") {
      Swal.fire({
        title: "Empty Field!",
        text: "Please Fill First Name",
        icon: "error",
      });
    } else if (lastname == "") {
      Swal.fire({
        title: "Empty Field!",
        text: "Please Fill Last Name",
        icon: "error",
      });
    } else if (email == "") {
      Swal.fire({
        title: "Empty Field!",
        text: "Please Fill Email Address",
        icon: "error",
      });
    } else if (password == "") {
      Swal.fire({
        title: "Empty Field!",
        text: "Please Fill Password",
        icon: "error",
      });
    } else if (conpassword == "") {
      Swal.fire({
        title: "Empty Field!",
        text: "Please Fill Confirm Password",
        icon: "error",
      });
    } else if (!validateEmail(email)) {
      Swal.fire({
        title: "Email Error!",
        text: "Please Enter a Valid Email Address",
        icon: "error",
      });
    } else if (password != conpassword) {
      Swal.fire({
        title: "Password Error!",
        text: "Passwords do not match",
        icon: "error",
      });
    } else if (password.length < 8 || conpassword < 8) {
      Swal.fire({
        title: "Password Error!",
        text: "Password must be at least 8 characters or more",
        icon: "error",
      });
    } else if (termsconditions == false) {
      Swal.fire({
        title: "Terms & Conditions Error!",
        text: "Please Accept our Terms & Conditions",
        icon: "error",
      });
    } else {
      InstructorSignUp(firstname, lastname, email, conpassword, router);
      // console.log(firstname)
      // console.log(lastname)
      // console.log(email)
      // console.log(password)
      // console.log(conpassword)
    }
  };

  return (
    <div className="hero-banner hero-style-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-4">
            <div className="banner-content">
              <h2
                className="title"
                data-sal-delay="100"
                data-sal="slide-up"
                data-sal-duration="1000"
              >
              Join Our Online Course Marketplace as an Instructor!
              </h2>
              <p
                data-sal-delay="200"
                data-sal="slide-up"
                data-sal-duration="1000"
              >
               Are you passionate about teaching and sharing your knowledge with a global audience? Join our vibrant community of instructors and start creating impactful courses today!
              </p>
              <div
                className="banner-btn"
                data-sal-delay="400"
                data-sal="slide-up"
                data-sal-duration="1000"
              >
                <a style={{cursor: 'pointer'}} onClick={handleShow} className="edu-btn btn-medium">
                Sign Up as an Instructor
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="banner-thumbnail">
              <div
                className="thumbnail"
                data-sal-delay="500"
                data-sal="slide-left"
                data-sal-duration="1000"
              >
                <img
                  src="/assets/images/instructor/instructor-hero.jpg"
                  alt="Couple Image"
                />
              </div>
            
            </div>
          </div>
        </div>
      </div>
      {/* <ul className="shape-group">
        <motion.li
          className="shape-1 scene"
          data-sal-delay="1000"
          data-sal="fade"
          data-sal-duration="1000"
          animate={{
            x: mouseReverse(30).x,
            y: mouseReverse(30).y,
          }}
        >
          <img src="/assets/images/others/shape-05.png" alt="Shape" />
        </motion.li>

        <motion.li
          className="shape-2 scene"
          data-sal-delay="1000"
          data-sal="fade"
          data-sal-duration="1000"
          animate={{
            x: mouseDirection(50).x,
            y: mouseDirection(50).y,
          }}
        >
          <img src="/assets/images/others/shape-04.png" alt="Shape" />
        </motion.li>

        <motion.li
          className="shape-3 scene"
          data-sal-delay="1000"
          data-sal="fade"
          data-sal-duration="1000"
          animate={{
            x: mouseDirection(30).x,
            y: mouseDirection(30).y,
          }}
        >
          <img src="/assets/images/others/shape-03.png" alt="Shape" />
        </motion.li>

        <motion.li
          className="shape-4 scene"
          data-sal-delay="1000"
          data-sal="fade"
          data-sal-duration="1000"
          animate={{
            x: mouseDirection(30).x,
            y: mouseDirection(30).y,
          }}
        >
          <img src="/assets/images/others/shape-02.png" alt="Shape" />
        </motion.li>

        <motion.li
          className="shape-5 scene"
          data-sal-delay="1000"
          data-sal="fade"
          data-sal-duration="1000"
          animate={{
            x: mouseReverse(30).x,
            y: mouseReverse(30).y,
          }}
        >
          <img src="/assets/images/others/shape-01.png" alt="Shape" />
        </motion.li>
      </ul> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="m-0 p-0">
            Become an Aethenos instructor
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={onFormSubmit}>
            <div class="mb-3">
              <label htmlFor="exampleFormControlInput1" class="form-label">
                First Name
              </label>
              <input
                onChange={(e) => setfirstname(e.target.value)}
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="First name"
              />
            </div>
            <div class="mb-3">
              <label htmlFor="exampleFormControlInput1" class="form-label">
                Last Name
              </label>
              <input
                onChange={(e) => setlastname(e.target.value)}
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Last name"
              />
            </div>
            <div class="mb-3">
              <label htmlFor="exampleFormControlInput1" class="form-label">
                Email
              </label>
              <input
                onChange={(e) => setemail(e.target.value)}
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Email"
              />
            </div>

            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group mb-3">
              <input
                onChange={(e) => setpassword(e.target.value)}
                type={showPass ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="Password"
                aria-label="Password"
              />
              <span className="input-group-text" id="basic-addon2">
                {showPass ? (
                  <span
                    onClick={() => setshowPass(!showPass)}
                    className="password-show"
                  >
                    <i className="fas fa-eye-slash fa-lg"></i>
                  </span>
                ) : (
                  <span
                    onClick={() => setshowPass(!showPass)}
                    className="password-show"
                  >
                    <i className="far fa-eye fa-lg"></i>
                  </span>
                )}
              </span>
            </div>

            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <div className="input-group mb-3">
              <input
                onChange={(e) => setconpassword(e.target.value)}
                type={showConfirmPass ? "text" : "password"}
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm Password"
                aria-label="Confirm Password"
              />
              <span className="input-group-text" id="basic-addon2">
                {showConfirmPass ? (
                  <span
                    onClick={() => setshowConfirmPass(!showConfirmPass)}
                    className="password-show"
                  >
                    <i className="fas fa-eye-slash fa-lg"></i>
                  </span>
                ) : (
                  <span
                    onClick={() => setshowConfirmPass(!showConfirmPass)}
                    className="password-show"
                  >
                    <i className="far fa-eye fa-lg"></i>
                  </span>
                )}
              </span>
            </div>

            <div className="form-group chekbox-area">
              <div className="edu-form-check">
                <input
                  value={termsconditions}
                  onChange={(e) => settermsconditions(e.target.checked)}
                  type="checkbox"
                  name="terms"
                  id="terms-condition"
                />
                <label htmlFor="terms-condition">
                  I agree the User Agreement and{" "}
                  <Link href="/terms-condition">Terms & Condition.</Link>
                </label>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <button type="submit" className="edu-btn btn-small w-100">
                  SignUp
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default HeroArea;

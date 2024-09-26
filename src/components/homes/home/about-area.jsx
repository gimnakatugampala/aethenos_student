import useModal from "../../../hooks/use-modal";
import VideoModal from "../../common/popup-modal/video-modal";
import { motion } from "framer-motion";
import { useMouseMoveUI } from "../../../contexts/mouse-move-context";

// const features_list = ['Expert Trainers','Online Remote Learning','Lifetime Access']

const mainfs = {
  fontSize: "clamp(0.5rem, calc(0.5rem + 0.8vw), 2rem)",
};

const AboutArea = () => {
  const { isVideoOpen, setIsVideoOpen } = useModal();
  const { mouseDirection, mouseReverse } = useMouseMoveUI();
  return (
    <>
      <div className="gap-bottom-equal edu-about-area about-style-1">
        <div className="container edublink-animated-shape">
          <div className="row g-5 align-items-center">
            <div className="col-6">
              <div className="about-image-gallery d-flex justify-content-center">
                <img
                  className="w-75"
                  src="/assets/images/instructor/instructerGetStarted.jpg"
                  alt="About Image"
                />
                <div
                  className="video-box"
                  data-sal-delay="150"
                  data-sal="slide-down"
                  data-sal-duration="800"
                >
                  {/* <div className="inner">
                                        <div className="thumb">
                                            <img src="/assets/images/about/about-02.webp" alt="About Image" />
                                            <button onClick={() => setIsVideoOpen(true)} className="popup-icon video-popup-activation border-0">
                                            <i className="icon-18"></i>
                                            </button>
                                        </div>
                                        <div className="loading-bar">
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div> */}
                </div>
                <div className="award-status bounce-slide">
                  {/* <div className="inner">
                                        <div className="icon">
                                            <i className="icon-21"></i>
                                        </div>
                                        <div className="content">
                                            <h6 className="title">29+</h6>
                                            <span className="subtitle">Wonderful Awards</span>
                                        </div>
                                    </div> */}
                </div>
                {/* <ul className="shape-group">
                  <motion.li
                    className="shape-1 scene"
                    data-sal-delay="500"
                    data-sal="fade"
                    data-sal-duration="200"
                    animate={{
                      x: mouseReverse(25).x,
                      y: mouseReverse(25).y,
                    }}
                  >
                    <img src="/assets/images/about/shape-36.png" alt="Shape" />
                  </motion.li>
                  <motion.li
                    className="shape-2 scene"
                    data-sal-delay="500"
                    data-sal="fade"
                    data-sal-duration="200"
                    animate={{
                      x: mouseDirection(25).x,
                      y: mouseDirection(25).y,
                    }}
                  >
                    <img src="/assets/images/about/shape-37.png" alt="Shape" />
                  </motion.li>
                  <motion.li
                    className="shape-3 scene"
                    data-sal-delay="500"
                    data-sal="fade"
                    data-sal-duration="200"
                    animate={{
                      x: mouseReverse(25).x,
                      y: mouseReverse(25).y,
                    }}
                  >
                    <img src="/assets/images/about/shape-02.png" alt="Shape" />
                  </motion.li>
                </ul> */}
              </div>
            </div>
            <div
              className="col-6"
              data-sal-delay="150"
              data-sal="slide-left"
              data-sal-duration="800"
            >
              <div className="about-content">
                <div className="section-title section-left">
                  {/* <span className="pre-title">About Us</span> */}
                  {/* <span className="color-secondary">Anywhere</span> */}
                  <h2 className="title">How to Get Started: </h2>
                  {/* <span className="shape-line"><i className="icon-19"></i></span> */}
                  {/* <p>Lorem ipsum dolor sit amet consectur adipiscing elit sed eiusmod ex tempor incididunt labore dolore magna aliquaenim minim veniam quis nostrud exercitation ullamco laboris.</p> */}
                </div>
                <ol className="">
                  <li style={mainfs}>
                    {" "}
                    <b>Sign Up : </b> Create your instructor profile by filling
                    out our simple registration form.{" "}
                  </li>
                  <li style={mainfs}>
                    {" "}
                    <b>Create Your Course : </b> Use our intuitive course
                    creation tools to design engaging and interactive courses.{" "}
                  </li>
                  <li style={mainfs}>
                    {" "}
                    <b>Publish and Promote : </b>Once your
                    course is ready, publish it on our marketplace and reach
                    thousands of eager learners.{" "}
                  </li>
                  <li style={mainfs}>
                    {" "}
                    <b>Engage with Students : </b> Interact with your students
                    through Q&A, assignments, and feedback.{" "}
                  </li>
                </ol>
              </div>
            </div>
          </div>
          {/* <ul className="shape-group">
            <motion.li
              className="shape-1 circle scene"
              data-sal-delay="500"
              data-sal="fade"
              data-sal-duration="200"
              animate={{
                x: mouseDirection(25).x,
                y: mouseDirection(25).y,
              }}
            >
              <span className="d-block"></span>
            </motion.li>
          </ul> */}
        </div>
      </div>

      {/* video modal start */}
      <VideoModal
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId="PICj5tr9hcc"
      />
      {/* video modal end */}
    </>
  );
};

export default AboutArea;

import React, { useState } from "react";
import Link from "next/link";
import VideoArea from "./video-area";

const CourseDetailsArea1 = ({}) => {
  return (
    <section style={{ width: "500px" }}>
      <div class="edu-accordion course-curriculam" id="">

        <div class="accordion-item ">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-sal-delay="150"
              data-sal-duration="800"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
            Web Development Bootcamp
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
            <div class="edu-course course-style-4" >
                <div class="inner">
                  <div class="thumbnail">
                    <a href="/course-details/1">
                      <img
                        src="/assets/images/course/course-01/course-01.jpg"
                        alt="Course Thumb"
                        style={{ maxWidth: "175px", height: "100px" }}
                      />
                    </a>
                  </div>
                  <div class="">
                    <h6 class="title">
                      <a href="/E-Portal/course-details">
                        Web Development Bootcamp Part 1
                      </a>
                    </h6>
                    <div
                      className="progress"
                     
                    >
                      <div
                        className="progress-bar"
                        role="progressbar"
                        aria-valuenow="100"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{
                          width: "50%",
                          background: "rgb(50, 200, 157)",
                        }}
                      >
                        {/* Your content goes here */}
                      </div>
                    </div>
                    <ul class="course-meta"></ul>
                  </div>
                </div>
              </div>
              <div class="edu-course course-style-4" >
                <div class="inner">
                  <div class="thumbnail">
                    <a href="/course-details/1">
                      <img
                        src="/assets/images/course/course-01/course-02.jpg"
                        alt="Course Thumb"
                        style={{ maxWidth: "175px", height: "100px" }}
                      />
                    </a>
                  </div>
                  <div class="" >
                    <h6 class="title">
                      <a href="/E-Portal/course-details">
                      Web Development Bootcamp Part 2
                      </a>
                    </h6>
                    <div
                      className="progress"
                     
                    >
                      <div
                        className="progress-bar"
                        role="progressbar"
                        aria-valuenow="100"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{
                          width: "80%",
                          background: "rgb(50, 200, 157)",
                        }}
                      >
                        {/* Your content goes here */}
                      </div>
                    </div>
                    <ul class="course-meta"></ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              // style={{ width: "550px" }} // Set the width explicitly here
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
            Java Programming Masterclass 
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div class="edu-course course-style-4" >
                <div class="inner">
                  <div class="thumbnail">
                    <a href="/course-details/1">
                      <img class=""
                        src="/assets/images/course/course-01/course-03.jpg"
                        alt="Course Thumb"
                        
                      />
                    </a>
                  </div>
                  <div class="">
                    <h6 class="title">
                      <a href="/E-Portal/course-details">
                        The Complete 2023 Web Development Bootcamp
                      </a>
                    </h6>
                    
                    <div
                      className="progress"
                      style={{ marginTop: "10px", marginBottom: "10px" }}
                    >
                      <div
                        className="progress-bar"
                        role="progressbar"
                        aria-valuenow="100"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{
                          width: "50%",
                          background: "rgb(50, 200, 157)",
                        }}
                      >
                        {/* Your content goes here */}
                      </div>
                    </div>
                    <ul class="course-meta"></ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Course Item 3
            </button>
          </h2>
          <div
            id="collapseThree"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div class="edu-course course-style-4" style={{ height: "auto" }}>
                <div class="inner">
                  <div class="thumbnail">
                    <a href="/course-details/1">
                      <img
                        src="/assets/images/course/course-01/course-01.jpg"
                        alt="Course Thumb"
                      />
                    </a>
                  </div>
                  <div class="">
                    <h6 class="title">
                      <a href="/E-Portal/course-details">
                        The Complete 2023 Web Development Bootcamp
                      </a>
                    </h6>
                    <div
                      className="progress"
                      style={{ marginTop: "10px", marginBottom: "10px" }}
                    >
                      <div
                        className="progress-bar"
                        role="progressbar"
                        aria-valuenow="100"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{
                          width: "50%",
                          background: "rgb(50, 200, 157)",
                        }}
                      >
                        {/* Your content goes here */}
                      </div>
                    </div>
                    <ul class="course-meta"></ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetailsArea1;

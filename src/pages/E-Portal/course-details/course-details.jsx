import React, { useState } from "react";
import Link from "next/link";
import VideoArea from "./video-area";
import CourseDetailsSidebar from "./side-bar"; // Import your sidebar component

const CourseDetailsArea1 = ({ course }) => {
  return (
    <section
      className="mt-5"
      style={{ textAlign: "left", backgroundColor: "transparent" }}
    >
      <div style={{ display: "flex" }}>
        <div
          class="card"
          style={{
            width: "100%",
            backgroundColor: "transparent",
            borderStyle: "none",
          }}
        >
          <h3
            class="mx-5"
            className="heading-title"
            data-sal-delay="150"
            data-sal="slide-up"
            data-sal-duration="400"
          >
            <div class="mx-5">Web Design for Web Developers: The Complete 2023 </div>
          </h3>
          <div classNames="">
          <VideoArea />
          </div>
        </div>
        <div>
          <h3
            class="mx-5"
            className="heading-title"
            data-sal-delay="150"
            data-sal="slide-up"
            data-sal-duration="400"
          >
            Course Content
          </h3>
          <CourseDetailsSidebar />
        </div>
      </div>
    </section>
  );
};

export default CourseDetailsArea1;

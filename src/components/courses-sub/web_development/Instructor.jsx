import React, { useState } from "react";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import StarIcon from "@mui/icons-material/Star";
import PersonIcon from "@mui/icons-material/Person";

const InstructorCarousel = () => {
  const items = [
    [
      {
        title: "1Web Development",
        link: "web-development-link-here",
        description: "Learn web development",
        rating: 4.5,
        students: 1000,
        courses: 10,
        image: "../../avatar.png",
      },
      {
        title: "2ReactJS",
        link: "reactjs-link-here",
        description: "Master ReactJS",
        rating: 4.8,
        students: 800,
        courses: 8,
        image: "../../avatar.png",
      },
      {
        title: "1Web Development",
        link: "web-development-link-here",
        description: "Learn web development",
        rating: 4.5,
        students: 1000,
        courses: 10,
        image: "../../avatar.png",
      },
      {
        title: "2ReactJS",
        link: "reactjs-link-here",
        description: "Master ReactJS",
        rating: 4.8,
        students: 800,
        courses: 8,
        image: "../../avatar.png",
      },
    ],
    [
      {
        title: "5Web Development",
        link: "web-development-link-here",
        description: "Learn web development",
        rating: 4.5,
        students: 1000,
        courses: 10,
        image: "../../avatar.png",
      },
      {
        title: "6ReactJS",
        link: "reactjs-link-here",
        description: "Master ReactJS",
        rating: 4.8,
        students: 800,
        courses: 8,
        image: "../../avatar.png",
      },
      {
        title: "5Web Development",
        link: "web-development-link-here",
        description: "Learn web development",
        rating: 4.5,
        students: 1000,
        courses: 10,
        image: "../../avatar.png",
      },
      {
        title: "6ReactJS",
        link: "reactjs-link-here",
        description: "Master ReactJS",
        rating: 4.8,
        students: 800,
        courses: 8,
        image: "../../avatar.png",
      },
    ],
  ];
  const [activePage, setActivePage] = useState(0);

  const handleNextPage = () => {
    setActivePage((prevPage) => (prevPage + 1) % items.length);
  };

  const handlePrevPage = () => {
    setActivePage((prevPage) => (prevPage - 1 + items.length) % items.length);
  };

  const arrowStyles1 = {
    color: "white",
    marginLeft: "-120px",
    marginTop: "0px",
    borderRadius: "50%",
    background: "black",
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const arrowStyles2 = {
    color: "white",
    marginLeft: "110px",
    marginTop: "0px",
    borderRadius: "50%",
    background: "black",
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div
      id="instructor-carousel"
      className="carousel slide p-5"
      data-bs-ride="carousel"
    >
      <style>
        {`
          /* Customize the carousel animation */
          .carousel-inner {
            display: flex;
            transition: transform 0.5s ease-in-out;
          }
          .carousel-item {
            flex: 0 0 100%;
          }
        `}
      </style>
      <div className="carousel-inner">
        {items.map((page, index) => (
          <div
            key={index}
            className={`carousel-item ${index === activePage ? "active" : ""}`}
          >
            <div className="d-flex flex-wrap">
              {page.map((item, itemIndex) => (
                <div key={itemIndex} className="col-3">
                  <div
                    className="btn btn-outline-dark fs-4 my-2 p-3 d-flex"
                    style={{
                      width: "250px",
                      marginLeft: "10px",
                      marginTop: "10px",
                      marginBottom: "10px",
                      borderRadius: "0",
                      transition: "background-color 0.3s",
                      backgroundColor: "transparent",
                      color: "inherit",
                      borderWidth: "2px",
                      borderColor: "#ADD8E6",
                      padding: "10px",
                      textAlign: "left",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#F0FFFF";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <div className="mr-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: "40px", height: "40px" }}
                      />
                    </div>
                    <div className="flex-grow-2" style={{ marginLeft: "10px" }}>
                      <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                        {item.title}
                      </div>
                      <div>
                        {item.description}
                        <br />
                        <span
                          style={{
                            fontWeight: "bold",
                            fontSize: "18px",
                            color: "#B4690E",
                          }}
                        >
                          {item.rating}
                        </span>
                        <StarIcon
                          style={{
                            fontSize: "20px",
                            color: "#B4690E",
                            marginLeft: "3px",
                          }}
                        />
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#B4690E",
                            marginLeft: "3px",
                          }}
                        >
                          Instructor Rating
                        </span>
                        <br />
                      </div>
                      <div>
                        <span
                          style={{
                            fontWeight: "bold",
                            fontSize: "15px",
                            color: "black",
                          }}
                        >
                          {item.students}
                        </span>
                        <span
                          style={{
                            fontWeight: "bold",
                            fontSize: "10px",
                            color: "black",
                          }}
                        >
                          {" "}
                          students
                        </span>
                        <br />
                      </div>
                      <div>
                        <span
                          style={{
                            fontWeight: "bold",
                            fontSize: "15px",
                            color: "black",
                          }}
                        >
                          {item.courses}
                          <span
                            style={{
                              fontWeight: "bold",
                              fontSize: "15px",
                              color: "black",
                            }}
                          >
                            <span
                              style={{
                                marginLeft: "5px",
                                fontSize: "12px",
                                color: "black",
                              }}
                            >
                              courses
                            </span>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="carousel-control-prev" onClick={handlePrevPage}>
        <div style={arrowStyles1}>
          <ArrowBackIosNewRoundedIcon style={{ fontSize: "20px" }} />
        </div>
      </div>
      <div className="carousel-control-next" onClick={handleNextPage}>
        <div style={arrowStyles2}>
          <ArrowForwardIosRoundedIcon style={{ fontSize: "20px" }} />
        </div>
      </div>
    </div>
  );
};

export default InstructorCarousel;

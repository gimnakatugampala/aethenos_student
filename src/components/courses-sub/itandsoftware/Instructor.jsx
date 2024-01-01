import React, { useState } from "react";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import StarIcon from "@mui/icons-material/Star";
import PersonIcon from "@mui/icons-material/Person";
import CardContainer from "../../../contexts/CardContainer";

const InstructorCarousel = () => {
  const items = [
    [
      {
        title: "John Doe",
        link: "web-development-link-here",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        rating: 4.5,
        students: 1000,
        courses: 10,
        image: "https://img-c.udemycdn.com/user/200_H/11614232_b0fc.jpg",
      },
      {
        title: "James Manner",
        link: "reactjs-link-here",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        rating: 4.8,
        students: 800,
        courses: 8,
        image: "https://img-c.udemycdn.com/user/200_H/11614232_b0fc.jpg",
      },
      {
        title: "Micheal Doe",
        link: "web-development-link-here",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        rating: 4.5,
        students: 1000,
        courses: 10,
        image: "https://img-c.udemycdn.com/user/200_H/11614232_b0fc.jpg",
      },
      {
        title: "John Jons",
        link: "reactjs-link-here",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        rating: 4.8,
        students: 800,
        courses: 8,
        image: "https://img-c.udemycdn.com/user/200_H/11614232_b0fc.jpg",
      },
    ],
    [
      {
        title: "James Moore",
        link: "web-development-link-here",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        rating: 4.5,
        students: 1000,
        courses: 10,
        image: "https://img-c.udemycdn.com/user/200_H/11614232_b0fc.jpg",
      },
      {
        title: "Sam Moore",
        link: "reactjs-link-here",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        rating: 4.8,
        students: 800,
        courses: 8,
        image: "https://img-c.udemycdn.com/user/200_H/11614232_b0fc.jpg",
      },
      {
        title: "Sean Mask",
        link: "web-development-link-here",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        rating: 4.5,
        students: 1000,
        courses: 10,
        image: "https://img-c.udemycdn.com/user/200_H/11614232_b0fc.jpg",
      },
      {
        title: "Tom Sawyer",
        link: "reactjs-link-here",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        rating: 4.8,
        students: 800,
        courses: 8,
        image: "https://img-c.udemycdn.com/user/200_H/11614232_b0fc.jpg",
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
    marginLeft: "-150px",
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
            <div className="row">
              {page.map((item, itemIndex) => (
                <CardContainer key={itemIndex} className="col-md-4 mb-3">
                  <a href="/users/123">
                  <div
                    className="btn fs-4 p-3 d-flex"
                    style={{
                      borderRadius: "0",
                      transition: "background-color 0.3s",
                      backgroundColor: "transparent",
                      color: "inherit",
                      textAlign: "left",
                    }}
                  >
                    <div className="mr-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: "60px", height: "40px" ,borderRadius:'50%'}}
                      />
                    </div>
                    <div className="flex-grow-2" style={{ marginLeft: "10px" }}>
                      <h6 style={{ fontWeight: "bold", fontSize: "16px" }}>
                        {item.title.length > 12 ?  item.title.slice(0, 17) + "..." : item.title}
                      </h6>
                      <div>
                      <p className="m-0" style={{fontSize:'13px'}}>{item.description.length > 10 ?  item.description.slice(0, 50) + "...": item.description}</p>
                      </div>

                      <div className="d-flex align-items-center my-2">

                      <span>
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
                          }}
                        />
                        </span>

                        <p
                        className="m-0 p-0 align-self-center mt-1 ml-1"
                          style={{
                            fontSize: "12px",
                            color: "#B4690E",
                          }}
                        >
                          Instructor Rating
                        </p>

                      </div>
                        
                  
                      

                      <div>

                      

                      <div className="d-flex align-items-center">
                        <p
                        className="mx-1 mb-0 mt-0"
                          style={{
                            fontWeight: "bold",
                            fontSize: "15px",
                            // color: "black",
                          }}
                        >
                          {item.students}
                        </p>
                        <p
                         className="mx-1 mb-0 mt-0"
                          style={{
                            // fontWeight: "bold",
                            fontSize: "13px",
                            // color: "black",
                          }}
                        >
                          {" "}
                          students
                        </p>

                      </div>
            
                      <div className="d-flex align-items-center">
                        <p
                        className="mx-1 mb-0 mt-0"
                          style={{
                            fontWeight: "bold",
                            fontSize: "15px",
                            // color: "black",
                          }}
                        >
                          {item.courses}
                          </p>
                            <p
                             className="mx-1 mb-0 mt-0"
                              style={{
                                marginLeft: "5px",
                                fontSize: "13px",
                                // color: "black",
                              }}
                            >
                              courses
                            </p>  
                      </div>

                      </div>

                    </div>
                  </div>
                  </a>
                </CardContainer>
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

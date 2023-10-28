import React, { useState } from "react";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import CardContainer from "../../../contexts/CardContainer";

const ButtonCarousel = () => {
  const items = [
    [
      { title: "Web Development", link: "web-development-link-here" },
      { title: "Software Development", link: "reactjs-link-here" },
      { title: "React JS", link: "css-link-here" },
      { title: "Redux Framework", link: "redux-framework-link-here" },
      { title: "Data Scientist", link: "web-development-link-here" },
      { title: "Artificial Intelligence", link: "reactjs-link-here" },
      { title: "HTML & CSS", link: "css-link-here" },
      { title: "Accounting", link: "redux-framework-link-here" },
    ],
    [
      { title: "Stock Trading", link: "typescript-link-here" },
      { title: "Financial Analysis", link: "javascript-link-here" },
      { title: "Cryptocurrency", link: "angular-link-here" },
      { title: "Forex Trading", link: "nodejs-link-here" },
      { title: "Financial Market", link: "typescript-link-here" },
      { title: "Alogorithm Anaylisys", link: "javascript-link-here" },
      { title: "Investing", link: "angular-link-here" },
      { title: "Excel", link: "nodejs-link-here" },
    ],
    [
      { title: "Day Trading", link: "web-development-link-here" },
      { title: "Quick Books Online", link: "reactjs-link-here" },
      { title: "Book Keeping", link: "css-link-here" },
      { title: "Finance Fundamentals", link: "redux-framework-link-here" },
      { title: "Options Trading", link: "web-development-link-here" },
      { title: "Financial Modeling", link: "reactjs-link-here" },
      { title: "Word", link: "css-link-here" },
      { title: "Presenting", link: "redux-framework-link-here" },
    ],
    [
      { title: "Technical Analysis", link: "typescript-link-here" },
      { title: "Web Development", link: "javascript-link-here" },
      { title: "IOT", link: "angular-link-here" },
      { title: "Robotics", link: "nodejs-link-here" },
      { title: "Database Management", link: "typescript-link-here" },
      { title: "Mobile Development", link: "javascript-link-here" },
      { title: "Statistics", link: "angular-link-here" },
      { title: "IMP", link: "nodejs-link-here" },
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
      id="button-carousel"
      className="carousel slide p-5"
      data-bs-ride="carousel"
    >
      <style>
        {`
          /* Customize the carousel animation */
          .carousel-inner {
            display: flex;
            transition: transform 0.5s ease-in-out; /* Change the timing function and duration */
          }
          .carousel-item {
            flex: 0 0 100%; /* Ensure each item takes up the full width */
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
                <div key={itemIndex} className="col-md-3">
                  <CardContainer
                    className="m-2"
                  >
                    <a href={`/courses/${item.link}`}>{item.title}</a>
                  </CardContainer>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <a
        className="carousel-control-prev"
        href="#button-carousel"
        role="button"
        data-bs-slide="prev"
        onClick={handlePrevPage}
      >
        <span
          className="carousel-control-prev-icon"
          aria-hidden="true"
          style={arrowStyles1}
        >
          <ArrowBackIosNewRoundedIcon style={{ fontSize: "20px" }} />
        </span>
      </a>
      <a
        className="carousel-control-next"
        href="#button-carousel"
        role="button"
        data-bs-slide="next"
        onClick={handleNextPage}
      >
        <span
          className="carousel-control-next-icon"
          ariahidden="true"
          style={arrowStyles2}
        >
          <ArrowForwardIosRoundedIcon style={{ fontSize: "20px" }} />
        </span>
      </a>
    </div>
  );
};

export default ButtonCarousel;

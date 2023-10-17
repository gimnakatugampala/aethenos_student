import React, { useState } from "react";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

const ButtonCarousel = () => {
  const items = [
    [
      { title: "1Web Development", link: "web-development-link-here" },
      { title: "2ReactJS", link: "reactjs-link-here" },
      { title: "3CSS", link: "css-link-here" },
      { title: "4Redux Framework", link: "redux-framework-link-here" },
      { title: "5Web Development", link: "web-development-link-here" },
      { title: "6ReactJS", link: "reactjs-link-here" },
      { title: "7CSS", link: "css-link-here" },
      { title: "8Redux Framework", link: "redux-framework-link-here" },
    ],
    [
      { title: "9Typescript", link: "typescript-link-here" },
      { title: "10Javascript", link: "javascript-link-here" },
      { title: "11Angular", link: "angular-link-here" },
      { title: "12Node.Js", link: "nodejs-link-here" },
      { title: "13Typescript", link: "typescript-link-here" },
      { title: "14Javascript", link: "javascript-link-here" },
      { title: "15Angular", link: "angular-link-here" },
      { title: "16Node.Js", link: "nodejs-link-here" },
    ],
    [
      { title: "17Web Development", link: "web-development-link-here" },
      { title: "18ReactJS", link: "reactjs-link-here" },
      { title: "19CSS", link: "css-link-here" },
      { title: "20Redux Framework", link: "redux-framework-link-here" },
      { title: "21Web Development", link: "web-development-link-here" },
      { title: "22ReactJS", link: "reactjs-link-here" },
      { title: "23CSS", link: "css-link-here" },
      { title: "24Redux Framework", link: "redux-framework-link-here" },
    ],
    [
      { title: "25Typescript", link: "typescript-link-here" },
      { title: "26Javascript", link: "javascript-link-here" },
      { title: "27Angular", link: "angular-link-here" },
      { title: "28Node.Js", link: "nodejs-link-here" },
      { title: "29Typescript", link: "typescript-link-here" },
      { title: "30Javascript", link: "javascript-link-here" },
      { title: "31Angular", link: "angular-link-here" },
      { title: "32Node.Js", link: "nodejs-link-here" },
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
                <div key={itemIndex} className="col-3">
                  <a
                    href={item.link}
                    className="btn btn-outline-dark text-center fs-4 my-2"
                    style={{
                      fontWeight: "900",
                      width: "250px",
                      marginLeft: "10px",
                      paddingRight: "10px",
                      marginTop: "10px",
                      marginBottom: "10px",
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "0",
                      transition: "background-color 0.3s",
                      backgroundColor: "transparent",
                      color: "inherit",
                      borderWidth: "0.0005px",
                      borderColor: "#ADD8E6",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#F0FFFF";
                      e.target.style.color = "inherit";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "inherit";
                    }}
                  >
                    {item.title}
                  </a>
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

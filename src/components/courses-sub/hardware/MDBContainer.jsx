import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import courseImage from "./aaa.jpg";
import { Card } from "react-bootstrap";
import styled from "styled-components";

const cardStyles = {
  height: "100%",
  borderRadius: 0,
  border: "none",
  boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
  transition: "box-shadow 0.3s",
};

const imageStyles = {
  width: "120%",
  height: "45vh",
};

const titleStyles = {
  fontSize: "24px",
  fontWeight: "bold",
};

const descriptionStyles = {
  fontSize: "16px",
  padding: "10px 0",
  color: "black",
};

const authorStyles = {
  fontSize: "12px",
};

const updatedStyles = {
  fontSize: "15px",
  fontWeight: "500",
  color: "#a0a0a0",
};

const totalHoursStyles = {
  marginLeft: "5px",
  fontSize: "12px",
  color: "#a0a0a0",
};

const lecturerCountStyles = {
  marginLeft: "5px",
  fontSize: "12px",
  color: "#a0a0a0",
};

const ratingStyles = {
  color: "orange",
  fontSize: "10px",
  marginLeft: "-7px",
};

const price1Styles = {
  color: "black",
  fontSize: "30px",
  marginLeft: "-5px",
  marginTop: "25px",
  fontWeight: "bold",
};
const price2Styles = {
  fontSize: "24px",
  marginLeft: "10px",
  color: "#B2BEB5",
  marginTop: "80px",
  fontWeight: "bold",
  whiteSpace: "nowrap",
  textDecoration: "line-through",
};

const arrowStyles1 = {
  color: "white",
  marginLeft: "250px",
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
  marginLeft: "-250px",
  marginTop: "0px",
  borderRadius: "50%",
  background: "black",
  width: "50px",
  height: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const CardContainer = styled.div`
  height: ${cardStyles.height};
  background-color: ${cardStyles.backgroundColor};
  border-radius: ${cardStyles.borderRadius};
  box-shadow: ${cardStyles.boxShadow};
  transition: ${cardStyles.transition};

  &:hover {
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  }
`;

const RatingCard = ({
  imageSrc,
  title,
  description,
  author,
  updatedDate,
  totalHours,
  lecturerCount,
  rating,
  price1,
  price2,
}) => {
  return (
    <Card className="p-4" style={cardStyles}>
      <div className="row g-0">
        <div className="col-md-5">
          <img
            src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/273312750/original/3b970e306d20082a558da2f2a43da6b4ac761c21/design-amazing-viral-youtube-thumbnail-in-3-hours.jpg"
            className="card-img"
            alt="Image"
            style={imageStyles}
          />
        </div>
        <div className="col-md-6 p-3">
          <div className="card-body">
            <h5 className="card-title" style={titleStyles}>
              {title}
            </h5>
            <p className="card-text description mb-0" style={descriptionStyles}>
              {description}
            </p>
            <p className="card-text" style={authorStyles}>
              by {author}
            </p>
            <p>
              <span className="card-text" style={updatedStyles}>
                <span className="font-weight-bold">Updated:</span>{" "}
                <span>{updatedDate}</span>
              </span>
              <span className="card-text" style={totalHoursStyles}>
                Total Hours: {totalHours}
              </span>
              <span className="card-text" style={lecturerCountStyles}>
                Lecturer Count: {lecturerCount}
              </span>
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="container-fluid">
                <div className="row">
                  <strong className="rating" style={ratingStyles}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i}>
                        {i <= rating ? (
                          <StarRateRoundedIcon />
                        ) : (
                          <StarOutlineRoundedIcon />
                        )}
                      </span>
                    ))}
                  </strong>
                </div>
                <div className="row">
                  <div className="mt-0">
                    <p className="" style={price1Styles}>
                      {price1}

                      <span className="ml-g-5" style={price2Styles}>
                        {price2}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const CarouselRating = () => {
  const items = [
    {
      imageSrc: courseImage,
      title: "Mastering REST APIs with FastAPI",
      description:
        "Build professional APIs using FastAPI, including 100% test coverage, background tasks, user authentication, and more!",
      author: "Jose Salvatierra",
      updatedDate: "October 2023",
      totalHours: "12",
      lecturerCount: "7",
      rating: 4.2,
      price1: "$499",
      price2: "$899",
    },
    {
      imageSrc: courseImage,
      title: "Mastering REST APIs with FastAPI",
      description:
        "Build professional APIs using FastAPI, including 100% test coverage, background tasks, user authentication, and more!",
      author: "Jose Salvatierra",
      updatedDate: "October 2023",
      totalHours: "12",
      lecturerCount: "7",
      rating: 4.2,
      price1: "$499",
      price2: "$899",
    },
    {
      imageSrc: courseImage,
      title: "Mastering REST APIs with FastAPI",
      description:
        "Build professional APIs using FastAPI, including 100% test coverage, background tasks, user authentication, and more!",
      author: "Jose Salvatierra",
      updatedDate: "October 2023",
      totalHours: "12",
      lecturerCount: "7",
      rating: 4.2,
      price1: "$499",
      price2: "$899",
    },
  ];

  return (
    <Carousel
      nextIcon={
        <span className="p-4" style={arrowStyles1}>
          <ArrowForwardIosRoundedIcon style={{ fontSize: "20px" }} />
        </span>
      }
      prevIcon={
        <span className="p-4" style={arrowStyles2}>
          <ArrowBackIosNewRoundedIcon style={{ fontSize: "20px" }} />
        </span>
      }
    >
      {items.map((item, index) => (
        <Carousel.Item key={index}>
          <RatingCard {...item} style={{ fontSize: "40px" }} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <CarouselRating />
        </div>
      </div>
    </div>
  );
}

export default App;

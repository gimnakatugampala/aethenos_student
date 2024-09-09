import React from 'react'
import StarsRating from "stars-rating";

const DisplayCardRatings = ({rating}) => {
  return (
    <StarsRating
    edit={false}
    count={5}
    size={24}
    value={rating}
    color1={"gray"}
    color2={"#F39C12"}
  />
  )
}

export default DisplayCardRatings
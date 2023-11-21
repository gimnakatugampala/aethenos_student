import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
//import Loader from "react-loader";

import LoadingOverlay from "react-loading-overlay";
//import BounceLoader from "react-spinners/BounceLoader";

// import "./styles.css";

import styled, { css } from "styled-components";

const DarkBackground = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  ${props =>
    props.disappear &&
    css`
      display: block; /* show */
    `}
`;


 
const LoadingBtn = ({disappear}) => {

    return (
        <DarkBackground  disappear={true}>
        <LoadingOverlay
          active={true}
          spinner={true}
          text="Loading Please Wait.."
        >
        </LoadingOverlay>
      </DarkBackground>
    )
   
    };
 
export default LoadingBtn;
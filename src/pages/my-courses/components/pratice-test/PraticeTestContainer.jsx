import React, { useRef } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IMG_HOST } from "../../../../api";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { saveAs } from 'file-saver';

import axios from 'axios';

const steps = [
  "Practice test information and instructions",
  "Questions",
  "Solutions",
];

const PraticeTestContainer = ({
  PraticeTestactiveStep,
  setPraticeTestActiveStep,
  selectedPracticeTest,
}) => {
  const [skipped, setSkipped] = React.useState(new Set());
  const [isFullscreen, setIsFullscreen] = React.useState(false); // State to track fullscreen
  const containerRef = useRef(null); // Ref for the container

  const isStepOptional = (step) => step === 1;
  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(PraticeTestactiveStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(PraticeTestactiveStep);
    }

    setPraticeTestActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setPraticeTestActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(PraticeTestactiveStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setPraticeTestActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(PraticeTestactiveStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setPraticeTestActiveStep(0);
  };

  const handleDownload = async (filePath,filename) => {
    try {
      const response = await fetch(filePath, {
        method: 'GET'
      });
  
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', filename.split("/").pop());
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up the DOM
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      // Request fullscreen on the container
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.mozRequestFullScreen) { // Firefox
        containerRef.current.mozRequestFullScreen();
      } else if (containerRef.current.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.msRequestFullscreen) { // IE/Edge
        containerRef.current.msRequestFullscreen();
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
      }
    }
    setIsFullscreen((prev) => !prev);
  };

  return (
    <>
      {selectedPracticeTest && (
        <Box sx={{ width: "100%" ,background :`${isFullscreen ? '#fff' : 'transparent'}` }} ref={containerRef}> {/* Use ref on the outer Box */}
         

          <Stepper activeStep={PraticeTestactiveStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step
                  key={label}
                  {...stepProps}
                  sx={{
                    "& .MuiStepLabel-label": {
                      fontWeight: "bold !important",
                    },
                    "& .MuiStep-root": {
                      color: "grey !important",
                    },
                    "& .Mui-completed": {
                      color: "red !important",
                    },
                    "& .Mui-active": {
                      color: "red !important",
                    },
                  }}
                >
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          <React.Fragment>
            {PraticeTestactiveStep === 0 && (
              <div className="my-3 mx-4">
                <h5 className="m-0 p-0">
                  <b>{selectedPracticeTest.title}</b>
                </h5>
                {selectedPracticeTest.getPracticeTests &&
                  selectedPracticeTest.getPracticeTests[0] && (
                    <>
                      <h6 className="m-0 p-0">
                        Min Pass Mark -{" "}
                        {
                          selectedPracticeTest.getPracticeTests[0]
                            .minimumuPassMark
                        }
                        %
                      </h6>
                      <p>
                        Duration{" "}
                        <i>
                          ({selectedPracticeTest.getPracticeTests[0].duration})
                        </i>
                      </p>
                      <br />
                      {selectedPracticeTest.description && (
                        <>
                          <p className="m-0 p-0">Description</p>
                          <h6 className="m-0 p-0">
                            {selectedPracticeTest.description}
                          </h6>
                          <br />
                        </>
                      )}
                      {selectedPracticeTest.getPracticeTests[0]
                        .instructions && (
                        <>
                          <p className="m-0 p-0">Instructions</p>
                          <h6 className="m-0 p-0">
                            {
                              selectedPracticeTest.getPracticeTests[0]
                                .instructions
                            }
                          </h6>
                        </>
                      )}
                      {selectedPracticeTest.getPracticeTests[0]
                        .externalLink && (
                        <a
                          target="_blank"
                          href={
                            selectedPracticeTest.getPracticeTests[0]
                              .externalLink
                          }
                        >
                          {
                            selectedPracticeTest.getPracticeTests[0]
                              .externalLink
                          }{" "}
                          <i className="fas fa-external-link-alt"></i>
                        </a>
                      )}
                    </>
                  )}
              </div>
            )}

            {PraticeTestactiveStep === 1 && (
              <div className="my-3 mx-4">
                <h6 className="m-0 p-0">
                  <b>Questions</b>
                </h6>
                <br />
                {selectedPracticeTest.getPracticeTests &&
                  selectedPracticeTest.getPracticeTests[0] && (
                    <>
                      <Button
                        variant="contained"
                        color="error"
                        className="my-2"
                        onClick={() => handleDownload(`${IMG_HOST}${selectedPracticeTest.getPracticeTests[0].practiceTestQuestionSheet}`,`${selectedPracticeTest.getPracticeTests[0].practiceTestQuestionSheet}`)}
                      >
                        Download Questions <i className="fas fa-download mx-2"></i>
                      </Button>

                      <br />
                      {selectedPracticeTest.getPracticeTests[0]
                        .questionLink && (
                        <a
                          target="_blank"
                          href={
                            selectedPracticeTest.getPracticeTests[0]
                              .questionLink
                          }
                        >
                          {
                            selectedPracticeTest.getPracticeTests[0]
                              .questionLink
                          }{" "}
                          <i className="fas fa-external-link-alt"></i>
                        </a>
                      )}
                    </>
                  )}
              </div>
            )}

            {PraticeTestactiveStep === 2 && (
              <div className="my-3 mx-4">
                <h6 className="m-0 p-0">
                  <b>Solutions</b>
                </h6>
                <br />
                {selectedPracticeTest.getPracticeTests &&
                  selectedPracticeTest.getPracticeTests[0] && (
                    <>
                      <Button
                        variant="contained"
                        color="error"
                        className="my-2"
                        onClick={() => handleDownload(`${IMG_HOST}${selectedPracticeTest.getPracticeTests[0].practiceTestSolutionSheet}`,`${selectedPracticeTest.getPracticeTests[0].practiceTestSolutionSheet}`)}
                      >
                        Download Solutions <i className="fas fa-download mx-2"></i>
                      </Button>

                      <br />
                      {selectedPracticeTest.getPracticeTests[0]
                        .solutionLink && (
                        <a
                          target="_blank"
                          href={
                            selectedPracticeTest.getPracticeTests[0]
                              .solutionLink
                          }
                        >
                          {
                            selectedPracticeTest.getPracticeTests[0]
                              .solutionLink
                          }{" "}
                          <i className="fas fa-external-link-alt"></i>
                        </a>
                      )}
                    </>
                  )}
              </div>
            )}

            {PraticeTestactiveStep === steps.length - 1 ? (
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  className="edu-btn btn-small"
                  variant="contained"
                  disabled={PraticeTestactiveStep === 0}
                  onClick={handleBack}
                >
                  <ArrowBackIosNewIcon sx={{ fontSize: "16px" }} /> Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button
                  variant="contained"
                  className="edu-btn btn-small"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  variant="contained"
                  disabled={PraticeTestactiveStep === 0}
                  onClick={handleBack}
                  className="edu-btn btn-small"
                >
                  <ArrowBackIosNewIcon sx={{ fontSize: "16px" }} /> Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext} className="edu-btn btn-small">
                  {PraticeTestactiveStep === steps.length - 1
                    ? "Finish"
                    : "Next"}
                </Button>
              </Box>
            )}

             {/* Fullscreen Button */}
          {/* <Button
            variant="contained"
            onClick={toggleFullscreen}
            sx={{ mb: 2 }}
          >
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </Button> */}


          </React.Fragment>
        </Box>
      )}
    </>
  );
};

export default PraticeTestContainer;

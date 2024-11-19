import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Player } from "video-react";
import { IMG_HOST } from "../../../../api";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/audio.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { saveAs } from 'file-saver';
// import axios from 'axios';

import {
  MediaPlayer,
  MediaProvider,
  Gesture,
  useVideoQualityOptions,
  Menu,
  SeekButton,
  Captions,
} from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

const steps = [
  "Coding exercise information and instructions",
  "Coding exercise questions",
  "Solutions",
];

const CodingExerciseContainer = ({
  setCodingExerciseActiveStep,
  activeStepCodingExercise,
  selectedCodingExercise,
}) => {
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => step === 1;
  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStepCodingExercise)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStepCodingExercise);
    }

    setCodingExerciseActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setCodingExerciseActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStepCodingExercise)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setCodingExerciseActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStepCodingExercise);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setCodingExerciseActiveStep(0);
  };


  const handleDownload = async (filePath,filename) => {
    try {
      const response = await fetch(`/api/proxy?url=${filename}`, {
        method: 'GET',
      });
      
      const blob = await response.blob();

      // Extract filename from the 'Content-Disposition' header
      const contentDisposition = response.headers.get('Content-Disposition');
      let extractedFileName = 'default_filename'; // Fallback filename
    
      if (contentDisposition && contentDisposition.includes('filename=')) {
        // Parse filename from the header
        const matches = contentDisposition.match(/filename[^;=\n]*=([^;\n]*)/);
        if (matches && matches[1]) {
          extractedFileName = matches[1].replace(/['"]/g, ''); // Remove quotes if present
        }
      }
    
      // Check for file extension from 'Content-Type' header
      const contentType = response.headers.get('Content-Type');
      const fileExtensionMap = {
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
        'application/pdf': '.pdf',
        'image/jpeg': '.jpg',
        'image/png': '.png',
        'text/plain': '.txt',
        // Add more mappings as needed
      };
    
      const extension =
        fileExtensionMap[contentType] ||
        extractedFileName.split('.').pop(); // Use existing extension if available
    
      if (!extractedFileName.includes('.')) {
        // Append extension if not already present
        extractedFileName += extension;
      }
    
      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);
    
      // Create a link element
      const a = document.createElement('a');
      a.href = url;
    
      // Use extracted filename or fallback to a default
      a.download = extractedFileName || 'Custom_File_Name';
    
      // Append the link, trigger click, and remove it
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    
      // Revoke the object URL to free up memory
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  

  const codingExercise = selectedCodingExercise?.getCodingExercises?.[0] || {};

  return (
    <>
      {selectedCodingExercise && (
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStepCodingExercise}>
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
            {activeStepCodingExercise === 0 && (
              <div className="my-3 mx-4">
                {codingExercise.codingVideo ? (
                  <MediaPlayer
                    id="videoPlayer"
                    autoPlay={true}
                    title={"Coding Exercise"}
                    src={`${IMG_HOST}${codingExercise.codingVideo}`}
                  >
                    <MediaProvider />

                    <DefaultVideoLayout
                      icons={defaultLayoutIcons}
                    ></DefaultVideoLayout>
                  </MediaPlayer>
                ) : (
                  <p className="text-center my-4 mx-4">No Video Available</p>
                )}

                <div className="my-3 ">
                  <h5 className="mb-4 p-0">
                    <b>{selectedCodingExercise.title}</b>
                  </h5>

                  {selectedCodingExercise.description && (
                    <div className="my-4">
                      <p className="m-0 p-0">Description</p>
                      <h6 className="m-0 p-0">
                        {selectedCodingExercise.description}
                      </h6>
                    </div>
                  )}

                  {codingExercise.instructions && (
                    <div className="my-4">
                      <p className="m-0 p-0">Instructions</p>
                      <h6 className="m-0 p-0">
                        <i>{codingExercise.instructions}</i>
                      </h6>
                    </div>
                  )}

                  {codingExercise.downloadableResource && (

                      <Button
                      variant="contained"
                      color="error"
                      className="my-2"
                      onClick={() => handleDownload(`${IMG_HOST}${codingExercise.downloadableResource}`,`${codingExercise.downloadableResource}`)}
                      >
                      Download Resources <i className="fas fa-download mx-2"></i>
                      </Button>

                  )}

                  {codingExercise.externalLink && (
                    <a   target="_blank" className="my-2" href={codingExercise.externalLink}>
                      {codingExercise.externalLink}{" "}
                      <i className="fas fa-external-link-alt"></i>
                    </a>
                  )}
                </div>
              </div>
            )}

            {activeStepCodingExercise === 1 && (
              <div className="my-3 mx-4">
                {codingExercise.codingExerciseVideo ? (
                  <MediaPlayer
                    id="videoPlayer"
                    autoPlay={true}
                    title={"Coding Exercise"}
                    src={`${IMG_HOST}${codingExercise.codingExerciseVideo}`}
                  >
                    <MediaProvider />

                    <DefaultVideoLayout
                      icons={defaultLayoutIcons}
                    ></DefaultVideoLayout>
                  </MediaPlayer>
                ) : (
                  <p className="text-center my-4">No Video Available</p>
                )}

                {codingExercise.codingExerciseSheet && (

                    <Button
                    variant="contained"
                    color="error"
                    className="my-2"
                    onClick={() => handleDownload(`${IMG_HOST}${codingExercise.codingExerciseSheet}`,`${codingExercise.codingExerciseSheet}`)}
                    >
                    Download Questions <i className="fas fa-download mx-2"></i>
                    </Button>

                )}

                <br />

                {codingExercise.codingExternalLink && (
                  <a   target="_blank" className="my-2" href={codingExercise.codingExternalLink}>
                    {codingExercise.codingExternalLink}{" "}
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                )}
              </div>
            )}

            {activeStepCodingExercise === 2 && (
              <React.Fragment>
                <div className="my-3 mx-4">
                  {codingExercise.codingSolutionsVideo ? (
                    <MediaPlayer
                      id="videoPlayer"
                      autoPlay={true}
                      title={"Coding Exercise"}
                      src={`${IMG_HOST}${codingExercise.codingSolutionsVideo}`}
                    >
                      <MediaProvider />

                      <DefaultVideoLayout
                        icons={defaultLayoutIcons}
                      ></DefaultVideoLayout>
                    </MediaPlayer>
                  ) : (
                    <p className="text-center my-4">No Video Available</p>
                  )}

                  {codingExercise.codingSolutionsSheet && (

                    
                  <Button
                  variant="contained"
                  color="error"
                  className="my-2"
                  onClick={() => handleDownload(`${IMG_HOST}${codingExercise.codingSolutionsSheet}`,`${codingExercise.codingSolutionsSheet}`)}
                  >
                  Download Answers <i className="fas fa-download mx-2"></i>
                  </Button>
                  )}

                  <br />

                  {codingExercise.solutionsExternalLink && (

                    <a
                      target="_blank"
                      className="my-2"
                      href={codingExercise.solutionsExternalLink}
                    >
                      {codingExercise.solutionsExternalLink}{" "}
                      <i className="fas fa-external-link-alt"></i>
                    </a>
                  )}
                </div>
              </React.Fragment>
            )}

            {activeStepCodingExercise === steps.length - 1 ? (
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  className="edu-btn btn-small"
                  variant="contained"
                  disabled={activeStepCodingExercise === 0}
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
                  disabled={activeStepCodingExercise === 0}
                  onClick={handleBack}
                  className="edu-btn btn-small"
                >
                  <ArrowBackIosNewIcon sx={{ fontSize: "16px" }} /> Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext} className="edu-btn btn-small">
                  {activeStepCodingExercise === steps.length - 1
                    ? "Finish"
                    : "Next"}
                </Button>
              </Box>
            )}
          </React.Fragment>
        </Box>
      )}
    </>
  );
};

export default CodingExerciseContainer;

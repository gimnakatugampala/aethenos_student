import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Alert } from "@mui/material";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";



const mainfs = {
  fontSize: "calc(0.2rem + 1vw)",
};
const QuizContainer = ({
  selectAnswer,
  setselectAnswer,
  answerAlertDisplay,
  setanswerAlertDisplay,
  Startquiz,
  setStartquiz,
  selectedQuiz,
}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const [explanationMessage, setExplanationMessage] = useState([]);


  const isStepOptional = (step) => step === 1;

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    setselectAnswer(0);
    setanswerAlertDisplay(null);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setselectAnswer(0);
    setanswerAlertDisplay(null);
  };

  const handleAnswerChange = (event) => {
    setselectAnswer(event.target.value);
  };

  return (
    <>
      {selectedQuiz != null && (
        <div>
          {!Startquiz && (
            <div>
              <h5 className="m-0 p-0">{selectedQuiz.title}</h5>
              <p className="m-0 mx-4 p-0">{selectedQuiz.description}</p>

              <button
                onClick={() => setStartquiz(true)}
                className="edu-btn btn-small my-3"
              >
                Start Quiz
              </button>
            </div>
          )}

          {Startquiz && (
            <>
              {selectedQuiz.getQuizs && selectedQuiz.getQuizs.length > 0 ? (
                <Box sx={{ width: "100%" }}>
                  <Stepper activeStep={activeStep}>
                    {selectedQuiz.getQuizs.map((q, index) => (
                      <Step
                      
                        key={index}
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
                        <StepLabel ><span style={mainfs}>Question {index + 1}</span></StepLabel>
                      </Step>
                    ))}
                  </Stepper>

                  <React.Fragment>
                    {selectedQuiz.getQuizs[activeStep] && (
                      <h5 className="my-3 mx-4"  style={mainfs}>
                        {selectedQuiz.getQuizs[activeStep].question}
                      </h5>
                    )}

                    {answerAlertDisplay != null && (
                      <>
                        {answerAlertDisplay === true && (
                          <Alert className="my-2" severity="success">
                            You Chose the Right Answer
                          </Alert>
                        )}

                        {answerAlertDisplay === false && (
                          <Alert className="my-2" severity="error">
                            Sorry! You Chose the Wrong Answer
                          </Alert>
                        )}

                        {answerAlertDisplay === "invalid" && (
                          <Alert className="my-2" severity="error">
                            Please Select An Answer
                          </Alert>
                        )}
                      </>
                    )}

                    {selectedQuiz.getQuizs[activeStep]?.answers && (
                      <>
                        <FormControl className="d-flex">
                          <RadioGroup
                            row
                            value={selectAnswer}
                            onChange={handleAnswerChange}
                          >
                            {selectedQuiz.getQuizs[activeStep].answers.map(
                              (answer, index) => (
                                <FormControlLabel
                                  className="p-1 mx-2 my-1"
                                  key={index}
                                  value={answer.id}
                                  control={
                                    <Radio
                                      sx={{
                                        color: "gray",
                                        "&.Mui-checked": {
                                          color: "red",
                                        },
                                      }}
                                    />
                                  }
                                  label={answer.name}
                                  
                                />
                              )
                            )}
                          </RadioGroup>
                        </FormControl>
                        <br />


                        {explanationMessage.some(answer => answer.explanation) && ( // Check if any explanation is non-empty
                          <ul>
                            {explanationMessage.map((answer) => (
                              answer.explanation ? (  // Only render the list item if the explanation is not empty
                                <li key={answer.id}>
                                  <strong>Explanation: {answer.explanation}</strong>
                                  {answer.correctAnswer ? " ✔" : " ❌"}  {/* Using tick and cross symbols */}
                                </li>
                              ) : null
                            ))}
                          </ul>
                        )}





                        <button
                          onClick={() => {
                            if (selectAnswer === 0) {
                              setanswerAlertDisplay("invalid");
                              return;
                            }

                            const selectedAnswerCorrect =
                              selectedQuiz.getQuizs[activeStep].answers.find(
                                (answer) => answer.id === selectAnswer
                              );

                            setanswerAlertDisplay(
                              selectedAnswerCorrect?.correctAnswer
                            );


                            setExplanationMessage(selectedQuiz.getQuizs[activeStep].answers)
                            

                            console.log(selectedQuiz.getQuizs[activeStep].answers)
                          }}
                          className="edu-btn btn-small mt-2"
                        >
                          <CheckIcon /> Check Quiz
                        </button>
                        <br />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            pt: 2,
                          }}
                        >
                          <Button
                            variant="contained"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className="edu-btn btn-small"
                          >
                            <ArrowBackIosNewIcon sx={{ fontSize: "16px" }} />{" "}
                            Back
                          </Button>

                          <Box sx={{ flex: "1 1 auto" }} />

                          <Button>
                            {activeStep ===
                            selectedQuiz.getQuizs.length - 1 ? (
                              <button
                                onClick={handleReset}
                                className="edu-btn btn-small"
                              >
                                Retake quiz
                              </button>
                            ) : (
                              <button
                                onClick={handleNext}
                                className="edu-btn btn-small"
                              >
                                Next question <NavigateNextIcon />
                              </button>
                            )}
                          </Button>
                        </Box>
                      </>
                    )}
                  </React.Fragment>
                </Box>
              ) : (
                <h6>No questions available</h6>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default QuizContainer;

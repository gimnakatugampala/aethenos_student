import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Alert, Box, Stepper, Step, StepLabel, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const QuizContainer = ({
  selectAnswer,
  setselectAnswer,
  answerAlertDisplay,
  setanswerAlertDisplay,
  Startquiz,
  setStartquiz,
  selectedQuiz,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [summary, setSummary] = useState([]); // Track summary of answers

  const handleNext = () => {
    if (activeStep < selectedQuiz.getQuizs.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setselectAnswer(0);
      setanswerAlertDisplay(null);
    } else {
      // Move to the summary slide when the last question is answered
      setActiveStep(selectedQuiz.getQuizs.length);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setselectAnswer(0);
    setanswerAlertDisplay(null);
    setSummary([]); // Reset summary
    setStartquiz(false); // Reset quiz to start screen
  };

  const handleAnswerChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    setselectAnswer(selectedValue);

    const selectedAnswer = selectedQuiz.getQuizs[activeStep].answers.find(
      (answer) => parseInt(answer.id, 10) === selectedValue
    );

    const isCorrect = selectedAnswer?.correctAnswer;
    setanswerAlertDisplay(isCorrect);
    
    // Add or update current question's result in summary
    setSummary((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.question === selectedQuiz.getQuizs[activeStep].question
      );

      const newResult = {
        question: selectedQuiz.getQuizs[activeStep].question,
        selectedAnswer: selectedAnswer?.name || "No Answer",
        isCorrect: isCorrect,
        explanation: selectedAnswer?.explanation || "No Explanation Provided",
      };

      if (existingIndex > -1) {
        const updatedSummary = [...prev];
        updatedSummary[existingIndex] = newResult;
        return updatedSummary;
      }

      return [...prev, newResult];
    });
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      {selectedQuiz ? (
        <div>
          {!Startquiz ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <h2>{selectedQuiz.title}</h2>
              <p>{selectedQuiz.description}</p>
              <Button
                variant="contained"
                color="primary"
                className="edu-btn"
                onClick={() => setStartquiz(true)}
                sx={{
                  marginTop: 2,
                  padding: "10px 20px",
                  fontSize: "1rem",
                  backgroundColor: "#e01D20", // Updated color
                  "&:hover": {
                    backgroundColor: "#c21818", // Hover color
                  },
                }}
              >
                Start Quiz
              </Button>
            </div>
          ) : (
            <>
              {selectedQuiz.getQuizs && selectedQuiz.getQuizs.length > 0 ? (
                <Box sx={{ width: "100%", marginTop: 2 }}>
                  <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    sx={{
                      "& .MuiStepIcon-root": {
                        color: "#e01D20", // Stepper color
                      },
                      "& .Mui-active .MuiStepIcon-root": {
                        color: "#c21818", // Active step color
                      },
                    }}
                  >
                    {selectedQuiz.getQuizs.map((_, index) => (
                      <Step key={index}>
                        <StepLabel>
                          <span style={{ fontSize: "1rem" }}>Q{index + 1}</span>
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>

                  {activeStep < selectedQuiz.getQuizs.length ? (
                    <>
                      <h5 className="my-3 mx-4" style={{ fontSize: "1.2rem" }}>
                        {selectedQuiz.getQuizs[activeStep].question}
                      </h5>

                      {answerAlertDisplay != null && (
                        <Alert
                          className="my-2"
                          severity={answerAlertDisplay === true ? "success" : "error"}
                          iconMapping={{
                            success: <CheckIcon />,
                            error: <NavigateNextIcon />,
                          }}
                        >
                          {answerAlertDisplay === true
                            ? "You Chose the Right Answer"
                            : "Sorry! You Chose the Wrong Answer"}
                        </Alert>
                      )}

                      <FormControl fullWidth>
                        <RadioGroup
                          value={selectAnswer}
                          onChange={handleAnswerChange}
                        >
                          {selectedQuiz.getQuizs[activeStep].answers.map(
                            (answer, index) => (
                              <FormControlLabel
                                key={index}
                                value={parseInt(answer.id, 10)}
                                control={<Radio />}
                                label={answer.name}
                              />
                            )
                          )}
                        </RadioGroup>
                      </FormControl>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: 2,
                        }}
                      >
                        <Button
                          variant="outlined"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{
                            padding: "8px 16px",
                            fontSize: "0.9rem",
                            borderColor: "#e01D20", // Updated color for outline button
                            "&:hover": {
                              borderColor: "#c21818", // Hover color
                            },
                          }}
                        >
                          <ArrowBackIosNewIcon sx={{ fontSize: "16px" }} /> Back
                        </Button>

                        <Button
                          variant="contained"
                          color="primary"
                          disabled={selectAnswer === 0}
                          onClick={handleNext}
                          sx={{
                            padding: "8px 16px",
                            fontSize: "0.9rem",
                            backgroundColor: "#e01D20", // Updated color
                            "&:hover": {
                              backgroundColor: "#c21818", // Hover color
                            },
                          }}
                        >
                          {activeStep === selectedQuiz.getQuizs.length - 1
                            ? "Go to Summary"
                            : "Next Question"}{" "}
                          <NavigateNextIcon />
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <div className="summary">
                      <h4>Quiz Summary</h4>
                      <ul>
                        {summary.map((item, index) => (
                          <li key={index}>
                            <strong>Q:</strong> {item.question}
                            <br />
                            <strong>Your Answer:</strong> {item.selectedAnswer}
                            <br />
                            <strong>
                              {item.isCorrect ? "Correct ✅" : "Incorrect ❌"}
                            </strong>
                            <br />
                            <strong>Explanation:</strong> {item.explanation}
                          </li>
                        ))}
                      </ul>
                      <Button
                        variant="contained"
                        color="primary"
                        className="edu-btn btn-small"
                        onClick={handleReset}
                        sx={{
                          marginTop: 2,
                          padding: "10px 20px",
                          fontSize: "1rem",
                          backgroundColor: "#e01D20", // Updated color
                          "&:hover": {
                            backgroundColor: "#c21818", // Hover color
                          },
                        }}
                      >
                        Retake Quiz
                      </Button>
                    </div>
                  )}
                </Box>
              ) : (
                <h6>No questions available</h6>
              )}
            </>
          )}
        </div>
      ) : (
        <h6>Quiz data is not available.</h6>
      )}
    </div>
  );
};

export default QuizContainer;

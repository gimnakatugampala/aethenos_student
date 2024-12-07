import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Alert, Box, Stepper, Step, StepLabel, Button } from "@mui/material";
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
    <div>
      {selectedQuiz ? (
        <div>
          {!Startquiz ? (
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
          ) : (
            <>
              {selectedQuiz.getQuizs && selectedQuiz.getQuizs.length > 0 ? (
                <Box sx={{ width: "100%" }}>
                  <Stepper activeStep={activeStep}>
                    {selectedQuiz.getQuizs.map((_, index) => (
                      <Step key={index}>
                        <StepLabel>
                          <span style={mainfs}>Question {index + 1}</span>
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>

                  {activeStep < selectedQuiz.getQuizs.length ? (
                    <>
                      <h5 className="my-3 mx-4" style={mainfs}>
                        {selectedQuiz.getQuizs[activeStep].question}
                      </h5>

                      {answerAlertDisplay != null && (
                        <Alert
                          className="my-2"
                          severity={answerAlertDisplay === true ? "success" : "error"}
                        >
                          {answerAlertDisplay === true
                            ? "You Chose the Right Answer"
                            : "Sorry! You Chose the Wrong Answer"}
                        </Alert>
                      )}

                      <FormControl>
                        <RadioGroup
                          row
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
                          pt: 2,
                        }}
                      >
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          className="edu-btn btn-small"
                        >
                          <ArrowBackIosNewIcon sx={{ fontSize: "16px" }} /> Back
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button
                          disabled={selectAnswer === 0} // Ensure the button is only enabled after selecting an answer
                          onClick={handleNext}
                          className="edu-btn btn-small"
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
                      <button
                        onClick={handleReset}
                        className="edu-btn btn-small mt-3"
                      >
                        Retake Quiz
                      </button>
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

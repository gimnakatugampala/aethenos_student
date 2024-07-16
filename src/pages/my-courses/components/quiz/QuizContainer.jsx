import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';
import { Alert } from '@mui/material';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CheckIcon from '@mui/icons-material/Check';



const QuizContainer = ({ selectAnswer, setselectAnswer, answerAlertDisplay, setanswerAlertDisplay, Startquiz , setStartquiz , selectedQuiz}) => {

  const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    setselectAnswer(0)
    setanswerAlertDisplay(null)

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // setselectAnswer(0)
    // setanswerAlertDisplay(null)
  };

 

  const handleReset = () => {
    setActiveStep(0);
    setselectAnswer(0)
    setanswerAlertDisplay(null)
  };


  return (
    <>
    {selectedQuiz != null && (
    <div>
      {Startquiz ==false && (
        <div>
          <h5 className='m-0 p-0'>{selectedQuiz.title}</h5>
          <p className='m-0 p-0'>{selectedQuiz.description}</p>

          <button onClick={() => setStartquiz(true)} className='edu-btn btn-small my-3'>Start Quiz</button>
        </div>
      )}

    {Startquiz && (
      <>
        <div>

      <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {selectedQuiz.getQuizs.map((q, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={index} {...stepProps}>
              <StepLabel {...labelProps}>Question {index + 1}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
 
        <React.Fragment>
        
          
          <h5 className='my-3'>{selectedQuiz.getQuizs[activeStep].question}</h5>

          {answerAlertDisplay != null && (
          <>
          {answerAlertDisplay == true && (
          <Alert className='my-2'  severity="success">
                  You Choose the Right Answer
            </Alert>
          )}

        {answerAlertDisplay == false && (
            <Alert className='my-2'  severity="error">
            Sorry ! You have Chosen the Wrong Answer
        </Alert>
            )}
 

  
          {answerAlertDisplay == 'invalid' && (
             <Alert className='my-2' severity="error">
                Please Select An Answer
            </Alert>
          )}

          </>
        )}

          <FormControl>        
          <RadioGroup
          
            name="radio-buttons-group"
            value={selectAnswer}
            onChange={(e) => setselectAnswer(e.target.value)}
          >
            {selectedQuiz.getQuizs != null && selectedQuiz.getQuizs[activeStep].answers.map((answer,index) =>(
               <FormControlLabel className='p-1 my-1 border border-dark' key={index} value={answer.id} control={<Radio />} label={answer.name} />
            ))}
          </RadioGroup>
          </FormControl>

          <br />

          <button onClick={() => {

              console.log(selectAnswer)

              if(selectAnswer == 0){
                setanswerAlertDisplay('invalid')
                return
              }

              const selectedAnswerCorrect = selectedQuiz.getQuizs[activeStep].answers.find(answer => answer.id === selectAnswer);

              if (selectedAnswerCorrect.correctAnswer) {
                // console.log("Correct Answer!");
                setanswerAlertDisplay(true)
              } else {
                // console.log("Incorrect Answer!");
                setanswerAlertDisplay(false)
              }


              }} className='edu-btn btn-small mt-2'><CheckIcon /> Check Quiz</button>


          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
            style={{height: 40}}
              variant="contained"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ p: 1 }}
            >
             <ArrowBackIosNewIcon /> Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
          
            <Button>
              {activeStep === selectedQuiz.getQuizs.length - 1 ? <button onClick={handleReset} className='edu-btn btn-small'>Retake quiz</button> : <button onClick={handleNext} className='edu-btn btn-small'>Next question <NavigateNextIcon /></button>}
            </Button>
          </Box>

        </React.Fragment>
      
    </Box>
  
        

       

   
      </div>
         
      </>
      )}

    </div>
    )}
    </>
  )
}

export default QuizContainer
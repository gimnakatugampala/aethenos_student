import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';
import { Alert } from '@mui/material';

const QuizContainer = ({ selectAnswer, setselectAnswer, answerAlertDisplay, setanswerAlertDisplay, Startquiz , setStartquiz , selectedQuiz}) => {


  

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
  
        <p className='p-0 m-0'><b>{selectedQuiz.getQuizs[0] == null ? "" : selectedQuiz.getQuizs[0].question}</b></p>

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
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={selectAnswer}
            onChange={(e) => setselectAnswer(e.target.value)}
          >
            {selectedQuiz.getQuizs[0] != null && selectedQuiz.getQuizs[0].getAnswers.map((answer,index) =>(
               <FormControlLabel key={index} value={answer.id} control={<Radio />} label={answer.name} />
            ))}
          </RadioGroup>
          </FormControl>
      </div>
          <button onClick={() => {

            console.log(selectAnswer)

            if(selectAnswer == 0){
              setanswerAlertDisplay('invalid')
              return
            }

        const selectedAnswerCorrect = selectedQuiz.getQuizs[0].getAnswers.find(answer => answer.id === selectAnswer);

        if (selectedAnswerCorrect.correctAnswer) {
          // console.log("Correct Answer!");
          setanswerAlertDisplay(true)
        } else {
          // console.log("Incorrect Answer!");
          setanswerAlertDisplay(false)
        }


          }} className='edu-btn btn-small my-2'>Check Quiz</button>
      </>
      )}

    </div>
    )}
    </>
  )
}

export default QuizContainer
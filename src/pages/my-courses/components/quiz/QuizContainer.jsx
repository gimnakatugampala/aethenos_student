import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';
import { Alert } from '@mui/material';

const QuizContainer = ({ Startquiz , setStartquiz , selectedQuiz}) => {

  const [selectAnswer, setselectAnswer] = useState(0)
  const [answerAlertDisplay, setanswerAlertDisplay] = useState(null)

  

  return (
    <>
    {selectedQuiz !=null && (
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
        <p>Question 1 :</p>

        {answerAlertDisplay != null && (
          <>
          {answerAlertDisplay ? (
          <Alert className='my-2' variant="filled" severity="success">
                  Hurry! You Choose the Right Answer
            </Alert>
          ) : (
            <Alert className='my-2' variant="filled" severity="error">
                Sorry ! You have Chosen the Wrong Answer
            </Alert>
          )}

          </>
        )}



        <p className='p-0 m-0'><b>{selectedQuiz.getQuizs[0] == null ? "" : selectedQuiz.getQuizs[0].question}</b></p>
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

        const selectedAnswerCorrect = selectedQuiz.getQuizs[0].getAnswers.find(answer => answer.id === selectAnswer);

        if (selectedAnswerCorrect.correctAnswer) {
          // console.log("Correct Answer!");
          setanswerAlertDisplay(true)
        } else {
          // console.log("Incorrect Answer!");
          setanswerAlertDisplay(false)
        }

        setTimeout(() => {
          setanswerAlertDisplay(null)
        }, 3000);


          }} className='edu-btn btn-small my-2'>Check Quiz</button>
      </>
      )}

    </div>
    )}
    </>
  )
}

export default QuizContainer
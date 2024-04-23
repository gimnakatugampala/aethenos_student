import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const QuizContainer = ({ Startquiz , setStartquiz }) => {
  return (
    <div>
      {Startquiz ==false && (
        <div>
          <h5 className='m-0 p-0'>Quiz One</h5>
          <p className='m-0 p-0'>Quiz 2</p>

          <button onClick={() => setStartquiz(true)} className='edu-btn btn-small my-3'>Start Quiz</button>
        </div>
      )}

    {Startquiz && (
      <>
        <div>
        <p>Question 1 :</p>
        <p className='p-0 m-0'><b>Question One</b></p>
          <FormControl>

          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            <FormControlLabel value="one" control={<Radio />} label="Answer One" />
            <FormControlLabel value="two" control={<Radio />} label="Answer Two" />
            <FormControlLabel value="three" control={<Radio />} label="Answer Three" />
            <FormControlLabel value="four" control={<Radio />} label="Answer Four" />
            <FormControlLabel value="five" control={<Radio />} label="Answer Five" />
          </RadioGroup>
          </FormControl>
      </div>
          <button className='edu-btn btn-small my-2'>Check Quiz</button>
      </>
      )}

    </div>

  )
}

export default QuizContainer
import React from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IMG_HOST } from '../../../../api';


const steps = ['Practice test information and instructions', 'Questions', 'Solutions'];

const PraticeTestContainer = ({ PraticeTestactiveStep,setPraticeTestActiveStep, selectedPracticeTest }) => {

    
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

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
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
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


  return (
    <>
    {selectedPracticeTest != null && (
    <Box sx={{ width: '100%' }}>
    <Stepper activeStep={PraticeTestactiveStep}>
      {steps.map((label, index) => {
        const stepProps = {};
        const labelProps = {};
        if (isStepSkipped(index)) {
          stepProps.completed = false;
        }
        return (
          <Step key={label} {...stepProps}>
            <StepLabel {...labelProps}>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>

      <React.Fragment>
        {PraticeTestactiveStep == 0 && (
        <div className='my-3'>
            <h5 className='m-0 p-0'><b>{selectedPracticeTest.title} </b></h5>
            <h6 className='m-0 p-0'>Min Pass Mark - {selectedPracticeTest.getPracticeTests[0].minimumuPassMark}%</h6>

            <p>Duration <i>({selectedPracticeTest.getPracticeTests[0].duration})</i></p>

            <br />
            {selectedPracticeTest.description != "" && <p className='m-0 p-0'>Description</p>}
            <h6 className='m-0 p-0'>{selectedPracticeTest.description}</h6>
            <br />
            {selectedPracticeTest.getPracticeTests[0].instructions != "" && <p className='m-0 p-0'>Instructions</p>}
            <h6 className='m-0 p-0'>{selectedPracticeTest.getPracticeTests[0].instructions}</h6>

            {selectedPracticeTest.getPracticeTests[0].externalLink != "" && (
            <a target='_blank' href={`${selectedPracticeTest.getPracticeTests[0].externalLink}`}>{selectedPracticeTest.getPracticeTests[0].externalLink} <i className="fas fa-external-link-alt"></i></a>
            )}


        </div>
        )}

        {PraticeTestactiveStep == 1 && (
        <div className="my-3">
            <h6 className='m-0 p-0'><b>Questions</b></h6>
      
            <br />
            <a className='btn btn-danger my-2' href={`${IMG_HOST}${selectedPracticeTest.getPracticeTests[0].practiceTestQuestionSheet}`} download >Download Questions <i className="fas fa-download"></i></a>
            <br />

            {selectedPracticeTest.getPracticeTests[0].questionLink != "" && (
            <a target='_blank' href={`${selectedPracticeTest.getPracticeTests[0].questionLink}`}>{selectedPracticeTest.getPracticeTests[0].questionLink} <i className="fas fa-external-link-alt"></i></a>
            )}

        </div>
        )}

        {PraticeTestactiveStep == 2 && (
            <div className='my-3'>
                <h6 className='m-0 p-0'><b>Solutions</b></h6>
                <br />

                <a className='btn btn-danger my-2' href={`${IMG_HOST}${selectedPracticeTest.getPracticeTests[0].practiceTestSolutionSheet}`} download >Download Solutions <i className="fas fa-download"></i></a>
                <br />
                {selectedPracticeTest.getPracticeTests[0].solutionLink != "" && (
                <a target='_blank' href={`${selectedPracticeTest.getPracticeTests[0].solutionLink}`}>{selectedPracticeTest.getPracticeTests[0].solutionLink} <i className="fas fa-external-link-alt"></i></a>
                )}


            </div>
            )}



        {PraticeTestactiveStep == steps.length - 1 ? (
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

            <Button
            className='p-0'
              variant="contained"
              disabled={PraticeTestactiveStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>

            <Box sx={{ flex: '1 1 auto' }} />
            <Button variant="contained" onClick={handleReset}>Reset</Button>
            </Box>
            ) : (
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
                variant="contained"
                disabled={PraticeTestactiveStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
            >
                Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button onClick={handleNext}>
                {PraticeTestactiveStep === steps.length - 1 ? <Button variant="contained">Finish</Button>  : <Button variant="contained">Next</Button>}
            </Button>
            </Box>
            )}

      </React.Fragment>
   
    </Box>
    )}
    </>
  )
}

export default PraticeTestContainer
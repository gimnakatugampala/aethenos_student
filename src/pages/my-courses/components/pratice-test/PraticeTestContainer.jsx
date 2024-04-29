import React from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IMG_HOST } from '../../../../api';


const steps = ['Practice test', 'Questions', 'Solutions'];

const PraticeTestContainer = ({ selectedPracticeTest }) => {

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
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  return (
    <>
    {selectedPracticeTest != null && (
    <Box sx={{ width: '100%' }}>
    <Stepper activeStep={activeStep}>
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
        {activeStep == 0 && (
        <Box>
            <Typography sx={{ mt: 2, mb: 1 }}>{selectedPracticeTest.title} ({selectedPracticeTest.getPracticeTests[0].duration})</Typography>
            <p>{selectedPracticeTest.description}</p>

            <p>Min Pass Mark - {selectedPracticeTest.getPracticeTests[0].minimumuPassMark}%</p>

            <p>{selectedPracticeTest.getPracticeTests[0].instructions}</p>

            {selectedPracticeTest.getPracticeTests[0].externalLink != "" && (
            <a target='_blank' href={`${selectedPracticeTest.getPracticeTests[0].externalLink}`}>{selectedPracticeTest.getPracticeTests[0].externalLink} <i className="fas fa-external-link-alt"></i></a>
            )}


        </Box>
        )}

        {activeStep == 1 && (
        <Box>
            <Typography sx={{ mt: 2, mb: 1 }}>Questions</Typography>
        

            <a className='btn btn-danger my-2' href={`${IMG_HOST}${selectedPracticeTest.getPracticeTests[0].practiceTestQuestionSheet}`} download >Download Question</a>
            <br />
            {selectedPracticeTest.getPracticeTests[0].questionLink != "" && (
            <a target='_blank' href={`${selectedPracticeTest.getPracticeTests[0].questionLink}`}>{selectedPracticeTest.getPracticeTests[0].questionLink} <i className="fas fa-external-link-alt"></i></a>
            )}

        </Box>
        )}

        {activeStep == 2 && (
            <Box>
                <Typography sx={{ mt: 2, mb: 1 }}>Solutions</Typography>
            

                <a className='btn btn-danger my-2' href={`${IMG_HOST}${selectedPracticeTest.getPracticeTests[0].practiceTestSolutionSheet}`} download >Download Solutions</a>
                <br />
                {selectedPracticeTest.getPracticeTests[0].solutionLink != "" && (
                <a target='_blank' href={`${selectedPracticeTest.getPracticeTests[0].solutionLink}`}>{selectedPracticeTest.getPracticeTests[0].solutionLink} <i className="fas fa-external-link-alt"></i></a>
                )}


            </Box>
            )}



        {activeStep == steps.length - 1 ? (
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
            </Box>
            ) : (
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
            >
                Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
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
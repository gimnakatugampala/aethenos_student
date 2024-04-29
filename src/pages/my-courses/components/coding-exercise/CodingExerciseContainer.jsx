import React from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Player } from 'video-react';
import { IMG_HOST } from '../../../../api';

const steps = ['Coding Information', 'Video' , 'Question', 'Question Video','Solution','Solution Video'];

const CodingExerciseContainer = ({selectedCodingExercise}) => {

    
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
    {selectedCodingExercise != null && (
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
                <>
                <Typography sx={{ mt: 2, mb: 1 }}>
                    {selectedCodingExercise.title} 
                </Typography>

                <p>{selectedCodingExercise.description}</p>

                <p>{selectedCodingExercise.getCodingExercises[0].instructions}</p>

                {selectedCodingExercise.getCodingExercises[0].downloadableResource != "" && (
                <a className='btn btn-danger my-2' href={`${IMG_HOST}${selectedCodingExercise.getCodingExercises[0].downloadableResource}`} download >Download Resource</a>
                )}

                <br />

                {selectedCodingExercise.getCodingExercises[0].externalLink != null && (
                    <a className='my-2' href={`${selectedCodingExercise.getCodingExercises[0].externalLink}`}>{selectedCodingExercise.getCodingExercises[0].externalLink} <i className="fas fa-external-link-alt"></i></a>

                )}

                
                </>
            )}

            {activeStep == 1 && (
                selectedCodingExercise.getCodingExercises[0].codingVideo != "" ?
                <Player autoPlay={true}>
                <source id="videoPlayer" src={`${IMG_HOST}${selectedCodingExercise.getCodingExercises[0].codingVideo}`} />
                </Player> : "No Video Available"
            )}

            {activeStep == 2 && (
                <>
                   <h6>Questions</h6>
                {selectedCodingExercise.getCodingExercises[0].codingExerciseSheet != "" && (
                   <a className='btn btn-danger my-2' href={`${IMG_HOST}${selectedCodingExercise.getCodingExercises[0].codingExerciseSheet}`} download >Download Questions</a>
                )}

                    <br />

                    {selectedCodingExercise.getCodingExercises[0].codingExternalLink != "" && (
                   <a className='my-2' href={`${selectedCodingExercise.getCodingExercises[0].codingExternalLink}`}>{selectedCodingExercise.getCodingExercises[0].codingExternalLink} <i className="fas fa-external-link-alt"></i></a>
                    )}

                </>
            )}

             {activeStep == 3 && (
                selectedCodingExercise.getCodingExercises[0].codingExerciseVideo != "" ?
                <Player autoPlay={true}>
                <source id="videoPlayer" src={`${IMG_HOST}${selectedCodingExercise.getCodingExercises[0].codingExerciseVideo}`} />
                </Player> : "No Video Available"
                    )}

            {activeStep == 4 && (
                <React.Fragment>
                <>
                    <h6>Solutions</h6>
                
                    {selectedCodingExercise.getCodingExercises[0].codingSolutionsSheet != "" && (
                    <a className='btn btn-danger my-2' href={`${IMG_HOST}${selectedCodingExercise.getCodingExercises[0].codingSolutionsSheet}`} download >Download Answers</a>
                    )}

                    <br />
                    {selectedCodingExercise.getCodingExercises[0].solutionsExternalLink != "" && (
                    <a className='my-2' href={selectedCodingExercise.getCodingExercises[0].solutionsExternalLink}>{selectedCodingExercise.getCodingExercises[0].solutionsExternalLink} <i className="fas fa-external-link-alt"></i></a>
                    )}
                </>


            </React.Fragment>
            )}

{activeStep == 5 && (
                selectedCodingExercise.getCodingExercises[0].codingSolutionsVideo != "" ?
                <Player autoPlay={true}>
                <source id="videoPlayer" src={`${IMG_HOST}${selectedCodingExercise.getCodingExercises[0].codingSolutionsVideo}`} />
                </Player> : "No Video Available"
                    )}

           

        {activeStep == 5 ? (
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

export default CodingExerciseContainer
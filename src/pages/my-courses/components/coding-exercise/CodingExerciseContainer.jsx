import React from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Player } from 'video-react';
import { IMG_HOST } from '../../../../api';

const steps = ['Coding exercise information and instructions', 'Coding exercise questions' , 'Solutions'];

const CodingExerciseContainer = ({setCodingExerciseActiveStep, activeStepCodingExercise , selectedCodingExercise}) => {

    
    const [skipped, setSkipped] = React.useState(new Set());
  
    const isStepOptional = (step) => {
      return step === 1;
    };
  
    const isStepSkipped = (step) => {
      return skipped.has(step);
    };
  
    const handleNext = () => {
      let newSkipped = skipped;
      if (isStepSkipped(activeStepCodingExercise)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStepCodingExercise);
      }
  
      setCodingExerciseActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    };
  
    const handleBack = () => {
      setCodingExerciseActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleSkip = () => {
      if (!isStepOptional(activeStepCodingExercise)) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
      }
  
      setCodingExerciseActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStepCodingExercise);
        return newSkipped;
      });
    };
  
    const handleReset = () => {
      setCodingExerciseActiveStep(0);
    };


  return (
    <>
    {selectedCodingExercise != null && (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStepCodingExercise}>
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

            {activeStepCodingExercise == 0 && (
                <div className='my-2'>
                {selectedCodingExercise.getCodingExercises[0].codingVideo != "" || selectedCodingExercise.getCodingExercises[0] != null  ?
                <Player autoPlay={true}>
                <source id="videoPlayer" src={`${IMG_HOST}${selectedCodingExercise.getCodingExercises[0].codingVideo}`} />
                </Player> : <p className='text-center my-4'>No Video Available</p>
                }

                <div className='my-3'>
                <h5 className='m-0 p-0'>
                  <b>
                    {selectedCodingExercise.title} 
                  </b>
                </h5>

                {selectedCodingExercise.description != "" && <p className='m-0 p-0'>Description</p>}
                <h6 className='m-0 p-0'>{selectedCodingExercise.description}</h6>
                {selectedCodingExercise.getCodingExercises[0].instructions != "" && <p className='m-0 p-0'>Instructions</p>}
                <h6 className='m-0 p-0'><i>{selectedCodingExercise.getCodingExercises[0].instructions}</i></h6>

                {selectedCodingExercise.getCodingExercises[0].downloadableResource != "" && (
                <a className='btn btn-danger my-2' href={`${IMG_HOST}${selectedCodingExercise.getCodingExercises[0].downloadableResource}`} download >Download Resource <i className="fas fa-download"></i></a>
                )}

                {selectedCodingExercise.getCodingExercises[0].externalLink != null && (
                    <a className='my-2' href={`${selectedCodingExercise.getCodingExercises[0].externalLink}`}>{selectedCodingExercise.getCodingExercises[0].externalLink} <i className="fas fa-external-link-alt"></i></a>

                )}
                  </div>
                </div>
            )}

         

            {activeStepCodingExercise == 1 && (
                <div className='my-2'>
                  {selectedCodingExercise.getCodingExercises[0].codingExerciseVideo != "" ?
                <Player autoPlay={true}>
                <source id="videoPlayer" src={`${IMG_HOST}${selectedCodingExercise.getCodingExercises[0].codingExerciseVideo}`} />
                </Player> : <p className='text-center my-4'>No Video Available</p>}

    
                {selectedCodingExercise.getCodingExercises[0].codingExerciseSheet != "" && (
                   <a className='btn btn-danger my-2' href={`${IMG_HOST}${selectedCodingExercise.getCodingExercises[0].codingExerciseSheet}`} download >Download Questions <i className="fas fa-download"></i></a>
                )}

                    <br />

                    {selectedCodingExercise.getCodingExercises[0].codingExternalLink != "" && (
                   <a className='my-2' href={`${selectedCodingExercise.getCodingExercises[0].codingExternalLink}`}>{selectedCodingExercise.getCodingExercises[0].codingExternalLink} <i className="fas fa-external-link-alt"></i></a>
                    )}

                </div>
            )}

        

            {activeStepCodingExercise == 2 && (
                <React.Fragment>
                <div className='my-2'>
                { selectedCodingExercise.getCodingExercises[0].codingSolutionsVideo != "" ?
                <Player autoPlay={true}>
                <source id="videoPlayer" src={`${IMG_HOST}${selectedCodingExercise.getCodingExercises[0].codingSolutionsVideo}`} />
                </Player> : <p className='text-center my-4'>No Video Available</p>}

              
                    {selectedCodingExercise.getCodingExercises[0].codingSolutionsSheet != "" && (
                    <a className='btn btn-danger my-2' href={`${IMG_HOST}${selectedCodingExercise.getCodingExercises[0].codingSolutionsSheet}`} download >Download Answers <i className="fas fa-download"></i></a>
                    )}

                    <br />
                    {selectedCodingExercise.getCodingExercises[0].solutionsExternalLink != "" && (
                    <a className='my-2' href={selectedCodingExercise.getCodingExercises[0].solutionsExternalLink}>{selectedCodingExercise.getCodingExercises[0].solutionsExternalLink} <i className="fas fa-external-link-alt"></i></a>
                    )}
                </div>


            </React.Fragment>
            )}

        

           

        {activeStepCodingExercise == 2 ? (
             <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                 <Button
            className='p-0'
              variant="contained"
              disabled={activeStepCodingExercise === 0}
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
              disabled={activeStepCodingExercise === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStepCodingExercise === steps.length - 1 ? <Button variant="contained">Finish</Button> : <Button variant="contained">Next</Button>}
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
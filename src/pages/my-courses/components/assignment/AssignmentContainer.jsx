import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Player } from 'video-react';
import { IMG_HOST } from '../../../../api';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/audio.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import { MediaPlayer, MediaProvider, Gesture ,useVideoQualityOptions , Menu  , SeekButton , Captions   } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

const steps = ['Assignment information and instructions', 'Questions', 'Solutions'];

const AssignmentContainer = ({ activeStep,  setActiveStep,  selectedAssignment }) => {

    
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
    {selectedAssignment != null && (
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
                <div className='my-2'>

              {selectedAssignment.getAssignments[0].assignmentVideo !== "" ? (
                <div className='m-3'>

                <MediaPlayer id="videoPlayer"  autoPlay={true} title={"Assignment"} src={`${IMG_HOST}${selectedAssignment.getAssignments[0].assignmentVideo}`} >
                    <MediaProvider  />
        
                    <DefaultVideoLayout  icons={defaultLayoutIcons} >
                    </DefaultVideoLayout>
                </MediaPlayer>

              
                </div>
              ) : (
                <p className='text-center my-4'>No Video Available</p>
              )}

              <div className='m-2'>
                <h5 className='m-0 p-0'>
                    <b>{selectedAssignment.title} </b>
                </h5>
                <p className='my-2 p-0'>Duration <i>({selectedAssignment.getAssignments[0].duration})</i></p>
                {selectedAssignment.description != "" && <h6 className='m-0 p-0'>Description</h6>}
                <p className='m-0 p-0'>{selectedAssignment.description}</p>
                <br />
                {selectedAssignment.getAssignments[0].instructions != "" && <h6 className='m-0 p-0'>Instructions</h6>}
                
                <p className='m-0 p-0'>{selectedAssignment.getAssignments[0].instructions}</p>
                {selectedAssignment.getAssignments[0].downloadableResource != "" && (
                <a className='btn btn-danger my-4' href={`${IMG_HOST}${selectedAssignment.getAssignments[0].downloadableResource}`} download >
                  Download Resource
                  <i className="fas fa-download mx-2"></i>
                </a>
                )}
                </div>

                <br />

                {selectedAssignment.getAssignments[0].externalLink != "" && (
                    <a className='my-2' href={`${selectedAssignment.getAssignments[0].externalLink}`}>{selectedAssignment.getAssignments[0].externalLink} <i className="fas fa-external-link-alt"></i></a>

                )}


                </div>
            )}

          
            {activeStep == 1 && (
                <div className='my-2'>
                   <h6 className='m-0 p-0'>{selectedAssignment.getAssignments[0].question}</h6>

                   <a className='btn btn-danger my-2' href={`${IMG_HOST}${selectedAssignment.getAssignments[0].questionSheet}`} download >Download Questions <i className="fas fa-download"></i></a>

                    <br />

                   <a className='my-2' href={`${selectedAssignment.getAssignments[0].questionExternalLink}`}>{selectedAssignment.getAssignments[0].questionExternalLink} <i className="fas fa-external-link-alt"></i></a>
                </div>
            )}

            {activeStep == 2 && (
                <React.Fragment>
                <div className='my-2'>

                

                {selectedAssignment.getAssignments[0].solutionVideo != "" ?
                    <MediaPlayer  autoPlay={true} title={"Assignment"} src={`${IMG_HOST}${selectedAssignment.getAssignments[0].solutionVideo}`} >
                    <MediaProvider  />
                  
                    <DefaultVideoLayout  icons={defaultLayoutIcons} >
                    </DefaultVideoLayout>
                    </MediaPlayer>
                    : 
                    <p className='text-center my-4'>No Video Available</p>
                  }
    
                    <h6 className='m-0 p-0'>{selectedAssignment.getAssignments[0].question}</h6>

                    <a className='btn btn-danger my-2' href={`${IMG_HOST}${selectedAssignment.getAssignments[0].solutionsSheet}`} download >Download Answers <i className="fas fa-download"></i></a>

                    <br />
                    
                    <a className='my-2' href={selectedAssignment.getAssignments[0].solutionsExternalLink}>{selectedAssignment.getAssignments[0].solutionsExternalLink} <i className="fas fa-external-link-alt"></i></a>
                </div>

               


            </React.Fragment>
            )}

          

          {activeStep == 2 ? (
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
               <Button
            className='p-0'
              variant="contained"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button variant="contained" onClick={handleReset}>Reset</Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', pt: 2 }}>
            <Button
            className='p-0'
              variant="contained"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? <Button variant="contained">Finish</Button> : <Button variant="contained">Next</Button>}
            </Button>
          </Box>
          
          )}
        </React.Fragment>
     
    </Box>
    )}
    </>
  )
}

export default AssignmentContainer
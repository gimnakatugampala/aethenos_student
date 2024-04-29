import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Player } from 'video-react';
import { IMG_HOST } from '../../../../api';

const steps = ['Assignment Information', 'Video' , 'Question', 'Solutions','Solution Video'];

const AssignmentContainer = ({ selectedAssignment }) => {

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
                <>
                <Typography sx={{ mt: 2, mb: 1 }}>
                    {selectedAssignment.title} ({selectedAssignment.getAssignments[0].duration})
                </Typography>

                <p>{selectedAssignment.description}</p>

                <p>{selectedAssignment.getAssignments[0].instructions}</p>

                {selectedAssignment.getAssignments[0].downloadableResource != "" && (
                <a className='btn btn-danger my-2' href={`${IMG_HOST}${selectedAssignment.getAssignments[0].downloadableResource}`} download >Download Resource</a>
                )}

                <br />

                {selectedAssignment.getAssignments[0].externalLink != "" && (
                    <a className='my-2' href={`${selectedAssignment.getAssignments[0].externalLink}`}>{selectedAssignment.getAssignments[0].externalLink} <i className="fas fa-external-link-alt"></i></a>

                )}

                
                </>
            )}

            {activeStep == 1 && (
                selectedAssignment.getAssignments[0].assignmentVideo != "" ?
                <Player autoPlay={true}>
                <source id="videoPlayer" src={`${IMG_HOST}${selectedAssignment.getAssignments[0].assignmentVideo}`} />
                </Player> : "No Video Available"
            )}

            {activeStep == 2 && (
                <>
                   <h6>Questions</h6>
                   <p>{selectedAssignment.getAssignments[0].question}</p>

                   <a className='btn btn-danger my-2' href={`${IMG_HOST}${selectedAssignment.getAssignments[0].questionSheet}`} download >Download Questions</a>

                    <br />

                   <a className='my-2' href={`${selectedAssignment.getAssignments[0].questionExternalLink}`}>{selectedAssignment.getAssignments[0].questionExternalLink} <i className="fas fa-external-link-alt"></i></a>
                </>
            )}

            {activeStep == 3 && (
                <React.Fragment>
                <>
                    <h6>Solutions</h6>
                    <p>{selectedAssignment.getAssignments[0].question}</p>

                    <a className='btn btn-danger my-2' href={`${IMG_HOST}${selectedAssignment.getAssignments[0].solutionsSheet}`} download >Download Answers</a>

                    <br />
                    
                    <a className='my-2' href={selectedAssignment.getAssignments[0].solutionsExternalLink}>{selectedAssignment.getAssignments[0].solutionsExternalLink} <i className="fas fa-external-link-alt"></i></a>
                </>


            </React.Fragment>
            )}

            {activeStep == 4 && (
                    selectedAssignment.getAssignments[0].solutionVideo != "" ?
                    <Player autoPlay={true}>
                    <source id="videoPlayer" src={`${IMG_HOST}${selectedAssignment.getAssignments[0].solutionVideo}`} />
                    </Player> : "No Video Available"
            )}

        {activeStep == 4 ? (
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

export default AssignmentContainer
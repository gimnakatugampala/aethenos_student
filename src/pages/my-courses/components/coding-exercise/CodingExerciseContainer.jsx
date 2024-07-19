import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Player } from 'video-react';
import { IMG_HOST } from '../../../../api';

const steps = ['Coding exercise information and instructions', 'Coding exercise questions', 'Solutions'];

const CodingExerciseContainer = ({ setCodingExerciseActiveStep, activeStepCodingExercise, selectedCodingExercise }) => {
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => step === 1;
  const isStepSkipped = (step) => skipped.has(step);

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

  const codingExercise = selectedCodingExercise?.getCodingExercises?.[0] || {};

  return (
    <>
      {selectedCodingExercise && (
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
            {activeStepCodingExercise === 0 && (
              <div className='my-2'>
                {codingExercise.codingVideo ? (
                  <Player autoPlay={true}>
                    <source id="videoPlayer" src={`${IMG_HOST}${codingExercise.codingVideo}`} />
                  </Player>
                ) : (
                  <p className='text-center my-4'>No Video Available</p>
                )}

                <div className='my-3'>
                  <h5 className='m-0 p-0'>
                    <b>{selectedCodingExercise.title}</b>
                  </h5>

                  {selectedCodingExercise.description && (
                    <>
                      <p className='m-0 p-0'>Description</p>
                      <h6 className='m-0 p-0'>{selectedCodingExercise.description}</h6>
                    </>
                  )}

                  {codingExercise.instructions && (
                    <>
                      <p className='m-0 p-0'>Instructions</p>
                      <h6 className='m-0 p-0'><i>{codingExercise.instructions}</i></h6>
                    </>
                  )}

                  {codingExercise.downloadableResource && (
                    <a className='btn btn-danger my-2' href={`${IMG_HOST}${codingExercise.downloadableResource}`} download>
                      Download Resource <i className="fas fa-download"></i>
                    </a>
                  )}

                  {codingExercise.externalLink && (
                    <a className='my-2' href={codingExercise.externalLink}>
                      {codingExercise.externalLink} <i className="fas fa-external-link-alt"></i>
                    </a>
                  )}
                </div>
              </div>
            )}

            {activeStepCodingExercise === 1 && (
              <div className='my-2'>
                {codingExercise.codingExerciseVideo ? (
                  <Player autoPlay={true}>
                    <source id="videoPlayer" src={`${IMG_HOST}${codingExercise.codingExerciseVideo}`} />
                  </Player>
                ) : (
                  <p className='text-center my-4'>No Video Available</p>
                )}

                {codingExercise.codingExerciseSheet && (
                  <a className='btn btn-danger my-2' href={`${IMG_HOST}${codingExercise.codingExerciseSheet}`} download>
                    Download Questions <i className="fas fa-download"></i>
                  </a>
                )}

                <br />

                {codingExercise.codingExternalLink && (
                  <a className='my-2' href={codingExercise.codingExternalLink}>
                    {codingExercise.codingExternalLink} <i className="fas fa-external-link-alt"></i>
                  </a>
                )}
              </div>
            )}

            {activeStepCodingExercise === 2 && (
              <React.Fragment>
                <div className='my-2'>
                  {codingExercise.codingSolutionsVideo ? (
                    <Player autoPlay={true}>
                      <source id="videoPlayer" src={`${IMG_HOST}${codingExercise.codingSolutionsVideo}`} />
                    </Player>
                  ) : (
                    <p className='text-center my-4'>No Video Available</p>
                  )}

                  {codingExercise.codingSolutionsSheet && (
                    <a className='btn btn-danger my-2' href={`${IMG_HOST}${codingExercise.codingSolutionsSheet}`} download>
                      Download Answers <i className="fas fa-download"></i>
                    </a>
                  )}

                  <br />

                  {codingExercise.solutionsExternalLink && (
                    <a className='my-2' href={codingExercise.solutionsExternalLink}>
                      {codingExercise.solutionsExternalLink} <i className="fas fa-external-link-alt"></i>
                    </a>
                  )}
                </div>
              </React.Fragment>
            )}

            {activeStepCodingExercise === steps.length - 1 ? (
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
                  {activeStepCodingExercise === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            )}
          </React.Fragment>
        </Box>
      )}
    </>
  );
};

export default CodingExerciseContainer;

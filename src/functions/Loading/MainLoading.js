import { SpinnerCircular } from 'spinners-react';

// 
function MainLoading() {
  return (
    <div className='d-flex justify-content-center align-items-center text-center'>
    <div className='position-absolute top-50'>
        <SpinnerCircular size={75} thickness={180} speed={100} color="#e01D20" secondaryColor="rgba(0, 0, 0, 0.44)" />
        <h4 className='my-2'>Loading...</h4>
        </div>
    </div>
  );
}

export default MainLoading;
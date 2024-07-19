import React from 'react'
import { Triangle } from 'react-loader-spinner'
const MediumLoading = () => {
  return (
    <div style={{height:'50vh'}} className='d-flex justify-content-center align-items-center'>
    <Triangle
    visible={true}
    height="90"
    width="90"
    color="#e01D20"
    ariaLabel="triangle-loading"
    wrapperStyle={{}}
    wrapperClass=""
    />
</div>
  )
}

export default MediumLoading
import React from 'react'
import { Triangle } from 'react-loader-spinner'
const LargeLoading = () => {
  return (
    <div style={{height:'100vh'}} className='d-flex justify-content-center align-items-center'>
            <Triangle
            visible={true}
            height="150"
            width="150"
            color="#e01D20"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            />
    </div>
  )
}

export default LargeLoading
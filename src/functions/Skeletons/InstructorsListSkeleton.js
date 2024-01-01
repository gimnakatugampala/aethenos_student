import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const InstructorsListSkeleton = () => {
  return (
    <div className='col-md-4 mb-2'>
    <Skeleton height={100} width={300}  />
    <Skeleton height={100} width={300}  />
    </div>
  )
}

export default InstructorsListSkeleton
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LandscapeListSkeleton = () => {
  return (
    <div className='col-md-10 mb-2'>
    <Skeleton height={500} width={700}  />
    </div>
  )
}

export default LandscapeListSkeleton
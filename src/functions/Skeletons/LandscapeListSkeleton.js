import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LandscapeListSkeleton = () => {
  return (
    <div className='row'>
        <div className='col-md-2 mb-2'>
        <Skeleton height={500} width={150}  />
        </div>
        <div className='col-md-10 mb-2'>
        <Skeleton height={50} width={800}  />
        <Skeleton height={150} width={800}  />
        <Skeleton height={150} width={800}  />
        <Skeleton height={150} width={800}  />
        </div>
    </div>
  )
}

export default LandscapeListSkeleton
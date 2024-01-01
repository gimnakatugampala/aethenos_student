import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const TopicsListSkeleton = () => {
  return (
    <div className='col-md-3 mb-2'>
    <Skeleton height={50} width={250}  />
    <Skeleton height={50} width={250}  />
    </div>
  )
}

export default TopicsListSkeleton
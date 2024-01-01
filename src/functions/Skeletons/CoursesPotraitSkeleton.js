import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CoursesPotraitSkeleton = () => {
  return (
    <div className='col-md-3 mb-2'>
    <Skeleton height={200} width={250}  />
    <Skeleton height={20} width={50}  />
    <Skeleton height={20} width={250}  />
    <Skeleton height={20} width={250}  />
    </div>
  )
}

export default CoursesPotraitSkeleton
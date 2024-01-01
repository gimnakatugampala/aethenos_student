import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Box({ children }) {
    return (
      <div
        style={{
          lineHeight: 2,
          padding: 20
        }}
      >
        {children}
      </div>
    );
  }

const OneLineSkeleton = ({height}) => {
  return (
    <Skeleton height={height}  />
  )
}

export default OneLineSkeleton
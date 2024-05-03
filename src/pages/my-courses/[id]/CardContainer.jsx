import React from 'react'

const CardContainer = ({children,className}) => {
  return (
    <div  className={`course-sidebar-3 ${className}`}>
    <div  className="d-flex align-items-center widget-course-summery rounded h-100">
        {children}
    </div>
    </div>
  )
}

export default CardContainer
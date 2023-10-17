import React from 'react'

const CardContainer = ({children,className}) => {
  return (
    <div className={`course-sidebar-3 ${className}`}>
    <div className="edu-course-widget widget-course-summery">
        {children}
    </div>
    </div>
  )
}

export default CardContainer
import React from 'react'

const CardContainer = ({children,className}) => {
  return (
    <div  className={`course-sidebar-3 ${className}`}>
    <div  className="widget-course-summery  p-3 rounded h-75">
        {children}
    </div>
    </div>
  )
}

export default CardContainer
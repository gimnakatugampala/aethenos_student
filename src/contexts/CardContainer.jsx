import React from 'react'

const CardContainer = ({children,className}) => {
  return (
    <div  className={`course-sidebar-3 ${className}`}>
    <div  className="widget-course-summery shadow p-3 mb-2 rounded h-100">
        {children}
    </div>
    </div>
  )
}

export default CardContainer
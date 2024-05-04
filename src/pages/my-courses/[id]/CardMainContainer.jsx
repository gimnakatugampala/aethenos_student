import React from 'react'

const CardMainContainer = ({className,children}) => {
  return (
    <div  className={`course-sidebar-3 ${className} rounded`}>
    <div  className="widget-course-summery p-2 mb-1 rounded h-100 border border-secondary">
        {children}
    </div>
    </div>
  )
}

export default CardMainContainer
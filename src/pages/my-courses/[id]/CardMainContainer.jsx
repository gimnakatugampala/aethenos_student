import React from 'react'

const CardMainContainer = ({children}) => {
  return (
    <div  className={`course-sidebar-3`}>
    <div  className="widget-course-summery p-2 mb-1 rounded h-100 border">
        {children}
    </div>
    </div>
  )
}

export default CardMainContainer
import React from 'react';

const Accordian = ({show=false,id="1",title="Test Title",lectures="5",lists,no_quiz="0"}) => {
    return (
        <div className="accordion-item mb-2">
            
            <p  className="accordion-header">
                <button style={{fontSize:'16px'}} className={`accordion-button d-flex justify-content-between ${show?'':'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={`#question-${id}`} aria-expanded={show?'true':'false'}>
                    Section 1 : Up And Running With Python
                </button>
               
            </p>
            <div id={`question-${id}`} className={`accordion-collapse collapse ${show?'show':''}`} data-bs-parent="#faq-accordion">
                <div className="accordion-body">
                    <ul className='list-unstyled'>
                        {/* {lists.map((list,index) => (
                            list.curriculum_item_type == "Lecture" ? 
                        <li key={index} className='d-flex justify-content-between align-items-center'>
                            <span>
                            <i className="fa-solid fa-circle-play mx-2"></i> {list.title}
                            </span>
                       
                        </li> 
                        : 
                        <li key={index} className='d-flex justify-content-between align-items-center'>
                        <span>
                        <i className="fa-solid fa-circle-question mx-2"></i> {list.title}
                        </span>

                   
                        </li>
                        ))} */}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Accordian;
import React from 'react';

const Accordian = ({show=false,id,title,lectures,lists,no_quiz}) => {
    return (
        <div className="accordion-item mb-2">
            <p className="accordion-header">
                <button className={`accordion-button d-flex justify-content-between ${show?'':'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={`#question-${id}`} aria-expanded={show?'true':'false'}>
                    {title}
                <span className='m-0 p-0'>{lectures} {lectures == 1 ? 'Lecture' : 'Lectures'} • {no_quiz} {no_quiz == 1 ? 'Quiz' : 'Quizes'} </span>
                </button>
            </p>
            <div id={`question-${id}`} className={`accordion-collapse collapse ${show?'show':''}`} data-bs-parent="#faq-accordion">
                <div className="accordion-body">
                    <ul className='list-unstyled'>
                        {lists.map((list,index) => (
                            list.curriculum_item_type == "Lecture" ? 
                        <li key={index} className='d-flex justify-content-between align-items-center'>
                            <span>
                            <i className="fa-solid fa-circle-play mx-2"></i> {list.title}
                            </span>
                            {/* <span>01:00</span> */}
                        </li> 
                        : 
                        <li key={index} className='d-flex justify-content-between align-items-center'>
                        <span>
                        <i className="fa-solid fa-circle-question mx-2"></i> {list.title}
                        </span>

                        {/* <span>01:00</span> */}
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Accordian;
import React from 'react';

const Accordian = ({show=false,id,title,desc,lectures}) => {
    return (
        <div className="accordion-item mb-2">
            <p className="accordion-header">
                <button className={`accordion-button d-flex justify-content-between ${show?'':'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={`#question-${id}`} aria-expanded={show?'true':'false'}>
                    {title}
                <span className='m-0 p-0'>{lectures} Lectures • 27min</span>
                </button>
            </p>
            <div id={`question-${id}`} className={`accordion-collapse collapse ${show?'show':''}`} data-bs-parent="#faq-accordion">
                <div className="accordion-body">
                    <ul className='list-unstyled'>
                        <li className='d-flex justify-content-between align-items-center'>
                            <span>
                            <i className="fa-solid fa-circle-play mx-2"></i>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores, ex.
                            </span>

                            <span>01:00</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Accordian;
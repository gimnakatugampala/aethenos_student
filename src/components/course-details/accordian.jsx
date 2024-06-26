import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';

import ReactDOM from 'react-dom';
import ModalVideo from 'react-modal-video';
import { IMG_HOST } from '../../api';


const Accordian = ({show=false,id,title,lectures,lists,no_quiz}) => {

    const [isOpen, setOpen] = useState(false);
    const [selectedURL, setselectedURL] = useState("")


    useEffect(() => {
      console.log(lists)
    }, [])
    

    return (
        <>
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
                            <>
                        {/* Lecture */}
                        {list.curriculum_item_type === "Lecture" && (
                            <li key={index} className='d-flex justify-content-between align-items-center'>
                                <span>
                                {list.article !== "N/A" ? (
                                    <> 
                                    <i className="fa-solid fa-file mx-2"></i> {list.title}
                                    </>
                                ) : (
                                    <>
                                    {list && list.get_CurriculumItem_File && list.get_CurriculumItem_File.some(link => link.curriculum_item_file_type === "Video") && (
                                        <>
                                        <>
                                            {list.get_CurriculumItem_File
                                            .filter(link => link.curriculum_item_file_type === "Video")
                                            .map((link, index) => (
                                                <span key={index}>
                                                {link.previewVideo ? (
                                                    // Enable text decoration for preview videos
                                                    <a onClick={() => {
                                                        setOpen(true)
                                                        setselectedURL(link.url)
                                                    }} className='text-danger text-decoration-underline'><i className="fa-solid fa-circle-play mx-2"></i> {list.title}</a>
                                                ) : (
                                                    // Normal link for other videos
                                                    <><i className="fa-solid fa-circle-play mx-2"></i> {list.title}</>
                                                )}
                                                </span>
                                            ))}
                                        </>
                                        </>
                                    )}
                                    </>
                                )}
                                </span>
                            </li>
                            )}


                        {/* Quiz */}
                        {list.curriculum_item_type == "Quiz" && 
                        ( <li key={index} className='d-flex justify-content-between align-items-center'>
                            <span>
                            <i className="fa-solid fa-circle-question mx-2"></i> {list.title}
                            </span>
    
                        </li>)}

                        {/* Assignment */}
                        {list.curriculum_item_type == "Assignment" && 
                        ( <li key={index} className='d-flex justify-content-between align-items-center'>
                            <span>
                            <i className="fa-solid fa-list-check mx-2"></i> {list.title}
                            </span>
    
                        </li>)}
        
                        {/* Coding Exercise */}
                        {list.curriculum_item_type == "Coding Exercise" && 
                        ( <li key={index} className='d-flex justify-content-between align-items-center'>
                            <span>
                            <i className="fa-solid fa-code mx-2"></i> {list.title}
                            </span>
    
                        </li>)}

                        {/* Practical Exercise */}
                        {list.curriculum_item_type == "Practice Test" && 
                        ( <li key={index} className='d-flex justify-content-between align-items-center'>
                            <span>
                            <i className="fa-solid fa-book mx-2"></i> {list.title}
                            </span>
    
                        </li>)}

                       

                        </>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        <React.Fragment>
        <ModalVideo
                  channel="custom"
                //   controls="0"
                  isOpen={isOpen}
                  url={`${IMG_HOST}${selectedURL}`}
                  onClose={() => setOpen(false)} 
              />
      </React.Fragment>
      </>
    )
}

export default Accordian;
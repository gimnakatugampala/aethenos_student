import React, { useEffect } from 'react';
import CardContainer from '../../components/course-content/CardContainer';
import { IMG_HOST } from '../../api';

const Accordian = ({show=false,content,id,setmain_Video_player_url}) => {

    useEffect(() => {
        content.section_curriculum_item.map((list,index) => (
            list.curriculum_item_type == "Lecture" && list.get_CurriculumItem_File.map((type) => (
                type.curriculum_item_file_type == "Video" == setmain_Video_player_url(`${IMG_HOST}${type.url}`)
            ))))
    }, [content])
    

    return (
        <div className="accordion-item mb-2">
            
            <p  className="accordion-header">
                <button style={{fontSize:'16px'}} className={`accordion-button d-flex justify-content-between ${show?'':'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={`#question-${id}`} aria-expanded={show?'true':'false'}>
                    Section {id} : {content.section_name}
                </button>
               
            </p>
            <div id={`question-${id}`} className={`accordion-collapse collapse ${show?'show':''}`} data-bs-parent="#faq-accordion">
                <div className="accordion-body p-1">
                    <ol style={{cursor:'pointer'}} className='p-0'>
                        {content.section_curriculum_item.map((list,index) => (
                            list.curriculum_item_type == "Lecture" && list.get_CurriculumItem_File.map((type) => (
                                
                            type.curriculum_item_file_type == "Video" &&
                            <span key={index} onClick={() => setmain_Video_player_url(`${IMG_HOST}${type.url}`)}>
                            <CardContainer  className="m-1 p-0 border border-dark" >
                            <li  className='d-flex'>
                                <span>
                                {index + 1}.<i className="fa-solid fa-circle-play mx-2"></i> {list.title}
                                </span>
                            </li> 
                            </CardContainer>
                            </span>
                            ))
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default Accordian;
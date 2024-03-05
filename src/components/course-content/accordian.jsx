import React, { useEffect } from 'react';
import CardContainer from '../../components/course-content/CardContainer';
import Dropdown from 'react-bootstrap/Dropdown';
import { IMG_HOST, UpdateCourseProgress } from '../../api';

const Accordian = ({show=false,content,id,setmain_Video_player_url,itemCode}) => {

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

                            list.curriculum_item_type == "Lecture" && list.article == "N/A"  ? list.get_CurriculumItem_File.map((type) => (
                            
                            // Video
                            type.curriculum_item_file_type == "Video" &&
                            <span key={index} onClick={() => {
                                setmain_Video_player_url(`${IMG_HOST}${type.url}`)
                                
                                //  -------------- LOAD VIDEO ----------------
                                var videoPlayer = document.querySelector(".video-react-video");
                                var videoSource = document.getElementById("videoPlayer");
                              
                                videoSource.src = `${IMG_HOST}${type.url}`;
                                videoPlayer.load();

                                //  -------------- LOAD VIDEO ----------------


                                //  --------------- UPDATE COURSE PROGRESS ------------ 
                                UpdateCourseProgress(content.section_name,itemCode)
                                console.log(content.section_name)
                                console.log(itemCode)
                                //  --------------- UPDATE COURSE PROGRESS ------------ 
                            }}>
                            <CardContainer  className="m-1 p-0 border border-dark shadow" >
                            <li  className='d-flex'>
                                <span>
                                {index + 1}.<i className="fa-solid fa-circle-play mx-2"></i> {list.title}
                                </span>
                            </li> 

                            
                            <div className='d-flex justify-content-around'>
                            
                            {/* Resources */}
                            {list.get_CurriculumItem_File.some(type => type.curriculum_item_file_type === "Downloadable Items" || type.curriculum_item_file_type === "Source Code") && (
                        <Dropdown>
                            <Dropdown.Toggle size="sm" variant="danger">
                            <i className="fas fa-folder-open"></i> Resources
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                            {list.get_CurriculumItem_File.map((type, index) => (
                                (type.curriculum_item_file_type === "Downloadable Items" || type.curriculum_item_file_type === "Source Code") && (
                                <Dropdown.Item download={true} key={index} href={`${IMG_HOST}${type.url}`}>
                                    {type.title}
                                </Dropdown.Item>
                                )
                            ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        )}


                            {/* Links */}
                            <Dropdown>
                            <Dropdown.Toggle  size="sm" variant="danger">
                                <i className="fas fa-link"></i>   Links
                                </Dropdown.Toggle>
                            
                            <Dropdown.Menu>
                            {list.get_CurriculumItem_File.map((type,index) => (
                                type.curriculum_item_file_type == "External Resourses" &&
                                <Dropdown.Item target='_blank' key={index} href={`${type.url}`}>{type.title}</Dropdown.Item> 
                                ))}
                            </Dropdown.Menu>
                            </Dropdown>

                            </div>




                            </CardContainer>
                            </span>
                            )) : (
                                // Article
                            <span key={index}>
                                <CardContainer  className="m-1 p-0 border border-dark shadow" >
                                <li  className='d-flex'>
                                    <span>
                                    {index + 1}.<i className="fas fa-newspaper mx-2"></i> {list.title}
                                    </span>
                                </li> 
    
                                
                                <div className='d-flex justify-content-around'>
                                <Dropdown>
                                <Dropdown.Toggle size="sm" variant="danger">
                                <i className="fas fa-folder-open"></i>   Resources
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                {list.get_CurriculumItem_File.map((type,index) => (
                                    type.curriculum_item_file_type == "Downloadable Items" ?
                                    <Dropdown.Item download={true} key={index} href={`${IMG_HOST}${type.url}`}>{type.title}</Dropdown.Item> :
                                    type.curriculum_item_file_type == "Source Code" && <Dropdown.Item download={true} key={index} href={`${IMG_HOST}${type.url}`}>{type.title}</Dropdown.Item>
                                ))}
                                </Dropdown.Menu>

                            </Dropdown>

                            {/* Links */}
                            <Dropdown>
                            <Dropdown.Toggle  size="sm" variant="danger">
                                <i className="fas fa-link"></i>   Links
                                </Dropdown.Toggle>
                            
                            <Dropdown.Menu>
                            {list.get_CurriculumItem_File.map((type,index) => (
                                type.curriculum_item_file_type == "External Resourses" &&
                                <Dropdown.Item target='_blank' key={index} href={`${type.url}`}>{type.title}</Dropdown.Item> 
                                ))}
                            </Dropdown.Menu>
                            </Dropdown>
    
                                </div>
    
    
    
    
                                </CardContainer>
                            </span>
                            )

                        ))}
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default Accordian;
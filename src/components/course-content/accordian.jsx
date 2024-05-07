import React, { useEffect } from 'react';
import CardContainer from '../../pages/my-courses/[id]/CardContainer';
import Dropdown from 'react-bootstrap/Dropdown';
import { GetMyCoursesDetails, IMG_HOST, UpdateCourseCurriculumProgress, UpdateCourseProgress } from '../../api';
import { CheckBox } from '@mui/icons-material';
import Form from 'react-bootstrap/Form';
import CardMainContainer from '../../pages/my-courses/[id]/CardMainContainer';


const Accordian = ({show=false,content,id,setmain_Video_player_url,itemCode, setshowVideoPlayer, setarticle, setshowquiz, setselectedQuiz, setshowAssignment , setselectedAssignment , setshowPracticeTest , setselectedPracticeTest, setshowCodingExercise , setselectedCodingExercise , setcourse , courseItemCode,
setseletedCurriculumItem , seletedCurriculumItem, setStartquiz , setanswerAlertDisplay , setselectAnswer , activeStep, setActiveStep, setPraticeTestActiveStep , setCodingExerciseActiveStep}) => {

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
                        <React.Fragment key={index}>

                            {/* Video */}
                            {list.curriculum_item_type == "Lecture" && list.article == "N/A" && (
                                list.get_CurriculumItem_File.map((type, idx) => (
                                    type.curriculum_item_file_type === "Video" && (
                                        <span key={idx} onClick={() => {
                                            setarticle("");
                                            setshowVideoPlayer(true); 
                                            setshowAssignment(false)
                                            setshowquiz(false)
                                            setshowPracticeTest(false)
                                            setshowCodingExercise(false)
                                            
                                            setmain_Video_player_url(`${IMG_HOST}${type.url}`);
                                            var videoPlayer = document.querySelector(".video-react-video");
                                            var videoSource = document.getElementById("videoPlayer");
                                            videoSource.src = `${IMG_HOST}${type.url}`;
                                            videoPlayer.load();

                                            setseletedCurriculumItem(list.curriculumItemId)

                                            UpdateCourseCurriculumProgress(itemCode, list.curriculumItemId);
                                            
                                            GetMyCoursesDetails(courseItemCode, setcourse)
                                        }}>
                                            <CardMainContainer className={seletedCurriculumItem == list.curriculumItemId && `bg-secondary`}>
                                            <CardContainer className={`m-1 p-0 ${seletedCurriculumItem == list.curriculumItemId && `bg-secondary text-white`}`}>
                                                <Form.Check
                                                    className='mb-4 p-0'
                                                    checked={list.read}
                                                    type={"checkbox"}
                                                    id={`default-${index}`}
                                                    label={""}
                                                />
                                                <li className='d-flex'>
                                                <p className={seletedCurriculumItem == list.curriculumItemId ? 'text-white' : ''}>
                                                        {index + 1}.<i className="fa-solid fa-circle-play mx-2"></i> {list.title} <span style={{fontSize:'12px'}}><b><i><i className="fas fa-tv mx-2"></i>2min</i></b></span>
                                                    </p>
                                                </li> 
                                                </CardContainer>
                                                <div className='d-flex justify-content-around'>
                                                    {/* Resources */}
                                                    {list.get_CurriculumItem_File.some(type => type.curriculum_item_file_type === "Downloadable Items" || type.curriculum_item_file_type === "Source Code") && (
                                                        <Dropdown>
                                                            <Dropdown.Toggle size="sm" variant="danger">
                                                                <i className="fas fa-folder-open"></i> Resources
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                {list.get_CurriculumItem_File.map((item, idx) => (
                                                                    (item.curriculum_item_file_type === "Downloadable Items" || item.curriculum_item_file_type === "Source Code") && (
                                                                        <Dropdown.Item download={true} key={idx} href={`${IMG_HOST}${item.url}`}>
                                                                            {item.title}
                                                                        </Dropdown.Item>
                                                                    )
                                                                ))}
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    )}
                                                    {/* Links */}
                                                    <Dropdown>
                                                        <Dropdown.Toggle  size="sm" variant="danger">
                                                            <i className="fas fa-link"></i> Links
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            {list.get_CurriculumItem_File.map((item, idx) => (
                                                                item.curriculum_item_file_type === "External Resourses" && (
                                                                    <Dropdown.Item target='_blank' key={idx} href={`${item.url}`}>
                                                                        {item.title}
                                                                    </Dropdown.Item> 
                                                                )
                                                            ))}
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                                </CardMainContainer>
                                        </span>
                                    )
                                ))
                            )}


                            {/* Article  */}
                            {list.curriculum_item_type == "Lecture" && list.article != "N/A" && (
                            <span onClick={() => { 
                                setarticle(list.article);
                                setshowVideoPlayer(false); 
                                setshowAssignment(false)
                                setshowquiz(false)
                                setshowPracticeTest(false)
                                setshowCodingExercise(false)

                                setseletedCurriculumItem(list.curriculumItemId)

                                UpdateCourseCurriculumProgress(itemCode, list.curriculumItemId);

                                GetMyCoursesDetails(courseItemCode, setcourse)

                              

                            }} key={index}>
                                <CardMainContainer className={seletedCurriculumItem == list.curriculumItemId && `bg-secondary`}>
                                <CardContainer className={`m-1 p-0 ${seletedCurriculumItem == list.curriculumItemId && `bg-secondary text-white`}`}>
                                <Form.Check
                                    className='mb-4 p-0'
                                    checked={list.read}
                                    type={"checkbox"}
                                    id={`default-${index}`}
                                    label={""}
                                />

                                    <li className='d-flex'>
                                    <p className={seletedCurriculumItem == list.curriculumItemId ? 'text-white' : ''}>
                                            {index + 1}.<i className="fas fa-newspaper mx-2"></i> {list.title}
                                        </p>
                                   </li> 
                                </CardContainer>
            
                                <div className='d-flex justify-content-around'>
                                    {/* Resources */}
                                    <Dropdown>
                                        <Dropdown.Toggle size="sm" variant="danger">
                                            <i className="fas fa-folder-open"></i> Resources
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {list.get_CurriculumItem_File.map((item, idx) => (
                                                item.curriculum_item_file_type === "Downloadable Items" && (
                                                    <Dropdown.Item download={true} key={idx} href={`${IMG_HOST}${item.url}`}>
                                                        {item.title}
                                                    </Dropdown.Item>
                                                )
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {/* Links */}
                                    <Dropdown>
                                        <Dropdown.Toggle  size="sm" variant="danger">
                                            <i className="fas fa-link"></i> Links
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {list.get_CurriculumItem_File.map((item, idx) => (
                                                item.curriculum_item_file_type === "External Resourses" && (
                                                    <Dropdown.Item target='_blank' key={idx} href={`${item.url}`}>
                                                        {item.title}
                                                    </Dropdown.Item> 
                                                )
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                        
                                    
                                </CardMainContainer>
                            </span>
                            )}

                            {/* Quiz */}
                            {list.curriculum_item_type == "Quiz"  && (
                                    <span onClick={() => { 

                                        setselectedQuiz(null)
                                        setStartquiz(false)
                                        setanswerAlertDisplay(null)
                                        setselectAnswer(0)

                                        setarticle("");
                                        setshowVideoPlayer(false); 
                                        setshowAssignment(false)
                                        setshowquiz(true)
                                        setshowPracticeTest(false)
                                        setshowCodingExercise(false)
                                    
                                        UpdateCourseCurriculumProgress(itemCode, list.curriculumItemId);


                                        setselectedQuiz(list)

                                        setseletedCurriculumItem(list.curriculumItemId)

                                        GetMyCoursesDetails(courseItemCode, setcourse)

                                        console.log(list)
                                    }} key={index}>
                                <CardMainContainer className={seletedCurriculumItem == list.curriculumItemId && `bg-secondary`}>
                                <CardContainer className={`m-1 p-0 ${seletedCurriculumItem == list.curriculumItemId && `bg-secondary text-white`}`}>
                                        <Form.Check
                                                    className='mb-4 p-0'
                                                    checked={list.read}
                                                    type={"checkbox"}
                                                    id={`default-${index}`}
                                                    label={""}
                                                />
                                            <li className='d-flex'>
                                            <p className={seletedCurriculumItem == list.curriculumItemId ? 'text-white' : ''}>
                                                    {index + 1}.<i className="fas fa-question mx-2"></i> {list.title}
                                                </p>
                                            </li> 
                                        </CardContainer>
                                        </CardMainContainer>
                                    </span>

                            )}

                            {/* Assignment */}
                            {list.curriculum_item_type == "Assignment"  && (
                                 <span onClick={() => { 
                                    setActiveStep(0)
                                    setarticle("");
                                    setshowVideoPlayer(false); 
                                    setshowAssignment(true)
                                    setshowquiz(false)
                                    setshowPracticeTest(false)
                                    setshowCodingExercise(false)

                                    setseletedCurriculumItem(list.curriculumItemId)
                                  
                                    UpdateCourseCurriculumProgress(itemCode, list.curriculumItemId);
                                    setselectedAssignment(list)

                                    GetMyCoursesDetails(courseItemCode, setcourse)

                                    console.log(list)
                                }} key={index}>
                                    <CardMainContainer className={seletedCurriculumItem == list.curriculumItemId && `bg-secondary`}>
                                <CardContainer className={`m-1 p-0 ${seletedCurriculumItem == list.curriculumItemId && `bg-secondary text-white`}`}>
                                    <Form.Check
                                                className='mb-4 p-0'
                                                checked={list.read}
                                                type={"checkbox"}
                                                id={`default-${index}`}
                                                label={""}
                                            />
                                        <li className='d-flex'>
                                        <p className={seletedCurriculumItem == list.curriculumItemId ? 'text-white' : ''}>
                                                {index + 1}.<i className="fas fa-clipboard-list mx-2"></i> {list.title}
                                            </p>
                                        </li> 
                                    </CardContainer>
                                    </CardMainContainer>
                                </span>
                            )}

                            {/* Practice Test */}
                            {list.curriculum_item_type == "Practice Test" && (
                                 <span onClick={() => { 
                                    setPraticeTestActiveStep(0)
                                    setselectedPracticeTest(null)
                                    setarticle("");
                                    setshowVideoPlayer(false); 
                                    setshowAssignment(false)
                                    setshowquiz(false)
                                    setshowPracticeTest(true)
                                    setshowCodingExercise(false)

                                    UpdateCourseCurriculumProgress(itemCode, list.curriculumItemId);
                                    setselectedPracticeTest(list)
                                    console.log(list)

                                    setseletedCurriculumItem(list.curriculumItemId)

                                    GetMyCoursesDetails(courseItemCode, setcourse)

                                   

                                }} key={index}>
                                     <CardMainContainer className={seletedCurriculumItem == list.curriculumItemId && `bg-secondary`}>
                                <CardContainer className={`m-1 p-0 ${seletedCurriculumItem == list.curriculumItemId && `bg-secondary text-white`}`}>
                                    <Form.Check
                                                className='mb-4 p-0'
                                                checked={list.read}
                                                type={"checkbox"}
                                                id={`default-${index}`}
                                                label={""}
                                            />
                                        <li className='d-flex'>
                                        <p className={seletedCurriculumItem == list.curriculumItemId ? 'text-white' : ''}>
                                                {index + 1}.<i className="fas fa-tasks mx-2"></i> {list.title}
                                            </p>
                                        </li> 
                                    </CardContainer>
                                    </CardMainContainer>
                                </span>
                            )}

                            {/* Coding Exercise */}
                            {list.curriculum_item_type == "Coding Exercise" && (
                                <span onClick={() => { 
                                    setCodingExerciseActiveStep(0)
                                    setarticle("");
                                    setshowVideoPlayer(false); 
                                    setshowAssignment(false)
                                    setshowquiz(false)
                                    setshowPracticeTest(false)
                                    setshowCodingExercise(true)

                                    UpdateCourseCurriculumProgress(itemCode, list.curriculumItemId);
                                    setselectedCodingExercise(list)
                                    setseletedCurriculumItem(list.curriculumItemId)
                                    console.log(list)
                                    GetMyCoursesDetails(courseItemCode, setcourse)
                                }} key={index}>
                                       <CardMainContainer className={seletedCurriculumItem == list.curriculumItemId && `bg-secondary`}>
                                <CardContainer className={`m-1 p-0 ${seletedCurriculumItem == list.curriculumItemId && `bg-secondary text-white`}`}>
                                    <Form.Check
                                                className='mb-4 p-0'
                                                checked={list.read}
                                                type={"checkbox"}
                                                id={`default-${index}`}
                                                label={""}
                                            />
                                        <li className='d-flex'>
                                        <p className={seletedCurriculumItem == list.curriculumItemId ? 'text-white' : ''}>
                                                {index + 1}.<i className="fas fa-clipboard-list mx-2"></i> {list.title}
                                            </p>
                                        </li> 
                                    </CardContainer>
                                    </CardMainContainer>
                                </span>
                            )}


                            
                        </React.Fragment>
                    ))}
                </ol>

                </div>
            </div>
        </div>
    )
}

export default Accordian;
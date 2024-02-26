import React, { useState } from 'react'
import {
    Header,
    CommentText,
    CommentMetadata,
    CommentGroup,
    CommentContent,
    CommentAvatar,
    CommentActions,
    CommentAction,
    CommentAuthor,
    FormTextArea,
    Comment,
    Form,
  } from 'semantic-ui-react'

  import Button from '@mui/material/Button';
import { AddReplyToReview, IMG_HOST } from '../../api';
import moment from 'moment';
import ErrorAlert from '../../functions/Alert/ErrorAlert';

  

const Commentbox = ({ replies , reviewCode }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [comment, setcomment] = useState("")
    const [btnLoading, setbtnLoading] = useState(false)

    const handleButtonClick = () => {
        setIsExpanded(!isExpanded); // Toggle the expansion state
      };


      // ----------- Add Reply ------------------
  const hanldeReply = (e) => {
    e.preventDefault()

    if(comment == ""){
      ErrorAlert("Empty Field","Please Add A Reply")
      return
    }

    AddReplyToReview(comment,reviewCode,setbtnLoading,setcomment)

  }



  return (
    <div>

        {isExpanded ? (
                <Button className="m-3" onClick={handleButtonClick} variant="outlined"><i class="fa-solid fa-xmark mx-2"></i> Cancel</Button>
                ) : (
                <Button className="m-3"  onClick={handleButtonClick} variant="contained"><i class="fa-solid fa-reply mx-2"></i> Respond</Button>

            )}

    {isExpanded && (
        <CommentGroup className='row'>

             <Header as='h3' dividing>
             Comments
            </Header>

            <Form className='col-md-12' reply>
            <FormTextArea value={comment} onChange={(e) => setcomment(e.target.value)} />
            {btnLoading ? (

            <Button className='m-2' variant="contained">
              Loading
            </Button>
            ) : (
            <Button
            onClick={hanldeReply}
            className='m-2'
            variant="contained"
            >
                Add Reply
            </Button>
              )}
        </Form>

        <div className="col-md-12">

        {replies.length > 0 &&  replies
        .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
        .map((reply,index) => (
        <div className="media border border-secondary shadow  m-2">
                <div className="align-self-center mr-3">
                    <div className='d-flex'>
                        <img style={{objectFit:'cover'}} width={80} height={50} className='p-3 rounded-circle' src={reply.profileImg == "" ? "../images/user-profile.png" : `${IMG_HOST}${reply.profileImg}`} alt="Steve Jobes" />
                        <div className='p-3'>
                            <h5 className="mt-0 m-0 p-0">{reply.name}</h5>
                            <small className='m-0 p-0'>{moment(reply.createdDate, "YYYYMMDD").fromNow()}</small>
                        </div>
                    </div>
                </div>
                <div className="media-body p-1">
                    <p className='m-0 p-1'>{reply.comment}</p>
                </div>
        </div>
        ))}
       
      

        </div>

        </CommentGroup>

    )}
    </div>
  )
}

export default Commentbox
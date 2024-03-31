import { useFormik } from 'formik';
import React from 'react';
import { courseSchema } from '../../utils/validation-schema';
import ErrorMsg from './error-msg';
import { SubmitCourseReview } from '../../api';
import ReactStars from 'react-stars'
import { Rating } from 'react-simple-star-rating'
import { useState } from 'react';
import ErrorAlert from '../../functions/Alert/ErrorAlert';
import { useEffect } from 'react';


const CommentFormCourse = ({course, id}) => {

    const [rating, setrating] = useState(0)
    const [msg, setmsg] = useState("")

    const ratingChanged = (newRating) => {
        setrating(newRating)
      }

      const handleSubmit = (e) => {
        e.preventDefault()

        if(msg == ""){
            ErrorAlert("Empty Field","Please Fill A Comment")
            return
        }

        console.log(msg)
          
          SubmitCourseReview(id,msg,rating)
      }

      

      useEffect(() => {

        setrating(course.ownReview == null ? 0 : course.ownReview[0].rating)
        setmsg(course.ownReview == null ? "" :  course.ownReview[0].comment)
        
      }, [])
      

    return (
        <form className="comment-form">
            <div className="row g-5">

            <div className="rating-icon col-7 mx-auto">
                <Rating onClick={ratingChanged} initialValue={rating} />
            </div>

                <div className="form-group col-12">
                    <textarea value={msg} onChange={(e) => setmsg(e.target.value)} name="msg" id="comm-message" cols="30" rows="5" placeholder="Review summary"></textarea>
                </div>

                <div className="form-group col-6 mx-auto">
                    <button onClick={handleSubmit} type="submit" className="edu-btn submit-btn btn-small">Save Review <i className="icon-4"></i></button>
                </div>
            </div>
        </form>
    )
}

export default CommentFormCourse;
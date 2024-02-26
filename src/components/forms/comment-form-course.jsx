import { useFormik } from 'formik';
import React from 'react';
import { courseSchema } from '../../utils/validation-schema';
import ErrorMsg from './error-msg';
import { SubmitCourseReview } from '../../api';
import ReactStars from 'react-stars'
import { Rating } from 'react-simple-star-rating'
import { useState } from 'react';
import ErrorAlert from '../../functions/Alert/ErrorAlert';


const CommentFormCourse = ({id}) => {

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

    // const { handleChange, handleSubmit, handleBlur, errors, values, touched } = useFormik({
    //     initialValues: { msg: '' },
    //     validationSchema: courseSchema,
    //     onSubmit: (values, { resetForm }) => {
    //         // toast.success(`${values.name} your review added successfully`, {
    //         //     position: 'top-left'
    //         // })
    //         console.log(values)


    //         // resetForm()
    //     }
    // })

    return (
        <form className="comment-form">
            <div className="row g-5">

            <div className="rating-icon">
                <h6 className="title">Rating Here</h6>
                <Rating onClick={ratingChanged} initialValue={rating} />
            </div>

                
              

                <div className="form-group col-12">
                    <textarea value={msg} onChange={(e) => setmsg(e.target.value)} name="msg" id="comm-message" cols="30" rows="5" placeholder="Review summary"></textarea>
                </div>

                <div className="form-group col-12">
                    <button onClick={handleSubmit} type="submit" className="edu-btn submit-btn">Submit Review <i className="icon-4"></i></button>
                </div>
            </div>
        </form>
    )
}

export default CommentFormCourse;
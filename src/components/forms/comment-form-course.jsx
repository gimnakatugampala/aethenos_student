import { useFormik } from 'formik';
import React from 'react';
import { courseSchema } from '../../utils/validation-schema';
import ErrorMsg from './error-msg';
import { SubmitCourseReview } from '../../api';
import ReactStars from 'react-stars'
import { Rating } from 'react-simple-star-rating'
import { useState } from 'react';


const CommentFormCourse = ({id}) => {

    const [rating, setrating] = useState(0)

    const ratingChanged = (newRating) => {
        setrating(newRating)
        console.log(newRating)
      }

    const { handleChange, handleSubmit, handleBlur, errors, values, touched } = useFormik({
        initialValues: { title:'',name: '', email: '', msg: '' },
        validationSchema: courseSchema,
        onSubmit: (values, { resetForm }) => {
            // toast.success(`${values.name} your review added successfully`, {
            //     position: 'top-left'
            // })
            SubmitCourseReview(id,values,rating)

            console.log(rating)

            // resetForm()
        }
    })

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <div className="row g-5">

            <div className="rating-icon">
                <h6 className="title">Rating Here</h6>
                <Rating onClick={ratingChanged} initialValue={rating} />
            </div>

                
              

                <div className="form-group col-12">
                    <textarea value={values.msg} onChange={handleChange} onBlur={handleBlur} name="msg" id="comm-message" cols="30" rows="5" placeholder="Review summary"></textarea>
                    {touched.msg && <ErrorMsg error={errors.msg} />}
                </div>

                <div className="form-group col-12">
                    <button type="submit" className="edu-btn submit-btn">Submit Review <i className="icon-4"></i></button>
                </div>
            </div>
        </form>
    )
}

export default CommentFormCourse;
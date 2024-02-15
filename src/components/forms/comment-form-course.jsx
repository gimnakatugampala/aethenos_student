import { useFormik } from 'formik';
import React from 'react';
import { courseSchema } from '../../utils/validation-schema';
import ErrorMsg from './error-msg';
import { SubmitCourseReview } from '../../api';
import ReactStars from 'react-stars'
import { useState } from 'react';


const CommentFormCourse = ({id}) => {

    const [rating, setrating] = useState(0)

    const ratingChanged = (newRating) => {
        setrating(newRating)
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
                <ReactStars
                count={5}
                onChange={ratingChanged}
                size={30}
                color2={'#ffd700'} />
            </div>

                
                <div className="form-group col-lg-6">
                    <input type="text" value={values.title} onChange={handleChange} onBlur={handleBlur} name="title" id="comm-title" placeholder="Review Title" />
                    {touched.title && <ErrorMsg error={errors.title} />}
                </div>

                <div className="form-group col-lg-6">
                    <input value={values.name} onChange={handleChange} onBlur={handleBlur} type="text" name="name" id="contact-name" placeholder="Your Name" />
                    {touched.name && <ErrorMsg error={errors.name} />}
                </div>

                <div className="form-group col-12">
                    <input value={values.email} onChange={handleChange} onBlur={handleBlur} type="email" name="email" id="contact-email" placeholder="Reviewer Email" />
                    {touched.email && <ErrorMsg error={errors.email} />}
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
import React, { useEffect, useState } from 'react';
import { SubmitCourseReview } from '../../api';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Rating } from 'react-simple-star-rating';

const CommentFormCourse = ({ setcourse,  course, id }) => {
    const [rating, setRating] = useState(0);
    const [msg, setMsg] = useState("");
    const [btnLoading, setBtnLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (msg === "") {
            setSnackbarMessage("Please fill in the comment");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }

        SubmitCourseReview(id, msg, rating, setRating, setMsg, setcourse, setBtnLoading, 
            (message) => {
                setSnackbarMessage(message);
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
            },
            (error) => {
                setSnackbarMessage(error);
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        );
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        setRating(course.ownReview[0].rating)
        setMsg(course.ownReview[0].comment)
    }, [])
    

    return (
        <form className="comment-form">
            <div className="row g-5">
                <div className="rating-icon col-7 mx-auto">
                    <Rating onClick={handleRatingChange} initialValue={rating} />
                </div>
                <div className="form-group col-12">
                    <textarea
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        name="msg"
                        id="comm-message"
                        cols="30"
                        rows="5"
                        placeholder="Your Comments"
                    ></textarea>
                </div>
                <div className="form-group col-4 mx-auto">
                    {btnLoading ? (
                        <button type="submit" className="edu-btn submit-btn btn-small">Loading..</button>
                    ) : (
                        <button onClick={handleSubmit} type="submit" className="edu-btn submit-btn btn-small">Save Review</button>
                    )}
                </div>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </form>
    );
};

export default CommentFormCourse;

import { useFormik } from 'formik';
import React, { useState } from 'react';
import useFirebase from '../../hooks/use-firebase';
import { loginSchema } from '../../utils/validation-schema';
import ErrorMsg from './error-msg';

const LoginForm = () => {
    const [showPass,setShowPass] = useState(false);
    // use firebase 
    const { loginWithEmailPassword, resetPassword } = useFirebase();
    // use formik
    const { handleChange, handleSubmit, handleBlur, errors, values, touched } = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: loginSchema,
        onSubmit: (values, { resetForm }) => {
            loginWithEmailPassword(values.email, values.password)
            resetForm()
        }
    })

    // handleResetPass
    const handleResetPass = (email) => {
        resetPassword(email);
    }
    return (
        <div>
        <div className='sign-in-btn'>
        <button><i class="fa-brands fa-google mx-3 fa-2x"></i> Sign in with Google</button>
        <button><i class="fa-brands fa-facebook mx-4 fa-2x"></i> Sign in with Facebook</button>
       
        <span>Or</span>
        
        </div>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="current-log-email">Username or email*</label>
                <input 
                    value={values.email} 
                    onChange={handleChange}
                    onBlur={handleBlur} 
                    type="email" 
                    name="email"
                    placeholder="Email or username" 
                />
                {touched.email && <ErrorMsg error={errors.email} />}
            </div>
            
            <div className="form-group">
                <label htmlFor="current-log-password">Password*</label>
                <input 
                    value={values.password} 
                    onChange={handleChange}
                    onBlur={handleBlur} 
                    type={showPass?"text":"password"} 
                    name="password"
                    placeholder="Password" 
                />
                <span onClick={()=> setShowPass(!showPass)} className="password-show">
                    <i className="icon-76"></i>
                </span>
            </div>
            {touched.password && <ErrorMsg error={errors.password} />}

            <div className="form-group chekbox-area">
                <div className="edu-form-check">
                    <input type="checkbox" id="remember-me" />
                    <label htmlFor="remember-me">Remember Me</label>
                </div>
                <a href="#" onClick={()=> handleResetPass(values.email)} 
                className="password-reset">Lost your password?</a>
            </div>

            <div className="form-group">
                <button type="submit" className="edu-btn btn-medium">Sign in <i className="icon-4"></i></button>
                
            </div>

            {/* <div className='signin-social'>
                <img src="/assets/images/user.png" alt="" />
                <p>Sign In Google</p>
            </div> */}
           
        </form>

        </div>
    )
}

export default LoginForm;
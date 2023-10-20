import React from 'react';
import { useFormik } from 'formik';
import useFirebase from '../../hooks/use-firebase';
import { registerSchema } from '../../utils/validation-schema';
import ErrorMsg from './error-msg';
import Link from 'next/link';
import { useState } from 'react';

const RegisterForm = () => {
    const [showPass, setShowPass] = useState(false);
    // register With Email Password
    const { registerWithEmailPassword } = useFirebase();
    // use formik
    const { handleChange, handleSubmit, handleBlur, errors, values, touched } = useFormik({
        initialValues: { name: '', email: '', password: '', terms: false },
        validationSchema: registerSchema,
        onSubmit: (values, { resetForm }) => {
            registerWithEmailPassword(values.email, values.password, values.name)
            resetForm()
        }
    })
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="reg-name">First Name *</label>
                <input value={values.name} onChange={handleChange} onBlur={handleBlur} type="text" name="name" id="reg-name" placeholder="First name" />
                {touched.name && <ErrorMsg error={errors.name} />}
            </div>

            <div className="form-group">
                <label htmlFor="reg-name">Last Name*</label>
                <input value={values.name} onChange={handleChange} onBlur={handleBlur} type="text" name="name" id="reg-name" placeholder="Last name" />
                {touched.name && <ErrorMsg error={errors.name} />}
            </div>

            <div className="form-group">
                <label htmlFor="log-email">Email*</label>
                <input value={values.email} onChange={handleChange} onBlur={handleBlur} type="email" name="email" id="log-email" placeholder="Enter Email" />
                {touched.email && <ErrorMsg error={errors.email} />}
            </div>

            <div className="form-group">
                <label htmlFor="log-password">Password*</label>
                <input value={values.password} onChange={handleChange} onBlur={handleBlur} type={showPass ? "text" : "password"} name="password" id="log-password" placeholder="Password" />
                <span onClick={() => setShowPass(!showPass)} className="password-show"><i className="icon-76"></i></span>
            </div>
            {touched.password && <ErrorMsg error={errors.password} />}

            <div className="form-group chekbox-area">
                <div className="edu-form-check">
                    <input value={values.terms} onChange={handleChange} onBlur={handleBlur} type="checkbox" name='terms' id="terms-condition" />
                    <label htmlFor="terms-condition">I agree the User Agreement and
                        <Link href="/terms-condition">
                            Terms & Condition.
                        </Link>
                    </label>
                </div>
            </div>
            {touched.terms && <ErrorMsg error={errors.terms?.split('true,')[1]} />}
            
            <div className="form-group">
                <button type="submit" className="edu-btn btn-medium">Create Account <i className="icon-4"></i></button>
            </div>

            <div className='sign-in-btn'>
                <div className='text-center'>
                {/* <hr /> */}
                <p>OR</p>
                {/* <hr /> */}
                </div>
        <button><i class="fa-brands fa-google mx-3 fa-2x"></i> Sign in with Google</button>
        <button><i class="fa-brands fa-facebook mx-4 fa-2x"></i> Sign in with Facebook</button>
       
        
        </div>
            

        </form>
    );
}

export default RegisterForm;
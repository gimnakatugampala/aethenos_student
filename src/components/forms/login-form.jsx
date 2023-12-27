import { useFormik } from 'formik';
import React, { useState } from 'react';
import useFirebase from '../../hooks/use-firebase';
import { loginSchema } from '../../utils/validation-schema';
import validateEmail from '../../functions/emailValid';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import ErrorMsg from './error-msg';
import { StudentSignIn } from '../../api';
import Spinner from 'react-bootstrap/Spinner';

const LoginForm = () => {

    const [showPass, setshowPass] = useState(false)
    const [loading, setloading] = useState(false)

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault()

        setloading(true)

        // Validate
        if(email == ""){

            Swal.fire({
                title: 'Empty Field!',
                text: 'Please Fill Email Address',
                icon: 'error',
              })

            setloading(false)

        }else if(!validateEmail(email)){

            Swal.fire({
                title: 'Email Error!',
                text: 'Please Enter a Valid Email Address',
                icon: 'error',
              })

              setloading(false)

        }else if(password == ""){

            Swal.fire({
                title: 'Empty Field!',
                text: 'Please Fill Password',
                icon: 'error',
              })

              setloading(false)

        }else{
            StudentSignIn(email, password,setloading)

        }

    }
 
    return (
        <div>
    
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="current-log-email">Email*</label>
                <input 
                onChange={(e) => setemail(e.target.value)}
                    type="email" 
                    name="email"
                    placeholder="Enter Email" 
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="current-log-password">Password*</label>
                <input 
                 onChange={(e) => setpassword(e.target.value)}
                    type={showPass?"text":"password"} 
                    name="password"
                    placeholder="Password" 
                />
            
                {showPass ? (<span onClick={() => setshowPass(!showPass)} className="password-show"><i class="fas fa-eye-slash fa-lg"></i></span>) : (<span onClick={() => setshowPass(!showPass)} className="password-show"><i class="far fa-eye fa-lg"></i></span>)} 
            </div>

            <div className="form-group">
                {loading ? (
                <button type="button" className="edu-btn btn-medium p-2">
                    <Spinner animation="border" variant="light" />
                </button>) : (
                <button type="submit" className="edu-btn btn-medium">Login <i className="icon-4"></i></button>
                )}

             
            </div>


           
        </form>

        </div>
    )
}

export default LoginForm;
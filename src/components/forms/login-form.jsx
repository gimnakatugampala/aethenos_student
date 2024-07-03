import { useFormik } from 'formik';
import React, { useState } from 'react';
import useFirebase from '../../hooks/use-firebase';
import { loginSchema } from '../../utils/validation-schema';
import validateEmail from '../../functions/emailValid';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import ErrorMsg from './error-msg';
import { StudentSignIn } from '../../api';
import ButtonLoadingMedium from '../../functions/Loading/ButtonLoadingMedium';
import { useRouter } from "next/router";

const LoginForm = () => {

    const [showPass, setshowPass] = useState(false)
    const [loading, setloading] = useState(false)

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const router = useRouter();

    const handleSubmit = (e) =>{
        e.preventDefault()

        setloading(true)

        // Validate
        if(email == ""){

            Swal.fire({
                title: 'Empty field!',
                text: 'Please fill email address',
                icon: 'error',
              })

            setloading(false)

        }else if(!validateEmail(email)){

            Swal.fire({
                title: 'Email error!',
                text: 'Please enter a valid email address',
                icon: 'error',
              })

              setloading(false)

        }else if(password == ""){

            Swal.fire({
                title: 'Empty field!',
                text: 'Please fill password',
                icon: 'error',
              })

              setloading(false)

        }else{
            StudentSignIn(email, password,setloading,router)

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
                <a href='/forgot-password'>Forgot Password ?</a>
            </div>

            <div className="form-group">
                {loading ? (
                    <ButtonLoadingMedium />
                ) : (
                <button type="submit" className="edu-btn btn-medium">Log in <i className="icon-4"></i></button>
                )}

             
            </div>


           
        </form>

        </div>
    )
}

export default LoginForm;
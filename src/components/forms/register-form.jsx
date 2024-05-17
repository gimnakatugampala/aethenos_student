import React from 'react';
import { useFormik } from 'formik';
import useFirebase from '../../hooks/use-firebase';
import { registerSchema } from '../../utils/validation-schema';
import Link from 'next/link';
import { useState } from 'react';
import { StudentSignUp } from '../../api';
import validateEmail from '../../functions/emailValid';
import LoadingBtn from '../../functions/LoadingBtn';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import ButtonLoadingMedium from '../../functions/Loading/ButtonLoadingMedium';
import { useRouter } from "next/router";

const RegisterForm = () => {

    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [conpassword, setconpassword] = useState("")
    const [termsconditions, settermsconditions] = useState(false)

    const [loading, setloading] = useState(false)

    const [showPass, setshowPass] = useState(false)
    const router = useRouter();

    
    
    // Get the Submit Data
    const handleSubmit = (e) => {
        e.preventDefault();

        setloading(true)

        // Validate
        if(fname == ""){

            Swal.fire({
                title: 'Empty Field!',
                text: 'Please Fill First Name',
                icon: 'error',
              })

            setloading(false)

        }else if(lname == ""){

            Swal.fire({
                title: 'Empty Field!',
                text: 'Please Fill Last Name',
                icon: 'error',
              })

              setloading(false)

        }else if(email == ""){

            Swal.fire({
                title: 'Empty Field!',
                text: 'Please Fill Email Address',
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

        }else if(conpassword == ""){

            Swal.fire({
                title: 'Empty Field!',
                text: 'Please Fill Confirm Password',
                icon: 'error',
              })

              setloading(false)

        }else if(password != conpassword){

            Swal.fire({
                title: 'Password Error!',
                text: 'Passwords do not match',
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

        }else if(termsconditions == false){

            Swal.fire({
                title: 'Terms & Conditions Error!',
                text: 'Please Accept our Terms & Conditions',
                icon: 'error',
              })

              setloading(false)

        }else if(password.length < 8 || conpassword < 8){

            Swal.fire({
                title: 'Password Error!',
                text: 'Password must be at least 8 characters or more',
                icon: 'error',
              })

              setloading(false)

        }else{

            setloading(true)

              StudentSignUp(
                fname,
                lname,
                email,
                conpassword,
                setloading,
                router
                )
        }

    }



    return (
        <>
        {/* <LoadingBtn disapear={loading} /> */}

        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="reg-name">First Name *</label>
                <input onChange={(e) => setfname(e.target.value)} type="text" name="name" id="reg-name" placeholder="First name" />
              
            </div>

            <div className="form-group">
                <label htmlFor="reg-name">Last Name*</label>
                <input onChange={(e) => setlname(e.target.value)} type="text" name="name" id="reg-name" placeholder="Last name" />
                
            </div>

            <div className="form-group">
                <label htmlFor="log-email">Email*</label>
                <input onChange={(e) => setemail(e.target.value)} type="email" name="email" id="log-email" placeholder="Enter Email" />
                
            </div>

            <div className="form-group">
                <label htmlFor="log-password">Password*</label>
                <input  onChange={(e) => setpassword(e.target.value)} type={showPass ? "text" : "password"}id="log-password" placeholder="Password" />
                {showPass ? (<span onClick={() => setshowPass(!showPass)} className="password-show"><i class="fas fa-eye-slash fa-lg"></i></span>) : (<span onClick={() => setshowPass(!showPass)} className="password-show"><i class="far fa-eye fa-lg"></i></span>)} 
            </div>

            <div className="form-group">
                <label htmlFor="log-password">Confirm Password*</label>
                <input onChange={(e) => setconpassword(e.target.value)} type={showPass ? "text" : "password"}id="log-password" placeholder="Password" />
               {showPass ? (<span onClick={() => setshowPass(!showPass)} className="password-show"><i class="fas fa-eye-slash fa-lg"></i></span>) : (<span onClick={() => setshowPass(!showPass)} className="password-show"><i class="far fa-eye fa-lg"></i></span>)} 
            </div>
     

            <div className="form-group chekbox-area">
                <div className="edu-form-check">
                    <input value={termsconditions} onChange={(e) => settermsconditions(e.target.checked)} type="checkbox" name='terms' id="terms-condition" />
                    <label htmlFor="terms-condition">I agree to the
                        <Link href="/terms-condition">
                            Terms & Conditions.
                        </Link>
                    </label>
                </div>
            </div>
        
            
            <div className="form-group">
                {loading ? (
                    <ButtonLoadingMedium />
                ) : (
                    <button type="submit" className="edu-btn btn-medium">Create Account <i className="icon-4"></i></button>
                )}
            </div>

            

        </form>
        </>
    );
}

export default RegisterForm;
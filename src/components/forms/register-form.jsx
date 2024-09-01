import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import useFirebase from '../../hooks/use-firebase';
import { registerSchema } from '../../utils/validation-schema';
import Link from 'next/link';
import { useState } from 'react';
import { ResendCode, StudentSignUp, USERTOKEN, VerifyEmail } from '../../api';
import validateEmail from '../../functions/emailValid';
import LoadingBtn from '../../functions/LoadingBtn';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import ButtonLoadingMedium from '../../functions/Loading/ButtonLoadingMedium';
import { useRouter } from "next/router";
import VerificationInput from 'react-verification-input';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ErrorAlert from '../../functions/Alert/ErrorAlert';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ReactCodeInput from "react-code-input"
import Cookies from 'js-cookie';


const inputStyle = {
  fontFamily: 'Arial, sans-serif',
  borderRadius: '8px',
  border: '2px solid #d9d9d9',
  width: '50px',
  height: '50px',
  fontSize: '20px',
  textAlign: 'center',
  margin: '0 5px',
  outline: 'none',
  transition: 'border-color 0.3s, box-shadow 0.3s',
};

const inputFocusStyle = {
  borderColor: '#40a9ff',
  boxShadow: '0 0 5px rgba(64, 169, 255, 0.5)',
};




const RegisterForm = () => {

    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [conpassword, setconpassword] = useState("")
    const [termsconditions, settermsconditions] = useState(false)

    const [loading, setloading] = useState(false)

    const [showPass, setshowPass] = useState(false)

    const [isShownEmailVerificarion, setisShownEmailVerificarion] = useState(false)

    const [isClickedBack, setisClickedBack] = useState(false)

    const [VerficationCode, setVerficationCode] = useState("")

    const [userToken, setUserToken] = useState(null);


  


    const router = useRouter();

    
    
    // Get the Submit Data
    const handleSubmit = (e) => {
        e.preventDefault();

        setloading(true)

        // Validate
        if(fname == ""){

            Swal.fire({
                title: 'Empty field!',
                text: 'Please fill first name',
                icon: 'error',
              })

            setloading(false)

        }else if(lname == ""){

            Swal.fire({
                title: 'Empty field!',
                text: 'Please fill last name',
                icon: 'error',
              })

              setloading(false)

        }else if(email == ""){

            Swal.fire({
                title: 'Empty field!',
                text: 'Please fill email address',
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

        }else if(conpassword == ""){

            Swal.fire({
                title: 'Empty field!',
                text: 'Please fill confirm password',
                icon: 'error',
              })

              setloading(false)

        }else if(password != conpassword){

            Swal.fire({
                title: 'Password error!',
                text: 'Passwords do not match',
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

        }else if(termsconditions == false){

            Swal.fire({
                title: 'Terms & conditions error!',
                text: 'Please accept our terms & conditions',
                icon: 'error',
              })

              setloading(false)

        }else if(password.length < 8 || conpassword < 8){

            Swal.fire({
                title: 'Password error!',
                text: 'Password must be at least 8 characters or more',
                icon: 'error',
              })

              setloading(false)

        }else{

            setloading(true)
            setVerficationCode("")

              StudentSignUp(
                fname,
                lname,
                email,
                conpassword,
                setloading,
                setisShownEmailVerificarion,
                router
                )
        }

    }

    // Verify Email
    const handleVerifyEmail = () =>{

        if(VerficationCode.length != 5){
            ErrorAlert("Error","Please Enter a Valid Code")
            setloading(false)
            return
        }

        VerifyEmail(email, VerficationCode, setloading)

        console.log(VerficationCode)
    }

    // 
    const handleResendCode = () =>{

        Swal.fire({
            title: 'Code Sent!',
            text: 'A Verification Code has been sent to your email!',
            icon: 'success',
            position: 'top-end', // Set position to top right
            showConfirmButton: false,
            timer: 3000, // Auto close after 3 seconds
            toast: true, // Make it a toast-style notification
          });

        ResendCode(email)

    }

    useEffect(() => {
      const token = Cookies.get('aethenos');
      setUserToken(token);
    }, []);
    


    return (
        <>
        {/* <LoadingBtn disapear={loading} /> */}
        {isShownEmailVerificarion ? (
        <>
              <p onClick={() => {
                  setisClickedBack(true)
                  setisShownEmailVerificarion(false)
                  settermsconditions(false)
              }} className='text-danger' style={{ cursor: 'pointer' }}><ArrowBackIosNewIcon /> Back
              </p>

              <div className='d-flex justify-content-between'>

                <div>
                  <h3 className="title m-0">Verify Email</h3>
                </div>

                <div>

              <p onClick={handleResendCode} className='text-danger m-0' style={{ cursor: 'pointer' }}><b>Resend Code</b></p>
                </div>

              </div>
                  <p className='m-0 p-0 text-center' style={{fontSize:'14px'}}>A verification email has been sent to your given email address. Please check your email and enter the verification code below</p>

              <div className="d-flex justify-content-center my-4">
              <ReactCodeInput  
              inputStyle={inputStyle}
              inputFocusStyle={inputFocusStyle} 
              value={VerficationCode}
              onChange={(e) => setVerficationCode(e)}
              className="mx-auto text-center"
              type='number'
              fields={5} />


            
           </div>

        {loading ? (
          <ButtonLoadingMedium />
        ) : (
          
          <button onClick={handleVerifyEmail}  className="edu-btn btn-medium mx-auto w-100">Verify</button>
        )}

        <div className='text-center my-3'>
          <a href={`/student-interests?token=${userToken}`} style={{cursor:'pointer'}} className='text-danger'><b>Skip Now</b></a>
        </div>

        </>
        ) : (
            <>
    
          <div className="flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 className="title">Sign up</h3>
            <p>
              Already have an account? <a href="/login">Log in</a>
            </p>
          </div>

          {isClickedBack && (
            <div>
              <p
                onClick={() => {
                  setisClickedBack(false);
                  setisShownEmailVerificarion(true);
                }}
                className='text-danger'
                style={{
                  cursor: 'pointer',
                  margin: 0, // Removes any extra margin to align with the other content
                }}
              >
                Go to Verification <ArrowForwardIosIcon />
              </p>
            </div>
          )}
        </div>

    
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="reg-name">First Name *</label>
                    <input value={fname} onChange={(e) => setfname(e.target.value)} type="text" name="name" id="reg-name" placeholder="First name" />
                
                </div>

                <div className="form-group">
                    <label htmlFor="reg-name">Last Name*</label>
                    <input value={lname} onChange={(e) => setlname(e.target.value)} type="text" name="name" id="reg-name" placeholder="Last name" />
                    
                </div>

                <div className="form-group">
                    <label htmlFor="log-email">Email*</label>
                    <input value={email} onChange={(e) => setemail(e.target.value)} type="email" name="email" id="log-email" placeholder="Enter Email" />
                    
                </div>

                <div className="form-group">
                    <label htmlFor="log-password">Password*</label>
                    <input value={password}  onChange={(e) => setpassword(e.target.value)} type={showPass ? "text" : "password"}id="log-password" placeholder="Password" />
                    {showPass ? (<span onClick={() => setshowPass(!showPass)} className="password-show"><i class="fas fa-eye-slash fa-lg"></i></span>) : (<span onClick={() => setshowPass(!showPass)} className="password-show"><i class="far fa-eye fa-lg"></i></span>)} 
                </div>

                <div className="form-group">
                    <label htmlFor="log-password">Confirm Password*</label>
                    <input value={conpassword} onChange={(e) => setconpassword(e.target.value)} type={showPass ? "text" : "password"}id="log-password" placeholder="Password" />
                {showPass ? (<span onClick={() => setshowPass(!showPass)} className="password-show"><i class="fas fa-eye-slash fa-lg"></i></span>) : (<span onClick={() => setshowPass(!showPass)} className="password-show"><i class="far fa-eye fa-lg"></i></span>)} 
                </div>
        

                <div className="form-group chekbox-area">
                    <div className="edu-form-check">
                        <input value={termsconditions} onChange={(e) => settermsconditions(e.target.checked)} type="checkbox" name='terms' id="terms-condition" />
                        <label htmlFor="terms-condition">I agree to the
                            <Link href="/terms-condition">{" "}
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
        )}

        </>
    );
}

export default RegisterForm;
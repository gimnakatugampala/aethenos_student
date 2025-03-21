import React, { useState } from 'react';
import ErrorAlert from '../../functions/Alert/ErrorAlert';
import { ChangeToNewPassword, SendEmailVerficationCode, VerifyCode } from '../../api';
import ButtonLoadingMedium from '../../functions/Loading/ButtonLoadingMedium';
import VerificationInput from 'react-verification-input';
import dynamic from 'next/dynamic';
import ReactCodeInput from "react-code-input"



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


const PasswordChecklist = dynamic(() => import('react-password-checklist'), { ssr: false });

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [btnLoading, setBtnLoading] = useState(false);
  const [showVerificationInputs, setShowVerificationInputs] = useState(false);
  const [isPasswordStrength, setisPasswordStrength] = useState(false)

  const [codeSuccess, setcodeSuccess] = useState(false)

  const [VerficationCode, setVerficationCode] = useState("")

  const [password, setpassword] = useState("")
  const [conPassword, setconPassword] = useState("")

  const [showPass, setshowPass] = useState(false)

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);

    if (email === '') {
      ErrorAlert('Error', 'Please enter email');
      return;
    }

    if (!validateEmail(email)) {
      ErrorAlert('Error', 'Please enter a valid email address.');
      return;
    }

    SendEmailVerficationCode(email, setBtnLoading, setShowVerificationInputs);
  };

  const handleCodeSubmit = () =>{
    console.log(VerficationCode)

    if(VerficationCode.length < 5){
      ErrorAlert("Error","Verification code is incomplete")
      return
    }

    VerifyCode(VerficationCode,email,setcodeSuccess,setBtnLoading)
  }


  const handlePasswordSubmit = () => {
    if(password == ""){
      ErrorAlert("Error","Please enter password")
      return
    }else if(conPassword == ""){
      ErrorAlert("Error","Please enter confirm password")
      return
    }else if(password != conPassword){
      ErrorAlert("Error","Password do not match")
      return
    }

    if(isPasswordStrength == false){
      ErrorAlert("Error","Your Password should match the checklist")
      return
    }

    ChangeToNewPassword(VerficationCode,email,conPassword,setBtnLoading)

  }

  return (
    <div>
      {showVerificationInputs ? (

            codeSuccess ? (
              <div>

              <div className="form-group">
                  <label htmlFor="current-log-email">Password *</label>
                  <input
                    required
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    type={showPass?"text":"password"} 
                    placeholder="Enter password"
                  />
                  {showPass ? (<span onClick={() => setshowPass(!showPass)} className="password-show"><i class="fas fa-eye-slash fa-lg"></i></span>) : (<span onClick={() => setshowPass(!showPass)} className="password-show"><i class="far fa-eye fa-lg"></i></span>)} 
                </div>

              <div className="form-group">
                  <label htmlFor="current-log-email">Confirm Password *</label>
                  <input
                    required
                    value={conPassword}
                    onChange={(e) => setconPassword(e.target.value)}
                    type={showPass?"text":"password"} 
                    placeholder="Enter Confirm password"
                  />
                  {showPass ? (<span onClick={() => setshowPass(!showPass)} className="password-show"><i class="fas fa-eye-slash fa-lg"></i></span>) : (<span onClick={() => setshowPass(!showPass)} className="password-show"><i class="far fa-eye fa-lg"></i></span>)} 
                </div>

                <PasswordChecklist
                rules={["minLength","specialChar","number","capital","match"]}
                
                minLength={5}
                value={password}
                valueAgain={conPassword}
                onChange={(isValid) => {
                  console.log(isValid)
                  setisPasswordStrength(isValid)
                }}
              />

                <div className="form-group">
                  {btnLoading ? (
                    <ButtonLoadingMedium />
                  ) : (
                    <button onClick={handlePasswordSubmit} className="edu-btn btn-medium">Change Password</button>
                  )}
              </div>

              </div>
            ) :(

              <div>
              <div className="d-flex justify-content-center my-4">
              <ReactCodeInput  inputStyle={inputStyle}
        inputFocusStyle={inputFocusStyle} value={VerficationCode} onChange={(e) => setVerficationCode(e)}   className="mx-auto text-center" type='text' fields={5} />

              {/* <VerificationInput value={VerficationCode} onChange={(e) => setVerficationCode(e)} length={5} className="mx-auto text-center" /> */}
              </div>

              
              
              <div className="form-group">
                  {btnLoading ? (
                    <ButtonLoadingMedium />
                  ) : (
                    <button onClick={handleCodeSubmit} className="edu-btn btn-medium">Verify</button>
                  )}
              </div>

              <p onClick={handleSubmit} role="button" tabindex="0" className='text-center my-3 user-select-none'><b>Resend code</b></p>
              
              {/* <p className='text-center my-2'>We have sent you a code to your email. Please check</p> */}
              </div>
            )


      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="current-log-email">Email *</label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter Email"
            />
          </div>

          <div className="form-group">
            {btnLoading ? (
              <ButtonLoadingMedium />
            ) : (
              <button type="submit" className="edu-btn btn-medium">Next</button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordForm;

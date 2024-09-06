import React, { useState } from 'react';
import RegisterForm from '../forms/register-form';

const SignUpArea = () => {


  return (
        <section className="account-page-area section-gap-equal">
            <div className="container position-relative">
                <div className="row g-5 justify-content-center">
                      <div className="col-lg-7">
                        <div className="login-form-box registration-form">
                                
                                <RegisterForm />
                        </div>
                    </div>

                </div>

           
                </div> 
        </section>
    )
}

export default SignUpArea;
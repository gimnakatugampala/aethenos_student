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

                <ul className="shape-group">
                    <li className="shape-1 scene">
                        <img src="/assets/images/about/shape-07.png" alt="Shape" />
                    </li>
                    <li className="shape-2 scene">
                        <img src="/assets/images/about/shape-13.png" alt="Shape" />
                    </li>
                    <li className="shape-3 scene">
                        <img src="/assets/images/counterup/shape-02.png" alt="Shape" />
                    </li>
                </ul>
                </div> 
        </section>
    )
}

export default SignUpArea;
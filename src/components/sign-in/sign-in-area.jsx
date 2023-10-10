import React from 'react';
import LoginForm from '../forms/login-form';
import RegisterForm from '../forms/register-form';

const SignInArea = () => {
  return (
        <section className="account-page-area section-gap-equal">
            <div className="container position-relative">
                <div className="row g-5 justify-content-center">
                    <div className="col-lg-5">
                        <div className="login-form-box">
                            <h3 className="title">Sign in</h3>
                            <p>Don’t have an account? <a href="#">Sign up</a></p>
                            <LoginForm/>
                        </div>
                    </div>

                    <div className="col-lg-5">
                        <div className="login-form-box registration-form">
                            <h3 className="title">Registration</h3>
                            <p>Already have an account? <a href="#">Sign in</a></p>
                            <RegisterForm/>
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

export default SignInArea;
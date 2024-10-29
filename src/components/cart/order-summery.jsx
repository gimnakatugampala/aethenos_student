import Link from 'next/link';
import React, { useEffect } from 'react';
import { useState } from 'react';
import useCartInfo from '../../hooks/use-cart-info';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Cookies from 'js-cookie';
import 'sweetalert2/src/sweetalert2.scss'
import { AccountVefication, SignUpUserViaCart, StudentSignIn } from '../../api';
import ButtonLoadingMedium from '../../functions/Loading/ButtonLoadingMedium';
import validateEmail from '../../functions/emailValid'
import { useRouter } from "next/router";
import GetCurrencyByCountry from '../../functions/pricing/GetCurrencyByCountry';

const OrderSummery = ({ cartItem }) => {
  	const { total , quantity } = useCartInfo();
	  const CURRENT_USER = Cookies.get('aethenos') 

	  let rediect_url = "checkout"

	  const [showLogin, setshowLogin] = useState(false)

      const [showRegister, setshowRegister] = useState(false)

	  const router = useRouter();

	  const [show, setShow] = useState(false);

	  const handleClose = () => setShow(false);
	  const handleShow = () => setShow(true);

	  const [showPass, setshowPass] = useState(false)
	  const [loading, setloading] = useState(false)
  
	  const [email, setemail] = useState("")
	  const [password, setpassword] = useState("")


      
      const [showConfirmPass, setshowConfirmPass] = useState(false);
    
      const [firstname, setfirstname] = useState("");
      const [lastname, setlastname] = useState("");
    //   const [email, setemail] = useState("");
    //   const [password, setpassword] = useState("");
      const [conpassword, setconpassword] = useState("");
      const [termsconditions, settermsconditions] = useState(false);

      const [btnLoading, setbtnLoading] = useState(false)

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
            StudentSignIn(email, password,setloading,router,rediect_url)

        }

    }

    // Signup
    const onFormSubmitSignup = (e) => {
        e.preventDefault();
    
        if (firstname == "") {
          Swal.fire({
            title: "Empty Field!",
            text: "Please Fill First Name",
            icon: "error",
          });
        } else if (lastname == "") {
          Swal.fire({
            title: "Empty Field!",
            text: "Please Fill Last Name",
            icon: "error",
          });
        } else if (email == "") {
          Swal.fire({
            title: "Empty Field!",
            text: "Please Fill Email Address",
            icon: "error",
          });
        } else if (password == "") {
          Swal.fire({
            title: "Empty Field!",
            text: "Please Fill Password",
            icon: "error",
          });
        } else if (conpassword == "") {
          Swal.fire({
            title: "Empty Field!",
            text: "Please Fill Confirm Password",
            icon: "error",
          });
        } else if (!validateEmail(email)) {
          Swal.fire({
            title: "Email Error!",
            text: "Please Enter a Valid Email Address",
            icon: "error",
          });
        } else if (password != conpassword) {
          Swal.fire({
            title: "Password Error!",
            text: "Passwords do not match",
            icon: "error",
          });
        } else if (password.length < 8 || conpassword < 8) {
          Swal.fire({
            title: "Password Error!",
            text: "Password must be at least 8 characters or more",
            icon: "error",
          });
        } else if (termsconditions == false) {
          Swal.fire({
            title: "Terms & Conditions Error!",
            text: "Please Accept our Terms & Conditions",
            icon: "error",
          });
        } else {
          SignUpUserViaCart(firstname, lastname, email, conpassword, setbtnLoading);
          // console.log(firstname)
          // console.log(lastname)
          // console.log(email)
          // console.log(password)
          // console.log(conpassword)
        }
      };

	useEffect(() => {
		// console.log(CURRENT_USER)
		AccountVefication(setshowLogin)
	}, [CURRENT_USER])
	
	console.log(cartItem[0].other_data)
	// console.log(total)
	// console.log(quantity)
  	return (
        <div className="order-summery">
			<h4 className="title">Cart Totals</h4>
			<table className="table summery-table">
				<tbody>
					<tr className="order-subtotal">
						<td>Subtotal</td>
						<td>{cartItem[0].other_data && GetCurrencyByCountry(cartItem[0].other_data)} {(total).toFixed(2)}</td>
					</tr>
					<tr className="order-total">
						<td>Order Total</td>
						<td>{cartItem[0].other_data && GetCurrencyByCountry(cartItem[0].other_data)} {(total).toFixed(2)}</td>
					</tr>
				</tbody>
			</table>

			{showLogin && 	<button onClick={handleShow} type='button' className="edu-btn btn-medium checkout-btn">
                Proceed to Checkout<i className="icon-4"></i>
            </button>}

			{showLogin == false && <a href="/checkout" className="edu-btn btn-medium checkout-btn">
                Proceed to Checkout<i className="icon-4"></i>
            </a>}
			
		


	<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{showRegister ? 'Sign up' : 'Log in'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            {showRegister ? 
                (
                    <form onSubmit={onFormSubmitSignup}>
                    <div class="mb-3">
                      <label htmlFor="exampleFormControlInput1" class="form-label">
                        First Name
                      </label>
                      <input
                        onChange={(e) => setfirstname(e.target.value)}
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="First name"
                      />
                    </div>
                    <div class="mb-3">
                      <label htmlFor="exampleFormControlInput1" class="form-label">
                        Last Name
                      </label>
                      <input
                        onChange={(e) => setlastname(e.target.value)}
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Last name"
                      />
                    </div>
                    <div class="mb-3">
                      <label htmlFor="exampleFormControlInput1" class="form-label">
                        Email
                      </label>
                      <input
                        onChange={(e) => setemail(e.target.value)}
                        type="email"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Email"
                      />
                    </div>
        
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <div className="input-group mb-3">
                      <input
                        onChange={(e) => setpassword(e.target.value)}
                        type={showPass ? "text" : "password"}
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        aria-label="Password"
                      />
                      <span className="input-group-text" id="basic-addon2">
                        {showPass ? (
                          <span
                            onClick={() => setshowPass(!showPass)}
                            className="password-show"
                          >
                            <i className="fas fa-eye-slash fa-lg"></i>
                          </span>
                        ) : (
                          <span
                            onClick={() => setshowPass(!showPass)}
                            className="password-show"
                          >
                            <i className="far fa-eye fa-lg"></i>
                          </span>
                        )}
                      </span>
                    </div>
        
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <div className="input-group mb-3">
                      <input
                        onChange={(e) => setconpassword(e.target.value)}
                        type={showConfirmPass ? "text" : "password"}
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        aria-label="Confirm Password"
                      />
                      <span className="input-group-text" id="basic-addon2">
                        {showConfirmPass ? (
                          <span
                            onClick={() => setshowConfirmPass(!showConfirmPass)}
                            className="password-show"
                          >
                            <i className="fas fa-eye-slash fa-lg"></i>
                          </span>
                        ) : (
                          <span
                            onClick={() => setshowConfirmPass(!showConfirmPass)}
                            className="password-show"
                          >
                            <i className="far fa-eye fa-lg"></i>
                          </span>
                        )}
                      </span>
                    </div>
        
                    <div className="form-group chekbox-area">
                      <div className="edu-form-check">
                        <input
                          value={termsconditions}
                          onChange={(e) => settermsconditions(e.target.checked)}
                          type="checkbox"
                          name="terms"
                          id="terms-condition"
                        />
                        <label htmlFor="terms-condition">
                          I agree the {" "}
                          <a className="text-danger" target="_blank" rel="noopener noreferrer" href="/privacy-policy">User Agreement.</a>
                           and{" "}
                          <a className="text-danger" target="_blank" rel="noopener noreferrer" href="/terms">Terms & Conditions.</a>
                        </label>
                      </div>
                    </div>
        
                    <div className="row">
                      <div className="col-md-12">
                        {btnLoading ? (
                          <button  className="edu-btn btn-small w-100">
                          Loading ...
                        </button>
                        ) : (
                        <button type="submit" className="edu-btn btn-small w-100">
                          SignUp
                        </button>
                        )}
                      </div>
                    </div>

                    <p className='text-center pb-0 my-2'>Already have an account ? <span onClick={() => setshowRegister(false)} style={{cursor:'pointer'}} className='text-danger'>Log in</span></p>
                  </form>
                )
            : (

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="current-log-email">Email <span className='text-danger'>*</span></label>
                        

                        <input 
                        onChange={(e) => setemail(e.target.value)}
                        className="form-control"
                            type="email" 
                            name="email"
                            placeholder="Enter Email" 
                        />
                    </div>
                    <div className="form-group">
                    <label htmlFor="current-log-password">Password <span className='text-danger'>*</span></label>
                    <div className="input-group mb-3">
                        <input onChange={(e) => setpassword(e.target.value)}
                            type={showPass?"text":"password"}  className="form-control" placeholder="Password"  aria-label="" aria-describedby="basic-addon2" />
                        <span className="input-group-text">
                        {showPass ? (<span onClick={() => setshowPass(!showPass)} className="password-show"><i class="fas fa-eye-slash fa-lg"></i></span>) : (<span onClick={() => setshowPass(!showPass)} className="password-show"><i class="far fa-eye fa-lg"></i></span>)} 
                        </span>

                    </div>
                    </div>
                    
                        <p className='text-center pb-0 mb-2'>Don’t have an account ? <span onClick={() => setshowRegister(true)} style={{cursor:'pointer'}} className='text-danger'>Sign up</span></p>

                    <div className="form-group">
                        {loading ? (
                            <ButtonLoadingMedium />
                        ) : (
                        <button type="submit" className="edu-btn btn-small w-100">Login <i className="icon-4"></i></button>
                        )}

                    
                    </div>



                
                </form>
            )}
			

		</Modal.Body>
      </Modal>
		</div>
    );
}

export default OrderSummery;
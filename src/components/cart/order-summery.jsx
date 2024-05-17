import Link from 'next/link';
import React, { useEffect } from 'react';
import { useState } from 'react';
import useCartInfo from '../../hooks/use-cart-info';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Cookies from 'js-cookie';
import 'sweetalert2/src/sweetalert2.scss'
import { AccountVefication, StudentSignIn } from '../../api';
import ButtonLoadingMedium from '../../functions/Loading/ButtonLoadingMedium';
import validateEmail from '../../functions/emailValid'
import { useRouter } from "next/router";

const OrderSummery = () => {
  	const { total , quantity } = useCartInfo();
	  const CURRENT_USER = Cookies.get('aethenos') 

	  let rediect_url = "checkout"

	  const [showLogin, setshowLogin] = useState(false)
	  const router = useRouter();

	  const [show, setShow] = useState(false);

	  const handleClose = () => setShow(false);
	  const handleShow = () => setShow(true);

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
            StudentSignIn(email, password,setloading,router,rediect_url)

        }

    }

	useEffect(() => {
		// console.log(CURRENT_USER)
		AccountVefication(setshowLogin)
	}, [CURRENT_USER])
	
	// console.log(total)
	// console.log(quantity)
  	return (
        <div className="order-summery">
			<h4 className="title">Cart Totals</h4>
			<table className="table summery-table">
				<tbody>
					<tr className="order-subtotal">
						<td>Subtotal</td>
						<td>${(total).toFixed(2)}</td>
					</tr>
					<tr className="order-total">
						<td>Order Total</td>
						<td>${(total).toFixed(2)}</td>
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
          <Modal.Title>Login Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
			
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
			<label htmlFor="current-log-password">Password*</label>
			<div className="input-group mb-3">
				<input onChange={(e) => setpassword(e.target.value)}
                    type={showPass?"text":"password"}  className="form-control" placeholder="Password"  aria-label="" aria-describedby="basic-addon2" />
				<span className="input-group-text">
				{showPass ? (<span onClick={() => setshowPass(!showPass)} className="password-show"><i class="fas fa-eye-slash fa-lg"></i></span>) : (<span onClick={() => setshowPass(!showPass)} className="password-show"><i class="far fa-eye fa-lg"></i></span>)} 
				</span>

			</div>
			</div>
            

            <div className="form-group">
                {loading ? (
                    <ButtonLoadingMedium />
                ) : (
                <button type="submit" className="edu-btn btn-small w-100">Login <i className="icon-4"></i></button>
                )}

             
            </div>


           
        </form>

		</Modal.Body>
      </Modal>
		</div>
    );
}

export default OrderSummery;
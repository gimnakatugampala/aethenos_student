import React from 'react';
import { useState } from 'react';
import OrderPayment from './order-payment';
import OrderSummery from './order-summery';

const countries = [ 
    'Select Option', 
    'Australia', 
    'England', 
    'New Zealand', 
    'Switzerland', 
    'United Kindom (UK)',
    'United States (USA)'
];

const CheckoutArea = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <section className="checkout-page-area section-gap-equal">
            <div className="container">
                <form>
                    <div className="checkout-notice">
                        <div className="coupn-box">
                            <h6 className="toggle-bar"> Have a coupon?
                                <a style={{cursor:'pointer'}} onClick={() => setIsOpen(!isOpen)} className="toggle-btn">
                                    Click here to enter your code
                                </a>
                            </h6>
                            {isOpen && 
                                <div className="toggle-open">
                                    <p>If you have a coupon code, please apply it below.</p>
                                    <div className="input-group">
                                        <input placeholder="Enter coupon code" type="text" />
                                        <div className="apply-btn">
                                            <button type="submit" className="edu-btn btn-medium">Apply</button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                    <div className="row row--25">
                        <div className="col-lg-6">
                            <div className="checkout-billing">
                                <h3 className="title">Billing Details</h3>
                                <div className="row g-lg-5">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>First Name*</label>
                                            <input type="text" id="first-name" />
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Last Name*</label>
                                            <input type="text" id="last-name" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Company Name</label>
                                    <input type="text" id="company-name" />
                                </div>

                                <div className="form-group">
                                    <label>Email Address*</label>
                                    <input type="email" id="email" />
                                </div>

                                <div className="row g-lg-5">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Phone*</label>
                                            <input type="tel" id="phone" />
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Country*</label>
                                            <select id="country">
                                                {countries.map((country, i) => <option key={i}>{country}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Address*</label>
                                    <input type="text" id="address1" />
                                    <input type="text" id="address2" />
                                </div>

                                <div className="form-group">
                                    <label>Town/ City*</label>
                                    <input type="text" id="town" />
                                </div>

                                <div className="row g-lg-5">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>State*</label>
                                            <select id="state">
                                                {countries.map((country, i) => <option key={i}>{country}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Zip Code*</label>
                                            <input type="tel" id="phone" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="edu-form-check">
                                        <input type="checkbox" id="crt-accnt" className="w-25" />
                                        <label htmlFor="crt-accnt">Create an Accoutn?</label>
                                    </div>
                                </div>

                                <div className="form-group mt--50 mb-0">
                                    <label>Order Notes</label>
                                    <textarea id="notes" rows="4" placeholder="Notes about your order, e.g. speacial notes for delivery."></textarea>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-6">
                            <OrderSummery/>
                            <OrderPayment/>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default CheckoutArea;
import React from 'react';

const OrderPayment = ({ showStripe, setshowPaypal, setshowStripe }) => {
    const selectPaymentType = (value) => {
        console.log(value);
        if (value === "stripe") {
            setshowPaypal(false);
            setshowStripe(true);
        } else if (value === "paypal") {
            setshowPaypal(true);
            setshowStripe(false);
        }
    };

    return (
        <div className="order-payment m-0">
            <h4 className="title">Payment</h4>
            <div className="payment-method">
                <div className="form-group">
                    <div className="edu-form-check">
                        <input
                            value="stripe"
                            checked={showStripe} // Bind the checked attribute to state
                            onChange={(e) => selectPaymentType(e.target.value)}
                            type="radio"
                            id="pay-bank"
                            name="payment"
                        />
                        <label htmlFor="pay-bank">
                            <i className="fa-regular fa-credit-card"></i> Credit/Debit Card
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <div className="edu-form-check">
                        <input
                            value="paypal"
                            checked={!showStripe} // Complementary state for the other option
                            onChange={(e) => selectPaymentType(e.target.value)}
                            type="radio"
                            id="pay-pal"
                            name="payment"
                        />
                        <label htmlFor="pay-pal">
                            <img width={20} src="/images/icons/paypal.png" alt="PayPal Icon" /> PayPal
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPayment;

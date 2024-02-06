import React from 'react';

const OrderPayment = ({setshowPaypal,setshowStripe}) => {

    const selectPaymentType = (value) =>{
        console.log(value)

        if(value == "stripe"){

            setshowPaypal(false)
            setshowStripe(true)

        }else if(value == "paypal"){
            setshowPaypal(true)
            setshowStripe(false)
        }
    }

    return (
        <div className="order-payment m-0">
            <h4 className="title">Payment</h4>
            <div className="payment-method">
                <div className="form-group">
                    <div className="edu-form-check">
                        <input value="stripe" onChange={(e) => selectPaymentType(e.target.value)} type="radio" id="pay-bank" name="payment" />
                        <label htmlFor="pay-bank"><img width={20} src="/images/icons/stripe.png" /> Stripe</label>
                    </div>
                    <p>Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</p>
                </div>

                <div className="form-group">
                    <div className="edu-form-check">
                        <input value="paypal" onChange={(e) => selectPaymentType(e.target.value)} type="radio" id="pay-pal" name="payment" />
                        <label htmlFor="pay-pal">
                            <img width={20} src="/images/icons/paypal.png" /> PayPal</label>
                        <a href="#">What is Paypal?</a>
                    </div>
                    <p>Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</p>
                </div>
            </div>
            
            
        </div>
    )
}

export default OrderPayment;
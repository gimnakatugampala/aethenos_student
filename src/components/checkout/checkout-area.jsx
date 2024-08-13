import React, { useEffect } from 'react';
import { useState } from 'react';
import OrderPayment from './order-payment';
import OrderSummery from './order-summery';



const CheckoutArea = () => {
    const [showPaypal, setshowPaypal] = useState(false)
    const [showStripe, setshowStripe] = useState(true)

    useEffect(() => {
     
        setshowPaypal(false)
        setshowStripe(true)
    }, [])
    


    return (
        <section className="checkout-page-area section-gap-equal">
            <div className="container">
            
                <h3 className="title">Billing Details</h3>
                    <div className="row">
                        <div className="col-lg-6">
                            <OrderPayment showStripe={showStripe} setshowPaypal={setshowPaypal} setshowStripe={setshowStripe} />
                        </div>
                        
                        <div className="col-lg-6 ">
                            <OrderSummery showStripe={showStripe} showPaypal={showPaypal} />
                        </div>
                    </div>
                
            </div>
        </section>
    )
}

export default CheckoutArea;
import paypal from '@paypal/checkout-server-sdk'
import { NextResponse } from 'next/server'

// Creating an environment
// let clientId = "AbhfyGv-hhPIo4dZ_Wia7_0sevNZC3B871Ndw8aDEIm8h6O59L1sV0TzgFXyCpwx-_GC93sKwsU_GtEF";
// let clientSecret = "ELvI0eNofma6wegK2amivZ2GvpokEgURE8fOIpKg98D7o5iFxhk3nEUD90mT7aXmK7tImyV94aBCaVvT";


// // This sample uses SandboxEnvironment. In production, use LiveEnvironment
// let environment = new paypal.core.LiveEnvironment(clientId, clientSecret);
// let client = new paypal.core.PayPalHttpClient(environment);


// Creating an environment
let clientId = process.env.PAYPAL_CLIENT_ID;
let clientSecret = process.env.PAYPAL_SECRET_KEY;


// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment = process.env.PAYPAL_ENVIRONMENT === "live" 
    ? new paypal.core.LiveEnvironment(clientId, clientSecret) 
    : new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

export default async function POST(req, res){

    if (req.method === 'POST') {

        let itemsData = req.body.cartData
        let totalPrice = req.body.totalPrice

        console.log(req.body.cartData)

        try {

            let request = new paypal.orders.OrdersCreateRequest();
    
            request.requestBody({
                intent: "CAPTURE",
                purchase_units: [
                    {
                        reference_id:`${Date.now()}`,
                        amount: {
                            currency_code: `${req.body.cartData[0].unit_amount.currency_code}`,
                            value: `${totalPrice}`,
                            breakdown:{
                                item_total:{
                                    currency_code:`${req.body.cartData[0].unit_amount.currency_code}`,
                                    value:`${totalPrice}`
                                }
                            }
                        },
                        items:itemsData
                    }
                 ]
            });
    
        let response = await client.execute(request);
        // console.log(`Response: ${JSON.stringify(response)}`);
        console.log(response);

     

        res.status(200).json({
            id:response.result.id
        });
    
    
        } catch (error) {
            console.log(error)
        }
        
        
    }

}


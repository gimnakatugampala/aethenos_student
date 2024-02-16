import paypal from '@paypal/checkout-server-sdk'
import { NextResponse } from 'next/server'

// Creating an environment
let clientId = "AbhfyGv-hhPIo4dZ_Wia7_0sevNZC3B871Ndw8aDEIm8h6O59L1sV0TzgFXyCpwx-_GC93sKwsU_GtEF";
let clientSecret = "ELvI0eNofma6wegK2amivZ2GvpokEgURE8fOIpKg98D7o5iFxhk3nEUD90mT7aXmK7tImyV94aBCaVvT";


// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

export default async function POST(req, res){

    if (req.method === 'POST') {

        try {

            let request = new paypal.orders.OrdersCreateRequest();
    
            request.requestBody({
                intent: "CAPTURE",
                purchase_units: [
                    {
                        reference_id:"d9f80740-38f0-11e8-b467-0ed5f89f718b",
                        amount: {
                            currency_code: "USD",
                            value: "100.00",
                            breakdown:{
                                item_total:{
                                    currency_code:"USD",
                                    value:"100.00"
                                }
                            }
                        },
                        items:[
                            {
                                name:"Book of React",
                                description:"A Book about React",
                                quantity:"1",
                                unit_amount:{
                                    currency_code:"USD",
                                    value:"50.00"
                                }
                            },
                            {
                                name:"Book of Next",
                                description:"A Book about Next",
                                quantity:"1",
                                unit_amount:{
                                    currency_code:"USD",
                                    value:"50.00"
                                }
                            }
                        ]
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


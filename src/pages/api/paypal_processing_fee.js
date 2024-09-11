import paypal from '@paypal/checkout-server-sdk';
import { NextResponse } from 'next/server';

const clientId = "AbhfyGv-hhPIo4dZ_Wia7_0sevNZC3B871Ndw8aDEIm8h6O59L1sV0TzgFXyCpwx-_GC93sKwsU_GtEF";
const clientSecret = "ELvI0eNofma6wegK2amivZ2GvpokEgURE8fOIpKg98D7o5iFxhk3nEUD90mT7aXmK7tImyV94aBCaVvT";

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export default async function POST(req, res) {
    if (req.method === 'POST') {
        const { captureId } = req.body;

        try {
            // Retrieve transaction details
            const transactionRequest = new paypal.payments.CapturesGetRequest(captureId);
            const transactionResponse = await client.execute(transactionRequest);

            // Log the entire response for debugging
            // console.log('Transaction Response:', JSON.stringify(transactionResponse.result, null, 2));

            // Extract processing fee
            const transaction = transactionResponse.result;
            
            // if (transaction && transaction.transaction_fee) {
                res.status(200).json({ transaction});
            // } else {
            //     throw new Error('Transaction or transaction_fee not found');
            // }
        } catch (error) {
            console.error('Error retrieving processing fee:', error.message);
            res.status(500).json({ error: 'An error occurred while retrieving the processing fee' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

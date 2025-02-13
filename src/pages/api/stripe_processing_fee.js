import fs from 'fs';
import path from 'path';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const sessionId = req.query.session_id;

    if (!sessionId) {
      return res.status(400).json({ error: 'Missing session_id' });
    }

    try {
      // Retrieve the checkout session using the session ID
      const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items'],
      });

      const paymentIntentId = checkoutSession.payment_intent;
      console.log("Payment Intent ID:", paymentIntentId);

      if (paymentIntentId) {
        // Retrieve the payment intent to access the latest charge's balance transaction
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
          expand: ['latest_charge.balance_transaction'],
        });

        // Get fee details from the balance transaction
        const feeDetails = paymentIntent.latest_charge.balance_transaction?.fee_details;

        if (feeDetails) {
          console.log("Fee Details"+feeDetails)
          res.status(200).json(feeDetails);
        } else {
          res.status(404).json({ error: 'No fee details found' });
        }
      } else {
        res.status(404).json({ error: 'No payment intent found in checkout session' });
      }
    } catch (err) {
      console.error('Error retrieving payment data:', err);
      res.status(500).json({ error: 'Error retrieving payment data' });
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
  }
}

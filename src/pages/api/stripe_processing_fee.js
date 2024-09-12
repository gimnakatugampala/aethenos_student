import fs from 'fs';
import path from 'path';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const filePath = path.join(process.cwd(), 'payments.txt');
    
    try {
      const fileData = fs.readFileSync(filePath, 'utf8');
      const payments = fileData.trim().split('\n').map(line => JSON.parse(line));
      
      if (payments.length > 0) {
        // Assuming the last payment intent in the file is the one you want to retrieve
        const paymentIntentId = payments[payments.length - 1].pi;

        const paymentIntent = await stripe.paymentIntents.retrieve(
          paymentIntentId,
          {
            expand: ['latest_charge.balance_transaction'],
          }
        );

        const feeDetails = paymentIntent.latest_charge.balance_transaction.fee_details;
        res.status(200).json(feeDetails);
      } else {
        res.status(404).json({ error: 'No payment intents found' });
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

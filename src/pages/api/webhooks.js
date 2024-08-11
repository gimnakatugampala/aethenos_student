import Stripe from 'stripe';
import { buffer } from 'micro';
import Cors from 'micro-cors';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
});

const getBalanceTransaction = async (chargeId) => {
  try {
    const charge = await stripe.charges.retrieve(chargeId);
    console.log(`Retrieved charge: ${JSON.stringify(charge)}`); // Log the retrieved charge

    const balanceTransactionId = charge.balance_transaction;
    console.log(`Balance Transaction ID: ${balanceTransactionId}`); // Log the balance transaction ID

    const balanceTransaction = await stripe.balanceTransactions.retrieve(balanceTransactionId);
    console.log(`Retrieved balance transaction: ${JSON.stringify(balanceTransaction)}`); // Log the retrieved balance transaction

    return balanceTransaction;
  } catch (err) {
    console.error(`❌ Error retrieving balance transaction: ${err.message}`);
    return null;
  }
};

const webhookHandler = async (req, res) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const signature = req.headers['stripe-signature'];

    let event;
    try {
      event = stripe.webhooks.constructEvent(buf.toString(), signature, webhookSecret);
      console.log(`✅ Webhook event constructed: ${JSON.stringify(event)}`); // Log the constructed event
    } catch (err) {
      console.error(`❌ Error verifying webhook signature: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    try {
      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        console.log(`Session object: ${JSON.stringify(session)}`); // Log the session object

        const paymentIntentId = session.payment_intent;
        console.log(`Payment Intent ID: ${paymentIntentId}`); // Log the payment intent ID

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        console.log(`Retrieved Payment Intent: ${JSON.stringify(paymentIntent)}`); // Log the payment intent

        const chargeId = paymentIntent.charges.data[0].id; // Assuming there's at least one charge
        console.log(`Charge ID: ${chargeId}`); // Log the charge ID

        const balanceTransaction = await getBalanceTransaction(chargeId);
        if (balanceTransaction) {
          const feeAmount = balanceTransaction.fee;
          const netAmount = balanceTransaction.net;

          console.log(`Transaction ID: ${session.id}`);
          console.log(`Total amount: ${session.amount_total / 100}`);
          console.log(`Stripe commission (fee): ${feeAmount / 100}`);
          console.log(`Net amount after fees: ${netAmount / 100}`);
        } else {
          console.error('❌ Failed to retrieve balance transaction');
        }
      } else {
        console.warn(`Unhandled event type: ${event.type}`);

        console.log('Checkout Session Metadata:', session.metadata);

      }

      res.json({ received: true });
    } catch (err) {
      console.error(`❌ Error handling event: ${err.message}`);
      res.status(500).send(`Webhook Error: ${err.message}`);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default cors(webhookHandler);

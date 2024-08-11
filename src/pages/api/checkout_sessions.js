import Stripe from 'stripe';
import { IMG_HOST } from '../../api'; // Assuming this is the correct path

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const cartCourses = JSON.parse(req.body.cartCourses);

      // Ensure cartCourses is an array
      if (!Array.isArray(cartCourses)) {
        throw new Error('Invalid cartCourses data format');
      }

      const lineItems = cartCourses.map(product => ({
        price_data: {
          currency: `${product.currency}`,
          product_data: {
            images: [`${IMG_HOST}${product.img}`],
            name: product.title,
          },
          unit_amount: Math.round(product.price * 100), // Convert to the smallest currency unit
        },
        description: `${product.desc}`,
        quantity: Number.parseInt(product.qty, 10), // Ensure quantity is an integer
      }));


      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${req.headers.origin}/checkout/?success=true`,
        cancel_url: `${req.headers.origin}/checkout/?canceled=true`,
      });

      

      res.redirect(303, session.url);
    } catch (err) {
      // Log the error for debugging purposes
      console.error('Error creating checkout session:', err.message);

      // Respond with a user-friendly error message
      res.status(err.statusCode || 500).json({ error: 'An error occurred while creating the checkout session.' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

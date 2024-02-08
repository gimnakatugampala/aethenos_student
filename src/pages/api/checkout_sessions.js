const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const transformedItem = {
  price_data: {
    currency: 'usd',
    product_data: {
      images: ["https://media.wired.com/photos/64daad6b4a854832b16fd3bc/master/pass/How-to-Choose-a-Laptop-August-2023-Gear.jpg"],
      name: "Laptop",
    },
    unit_amount: 5.99 * 100,
  },
  description: "Test Desc",
  quantity: 5,
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [transformedItem,transformedItem],
        mode: 'payment',
        success_url: `${req.headers.origin}/checkout/?success=true`,
        cancel_url: `${req.headers.origin}/checkout/?canceled=true`,
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
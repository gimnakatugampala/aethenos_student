import { useSelector } from 'react-redux';
import useCartInfo from '../../hooks/use-cart-info';
import Cookies from 'js-cookie';
import { initializeStore } from '../../redux/store';
import { IMG_HOST } from '../../api';
import GetCurrencyByCountry from '../../functions/pricing/GetCurrencyByCountry';
import getSymbolFromCurrency from 'currency-symbol-map';
import CalculateDiscountedPrice from '../../functions/pricing/CalculateDiscountedPrice';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



const transformedItem = {
  price_data: {
    currency: 'lkr',
    product_data: {
      images: ["https://media.wired.com/photos/64daad6b4a854832b16fd3bc/master/pass/How-to-Choose-a-Laptop-August-2023-Gear.jpg"],
      name: `Laptop`,
    },
    unit_amount: 100.99 * 100,
  },
  description: "Test Desc",
  quantity: 5,
};

const products = [
  {
    price_data: {
      currency: 'lkr',
      product_data: {
        images: ["https://media.wired.com/photos/64daad6b4a854832b16fd3bc/master/pass/How-to-Choose-a-Laptop-August-2023-Gear.jpg"],
        name: `Laptop`,
      },
      unit_amount: 100.99 * 100,
    },
    description: "Test Desc",
    quantity: 5,
  },
  // Add more product objects as needed
];

export default async function handler(req, res) {
  

  if (req.method === 'POST') {
    try {
      const cartCourses = JSON.parse(req.body.cartCourses);

      const c = req.body.cartCourses;
      // console.log('Cart Courses:', c);

      const lineItems = cartCourses.map(product => ({
        price_data: {
          currency:`${product.currency}`,
          product_data:{
            images: [`${IMG_HOST}${product.img}`],
            name: product.title
          },
          unit_amount: Math.round(product.price* 100),
        },
        description: `${product.desc}`,
        quantity: Number.parseInt(product.qty),
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
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}


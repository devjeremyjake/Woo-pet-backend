import dotenv from 'dotenv'
dotenv.config()

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

// const customerAddress: Stripe.AddressParam = { 
//     city: '',
//     country: '',
//     state: '',
//     line1: '',
//     postal_code: ''
// }
// const params: Stripe.CustomerCreateParams = {
//     name: '',
//     email: '',
//     address: customerAddress
// };

// const customer: Stripe.Customer = await stripe.customers.create(params);
// console.log('Customer created: ', customer.id)

export default stripe;
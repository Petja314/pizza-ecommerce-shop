'use client';
import React from 'react';
import {
   CardElement,
   useStripe,
   useElements,
   PaymentElement,
} from '@stripe/react-stripe-js';

const CheckoutStripeForm = ({ clientSecret }: any) => {
   const stripe = useStripe();
   const elements = useElements();

   const handleSubmit = async (event: any) => {
      event.preventDefault();

      if (!stripe || !elements) {
         return;
      }

      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
         console.error('CardElement not found');
         return;
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(
         clientSecret,
         {
            payment_method: {
               card: cardElement,
               billing_details: {
                  name: 'Customer Name', // Add customer details here
               },
            },
         }
      );

      if (error) {
         console.log('[error]', error);
      } else if (paymentIntent) {
         console.log('[PaymentIntent]', paymentIntent);
      }
   };

   return (
      <form onSubmit={handleSubmit}>
         <CardElement />
         <PaymentElement />

         <button type="submit" disabled={!stripe}>
            Pay
         </button>
      </form>
   );
};

export default CheckoutStripeForm;

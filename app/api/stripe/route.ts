import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
   console.log('POST REQUEST STRIPE');
   try {
      const { productName, unitAmount, currency } = await req.json();

      // Ensure productName is provided
      if (!productName) {
         throw new Error('Missing product name');
      }

      // Create a product
      const product = await stripe.products.create({
         name: productName, // The name parameter is mandatory
      });

      // Create a price for the product
      const price = await stripe.prices.create({
         product: product.id,
         unit_amount: unitAmount,
         currency: currency || 'gbp',
      });

      // Create a payment link using the priceId
      const paymentLink = await stripe.paymentLinks.create({
         line_items: [
            {
               price: price.id,
               quantity: 1,
            },
         ],
      });

      return NextResponse.json({ url: paymentLink.url });
   } catch (error) {
      console.error('Stripe payment failed:', error);
      return NextResponse.json(
         {
            error: 'Stripe payment failed, please try again',
         },
         { status: 500 }
      );
   }
}

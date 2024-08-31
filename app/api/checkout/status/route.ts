import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { OrderStatus } from '@prisma/client';
import { CartItemDto } from '@/services/dto/cart.dto';
import { sendEmail } from '@/shared/lib';
import OrderSuccessEmail from '@/shared/components/shared/email-template/order-success-email';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
   try {
      const sig = req.headers.get('stripe-signature') as string;
      console.log('sig ', sig);
      let event;
      const body = await req.text(); // Read the raw request body
      console.log('body ', body);
      try {
         event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET as string // Your Stripe webhook secret
         );
      } catch (err) {
         console.error('Webhook signature verification failed.', err);
         return NextResponse.json(
            { error: 'Webhook signature verification failed' },
            { status: 400 }
         );
      }

      // Handle the event
      console.log('event ', event);
      console.log('event type ', event.type);
      if (event.type === 'checkout.session.completed') {
         const session = event.data.object as Stripe.Checkout.Session;

         // Retrieve the order ID from metadata
         const orderId = session.metadata?.orderId;

         if (!orderId) {
            return NextResponse.json(
               { error: 'Order ID not found in metadata' },
               { status: 400 }
            );
         }

         // Find the order in your database
         const order = await prisma.order.findFirst({
            where: {
               id: Number(orderId),
            },
         });

         if (!order) {
            return NextResponse.json(
               { error: 'Order not found' },
               { status: 404 }
            );
         }
         const paymentId = session.payment_intent as string;
         console.log('paymentId', paymentId);

         // Update the order status to successful
         await prisma.order.update({
            where: {
               id: order.id,
            },
            data: {
               status: OrderStatus.SUCCESFULL,
               paymentId: paymentId,
            },
         });

         // Send success email to the customer
         const items = JSON.parse(order?.items as string) as CartItemDto[];
         await sendEmail(
            order.email,
            'Italian Pizza / Your order was successfully made!',
            OrderSuccessEmail({
               orderId: order.id,
               webUrl: process.env.NEXT_PUBLIC_BASE_URL as string,
               items,
            })
         );
      }

      // Return a 200 response to acknowledge receipt of the event
      return NextResponse.json({ received: true });
   } catch (error) {
      console.error('Error processing webhook:', error);
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
   }
}

// export async function POST(req: NextRequest) {
//    try {
//       const body = await req.json();
//       const order = await prisma.order.findFirst({
//          where: {
//             id: Number(body.object.metadata.orderId),
//          },
//       });
//
//       if (!order) {
//          return NextResponse.json({ error: 'Order not found' });
//       }
//       await prisma.order.update({
//          where: {
//             id: order.id,
//          },
//          data: {
//             status: OrderStatus.SUCCESFULL,
//             // paymentId : paymentId
//          },
//       });
//       const items = JSON.parse(order?.items as string) as CartItemDto[];
//       await sendEmail(
//          order.email,
//          'Italian Pizza / Your order was successfully made!',
//          OrderSuccessEmail({
//             orderId: order.id,
//             webUrl: process.env.NEXT_PUBLIC_BASE_URL as string,
//             items,
//          })
//       );
//    } catch (error) {
//       console.error(error);
//       return NextResponse.json({ error: 'Server error' });
//    }
// }

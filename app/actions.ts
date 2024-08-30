'use server';
import { TCheckoutFormValuesSchema } from '@/shared/components/shared/checkout/schemas/checkout-form-schema';
import { OrderStatus } from '@prisma/client';
import { cookies } from 'next/headers';
// import { prisma } from '@/prisma/client';
import { Resend } from 'resend';
import { prisma } from '@/prisma/prisma-client';
import { basketTotalAmount, sendEmail } from '@/shared/lib';
import OrderPaymentTemplate from '@/shared/components/shared/email-template/pay-order';
import { createStripePayment } from '@/shared/lib/create-payment';

export const createOrder = async (data: TCheckoutFormValuesSchema) => {
   debugger;
   try {
      debugger;
      const cookieStore = cookies();
      const cartToken = cookieStore.get('cartToken')?.value;
      if (!cartToken) {
         throw new Error('Cart token not found');
      }
      //Finding basket with token
      const userCart = await prisma.cart.findFirst({
         include: {
            user: true,
            CartItem: {
               include: {
                  ingridients: true,
                  variations: {
                     include: {
                        product: true,
                     },
                  },
               },
            },
         },
         where: {
            token: cartToken,
         },
      });
      //If basket not found return error
      if (!userCart) {
         throw new Error('Cart not found');
      }
      if (userCart?.totalAmount === 0) {
         throw new Error('Cart is empty');
      }
      //TotalBasketPrice including VAT + DELIVERY
      const { totalBasketPrice } = basketTotalAmount(userCart.totalAmount);
      //Creating new order
      const order = await prisma.order.create({
         data: {
            token: cartToken,
            fullName: data.firstName + ' ' + data.lastName,
            email: data.email,
            phone: data.phone,
            address: data.fullAddress,
            comment: data.comment,
            // totalAmount: userCart.totalAmount,
            totalAmount: totalBasketPrice,
            status: OrderStatus.PENDING,
            items: JSON.stringify(userCart.CartItem),
         },
      });
      //Clearing totalAmount in basket
      await prisma.cart.update({
         where: {
            id: userCart.id,
         },
         data: {
            totalAmount: 0,
         },
      });
      await prisma.cartItem.deleteMany({
         where: {
            cartId: userCart.id,
         },
      });
      // STRIPE PAYMENT INTEGRATION
      const stripeUnitAmount = order.totalAmount * 100;
      const paymentData = await createStripePayment(
         order.fullName,
         stripeUnitAmount
      );
      if (!paymentData) {
         throw new Error('payment did not come through');
      }
      await prisma.order.update({
         where: {
            id: order.id,
         },
         data: {
            paymentId: paymentData.id,
         },
      });

      //Sending email confirmation
      await sendEmail(
         data.email,
         'Italian Pizza / Please pay for the order ' + order.id,
         OrderPaymentTemplate({
            orderId: order.id,
            totalAmount: order.totalAmount,
            paymentUrl: paymentData.url,
         })
      );

      console.log('paymentData.url >', paymentData.url);
      return paymentData.url;
   } catch (err) {
      console.log('Error [CREATE_USER]', err);
   }
};

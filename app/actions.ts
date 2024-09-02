'use server';
import { TCheckoutFormValuesSchema } from '@/shared/components/shared/checkout/schemas/checkout-form-schema';
import { OrderStatus, Prisma } from '@prisma/client';
import { cookies } from 'next/headers';
// import { prisma } from '@/prisma/client';
import { Resend } from 'resend';
import { prisma } from '@/prisma/prisma-client';
import { basketTotalAmount, sendEmail } from '@/shared/lib';
import OrderPaymentTemplate from '@/shared/components/shared/email-template/pay-order';
import { createStripePayment } from '@/shared/lib/create-payment';
import { getUserSession } from '@/shared/lib/get-user-session';
import { hashSync } from 'bcrypt';
import VerificationUser from '@/shared/components/shared/email-template/verification-user';

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
            paymentLinkUrl: '', // TODO :  REMOVE IT LATER
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
         stripeUnitAmount,
         order.id.toString()
      );
      console.log('paymentData > ', paymentData);
      if (!paymentData) {
         throw new Error('payment did not come through');
      }
      await prisma.order.update({
         where: {
            id: order.id,
         },
         data: {
            // paymentId: paymentData.metadata,
            paymentLinkUrl: paymentData.url,
         },
      });

      //Sending email confirmation
      await sendEmail(
         data.email,
         'Italian Pizza / Please pay for the order ' + order.id,
         OrderPaymentTemplate({
            orderId: order.id,
            totalAmount: order.totalAmount,
            paymentUrl: paymentData.url.toString(),
         })
      );

      console.log('paymentData.url >', paymentData.url);
      return paymentData.url;
   } catch (err) {
      console.log('Error [CREATE_USER]', err);
   }
};

export const updateUserInfo = async (body: Prisma.UserUpdateInput) => {
   try {
      const currentUser = await getUserSession();
      if (!currentUser) {
         throw new Error('User not found');
      }

      const findUser = await prisma.user.findFirst({
         where: {
            id: Number(currentUser.id),
         },
      });

      await prisma.user.update({
         where: {
            id: Number(currentUser.id),
         },
         data: {
            fullName: body.fullName,
            email: body.email,
            password: body.password
               ? hashSync(body.password as string, 10)
               : findUser?.password,
         },
      });
   } catch (err) {
      console.error(err);
      throw err;
   }
};

export async function registerUser(body: Prisma.UserCreateInput) {
   try {
      const user = await prisma.user.findFirst({
         where: {
            email: body.email,
         },
      });

      if (user) {
         if (!user.verified) {
            throw new Error('Почта не подтверждена');
         }

         throw new Error('Пользователь уже существует');
      }

      const createdUser = await prisma.user.create({
         data: {
            fullName: body.fullName,
            email: body.email,
            password: hashSync(body.password, 10),
         },
      });

      const code = Math.floor(100000 + Math.random() * 900000).toString();

      await prisma.verificationCode.create({
         data: {
            code,
            userId: createdUser.id,
         },
      });

      console.log('createdUser.email >', createdUser.email);
      await sendEmail(
         createdUser.email,
         'Next Pizza / 📝 Подтверждение регистрации',
         VerificationUser({
            code,
         })
      );
   } catch (err) {
      console.log('Error [CREATE_USER]', err);
      throw err;
   }
}

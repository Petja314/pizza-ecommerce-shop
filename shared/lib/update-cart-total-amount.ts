import { prisma } from '@/prisma/prisma-client';
import { calcCartItemTotalAmount } from '@/shared/lib/calc-cart-item-total-amount';

export const updateCartTotalAmount = async (token: string) => {
   const userCart = await prisma.cart.findFirst({
      where: {
         token,
      },
      include: {
         CartItem: {
            orderBy: {
               createdAt: 'desc',
            },
            include: {
               variations: {
                  include: {
                     product: true,
                  },
               },
               ingridients: true,
            },
         },
      },
   });
   if (!userCart) {
      return;
   }
   const totalAmount = userCart.CartItem.reduce((acc, item) => {
      return acc + calcCartItemTotalAmount(item);
   }, 0);

   return prisma.cart.update({
      where: {
         id: userCart.id,
      },
      data: {
         totalAmount,
      },
      include: {
         CartItem: {
            orderBy: {
               createdAt: 'desc',
            },
            include: {
               variations: {
                  include: {
                     product: true,
                  },
               },
               ingridients: true,
            },
         },
      },
   });
};

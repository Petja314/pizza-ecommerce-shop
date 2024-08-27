import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { findOrCreateCart, updateCartTotalAmount } from '@/shared/lib';
import { CreateCartItemValues } from '@/shared/store/cart';

export async function GET(req: NextRequest) {
   try {
      const token = req.cookies.get('cartToken')?.value;

      if (!token) {
         return NextResponse.json({ totalAmount: 0, CartItem: [] });
      }
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
      return NextResponse.json(userCart);
   } catch (err) {
      console.error(err);
   }
}

export async function POST(req: NextRequest) {
   try {
      let token = req.cookies.get('cartToken')?.value;

      if (!token) {
         token = crypto.randomUUID();
      }
      const userCart = await findOrCreateCart(token);

      const data = (await req.json()) as CreateCartItemValues;

      const findCartItem = await prisma.cartItem.findFirst({
         where: {
            cartId: userCart.id,
            variationsId: data.variationsId,
            ingridients: { every: { id: { in: data.ingridients } } },
         },
      });
      // IF PRODUCT WAS FOUND , MAKING +1
      if (findCartItem) {
         await prisma.cartItem.update({
            where: {
               id: findCartItem.id,
            },
            data: {
               quantity: findCartItem.quantity + 1,
            },
         });
      }

      await prisma.cartItem.create({
         data: {
            cartId: userCart.id,
            variationsId: data.variationsId,
            quantity: 1,
            ingridients: { connect: data.ingridients?.map((id) => ({ id })) },
         },
      });

      const updatedUserCart = await updateCartTotalAmount(token);

      const response = NextResponse.json(updatedUserCart);
      response.cookies.set('cartToken', token);
      return response;
   } catch (err) {
      return NextResponse.json(
         { message: 'Could not create a basket' },
         { status: 500 }
      );
      console.error(err);
   }
}

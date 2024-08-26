import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

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

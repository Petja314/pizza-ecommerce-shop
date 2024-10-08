import React from 'react';
import { prisma } from '@/prisma/prisma-client';
import { ChooseProductModal } from '@/shared/components/shared';
import { notFound } from 'next/navigation';

const ProductModalPage = async ({
   params: { id },
}: {
   params: { id: string };
}) => {
   const product = await prisma.product.findFirst({
      where: {
         id: Number(id),
      },
      include: {
         variations: true,
         ingridients: true,
      },
   });

   if (!product) {
      return notFound();
   }
   return (
      <>
         <ChooseProductModal product={product} />
      </>
   );
};

export default ProductModalPage;

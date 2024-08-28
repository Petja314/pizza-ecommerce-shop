import React from 'react';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import { Container, ProductForm } from '@/shared/components/shared';

const ProductPage = async ({ params: { id } }: { params: { id: string } }) => {
   const product = await prisma.product.findFirst({
      where: {
         id: Number(id),
      },
      include: {
         ingridients: true,
         category: {
            include: {
               product: {
                  include: {
                     variations: true,
                  },
               },
            },
         },
         variations: true,
      },
   });

   if (!product) {
      return notFound();
   }

   return (
      <Container className={''}>
         <ProductForm product={product} />
      </Container>
   );
};

export default ProductPage;

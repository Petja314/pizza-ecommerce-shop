import React from 'react';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import { Container, ProductForm } from '@/shared/components/shared';
import RecommendedProduct from '@/shared/components/shared/recommended product/recommended-product';

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

   // console.log('product >', product);

   if (!product) {
      return notFound();
   }

   return (
      <Container className={''}>
         <p className={'mt-10 text-gray-500'}>Product / {product.name}</p>

         <ProductForm product={product} isProductPage={true} />

         <RecommendedProduct product={product} />
      </Container>
   );
};

export default ProductPage;

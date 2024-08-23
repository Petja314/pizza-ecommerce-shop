import React from 'react';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import { Container, ProductImage, Title } from '@/components/shared';
import GroupVariant from '@/components/shared/group-variant';

const ProductPage = async ({ params: { id } }: { params: { id: string } }) => {
   const product = await prisma.product.findFirst({
      where: {
         id: Number(id),
      },
   });
   if (!product) {
      return notFound();
   }

   return (
      <Container className={'flex  my-10'}>
         <ProductImage
            imageUrl={product.imageUrl}
            alt={product.name}
            className={''}
            size={30}
         />

         <div className={'w-[490px] bg-gray-50 p-7 rounded-sm'}>
            <Title
               text={product.name}
               size={'md'}
               className={'font-extrabold mb-1'}
            ></Title>
            <p className={'text-gray-400 '}>Title pizza new</p>

            <GroupVariant
               selectedValue={'2'}
               items={[
                  { name: 'Маленькая', value: '1' },
                  { name: 'Средняя', value: '2' },
                  { name: 'Большая', value: '3' },
               ]}
            />
         </div>
      </Container>
   );
};

export default ProductPage;

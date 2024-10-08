'use client';

import React, { useEffect, useState } from 'react';
import { Title } from '@/shared/components/shared/title';
import { cn } from '@/shared/lib/utils';
import { ProductCard } from '@/shared/components/shared/product-card';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/shared/store/category';
import { Category } from '.prisma/client';

interface Props {
   categories: Category[];
   title: string;
   items: any[];
   listClassName?: string;
   categoryId: number;
   className?: string;
}

const ProductsGroupList: React.FC<Props> = ({
   className,
   title,
   items,
   listClassName,
   categoryId,
   categories,
}) => {
   const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
   const intersectionRef = React.useRef(null);
   const intersection = useIntersection(intersectionRef, {
      threshold: 0.2,
   });

   React.useEffect(() => {
      if (intersection?.isIntersecting) {
         setActiveCategoryId(categoryId);
      }
   }, [categoryId, intersection?.isIntersecting, title]);

   // console.log('items', items);
   // max-md:text-lg
   return (
      <div className={className} id={title} ref={intersectionRef}>
         <Title text={title} size={'lg'} className={'font-extrabold mb-5 '} />

         <div
            className={cn(
               'grid grid-cols-3 gap-[50px] max-lg:flex flex-wrap  w-full  justify-center gap-[30px] max-md:w-full',
               listClassName
            )}
         >
            {items.map((product, index) => (
               <ProductCard
                  key={index}
                  id={product.id}
                  name={product.name}
                  imageUrl={product.imageUrl}
                  price={product.variations[0].price}
                  ingridients={product.ingridients}
               />
            ))}
         </div>
      </div>
   );
};

export default ProductsGroupList;

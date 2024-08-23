'use client';

import React, { useEffect, useState } from 'react';
import { Title } from '@/components/shared/title';
import { cn } from '@/components/lib/utils';
import { ProductCard } from '@/components/shared/product-card';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/store/category';

interface Props {
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

   return (
      <div className={className} id={title} ref={intersectionRef}>
         <Title text={title} size={'lg'} className={'font-extrabold mb-5'} />

         <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
            {items.map((product, index) => (
               <ProductCard
                  key={index}
                  id={product.id}
                  name={product.name}
                  imageUrl={product.imageUrl}
                  price={product.variations[0].price}
               />
            ))}
         </div>
      </div>
   );
};

export default ProductsGroupList;

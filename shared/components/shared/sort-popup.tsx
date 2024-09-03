'use client';
import React, { useEffect, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { ArrowUpDown } from 'lucide-react';
import { Category } from '.prisma/client';

interface Props {
   className?: string;
}

export const SortPopup: React.FC<Props> = ({ className }) => {
   const sortByRating = () => {
      // debugger;
      // sortedCategories.sort(
      //    (a, b) => (a.rating as number) - (b.rating as number)
      // );
   };
   // console.log('categories > ', categories);
   return (
      <div
         onClick={sortByRating}
         className={cn(
            'inline-flex  items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer',
            className
         )}
      >
         <ArrowUpDown size={16} />
         <b>Сортировка: </b>
         <b className={'text-primary'}>рейтингу: </b>
      </div>
   );
};

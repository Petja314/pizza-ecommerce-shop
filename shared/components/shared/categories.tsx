'use client';
import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Category } from '.prisma/client';
import { useCategoryStore } from '@/shared/store/category';

interface Props {
   variations: Category[];
   className?: string;
}

export const Categories: React.FC<Props> = ({ className, variations }) => {
   const categoryActiveId = useCategoryStore((state) => state.activeId);

   return (
      <div
         className={cn(
            'inline-flex gap-1 bg-gray-50 p-1 rounded-2xl max-md:overflow-x-auto max-md:no-scrollbar',
            className
         )}
      >
         {variations.map((cat, index) => (
            <a
               href={`/#${cat.name}`}
               className={cn(
                  'flex items-center font-bold h-11 rounded-2xl px-5 max-md:bg-gray-100 text-sm',
                  index + 1 === categoryActiveId
                     ? 'bg-white shadow-md shadow-gray-200 text-primary'
                     : ''
               )}
               key={index}
            >
               <button className="focus:outline-none">{cat.name}</button>
            </a>
         ))}
      </div>
   );
};

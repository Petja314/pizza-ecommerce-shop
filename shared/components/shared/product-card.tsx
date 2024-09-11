import React from 'react';
import Link from 'next/link';
import { Title } from '@/shared/components/shared/title';
import { Button } from '@/shared/components/ui';
import { Plus } from 'lucide-react';
import { Product } from '.prisma/client';
import { ProductWithRelations } from '@/@types/prisma';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';

interface Props {
   id: number;
   name: string;
   price: number;
   imageUrl?: string;
   className?: string;
   ingridients: Product[];
}

export const ProductCard: React.FC<Props> = ({
   className,
   id,
   name,
   price,
   imageUrl,
   ingridients,
}) => {
   return (
      <div className={cn('max-lg:w-[400px] max-md:w-full', className)}>
         <Link href={`/product/${id}`}>
            <div
               className={
                  'flex justify-center p-6 bg-secondary rounded-lg h-[260px]  '
               }
            >
               <img
                  src={imageUrl}
                  alt="logo"
                  // className={'w-[225px] h-[225px]'}
               />
            </div>

            <Title text={name} size={'sm'} className={'mb-1 mt-3 font-bold'} />
            <p className={'text-sm text-gray-400'}>
               {ingridients.map((item) => (
                  <span key={item.id}>{item.name} , </span>
               ))}
            </p>

            <div className={'flex justify-between items-center mt-4'}>
               <span className={'text-[20px]'}>
                  от <b>{price}</b> £
               </span>

               <Button variant={'secondary'} className={'text-base font-bold'}>
                  <Plus size={20} className={'mr-1'} />
                  Add to cart
               </Button>
            </div>
         </Link>
      </div>
   );
};

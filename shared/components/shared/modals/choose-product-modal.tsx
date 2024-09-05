'use client';
import React from 'react';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '@/@types/prisma';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { ProductForm } from '@/shared/components/shared';

interface Props {
   product: ProductWithRelations;
   className?: string;
   isProductPage: boolean; //not exist
}

export const ChooseProductModal: React.FC<Props> = ({
   className,
   product,
   isProductPage,
}) => {
   const router = useRouter();

   const backPageHandler = () => {
      router.back();
   };

   return (
      <div className={''}>
         <Dialog open={Boolean(product)} onOpenChange={backPageHandler}>
            <DialogContent
               className={cn(
                  ' p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden max-lg:w-full max-lg:h-full',
                  className
               )}
            >
               <ProductForm
                  isProductPage={isProductPage}
                  product={product}
                  onSubmit={backPageHandler}
               />
            </DialogContent>
         </Dialog>
      </div>
   );
};

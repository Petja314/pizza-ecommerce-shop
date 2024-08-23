'use client';
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/components/lib/utils';
import { useRouter } from 'next/navigation';
import { ChoosePizzaForm, ChooseProductForm } from '@/components/shared';
import { ProductWithRelations } from '@/@types/prisma';

interface Props {
   product: ProductWithRelations;
   className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
   const router = useRouter();
   const isPizzaForm = Boolean(product.variations[0].pizzaType);

   const showDialogsHandler = () => {
      router.back();
   };
   return (
      <div className={''}>
         <Dialog open={Boolean(product)} onOpenChange={showDialogsHandler}>
            <DialogContent
               className={cn(
                  'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
                  className
               )}
            >
               {isPizzaForm ? (
                  <ChoosePizzaForm
                     imageUrl={product.imageUrl}
                     ingredients={[]}
                     name={product.name}
                     price={20}
                     textDetails={'25 см, традиционное тесто 25, 380г'}
                     size={30}
                  />
               ) : (
                  <ChooseProductForm
                     imageUrl={product.imageUrl}
                     ingredients={[]}
                     name={product.name}
                     price={20}
                     // textDetails={product.name}
                  />
               )}
            </DialogContent>
         </Dialog>
      </div>
   );
};

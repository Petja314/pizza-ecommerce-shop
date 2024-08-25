'use client';
import React from 'react';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '@/@types/prisma';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { ChoosePizzaForm, ChooseProductForm } from '@/shared/components/shared';

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

   console.log('product >', product);
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
                     ingridients={product.ingridients}
                     name={product.name}
                     price={20}
                     items={product.variations}
                     productId={product.id}
                  />
               ) : (
                  <ChooseProductForm
                     imageUrl={product.imageUrl}
                     ingredients={[]}
                     name={product.name}
                     price={20}
                     productId={product.id}
                  />
               )}
            </DialogContent>
         </Dialog>
      </div>
   );
};

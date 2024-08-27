'use client';
import React, { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '@/@types/prisma';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { ChoosePizzaForm, ChooseProductForm } from '@/shared/components/shared';
import { useCartStore } from '@/shared/store/cart';
import toast from 'react-hot-toast';

interface Props {
   product: ProductWithRelations;
   className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
   const router = useRouter();
   const firstItem = product.variations[0];
   const isPizzaForm = Boolean(firstItem.pizzaType);
   const [loading, addCartItem] = useCartStore((state) => [
      state.loading,
      state.addCartItem,
   ]);

   const onSubmit = async (variationsId?: number, ingridients?: number[]) => {
      try {
         const itemId = variationsId ?? firstItem.id;
         await addCartItem({
            variationsId: itemId,
            ingridients,
         });
         toast.success(` ${product.name} successfully added to cart!`);
         router.back();
      } catch (err) {
         console.error(err);
         toast.error(`${product.name} Couldn't add to cart`);
      }
   };
   return (
      <div className={''}>
         <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
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
                     onSubmit={onSubmit}
                     loading={loading}
                  />
               ) : (
                  <ChooseProductForm
                     onSubmit={onSubmit}
                     imageUrl={product.imageUrl}
                     name={product.name}
                     price={firstItem.price}
                     productId={product.id}
                     loading={loading}
                  />
               )}
            </DialogContent>
         </Dialog>
      </div>
   );
};

'use client';
import React from 'react';
import { ChoosePizzaForm } from '@/shared/components/shared/choose-pizza-form';
import { ChooseProductForm } from '@/shared/components/shared/choose-product-form';
import { useCartStore } from '@/shared/store/cart';
import { ProductWithRelations } from '@/@types/prisma';
import toast from 'react-hot-toast';

interface Props {
   className?: string;
   product: ProductWithRelations | any;
   onSubmit?: () => void;
   isProductPage?: boolean;
}

export const ProductForm: React.FC<Props> = ({
   product,
   onSubmit: _onSubmit,
   isProductPage,
}) => {
   const [loading, addCartItem] = useCartStore((state) => [
      state.loading,
      state.addCartItem,
   ]);
   const firstItem = product.variations[0];
   const isPizzaForm = Boolean(firstItem.pizzaType);

   const onSubmit = async (variationsId?: number, ingridients?: number[]) => {
      try {
         const itemId = variationsId ?? firstItem.id;
         await addCartItem({
            variationsId: itemId,
            ingridients,
         });
         toast.success(` ${product.name} successfully added to cart!`);
         // router.back();
         _onSubmit?.();
      } catch (err) {
         console.error(err);
         toast.error(`${product.name} Couldn't add to cart`);
      }
   };

   if (isPizzaForm) {
      return (
         <ChoosePizzaForm
            imageUrl={product.imageUrl}
            ingridients={product.ingridients}
            name={product.name}
            price={20}
            items={product.variations}
            productId={product.id}
            onSubmit={onSubmit}
            loading={loading}
            isProductPage={isProductPage}
         />
      );
   }
   return (
      <ChooseProductForm
         onSubmit={onSubmit}
         imageUrl={product.imageUrl}
         name={product.name}
         price={firstItem.price}
         productId={product.id}
         loading={loading}
         isProductPage={isProductPage}
      />
   );
};

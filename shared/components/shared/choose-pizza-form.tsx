'use client';
import React from 'react';
import { ProductImage } from '@/shared/components/shared/product-image';
import { Title } from '@/shared/components/shared/title';
import { Button } from '@/shared/components/ui';
import GroupVariant from '@/shared/components/shared/group-variant';
import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { Ingridient, Product, Variations } from '.prisma/client';
import { IngredientItems } from '@/shared/components/shared/ingredientItems';
import { getPizzaDetails } from '@/shared/lib';
import { usePizzaOptions } from '@/shared/hooks';
import { Container } from '@/shared/components/shared/container';
import RecommendedProduct from '@/shared/components/shared/recommended product/recommended-product';
import { ProductCategory, ProductWithRelations } from '@/@types/prisma';
import { cn } from '@/shared/lib/utils';

interface Props {
   imageUrl: string;
   name: string;
   ingridients: Ingridient[];
   items: Variations[];
   onClickAddCart?: VoidFunction;
   className?: string;
   price: number;
   productId: number;
   onSubmit: (variationsId: number, ingiridients: number[]) => void;
   loading: any;
   isProductPage?: boolean;
}

/**
 * Form to choose PIZZA
 * @param imageUrl
 * @param name
 * @param ingridients
 * @param items
 * @param onClickAddCart
 * @constructor
 */
export const ChoosePizzaForm: React.FC<Props> = ({
   imageUrl,
   name,
   ingridients,
   items,
   onClickAddCart,
   onSubmit,
   loading,
   isProductPage,
}) => {
   const {
      size,
      type,
      setSize,
      setType,
      availablePizzasSizes,
      addIngredient,
      selectedIngredients,
      currentItemId,
   } = usePizzaOptions(items);

   const { totalPrice, textDetails } = getPizzaDetails(
      items,
      type,
      size,
      ingridients,
      selectedIngredients
   );
   const handleClickAdd = () => {
      if (currentItemId) {
         onSubmit(currentItemId, Array.from(selectedIngredients));
      }
   };

   return (
      <>
         <div
            className={cn(
               'pr-2 pl-2 max-lg:flex max-lg:flex-col items-center max-h-full scrollbar overflow-auto ',
               isProductPage ? 'flex justify-between ' : 'flex flex-1'
            )}
         >
            <div
               className={cn(
                  'max-lg:pt-4 pb-4',
                  isProductPage
                     ? 'flex justify-center p-6 bg-secondary rounded-lg h-[570px] w-[570px]'
                     : 'flex items-center justify-center flex-1 relative w-full'
               )}
            >
               <ProductImage
                  imageUrl={imageUrl}
                  size={size}
                  alt={`pizza-${name}`}
               ></ProductImage>
            </div>

            <div
               className={cn(
                  'max-lg:w-full scroll scroll-auto',
                  isProductPage
                     ? ''
                     : 'w-[490px] bg-[#f7f6f5] p-7 border rounded-2xl'
               )}
            >
               <Title
                  text={name}
                  size={'md'}
                  className={'font-extrabold mb-1'}
               />
               <p className={'text-gray-400'}>{textDetails}</p>
               <div className={'flex flex-col gap-5 mt-5'}>
                  <GroupVariant
                     items={availablePizzasSizes}
                     value={String(size)}
                     onClick={(value) => setSize(Number(value) as PizzaSize)}
                  />
                  <GroupVariant
                     items={pizzaTypes}
                     value={String(type)}
                     onClick={(value) => setType(Number(value) as PizzaType)}
                  />
               </div>
               <div
                  className={
                     'bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-10'
                  }
               >
                  <div
                     className={
                        'grid grid-cols-3 gap-3 max-sm:flex flex-wrap justify-around'
                     }
                  >
                     {ingridients.map((ingridients, index) => (
                        <IngredientItems
                           key={ingridients.id}
                           id={ingridients.id}
                           name={ingridients.name}
                           price={ingridients.price}
                           imageUrl={ingridients.imageUrl}
                           className={''}
                           onClick={() => addIngredient(ingridients.id)}
                           active={selectedIngredients.has(ingridients.id)}
                        />
                     ))}
                  </div>
               </div>
               <Button
                  className={'mt-10 w-[100%] pt-2'}
                  onClick={handleClickAdd}
                  loading={loading}
               >
                  Add to basket for {totalPrice} £{' '}
               </Button>
            </div>
         </div>
      </>
   );
};

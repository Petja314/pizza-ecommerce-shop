'use client';
import React from 'react';
import { ProductImage } from '@/shared/components/shared/product-image';
import { Title } from '@/shared/components/shared/title';
import { Button } from '@/shared/components/ui';
import GroupVariant from '@/shared/components/shared/group-variant';
import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { Ingridient, Variations } from '.prisma/client';
import { IngredientItems } from '@/shared/components/shared/ingredientItems';
import { getPizzaDetails } from '@/shared/lib';
import { usePizzaOptions } from '@/shared/hooks';

interface Props {
   imageUrl: string;
   name: string;
   ingridients: Ingridient[];
   items: Variations[];
   onClickAddCart?: VoidFunction;
   className?: string;
   price: number;
   productId: number;
}

export const ChoosePizzaForm: React.FC<Props> = ({
   imageUrl,
   name,
   ingridients,
   items,
   onClickAddCart,
}) => {
   const {
      size,
      type,
      setSize,
      setType,
      availablePizzasSizes,
      addIngredient,
      selectedIngredients,
   } = usePizzaOptions(items);

   const { totalPrice, textDetails } = getPizzaDetails(
      items,
      type,
      size,
      ingridients,
      selectedIngredients
   );
   const handleClickAdd = () => {
      onClickAddCart?.();
      console.log({
         pizzaSize: size,
         pizzaType: type,
         ingredients: selectedIngredients,
      });
   };

   // console.log('availablePizzaVariations >', availablePizzaVariations);
   // console.log('availablePizzaSizes >', availablePizzaSizes);
   // console.log('items >', items);
   // console.log('pizzaPrice >', pizzaPrice);
   return (
      <div className={'flex flex-1'}>
         <ProductImage
            imageUrl={imageUrl}
            size={size}
            alt={`pizza-${name}`}
         ></ProductImage>

         <div className={'w-[490px] bg-[#f7f6f5] p-7'}>
            <Title text={name} size={'md'} className={'font-extrabold mb-1'} />
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
               <div className={'grid grid-cols-3 gap-3'}>
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

            <Button className={'mt-10 w-[100%] pt-2'} onClick={handleClickAdd}>
               Добавить в корзину за {totalPrice} £{' '}
            </Button>
         </div>
      </div>
   );
};

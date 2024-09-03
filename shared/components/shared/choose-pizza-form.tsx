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
import { ProductCategory } from '@/@types/prisma';

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
   allProducts: ProductCategory[];
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
   allProducts,
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

   // console.log('availablePizzaVariations >', availablePizzaVariations);
   // console.log('availablePizzaSizes >', availablePizzaSizes);
   // console.log('items >', items);
   // console.log('pizzaPrice >', pizzaPrice);
   return (
      <Container>
         <p className={'mt-10 text-gray-500'}>Product / {name}</p>

         <div className={'flex justify-between mt-10'}>
            <div
               // className={'flex justify-center p-6 bg-secondary rounded-lg h-[260px]'}
               className={
                  'flex justify-center p-6 bg-[#FFF8EE] rounded-lg h-[570px] w-[570px]'
               }
            >
               <ProductImage
                  imageUrl={imageUrl}
                  size={40}
                  alt={`pizza-${name}`}
               ></ProductImage>
            </div>

            <div className={'w-[490px] h-[570px]'}>
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
                     'bg-gray-50 p-5 rounded-md h-[300px] overflow-auto scrollbar mt-10'
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

               <Button
                  className={'mt-10 w-[100%] pt-2'}
                  onClick={handleClickAdd}
                  loading={loading}
               >
                  Добавить в корзину за {totalPrice} £{' '}
               </Button>
            </div>
         </div>

         <RecommendedProduct allProducts={allProducts} />
      </Container>
   );
};

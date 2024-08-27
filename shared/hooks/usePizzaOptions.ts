import React, { useEffect, useState } from 'react';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { Variant } from '@/shared/components/shared/group-variant';
import { getAvailablePizzaSizes } from '@/shared/lib';
import { Variations } from '.prisma/client';
import { useSet } from 'react-use';

interface ReturnProps {
   size: PizzaSize;
   type: PizzaType;
   setSize: (size: PizzaSize) => void;
   setType: (size: PizzaType) => void;
   currentItemId?: number;
   availablePizzasSizes: any;
   selectedIngredients: any;
   addIngredient: any;
}
export const usePizzaOptions = (items: Variations[]): ReturnProps => {
   const [selectedIngredients, { toggle: addIngredient }] = useSet(
      new Set<number>([])
   );
   const [size, setSize] = useState<PizzaSize>(20);
   const [type, setType] = useState<PizzaType>(1);

   const availablePizzasSizes = getAvailablePizzaSizes(items, type);

   const currentItemId = items.find(
      (item) => item.pizzaType === type && item.size === size
   )?.id;

   useEffect(() => {
      const isAvailableSize = availablePizzasSizes?.find(
         (item) => Number(item.value) === size && !item.disabled
      );
      const availableSize = availablePizzasSizes?.find(
         (item) => !item.disabled
      );
      if (availableSize && !isAvailableSize) {
         setSize(Number(availableSize.value) as PizzaSize);
      }
   }, [type]);

   return {
      size,
      type,
      setSize,
      setType,
      availablePizzasSizes,
      selectedIngredients,
      addIngredient,
      currentItemId,
   };
};

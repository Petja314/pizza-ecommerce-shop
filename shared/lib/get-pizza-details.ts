import { mapPizzaType, PizzaType } from '@/shared/constants/pizza';
import { calcTotalPizzaPrice } from '@/shared/lib/calc-total-pizza-price';
import { Ingridient, Variations } from '.prisma/client';

export const getPizzaDetails = (
   items: Variations[],
   type: PizzaType,
   size: number,
   ingridients: Ingridient[],
   selectedIngredients: Set<number>
) => {
   const textDetails = `${size} cm , ${mapPizzaType[type]} pizza`;
   const totalPrice = calcTotalPizzaPrice(
      items,
      type,
      size,
      ingridients,
      selectedIngredients
   );
   return {
      totalPrice,
      textDetails,
   };
};

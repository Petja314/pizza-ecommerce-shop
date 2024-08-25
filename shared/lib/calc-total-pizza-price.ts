import { PizzaType } from '@/shared/constants/pizza';
import { Ingridient, Variations } from '.prisma/client';

/**
 * Function for calculation total pizza price
 * @param items - list of variations
 * @param type - type selected pizza
 * @param size - size selected pizza
 * @param ingridients  - list of ingredients
 * @param selectedIngredients - selected ingredients
 * @returns number total price
 */

export const calcTotalPizzaPrice = (
   items: Variations[],
   type: PizzaType,
   size: number,
   ingridients: Ingridient[],
   selectedIngredients: Set<number>
) => {
   const pizzaPrice =
      items.find((item) => item.pizzaType == type && item.size == size)
         ?.price || 0;
   const totalIngredientsPrice = ingridients
      .filter((ingridients) => selectedIngredients.has(ingridients.id))
      .reduce((acc, ingridients) => acc + ingridients.price, 0);
   const totalPrice = pizzaPrice + totalIngredientsPrice;

   return totalPrice;
};

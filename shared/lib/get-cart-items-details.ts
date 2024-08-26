import { mapPizzaType, PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { Ingridient } from '.prisma/client';
import { CartStateItem } from '@/shared/lib/get-cart-details';

export const getCartItemsDetails = (
   ingredients: CartStateItem['ingridients'],
   pizzaType: PizzaType,
   pizzaSize: PizzaSize
): string => {
   const details = [];
   if (pizzaSize && pizzaType) {
      const typeName = mapPizzaType[pizzaType];
      details.push(`${typeName} ${pizzaSize} cm`);
   }

   if (ingredients) {
      details.push(...ingredients.map((ing) => ing.name));
   }

   return details.join(', ');
};

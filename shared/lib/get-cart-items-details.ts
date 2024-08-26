import { mapPizzaType, PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { Ingridient } from '.prisma/client';

export const getCartItemsDetails = (
   pizzaType: PizzaType,
   pizzaSize: PizzaSize,
   ingredients: Ingridient[]
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

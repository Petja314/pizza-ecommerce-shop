import { pizzaSizes, PizzaType } from '@/shared/constants/pizza';
import { Variations } from '.prisma/client';
import { Variant } from '@/shared/components/shared/group-variant';

export const getAvailablePizzaSizes = (
   items: Variations[],
   type: PizzaType
): Variant[] => {
   const filteredPizzasByType = items.filter((item) => item.pizzaType == type);
   return pizzaSizes.map((item) => ({
      name: item.name,
      value: item.value,
      disabled: !filteredPizzasByType.some(
         (pizza) => Number(pizza.size) === Number(item.value)
      ),
   }));
};

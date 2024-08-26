import { CartItemDto } from '@/services/dto/cart.dto';

export const calcCartItemTotalAmount = (item: CartItemDto): number => {
   const ingridientsPrice = item.ingridients.reduce(
      (acc, ing) => acc + ing.price,
      0
   );
   return (ingridientsPrice + item.variations.price) * item.quantity;
};

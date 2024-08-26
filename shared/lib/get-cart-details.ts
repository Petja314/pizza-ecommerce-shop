import { calcCartItemTotalAmount } from '@/shared/lib/calc-cart-item-total-amount';

export type CartStateItem = {
   id: number;
   quantity: number;
   name: string;
   imageUrl: string;
   price: number;
   disabled?: boolean;
   pizzaSize?: number | null;
   pizzaType?: number | null;
   ingridients: Array<{ name: string; price: number }>;
};

interface ReturnProps {
   items: CartStateItem[];
   totalAmount: number;
}
export const getCartDetails = (data: any) => {
   const items = data.CartItem.map((item: any) => ({
      id: item.id,
      quantity: item.quantity,
      name: item.variations.product.name,
      imageUrl: item.variations.product.imageUrl,
      // price: item.variations.price,
      price: calcCartItemTotalAmount(item),
      pizzaSize: item.variations.size,
      pizzaType: item.variations.pizzaType,
      ingridients: item.ingridients.map((ing: any) => ({
         name: ing.name,
         price: ing.price,
      })),
   }));

   return {
      items,
      totalAmount: data.totalAmount,
   };
};

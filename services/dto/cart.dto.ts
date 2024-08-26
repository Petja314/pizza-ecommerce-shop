import {
   Cart,
   CartItem,
   Ingridient,
   Product,
   Variations,
} from '.prisma/client';

export type CartItemDto = CartItem & {
   variations: Variations & {
      product: Product;
   };
   ingridients: Ingridient[];
};
export interface CartDto extends Cart {
   CartItem: CartItemDto[];
}

// TS2345: Argument of type '{ id: number; userId: number | null; token: string; totalAmount: number; }' is not assignable to parameter of type 'CartDto'.
// 'CartItem' is missing in type '{ id: number; userId: number | null; token: string; totalAmount: number; }' but required in type 'CartDto'.

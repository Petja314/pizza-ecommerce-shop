import { Ingridient, Product, Variations } from '.prisma/client';

export type ProductWithRelations = Product & {
   variations: Variations[];
   ingridients: Ingridient[];
   category?: {
      product: ProductCategory[]; // Array of ProductCategory
   };
};

export type ProductCategory = {
   id: number;
   name: string;
   imageUrl: string;
   categoryId: number;
   createdAt: string;
   updatedAt: string;
   variations: [
      {
         id: number;
         price: number;
         size: number;
         pizzaType: number;
         productId: number;
         createdAt: string;
         updatedAt: string;
      },
   ];
};

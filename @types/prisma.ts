import { Ingridient, Product, Variations } from '.prisma/client';

export type ProductWithRelations = Product & {
   variations: Variations[];
   ingridients: Ingridient[];
};

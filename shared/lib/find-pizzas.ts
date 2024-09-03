import { prisma } from '@/prisma/prisma-client';

export interface GetSearchParams {
   query?: string;
   sortBy?: string;
   sizes?: string;
   pizzaTypes?: string;
   ingredients?: string;
   pricesFrom?: string;
   pricesTo?: string;
}
const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSearchParams) => {
   const sizes = params.sizes?.split(',').map(Number);
   const pizzaTypes = params.pizzaTypes?.split(',').map(Number);
   const igridientsIdArr = params.ingredients?.split(',').map(Number);

   const minPrice = Number(params.pricesFrom) || DEFAULT_MIN_PRICE;
   const maxPrice = Number(params.pricesTo) || DEFAULT_MAX_PRICE;

   const categories = await prisma.category.findMany({
      include: {
         product: {
            orderBy: {
               id: 'desc',
            },
            where: {
               ingridients: igridientsIdArr
                  ? {
                       some: {
                          id: {
                             in: igridientsIdArr,
                          },
                       },
                    }
                  : undefined,
               variations: {
                  some: {
                     size: {
                        in: sizes,
                     },
                     pizzaType: {
                        in: pizzaTypes,
                     },
                     price: {
                        gte: minPrice, // >=
                        lte: maxPrice, // <=
                     },
                  },
               },
            },
            include: {
               ingridients: true,
               variations: {
                  where: {
                     price: {
                        gte: minPrice,
                        lte: maxPrice,
                     },
                  },
                  orderBy: {
                     price: 'asc',
                  },
               },
            },
         },
      },
   });

   // console.log('categories >>>.', categories);
   return categories;
};

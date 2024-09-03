import { useEffect, useRef } from 'react';
import qs from 'qs';
import { useRouter } from 'next/navigation';
import { Filters } from '@/shared/hooks/useFilters';

export const useQueryFilters = (filters: Filters, sortBy: string) => {
   const isMounted = useRef(false);
   const router = useRouter();

   useEffect(() => {
      if (isMounted.current) {
         // console.log(prices, pizzaTypes, sizes, selectedIngredients);
         const params = {
            ...filters.prices,
            pizzaTypes: Array.from(filters.pizzaTypes),
            sizes: Array.from(filters.sizes),
            ingredients: Array.from(filters.selectedIngredients),
            sortBy,
         };

         const queryFilterParams = qs.stringify(params, {
            arrayFormat: 'comma',
         });
         router.push(`?${queryFilterParams}`, { scroll: false });
      }
      isMounted.current = true;
   }, [
      filters.pizzaTypes,
      filters.prices,
      filters.selectedIngredients,
      filters.sizes,
      sortBy,
      router,
   ]);
};

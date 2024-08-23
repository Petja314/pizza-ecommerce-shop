import { useEffect } from 'react';
import qs from 'qs';
import { useRouter } from 'next/navigation';
import { Filters } from '@/shared/hooks/useFilters';

export const useQueryFilters = (filters: Filters) => {
   const router = useRouter();

   useEffect(() => {
      // console.log(prices, pizzaTypes, sizes, selectedIngredients);
      const params = {
         ...filters.prices,
         pizzaTypes: Array.from(filters.pizzaTypes),
         sizes: Array.from(filters.sizes),
         ingredients: Array.from(filters.selectedIngredients),
      };

      // console.log(filters);
      const queryFilterParams = qs.stringify(params, { arrayFormat: 'comma' });
      router.push(`?${queryFilterParams}`, { scroll: false });
   }, [filters, router]);
};

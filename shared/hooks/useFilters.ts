import { useSearchParams } from 'next/navigation';
import { useSet } from 'react-use';
import { useMemo, useState } from 'react';

interface PriceProps {
   pricesFrom?: number;
   pricesTo?: number;
}

export interface QueryFilters extends PriceProps {
   pizzaTypes: Set<string>;
   sizes: string;
   ingredients: string;
   sortBy?: string;
}

export interface Filters {
   sizes: Set<string>;
   pizzaTypes: Set<string>;
   selectedIngredients: Set<string>;
   prices: PriceProps;
   sortBy?: string;
}

interface ReturnProps extends Filters {
   setPrices: (name: keyof PriceProps, value: number) => void;
   setPizzaTypes: (value: string) => void;
   setSizes: (value: string) => void;
   setIngredients: (value: string) => void;
   sortBy?: string;
}

export const useFilters = (): ReturnProps => {
   const searchParams = useSearchParams() as unknown as Map<
      keyof QueryFilters,
      string
   >;

   const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
      new Set<string>(
         searchParams.has('ingredients')
            ? searchParams.get('ingredients')?.split(',')
            : []
      )
   );

   const [sizes, { toggle: toggleSizes }] = useSet(
      new Set<string>(
         searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []
      )
   );

   const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
      new Set<string>(
         searchParams.has('pizzaTypes')
            ? searchParams.get('pizzaTypes')?.split(',')
            : []
      )
   );

   const [prices, setPrices] = useState<PriceProps>({
      pricesFrom: Number(searchParams.get('pricesFrom')) || undefined,
      pricesTo: Number(searchParams.get('pricesTo')) || undefined,
   });

   const [sortBy, setSortBy] = useState<string | undefined>(
      searchParams.get('sortBy') || undefined
   );

   const updatePrice = (name: keyof PriceProps, value: number) => {
      setPrices((prevState) => ({
         ...prevState,
         [name]: value,
      }));
   };

   return useMemo(
      () => ({
         sizes,
         pizzaTypes,
         prices,
         selectedIngredients,
         setPrices: updatePrice,
         setPizzaTypes: togglePizzaTypes,
         setSizes: toggleSizes,
         setIngredients: toggleIngredients,
         sortBy,
         setSortBy,
      }),
      [sizes, pizzaTypes, prices, selectedIngredients, sortBy]
   );
};

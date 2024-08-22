'use client';
import React from 'react';
import { Title } from '@/components/shared/title';
import { cn } from '@/components/lib/utils';
import { Input } from '@/components/ui/input';
import { RangeSlider } from '@/components/shared/range-slider';
import { CheckboxFiltersGroups } from '@/components/shared/checkbox-filters-groups';
import {
   useFilters,
   useIngredients,
   useQueryFilters,
} from '@/components/hooks';

interface Props {
   className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
   const { ingredients, loading } = useIngredients();
   const filters = useFilters();
   useQueryFilters(filters);

   const items = ingredients.map((item) => ({
      value: String(item.id),
      text: item.name,
   }));

   const updatePrices = (prices: number[]) => {
      filters.setPrices('pricesFrom', prices[0]);
      filters.setPrices('pricesTo', prices[1]);
   };

   // console.log('prices> ', filters.prices);
   return (
      <div className={cn('', className)}>
         <Title text={'Фильтрация'} className={'font-bold'}></Title>

         {/*TOP CHECKBOXES*/}
         <div className={'flex flex-col gap-4 mt-5'}>
            <CheckboxFiltersGroups
               title={'Тип теста'}
               name={'pizza type'}
               className={'mt-5'}
               selected={filters.pizzaTypes}
               onClickCheckbox={filters.setPizzaTypes}
               items={[
                  { text: 'Тонкое', value: '1' },
                  { text: 'Традиционное', value: '2' },
               ]}
            />

            <CheckboxFiltersGroups
               title={'Размеры'}
               name={'sizes'}
               className={'mt-5'}
               selected={filters.sizes}
               onClickCheckbox={filters.setSizes}
               items={[
                  { text: '20 cm', value: '20' },
                  { text: '30 cm', value: '30' },
                  { text: '40 cm', value: '40' },
               ]}
            />
         </div>

         {/*FILTER SLIDER*/}
         <div className={'mt-5 border-y border-y-neutral-100  py-6 pb-7'}>
            <p className={'font-bold mb-3'}>Цена от и до:</p>
            <div className={'flex gap-3 mb-5'}>
               <Input
                  type={'number'}
                  placeholder={'0'}
                  min={0}
                  max={1000}
                  value={String(filters.prices.pricesFrom)}
                  onChange={(e) =>
                     filters.setPrices('pricesFrom', Number(e.target.value))
                  }
                  className={''}
               />

               <Input
                  type={'number'}
                  min={100}
                  max={1000}
                  placeholder={'1000'}
                  value={String(filters.prices.pricesTo)}
                  onChange={(e) =>
                     filters.setPrices('pricesTo', Number(e.target.value))
                  }
               />
            </div>
            <RangeSlider
               min={100}
               max={1000}
               step={10}
               value={[
                  filters.prices.pricesFrom || 0,
                  filters.prices.pricesTo || 1000,
               ]}
               onValueChange={updatePrices}
            />
         </div>
         {/*CHECKBOXES INGRIDIENTS*/}

         <CheckboxFiltersGroups
            title={'Ингридиенты'}
            className={'mt-5'}
            limit={5}
            defaultItems={items.slice(0, 6)}
            items={items}
            loading={loading}
            onClickCheckbox={filters.setIngredients}
            selected={filters.selectedIngredients}
            name={'ingredients'}
         />
      </div>
   );
};

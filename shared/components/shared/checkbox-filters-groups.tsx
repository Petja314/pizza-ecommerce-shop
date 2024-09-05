'use client';
import React, { useState } from 'react';
import {
   FilterChecboxProps,
   FilterCheckbox,
} from '@/shared/components/shared/filter-checkbox';
import { Input } from '@/shared/components/ui/input';
import { Skeleton } from '@/shared/components/ui/skeleton';

type Item = FilterChecboxProps;

interface Props {
   title: string;
   items: Item[];
   defaultItems?: Item[];
   limit?: number;
   searchInputPlaceholder?: string;
   onClickCheckbox?: (id: string) => void;
   defaultValue?: string[];
   className?: string;
   loading?: boolean;
   selected?: Set<string>;
   name: string;
}

export const CheckboxFiltersGroups: React.FC<Props> = ({
   className,
   title,
   items,
   defaultItems,
   limit = 6,
   searchInputPlaceholder = 'Search...',
   onClickCheckbox,
   defaultValue,
   loading,
   selected,
   name,
}) => {
   const [showAll, setShowAll] = useState<boolean>(false);
   const [searchValue, setSearchValue] = useState('');

   const list = showAll
      ? items.filter((item) => item.text.toLowerCase().includes(searchValue))
      : (defaultItems || items).slice(0, limit);
   const onChangeSearchInput = (e: any) => {
      setSearchValue(e.target.value);
   };

   if (loading) {
      return (
         <div className={className}>
            <p className={'font-bold mb-3'}>{title}</p>
            {...Array(limit)
               .fill(0)
               .map((_, index) => (
                  <Skeleton className={'h-6 mb-4  rounded-[8px]'} key={index} />
               ))}
            <Skeleton className={'w-28 h-6 mb-4  rounded-[8px]'} />
         </div>
      );
   }

   return (
      <div className={className}>
         <p className={'font-bold mb-3'}>{title}</p>

         {showAll && (
            <div className={'mb-5'}>
               <Input
                  placeholder={searchInputPlaceholder}
                  className={'bg-gray-50 border-none'}
                  onChange={onChangeSearchInput}
               />
            </div>
         )}

         <div
            className={
               'flex flex-col gap-1 max-h-96 pr-2 overflow-auto scrollbar'
            }
         >
            {list?.map((item, index) => (
               <FilterCheckbox
                  key={index}
                  text={item.text}
                  value={item.value}
                  endAdornment={item.endAdornment}
                  checked={selected?.has(item.value)}
                  onCheckedChange={() => onClickCheckbox?.(item.value)}
                  name={name}
               />
            ))}

            {items.length > limit && (
               <div
                  className={
                     showAll ? 'border-t border-t-neutral-100 mt-4 ' : ''
                  }
               >
                  <button
                     onClick={() => setShowAll(!showAll)}
                     className={'text-primary mt-4'}
                  >
                     {showAll ? 'Hide' : ' +Show all'}
                  </button>
               </div>
            )}
         </div>
      </div>
   );
};

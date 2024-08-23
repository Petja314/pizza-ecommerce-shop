'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { useClickAway, useDebounce } from 'react-use';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import { Api } from '@/services/api-client';
import { Product } from '.prisma/client';

interface Props {
   className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
   const [focused, setFocused] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const [products, setProducts] = useState<Product[]>([]);
   const ref = useRef(null);
   useClickAway(ref, () => {
      // console.log('OUTSIDE CLICKED');
      setFocused(false);
   });
   useDebounce(
      async () => {
         try {
            const response = await Api.products.search(searchQuery);
            setProducts(response);
         } catch (e) {
            console.error(e);
         }
         // Api.products.search(searchQuery).then((items) => {
         //     setProducts(items);
         // });
      },
      300,
      [searchQuery]
   );
   const onClickItem = () => {
      setFocused(false);
      setSearchQuery('');
      setProducts([]);
   };
   return (
      <>
         {focused && (
            <div
               className={
                  'fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30'
               }
            />
         )}
         <div
            ref={ref}
            className={
               'flex rounded-2xl flex-1 justify-between relative h-11 z-30'
            }
         >
            <Search
               className={
                  'absolute top-1/2 translate-y-[-50%] left-3 h-3 text-gray-400'
               }
            />
            <input
               onChange={(e) => setSearchQuery(e.target.value)}
               value={searchQuery}
               type="text"
               placeholder={'Найти пиццу...'}
               className={'rounded-2xl outline-none w-full bg-gray-100 pl-11'}
               onFocus={() => setFocused(true)}
            />

            {products.length > 0 && (
               <div
                  className={cn(
                     'absolute w-full bg-white rounded-2xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
                     focused && 'visible opacity-100 top-12'
                  )}
               >
                  {products.map((prod) => (
                     <Link
                        onClick={onClickItem}
                        key={prod.id}
                        className={
                           'flex w-full px-3 py-2 hover:bg-primary/10 items-center gap-3'
                        }
                        href={`/product/${prod.id}`}
                     >
                        <img
                           src={prod.imageUrl}
                           alt={prod.name}
                           className={'rounded-sm h-8 w-8'}
                           width={32}
                           height={32}
                        />
                        <span>{prod.name}</span>
                     </Link>
                  ))}
               </div>
            )}
         </div>
      </>
   );
};

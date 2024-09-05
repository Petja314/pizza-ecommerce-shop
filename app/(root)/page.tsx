import {
   CartDrawer,
   Container,
   Filters,
   FiltersMobileView,
   Stories,
   Title,
   TopBar,
} from '@/shared/components/shared';
import ProductsGroupList from '@/shared/components/shared/products-group-list';
import React, { Suspense } from 'react';
import { findPizzas } from '@/shared/lib';
import { GetSearchParams } from '@/shared/lib/find-pizzas';
import { Button } from '@/shared/components/ui';
import { SlidersHorizontal } from 'lucide-react';

export default async function Home({
   searchParams,
}: {
   searchParams: GetSearchParams;
}) {
   const categories = await findPizzas(searchParams);

   return (
      <div className={''}>
         <Container className={'mt-10 pl-5 pr-5'}>
            <Title
               text={'All products'}
               size={'lg'}
               className={'font-extrabold max-md:text-lg'}
            ></Title>
         </Container>

         <TopBar
            variations={categories.filter((cat) => cat.product.length > 0)}
         />

         <Stories className={''} />

         {/*FILTER MOBILE VERSION*/}
         <div className={'max-lg:flex lg:hidden pl-5 pr-5'}>
            <Suspense>
               <FiltersMobileView>
                  <div
                     className={'flex items-center gap-2 max-lg:cursor-pointer'}
                  >
                     <SlidersHorizontal />
                     <Title text={'Filters'} className={'font-bold'}></Title>
                  </div>
               </FiltersMobileView>
            </Suspense>
         </div>

         <Container className={'pb-14 mt-10 pl-5 pr-5'}>
            <div className={'flex gap-[80px]'}>
               {/*FILTRATION SIDE*/}
               <div className={'w-[200px] max-lg:hidden'}>
                  <Suspense>
                     <Filters />
                  </Suspense>
               </div>
               {/*LIST OF PRODUCTS*/}
               <div className={'flex-1'}>
                  <div className={'flex flex-col gap-16'}>
                     {categories.map(
                        (cat, index) =>
                           cat.product.length > 0 && (
                              <ProductsGroupList
                                 categories={categories}
                                 key={cat.id}
                                 title={cat.name}
                                 items={cat.product}
                                 categoryId={cat.id}
                              />
                           )
                     )}
                  </div>
               </div>
            </div>
         </Container>
      </div>
   );
}

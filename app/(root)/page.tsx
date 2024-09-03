import { Container, Filters, Title, TopBar } from '@/shared/components/shared';
import ProductsGroupList from '@/shared/components/shared/products-group-list';
import { Suspense } from 'react';
import { findPizzas } from '@/shared/lib';
import { GetSearchParams } from '@/shared/lib/find-pizzas';
import { Button } from '@/shared/components/ui';

export default async function Home({
   searchParams,
}: {
   searchParams: GetSearchParams;
}) {
   const categories = await findPizzas(searchParams);

   console.log('cat', categories);
   return (
      <div>
         <Container className={'mt-10'}>
            <Title
               text={'Все пиццы'}
               size={'lg'}
               className={'font-extrabold'}
            ></Title>
         </Container>

         <TopBar
            sortedCategories={categories}
            variations={categories.filter((cat) => cat.product.length > 0)}
         />

         {/*<Stories />*/}

         <Container className={'pb-14 mt-10'}>
            <div className={'flex gap-[80px]'}>
               {/*FILTRATION SIDE*/}
               <div className={'w-[250px]'}>
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

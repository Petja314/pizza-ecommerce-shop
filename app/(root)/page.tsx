import {
   Container,
   Filters,
   ProductCard,
   Title,
   TopBar,
} from '@/shared/components/shared';
import ProductsGroupList from '@/shared/components/shared/products-group-list';
import { prisma } from '@/prisma/prisma-client';

export default async function Home() {
   const categories = await prisma.category.findMany({
      include: {
         product: {
            include: {
               ingridients: true,
               variations: true,
            },
         },
      },
   });
   console.log(categories);
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
            variations={categories.filter((cat) => cat.product.length > 0)}
         />

         <Container className={'pb-14 mt-10'}>
            <div className={'flex gap-[80px]'}>
               {/*FILTRATION SIDE*/}
               <div className={'w-[250px]'}>
                  <Filters />
               </div>

               {/*LIST OF PRODUCTS*/}
               <div className={'flex-1'}>
                  <div className={'flex flex-col gap-16'}>
                     {categories.map(
                        (cat, index) =>
                           cat.product.length > 0 && (
                              <ProductsGroupList
                                 key={cat.id}
                                 title={cat.name}
                                 items={cat.product}
                                 categoryId={cat.id}
                              />
                           )
                     )}
                     {/*<ProductsGroupList*/}
                     {/*   title={'Пиццы'}*/}
                     {/*   items={product}*/}
                     {/*   categoryId={1}*/}
                     {/*/>*/}
                  </div>
               </div>
            </div>
         </Container>
      </div>
   );
}

import React from 'react';
import { Container, Title } from '@/shared/components/shared';
import { Product } from '.prisma/client';
import Link from 'next/link';
import { Button } from '@/shared/components/ui';
import { Plus } from 'lucide-react';
import { ProductCategory } from '@/shared/components/shared/product-form';

interface Props {
   className?: string;
   allProducts: ProductCategory[];
}

const RecommendedProduct: React.FC<Props> = ({ className, allProducts }) => {
   // href={`/product/${product.id}`}
   return (
      <Container>
         <h1 className={'mt-10 mb-10 text-[31px] font-bold'}>Recommended</h1>

         <div className={'flex justify-around'}>
            {allProducts.map((product) => (
               <Link href={`/product/${product.id}`}>
                  <div
                     className={
                        'flex justify-center p-6 bg-secondary rounded-lg h-[260px]'
                     }
                  >
                     <img
                        src={product.imageUrl}
                        alt="logo"
                        // className={'w-[125px] h-[125px]'}
                     />
                  </div>

                  <Title
                     text={product.name}
                     size={'sm'}
                     className={'font-bold'}
                  />

                  <div className={'flex justify-between items-center'}>
                     <span className={'text-[20px]'}>
                        from <b>{product.variations?.[0]?.price}</b> £
                     </span>

                     <Button
                        variant={'secondary'}
                        className={'text-base font-bold'}
                     >
                        <Plus size={20} className={'mr-1'} />
                        Add to cart
                     </Button>
                  </div>
               </Link>
            ))}
         </div>
      </Container>
   );
};

export default RecommendedProduct;

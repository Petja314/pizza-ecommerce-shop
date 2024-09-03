import React from 'react';
import { Container, Title } from '@/shared/components/shared';
import Link from 'next/link';
import { Button } from '@/shared/components/ui';
import { Plus } from 'lucide-react';
import { ProductCategory, ProductWithRelations } from '@/@types/prisma';

interface Props {
   className?: string;
   // allProducts: ProductCategory[];
   product: ProductWithRelations;
}

const RecommendedProduct: React.FC<Props> = ({ className, product }) => {
   // console.log('allProducts', allProducts);
   // href={`/product/${product.id}`}
   return (
      <Container className={'mb-20 '}>
         {/*<p className={'mt-10 text-gray-500'}>Product / {name}</p>*/}

         <h1 className={'mt-10 mb-10 text-[31px] font-bold'}>Recommended</h1>
         <div className="scrollbar overflow-x-auto  ">
            <div className="grid grid-flow-col auto-cols-max gap-3 justify-around">
               {product?.category?.product.map((product) => (
                  <Link
                     href={`/product/${product.id}`}
                     key={product.id}
                     // className="min-w-[calc(100%/4-16px)]"
                  >
                     <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
                        <img src={product.imageUrl} alt="logo" />
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
         </div>
      </Container>
   );
};

export default RecommendedProduct;
